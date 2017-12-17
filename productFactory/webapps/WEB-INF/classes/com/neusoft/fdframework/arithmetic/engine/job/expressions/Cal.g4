/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

grammar Calc;

// 以下以小写字母开头的文法表示为语法元素
// 由大写字母开头的文法表示为词法元素
// 词法元素的表示类似于正则表示式
// 语法元素的表示类似于BNF

exprs : setExpr                            // set表达式
    | calcExpr                            // 或calc表达式
    ;

setExpr : 'set' agmts ;                    // 以set命令开头，后面是多个赋值语句
agmts   : agmt (';' agmts)? ';'? ;        // 多个赋值语句是由一个赋值语句后根着多个赋值语句，中间由分号分隔，结尾有一个可选的分号
agmt    : id=ID '=' num=NUMBER | id=ID '=' num=STRING ;        // 一个赋值语句是由一个ID，后跟着一个等号，再后面跟送一个数字或字符串组成
calcExpr: 'calc' expr ;                    // 以calc命令开头，后面是一个计算表达式

// expr可能由多个产生式
// 在前面的产生式优先于在后面的产生式
// 这样来解决优先级的问题

expr: expr op=(MUL | DIV) expr            // 乘法或除法
    | expr op=(ADD | SUB) expr            // 加法或减法
    | factor                            // 一个计算因子——可做为+-*/的操作数据的东西
    ;

factor: (sign=(ADD | SUB))? num=NUMBER    // 计算因子可以是一个正数或负数
    | '(' expr ')'                        // 计算因子可以是括号括起来的表示式
    | id=ID                                // 计算因子可以是一个变量
    | funCall                            // 计算因子可以是一个函数调用
    | num=STRING                         //计算因子可以是一个字符串
    ;

funCall: name=ID '(' params ')' ;        // 函数名后面加参数列表
params : expr (',' params)? ;            // 参数列表是由一个表达式后面跟关一个可选的参数列表组成

WS : [ \t\n\r]+ -> skip ;                // 空白， 后面的->skip表示antlr4在分析语言的文本时，符合这个规则的词法将被无视
ID : ([a-zA-Z_.\u4e00-\u9f5a]+(([0-9]+)?)?)+ ;                            // 标识符，由0到多个大小写字母、数字、下划线、中文字符组成
NUMBER : [0-9]+('.'([0-9]+)?)? ;        // 数字
ADD : '+' ;
SUB : '-' ;
MUL : '*' ;
DIV : '/' ;
//STRING : '\''(^\s)* '\'' ;        //以'开头和结尾，由0到多个大小写字母、数字、下划线、中文字符组成
STRING
    :  '\'' ( EscapeSequence | ~('\\'|'\'') )* '\''
    ;
fragment
EscapeSequence
    :   '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\')
    |   UnicodeEscape
    |   OctalEscape
    ;

fragment
OctalEscape
    :   '\\' ('0'..'3') ('0'..'7') ('0'..'7')
    |   '\\' ('0'..'7') ('0'..'7')
    |   '\\' ('0'..'7')
    ;

fragment
UnicodeEscape
    :   '\\' 'u' HexDigit HexDigit HexDigit HexDigit
    ;
fragment
HexDigit : ('0'..'9'|'a'..'f'|'A'..'F') ;