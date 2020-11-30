Blockly.defineBlocksWithJsonArray([
  {
    "type": "protocol",
    "message0": "protocol %1 import %2 do %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "IMPORT"
      },
      {
        "type": "input_statement",
        "name": "MAIN"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "This defines a protocol",
    "helpUrl": "https://www.aquarium.bio/",
  },
  {
    "type": "library",
    "message0": "library %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "LIBRARY_NAME",
        "options": [
          [
            "debug",
            "Debug"
          ],
          [
            "association management",
            "AssociationManagement"
          ],
          [
            "microtiter plates",
            "MicrotiterPlates"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Select a library to import",
    "helpUrl": "https://www.aquarium.bio/"
  },{
    "type": "operations_make",
    "message0": "make %1",
    "args0": [
      {
        "type": "input_value",
        "name": "OPERATIONS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Gather materials for operations",
    "helpUrl": "https://www.aquarium.bio/"
  },{
    "type": "operation_list",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "OPERATION_LIST",
        "variable": "operations"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

  var krillToolbox = `
  <xml id="toolbox" style="display: none">
  <block type="protocol"/>
  <block type="library"></block>
  <block type="operations_make"/>
  <block type="operation_list"/>
  <block type="text"><field name="TEXT"/></block>
  </xml>
  `

  const krillGenerator = new Blockly.Generator('Krill');
  krillGenerator.PRECEDENCE = 0;

  krillGenerator['protocol'] = function(block) {
    var imports = krillGenerator.statementToCode(block, 'IMPORT');
    var main = krillGenerator.statementToCode(block, 'MAIN');
    var code = '# typed: false\n# frozen_string_literal: true\n\nclass Protocol\n';
    code += imports;
    code += 'def main\n' + main + 'end\n';
    code += 'end';
    return [code, krillGenerator.PRECEDENCE];
  };

  krillGenerator['library'] = function(block) {
    const name = block.getFieldValue('LIBRARY_NAME');
    const code = 'include ' + name + '\n';
    return code;
  };

  krillGenerator['operations_make'] = function(block) {
    const operation_list = krillGenerator.valueToCode(block, 'OPERATIONS', krillGenerator.PRECEDENCE);
    const code = operation_list + '.make\n';
    return code;
  };

  krillGenerator['operation_list'] = function(block) {
    var code = block.getFieldValue('OPERATION_LIST');
    return [code, krillGenerator.PRECEDENCE];
  };

  krillGenerator['text'] = function(block) {
    var code = block.getFieldValue('TEXT');
    return [code, krillGenerator.PRECEDENCE];
  };

  krillGenerator.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    const nextCode =
        opt_thisOnly ? '' : krillGenerator.blockToCode(nextBlock);
    return code +  nextCode;
  };