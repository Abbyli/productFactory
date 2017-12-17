// Generated from C:\Users\Administrator\Calc.g4 by ANTLR 4.1
package com.neusoft.fdframework.arithmetic.engine.job.expressions;
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class CalcLexer extends Lexer {
	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__6=1, T__5=2, T__4=3, T__3=4, T__2=5, T__1=6, T__0=7, WS=8, ID=9, NUMBER=10, 
		ADD=11, SUB=12, MUL=13, DIV=14, STRING=15;
	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] tokenNames = {
		"<INVALID>",
		"'set'", "')'", "','", "'('", "'calc'", "'='", "';'", "WS", "ID", "NUMBER", 
		"'+'", "'-'", "'*'", "'/'", "STRING"
	};
	public static final String[] ruleNames = {
		"T__6", "T__5", "T__4", "T__3", "T__2", "T__1", "T__0", "WS", "ID", "NUMBER", 
		"ADD", "SUB", "MUL", "DIV", "STRING", "EscapeSequence", "OctalEscape", 
		"UnicodeEscape", "HexDigit"
	};


	public CalcLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Calc.g4"; }

	@Override
	public String[] getTokenNames() { return tokenNames; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	@Override
	public void action(RuleContext _localctx, int ruleIndex, int actionIndex) {
		switch (ruleIndex) {
		case 7: WS_action((RuleContext)_localctx, actionIndex); break;
		}
	}
	private void WS_action(RuleContext _localctx, int actionIndex) {
		switch (actionIndex) {
		case 0: skip();  break;
		}
	}

	public static final String _serializedATN =
		"\3\uacf5\uee8c\u4f5d\u8b0d\u4a45\u78bd\u1b2f\u3378\2\21\u0090\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\3\2\3\2\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3\6"+
		"\3\6\3\6\3\6\3\6\3\7\3\7\3\b\3\b\3\t\6\t>\n\t\r\t\16\t?\3\t\3\t\3\n\6"+
		"\nE\n\n\r\n\16\nF\3\n\6\nJ\n\n\r\n\16\nK\5\nN\n\n\5\nP\n\n\6\nR\n\n\r"+
		"\n\16\nS\3\13\6\13W\n\13\r\13\16\13X\3\13\3\13\6\13]\n\13\r\13\16\13^"+
		"\5\13a\n\13\5\13c\n\13\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3\17\3\20\3\20\3"+
		"\20\7\20p\n\20\f\20\16\20s\13\20\3\20\3\20\3\21\3\21\3\21\3\21\5\21{\n"+
		"\21\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\5\22\u0086\n\22\3\23"+
		"\3\23\3\23\3\23\3\23\3\23\3\23\3\24\3\24\2\25\3\3\1\5\4\1\7\5\1\t\6\1"+
		"\13\7\1\r\b\1\17\t\1\21\n\2\23\13\1\25\f\1\27\r\1\31\16\1\33\17\1\35\20"+
		"\1\37\21\1!\2\1#\2\1%\2\1\'\2\1\3\2\b\5\2\13\f\17\17\"\"\7\2\60\60C\\"+
		"aac|\u4e02\u9f5c\3\2\62;\4\2))^^\n\2$$))^^ddhhppttvv\5\2\62;CHch\u009b"+
		"\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2"+
		"\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2"+
		"\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\3)\3\2\2\2\5-\3\2"+
		"\2\2\7/\3\2\2\2\t\61\3\2\2\2\13\63\3\2\2\2\r8\3\2\2\2\17:\3\2\2\2\21="+
		"\3\2\2\2\23Q\3\2\2\2\25V\3\2\2\2\27d\3\2\2\2\31f\3\2\2\2\33h\3\2\2\2\35"+
		"j\3\2\2\2\37l\3\2\2\2!z\3\2\2\2#\u0085\3\2\2\2%\u0087\3\2\2\2\'\u008e"+
		"\3\2\2\2)*\7u\2\2*+\7g\2\2+,\7v\2\2,\4\3\2\2\2-.\7+\2\2.\6\3\2\2\2/\60"+
		"\7.\2\2\60\b\3\2\2\2\61\62\7*\2\2\62\n\3\2\2\2\63\64\7e\2\2\64\65\7c\2"+
		"\2\65\66\7n\2\2\66\67\7e\2\2\67\f\3\2\2\289\7?\2\29\16\3\2\2\2:;\7=\2"+
		"\2;\20\3\2\2\2<>\t\2\2\2=<\3\2\2\2>?\3\2\2\2?=\3\2\2\2?@\3\2\2\2@A\3\2"+
		"\2\2AB\b\t\2\2B\22\3\2\2\2CE\t\3\2\2DC\3\2\2\2EF\3\2\2\2FD\3\2\2\2FG\3"+
		"\2\2\2GO\3\2\2\2HJ\t\4\2\2IH\3\2\2\2JK\3\2\2\2KI\3\2\2\2KL\3\2\2\2LN\3"+
		"\2\2\2MI\3\2\2\2MN\3\2\2\2NP\3\2\2\2OM\3\2\2\2OP\3\2\2\2PR\3\2\2\2QD\3"+
		"\2\2\2RS\3\2\2\2SQ\3\2\2\2ST\3\2\2\2T\24\3\2\2\2UW\t\4\2\2VU\3\2\2\2W"+
		"X\3\2\2\2XV\3\2\2\2XY\3\2\2\2Yb\3\2\2\2Z`\7\60\2\2[]\t\4\2\2\\[\3\2\2"+
		"\2]^\3\2\2\2^\\\3\2\2\2^_\3\2\2\2_a\3\2\2\2`\\\3\2\2\2`a\3\2\2\2ac\3\2"+
		"\2\2bZ\3\2\2\2bc\3\2\2\2c\26\3\2\2\2de\7-\2\2e\30\3\2\2\2fg\7/\2\2g\32"+
		"\3\2\2\2hi\7,\2\2i\34\3\2\2\2jk\7\61\2\2k\36\3\2\2\2lq\7)\2\2mp\5!\21"+
		"\2np\n\5\2\2om\3\2\2\2on\3\2\2\2ps\3\2\2\2qo\3\2\2\2qr\3\2\2\2rt\3\2\2"+
		"\2sq\3\2\2\2tu\7)\2\2u \3\2\2\2vw\7^\2\2w{\t\6\2\2x{\5%\23\2y{\5#\22\2"+
		"zv\3\2\2\2zx\3\2\2\2zy\3\2\2\2{\"\3\2\2\2|}\7^\2\2}~\4\62\65\2~\177\4"+
		"\629\2\177\u0086\4\629\2\u0080\u0081\7^\2\2\u0081\u0082\4\629\2\u0082"+
		"\u0086\4\629\2\u0083\u0084\7^\2\2\u0084\u0086\4\629\2\u0085|\3\2\2\2\u0085"+
		"\u0080\3\2\2\2\u0085\u0083\3\2\2\2\u0086$\3\2\2\2\u0087\u0088\7^\2\2\u0088"+
		"\u0089\7w\2\2\u0089\u008a\5\'\24\2\u008a\u008b\5\'\24\2\u008b\u008c\5"+
		"\'\24\2\u008c\u008d\5\'\24\2\u008d&\3\2\2\2\u008e\u008f\t\7\2\2\u008f"+
		"(\3\2\2\2\21\2?FKMOSX^`boqz\u0085";
	public static final ATN _ATN =
		ATNSimulator.deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}