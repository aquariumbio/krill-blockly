Blockly.defineBlocksWithJsonArray([{
    "type": "protocol",
    "message0": "protocol %1 import %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "IMPORT"
      }
    ],
    "output": null,
    "colour": 230,
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
  }]);

  var krillToolbox = `
  <xml id="toolbox" style="display: none">
  <block type="protocol"/>
  <block type="library"></block>
  </xml>
  `

  const krillGenerator = new Blockly.Generator('Krill');
  krillGenerator.PRECEDENCE = 0;

  krillGenerator['protocol'] = function(block) {
    var statement_members = krillGenerator.statementToCode(block, 'IMPORT');
    var code = '# typed: false\n# frozen_string_literal: true\n\nclass Protocol\n';
    code += statement_members;
    code += 'end';
    return [code, krillGenerator.PRECEDENCE];
  };

  krillGenerator['library'] = function(block) {
    const name = block.getFieldValue('LIBRARY_NAME');
    const code = 'include ' + name + '\n';
    return code;
  };

  krillGenerator.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    const nextCode =
        opt_thisOnly ? '' : krillGenerator.blockToCode(nextBlock);
    return code +  nextCode;
  };