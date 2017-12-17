// Generated from C:\Users\Administrator\Calc.g4 by ANTLR 4.1
package com.neusoft.fdframework.arithmetic.engine.job.expressions;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class CalcParser extends Parser {
	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__6=1, T__5=2, T__4=3, T__3=4, T__2=5, T__1=6, T__0=7, WS=8, ID=9, NUMBER=10, 
		ADD=11, SUB=12, MUL=13, DIV=14, STRING=15;
	public static final String[] tokenNames = {
		"<INVALID>", "'set'", "')'", "','", "'('", "'calc'", "'='", "';'", "WS", 
		"ID", "NUMBER", "'+'", "'-'", "'*'", "'/'", "STRING"
	};
	public static final int
		RULE_exprs = 0, RULE_setExpr = 1, RULE_agmts = 2, RULE_agmt = 3, RULE_calcExpr = 4, 
		RULE_expr = 5, RULE_factor = 6, RULE_funCall = 7, RULE_params = 8;
	public static final String[] ruleNames = {
		"exprs", "setExpr", "agmts", "agmt", "calcExpr", "expr", "factor", "funCall", 
		"params"
	};

	@Override
	public String getGrammarFileName() { return "Calc.g4"; }

	@Override
	public String[] getTokenNames() { return tokenNames; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public CalcParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class ExprsContext extends ParserRuleContext {
		public SetExprContext setExpr() {
			return getRuleContext(SetExprContext.class,0);
		}
		public CalcExprContext calcExpr() {
			return getRuleContext(CalcExprContext.class,0);
		}
		public ExprsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exprs; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterExprs(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitExprs(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitExprs(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExprsContext exprs() throws RecognitionException {
		ExprsContext _localctx = new ExprsContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_exprs);
		try {
			setState(20);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(18); setExpr();
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(19); calcExpr();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SetExprContext extends ParserRuleContext {
		public AgmtsContext agmts() {
			return getRuleContext(AgmtsContext.class,0);
		}
		public SetExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_setExpr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterSetExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitSetExpr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitSetExpr(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SetExprContext setExpr() throws RecognitionException {
		SetExprContext _localctx = new SetExprContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_setExpr);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(22); match(1);
			setState(23); agmts();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AgmtsContext extends ParserRuleContext {
		public AgmtsContext agmts() {
			return getRuleContext(AgmtsContext.class,0);
		}
		public AgmtContext agmt() {
			return getRuleContext(AgmtContext.class,0);
		}
		public AgmtsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_agmts; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterAgmts(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitAgmts(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitAgmts(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AgmtsContext agmts() throws RecognitionException {
		AgmtsContext _localctx = new AgmtsContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_agmts);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(25); agmt();
			setState(28);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				{
				setState(26); match(7);
				setState(27); agmts();
				}
				break;
			}
			setState(31);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				{
				setState(30); match(7);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AgmtContext extends ParserRuleContext {
		public Token id;
		public Token num;
		public TerminalNode ID() { return getToken(CalcParser.ID, 0); }
		public TerminalNode NUMBER() { return getToken(CalcParser.NUMBER, 0); }
		public TerminalNode STRING() { return getToken(CalcParser.STRING, 0); }
		public AgmtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_agmt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterAgmt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitAgmt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitAgmt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AgmtContext agmt() throws RecognitionException {
		AgmtContext _localctx = new AgmtContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_agmt);
		try {
			setState(39);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(33); ((AgmtContext)_localctx).id = match(ID);
				setState(34); match(6);
				setState(35); ((AgmtContext)_localctx).num = match(NUMBER);
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(36); ((AgmtContext)_localctx).id = match(ID);
				setState(37); match(6);
				setState(38); ((AgmtContext)_localctx).num = match(STRING);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CalcExprContext extends ParserRuleContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public CalcExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_calcExpr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterCalcExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitCalcExpr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitCalcExpr(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CalcExprContext calcExpr() throws RecognitionException {
		CalcExprContext _localctx = new CalcExprContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_calcExpr);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(41); match(5);
			setState(42); expr(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExprContext extends ParserRuleContext {
		public int _p;
		public Token op;
		public TerminalNode MUL() { return getToken(CalcParser.MUL, 0); }
		public TerminalNode DIV() { return getToken(CalcParser.DIV, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public FactorContext factor() {
			return getRuleContext(FactorContext.class,0);
		}
		public TerminalNode SUB() { return getToken(CalcParser.SUB, 0); }
		public TerminalNode ADD() { return getToken(CalcParser.ADD, 0); }
		public ExprContext(ParserRuleContext parent, int invokingState) { super(parent, invokingState); }
		public ExprContext(ParserRuleContext parent, int invokingState, int _p) {
			super(parent, invokingState);
			this._p = _p;
		}
		@Override public int getRuleIndex() { return RULE_expr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitExpr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitExpr(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExprContext expr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExprContext _localctx = new ExprContext(_ctx, _parentState, _p);
		ExprContext _prevctx = _localctx;
		int _startState = 10;
		enterRecursionRule(_localctx, RULE_expr);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(45); factor();
			}
			_ctx.stop = _input.LT(-1);
			setState(55);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			while ( _alt!=2 && _alt!=-1 ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(53);
					switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
					case 1:
						{
						_localctx = new ExprContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(47);
						if (!(3 >= _localctx._p)) throw new FailedPredicateException(this, "3 >= $_p");
						setState(48);
						((ExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==MUL || _la==DIV) ) {
							((ExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						consume();
						setState(49); expr(4);
						}
						break;

					case 2:
						{
						_localctx = new ExprContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(50);
						if (!(2 >= _localctx._p)) throw new FailedPredicateException(this, "2 >= $_p");
						setState(51);
						((ExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==ADD || _la==SUB) ) {
							((ExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						consume();
						setState(52); expr(3);
						}
						break;
					}
					} 
				}
				setState(57);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class FactorContext extends ParserRuleContext {
		public Token sign;
		public Token num;
		public Token id;
		public FunCallContext funCall() {
			return getRuleContext(FunCallContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode ID() { return getToken(CalcParser.ID, 0); }
		public TerminalNode NUMBER() { return getToken(CalcParser.NUMBER, 0); }
		public TerminalNode STRING() { return getToken(CalcParser.STRING, 0); }
		public TerminalNode SUB() { return getToken(CalcParser.SUB, 0); }
		public TerminalNode ADD() { return getToken(CalcParser.ADD, 0); }
		public FactorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_factor; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterFactor(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitFactor(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitFactor(this);
			else return visitor.visitChildren(this);
		}
	}

	public final FactorContext factor() throws RecognitionException {
		FactorContext _localctx = new FactorContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_factor);
		int _la;
		try {
			setState(69);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(59);
				switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
				case 1:
					{
					setState(58);
					((FactorContext)_localctx).sign = _input.LT(1);
					_la = _input.LA(1);
					if ( !(_la==ADD || _la==SUB) ) {
						((FactorContext)_localctx).sign = (Token)_errHandler.recoverInline(this);
					}
					consume();
					}
					break;
				}
				setState(61); ((FactorContext)_localctx).num = match(NUMBER);
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(62); match(4);
				setState(63); expr(0);
				setState(64); match(2);
				}
				break;

			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(66); ((FactorContext)_localctx).id = match(ID);
				}
				break;

			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(67); funCall();
				}
				break;

			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(68); ((FactorContext)_localctx).num = match(STRING);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunCallContext extends ParserRuleContext {
		public Token name;
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public TerminalNode ID() { return getToken(CalcParser.ID, 0); }
		public FunCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_funCall; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterFunCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitFunCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitFunCall(this);
			else return visitor.visitChildren(this);
		}
	}

	public final FunCallContext funCall() throws RecognitionException {
		FunCallContext _localctx = new FunCallContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_funCall);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(71); ((FunCallContext)_localctx).name = match(ID);
			setState(72); match(4);
			setState(73); params();
			setState(74); match(2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParamsContext extends ParserRuleContext {
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ParamsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_params; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).enterParams(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof CalcListener ) ((CalcListener)listener).exitParams(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof CalcVisitor ) return ((CalcVisitor<? extends T>)visitor).visitParams(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ParamsContext params() throws RecognitionException {
		ParamsContext _localctx = new ParamsContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_params);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(76); expr(0);
			setState(79);
			switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
			case 1:
				{
				setState(77); match(3);
				setState(78); params();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 5: return expr_sempred((ExprContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expr_sempred(ExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0: return 3 >= _localctx._p;

		case 1: return 2 >= _localctx._p;
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\uacf5\uee8c\u4f5d\u8b0d\u4a45\u78bd\u1b2f\u3378\3\21T\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\3\2\3\2\5\2"+
		"\27\n\2\3\3\3\3\3\3\3\4\3\4\3\4\5\4\37\n\4\3\4\5\4\"\n\4\3\5\3\5\3\5\3"+
		"\5\3\5\3\5\5\5*\n\5\3\6\3\6\3\6\3\7\3\7\3\7\3\7\3\7\3\7\3\7\3\7\3\7\7"+
		"\78\n\7\f\7\16\7;\13\7\3\b\5\b>\n\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\5"+
		"\bH\n\b\3\t\3\t\3\t\3\t\3\t\3\n\3\n\3\n\5\nR\n\n\3\n\2\13\2\4\6\b\n\f"+
		"\16\20\22\2\4\3\2\17\20\3\2\r\16V\2\26\3\2\2\2\4\30\3\2\2\2\6\33\3\2\2"+
		"\2\b)\3\2\2\2\n+\3\2\2\2\f.\3\2\2\2\16G\3\2\2\2\20I\3\2\2\2\22N\3\2\2"+
		"\2\24\27\5\4\3\2\25\27\5\n\6\2\26\24\3\2\2\2\26\25\3\2\2\2\27\3\3\2\2"+
		"\2\30\31\7\3\2\2\31\32\5\6\4\2\32\5\3\2\2\2\33\36\5\b\5\2\34\35\7\t\2"+
		"\2\35\37\5\6\4\2\36\34\3\2\2\2\36\37\3\2\2\2\37!\3\2\2\2 \"\7\t\2\2! "+
		"\3\2\2\2!\"\3\2\2\2\"\7\3\2\2\2#$\7\13\2\2$%\7\b\2\2%*\7\f\2\2&\'\7\13"+
		"\2\2\'(\7\b\2\2(*\7\21\2\2)#\3\2\2\2)&\3\2\2\2*\t\3\2\2\2+,\7\7\2\2,-"+
		"\5\f\7\2-\13\3\2\2\2./\b\7\1\2/\60\5\16\b\2\609\3\2\2\2\61\62\6\7\2\3"+
		"\62\63\t\2\2\2\638\5\f\7\2\64\65\6\7\3\3\65\66\t\3\2\2\668\5\f\7\2\67"+
		"\61\3\2\2\2\67\64\3\2\2\28;\3\2\2\29\67\3\2\2\29:\3\2\2\2:\r\3\2\2\2;"+
		"9\3\2\2\2<>\t\3\2\2=<\3\2\2\2=>\3\2\2\2>?\3\2\2\2?H\7\f\2\2@A\7\6\2\2"+
		"AB\5\f\7\2BC\7\4\2\2CH\3\2\2\2DH\7\13\2\2EH\5\20\t\2FH\7\21\2\2G=\3\2"+
		"\2\2G@\3\2\2\2GD\3\2\2\2GE\3\2\2\2GF\3\2\2\2H\17\3\2\2\2IJ\7\13\2\2JK"+
		"\7\6\2\2KL\5\22\n\2LM\7\4\2\2M\21\3\2\2\2NQ\5\f\7\2OP\7\5\2\2PR\5\22\n"+
		"\2QO\3\2\2\2QR\3\2\2\2R\23\3\2\2\2\13\26\36!)\679=GQ";
	public static final ATN _ATN =
		ATNSimulator.deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}