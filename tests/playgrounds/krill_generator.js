// '%{BKY_LOGIC_HUE}'
// '%{BKY_LOOPS_HUE}'
// '%{BKY_MATH_HUE}'
// '%{BKY_TEXTS_HUE}'
// '%{BKY_LISTS_HUE}'
// '%{BKY_COLOUR_HUE}'
// '%{BKY_VARIABLES_HUE}'
// '%{BKY_VARIABLES_DYNAMIC_HUE}'
// '%{BKY_PROCEDURES_HUE}'

Blockly.defineBlocksWithJsonArray([
  {
    "type": "protocol",
    "message0": "protocol %1 do %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "MAIN"
      }
    ],
    "output": null,
    "colour": "%{BKY_VARIABLES_DYNAMIC_HUE}",
    "tooltip": "This defines a protocol",
    "helpUrl": "https://www.aquarium.bio/",
  },
  {
    "type": "operations",
    "message0": "operations",
    "output": null,
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "The list of operations originally planned",
    "helpUrl": "https://www.aquarium.bio/"
  },{
    "type": "operations_retrieve",
    "message0": "retrieve %1",
    "args0": [
      {
        "type": "input_value",
        "name": "OPERATIONS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "Gather materials for operations",
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
    "colour": "%{BKY_MATH_HUE}",
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
    "colour": "%{BKY_MATH_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },{
    "type": "for_each_operation",
    "message0": "for each  %1 in %2 %3",
    "args0": [
      {
        "type": "field_variable",
        "name": "OPERATION",
        "variable": "operation"
      },
      {
        "type": "input_value",
        "name": "OPERATION_LIST",
        "check": "OperationList"
      },
      {
        "type": "input_statement",
        "name": "BLOCK"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": '%{BKY_LOOPS_HUE}',
    "tooltip": "loop over operations",
    "helpUrl": "https://www.aquarium.bio/"
  }
]);

class CustomCategory extends Blockly.ToolboxCategory {
  /**
   * Constructor for a custom category.
   * @override
   */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory, true);

var krillToolbox = `
<xml id="toolbox" style="display: none">
<category name="Protocol" colour="%{BKY_VARIABLES_DYNAMIC_HUE}">
<block type="protocol"/>
</category>
<category name="Operations" colour="%{BKY_MATH_HUE}">
<block type="operations_retrieve"/>
<block type="operations_make"/>
<block type="operation_list"/>
<block type="operations"/>
</category>
<category name="Loops" colour="%{BKY_LOOPS_HUE}">
<block type="for_each_operation"/>
</category>
</xml>
`

const krillGenerator = new Blockly.Generator('Krill');
krillGenerator.PRECEDENCE = 0;

krillGenerator['protocol'] = function(block) {
  let code = ''
  code += '# typed: false\n# frozen_string_literal: true\n\n'
  code += 'needs \'Protocol Base/ProtocolBase\'\n\n'
  code += 'class Protocol\n' + krillGenerator.INDENT + 'include ProtocolBase\n\n';

  let main = krillGenerator.statementToCode(block, 'MAIN');
  main = 'def main\n' + main + 'end\n';
  let indentedMain = krillGenerator.prefixLines(main, krillGenerator.INDENT);
  code += indentedMain;

  code += 'end\n';
  return [code, krillGenerator.PRECEDENCE];
};

krillGenerator['operations_retrieve'] = function(block) {
  let operation_list = krillGenerator.valueToCode(block, 'OPERATIONS', krillGenerator.PRECEDENCE);
  let code = operation_list + '.retrieve\n';
  return code;
};

krillGenerator['operations_make'] = function(block) {
  let operation_list = krillGenerator.valueToCode(block, 'OPERATIONS', krillGenerator.PRECEDENCE);
  let code = operation_list + '.make\n';
  return code;
};

krillGenerator['operation_list'] = function(block) {
  let code = block.getFieldValue('OPERATION_LIST');
  return [code, krillGenerator.PRECEDENCE];
};

krillGenerator['operations'] = function(block) {
  let code = 'operations';
  return [code, krillGenerator.PRECEDENCE];
};

krillGenerator['for_each_operation'] = function(block) {
  // TODO: Figure out how to replace with safe variable name.
  let variable_operation = block.getFieldValue('OPERATION');
  let value_operation_list = krillGenerator.valueToCode(block, 'OPERATION_LIST', krillGenerator.PRECEDENCE);
  let statements_block = krillGenerator.statementToCode(block, 'BLOCK');
  let code = '\n' + value_operation_list + '.each do |' + variable_operation + '|\n';
  code += statements_block;
  code += 'end\n\n';
  return code;
};

krillGenerator.scrub_ = function(block, code, opt_thisOnly) {
  let nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
  let nextCode =
      opt_thisOnly ? '' : krillGenerator.blockToCode(nextBlock);
  return code +  nextCode;
};