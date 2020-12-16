const krillGenerator = new Blockly.Generator('Krill');
krillGenerator.PRECEDENCE = 0;

krillGenerator.scrub_ = function(block, code, opt_thisOnly) {
  let nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
  let nextCode =
      opt_thisOnly ? '' : krillGenerator.blockToCode(nextBlock);
  return code +  nextCode;
};

////////// Protocol //////////
Blockly.Msg.PROTOCOL_HUE = '%{BKY_VARIABLES_DYNAMIC_HUE}';

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
    "colour": "%{BKY_PROTOCOL_HUE}",
    "tooltip": "This defines a protocol",
    "helpUrl": "https://www.aquarium.bio/",
  }
]);

krillGenerator['protocol'] = function(block) {
  let code = ''
  code += '# typed: false\n# frozen_string_literal: true\n\n'
  code += 'needs \'Protocol Base/ProtocolBase\'\n\n'
  code += 'class Protocol\n' + krillGenerator.INDENT + 'include ProtocolBase\n\n';

  const main = krillGenerator.statementToCode(block, 'MAIN');
  let fullMain = 'def main\n' + main + 'end\n';
  let indentedMain = krillGenerator.prefixLines(fullMain, krillGenerator.INDENT);
  code += indentedMain;

  code += 'end\n';
  return [code, krillGenerator.PRECEDENCE];
};

////////// Operations //////////
Blockly.Msg.OPERATION_HUE = '%{BKY_MATH_HUE}';

Blockly.defineBlocksWithJsonArray([
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
  }
]);

krillGenerator['operations_retrieve'] = function(block) {
  const operation_list = krillGenerator.valueToCode(block, 'OPERATIONS', krillGenerator.PRECEDENCE);
  let code = operation_list + '.retrieve\n';
  return code;
};

krillGenerator['operations_make'] = function(block) {
  const operation_list = krillGenerator.valueToCode(block, 'OPERATIONS', krillGenerator.PRECEDENCE);
  let code = operation_list + '.make\n';
  return code;
};

krillGenerator['operation_list'] = function(block) {
  const operation_list = block.getFieldValue('OPERATION_LIST');
  return [operation_list, krillGenerator.PRECEDENCE];
};

krillGenerator['operations'] = function(block) {
  let code = 'operations';
  return [code, krillGenerator.PRECEDENCE];
};

////////// Operation For Loop //////////
Blockly.defineBlocksWithJsonArray([
  {
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

krillGenerator['for_each_operation'] = function(block) {
  // TODO: Figure out how to replace with safe variable name.
  const variable_operation = block.getFieldValue('OPERATION');
  const value_operation_list = krillGenerator.valueToCode(block, 'OPERATION_LIST', krillGenerator.PRECEDENCE);
  const statements_block = krillGenerator.statementToCode(block, 'BLOCK');
  let code = '\n' + value_operation_list + '.each do |' + variable_operation + '|\n';
  code += statements_block;
  code += 'end\n\n';
  return code;
};

////////// SHOW BLOCK //////////
Blockly.Msg.SHOW_HUE = '%{BKY_COLOUR_HUE}';
Blockly.defineBlocksWithJsonArray([
  {
    "type": "show",
    "message0": "show %1 %2 %3 %4",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_label_serializable",
        "name": "TITLE",
        "text": "title"
      },
      {
        "type": "input_value",
        "name": "TITLE"
      },
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SHOW_HUE}",
    "tooltip": "show block",
    "helpUrl": ""
  },{
    "type": "note",
    "message0": "note %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SHOW_HUE}",
    "tooltip": "Use in show block",
    "helpUrl": "https://www.aquarium.bio/"
  },{
    "type": "warning",
    "message0": "warning %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SHOW_HUE}",
    "tooltip": "Use in show block",
    "helpUrl": "https://www.aquarium.bio/"
  },{
    "type": "check",
    "message0": "check %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SHOW_HUE}",
    "tooltip": "Use in show block",
    "helpUrl": "https://www.aquarium.bio/"
  },{
    "type": "bullet",
    "message0": "bullet %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SHOW_HUE}",
    "tooltip": "Use in show block",
    "helpUrl": "https://www.aquarium.bio/"
  }
]);

krillGenerator['show'] = function(block) {
  const value_title = krillGenerator.valueToCode(block, 'TITLE', krillGenerator.PRECEDENCE);
  const statements_steps = krillGenerator.statementToCode(block, 'STEPS');
  let code = '\nshow do\n';
  let lines = krillGenerator.INDENT + 'title ' + value_title + '\n\n';
  lines += statements_steps;
  code += lines
  code += 'end\n\n';
  return code;
};

krillGenerator['note'] = function(block) {
  const text = krillGenerator.valueToCode(block, 'TEXT', krillGenerator.PRECEDENCE);
  let code = 'note ' + text + '\n';
  return code;
};

krillGenerator['check'] = function(block) {
  const text = krillGenerator.valueToCode(block, 'TEXT', krillGenerator.PRECEDENCE);
  let code = 'check ' + text + '\n';
  return code;
};

krillGenerator['warning'] = function(block) {
  const text = krillGenerator.valueToCode(block, 'TEXT', krillGenerator.PRECEDENCE);
  let code = 'warning ' + text + '\n';
  return code;
};

krillGenerator['bullet'] = function(block) {
  const text = krillGenerator.valueToCode(block, 'TEXT', krillGenerator.PRECEDENCE);
  let code = 'bullet ' + text + '\n';
  return code;
};

////////// TEXT //////////
krillGenerator['text'] = function(block) {
  var textValue = block.getFieldValue('TEXT');
  var code = "'" + textValue + "'";
  return [code, krillGenerator.PRECEDENCE];
};

////////// TOOLBOX //////////
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
<category name="Protocol" colour="%{BKY_PROTOCOL_HUE}">
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
<category name="Show" colour="%{BKY_SHOW_HUE}">
<block type="show"/>
<block type="note"/>
<block type="check"/>
<block type="warning"/>
<block type="bullet"/>
</category>
<category name="Text" colour="%{BKY_TEXTS_HUE}">
<block type="text"><field name="TEXT"/></block>
</category>
</xml>
`