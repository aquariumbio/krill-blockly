Blockly.defineBlocksWithJsonArray([{
  "type": "protocol",
  "message0": "protocol %1 include %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "INCLUDE"
    }
  ],
  "output": null,
  "colour": 210,
  "tooltip": "This defines a protocol",
  "helpUrl": "https://www.aquarium.bio/"
},{
  "type": "library",
  "message0": "library: %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "LIBRARY",
      "options": [
        [ "debug", "Debug" ],
        [ "association management", "AssociationManagement" ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "Select a library to import",
  "helpUrl": "https://www.aquarium.bio/"
},{
  "type": "operations_make",
  "message0": "make %1",
  "args0": [
    {
      "type": "input_value",
      "name": "OPERATIONS",
      "check": "operation list"
    }
  ],
  "inputsInline": true,
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
      "name": "OPERATIONS",
      "variable": "operations"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}]);

  var krillToolbox = `
  <xml id="toolbox" style="display: none">
  <block type="protocol"/>
  <block type="library"/>
  <block type="operations_make"/>
  <block type="operation_list"/>
  </xml>
  `

  const krillGenerator = new Blockly.Generator('Krill');
  krillGenerator.PRECEDENCE = 0;

  krillGenerator['protocol'] = function(block) {
    var statements_include = krillGenerator.statementToCode(block, 'INCLUDE');
    // var statements_protocol = krillGenerator.statementToCode(block, 'PROTOCOL');
    var code = '# typed: false\n# frozen_string_literal: true\n\nclass Protocol\n' + statements_include;
    return [code, krillGenerator.PRECEDENCE];
  };

  krillGenerator['library'] = function(block) {
    var library_name = block.getFieldValue('LIBRARY');
    var code = 'include ' + library_name;
    return [code, krillGenerator.PRECEDENCE];
  };

  krillGenerator['operations_make'] = function(block) {
    var code = '';
    return [code, krillGenerator.PRECEDENCE];
  };

  krillGenerator['operation_list'] = function(block) {
    var code = '';
    return [code, krillGenerator.PRECEDENCE];
  };
