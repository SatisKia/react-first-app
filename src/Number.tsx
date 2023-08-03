import './Number.css';
import React from 'react';

class MyNumberA extends React.Component {
  constructor(props) {
    console.log("MyNumberA constructor");
    super(props);

    props.setMyNumberA( this );

    // 状態管理
    this.state = {
      dispStr: "0",
      dispLog: "",
      dispAnswer: "0",
      dispMemory: "0",
      mrcButtonText: "MR",
      memoryRecalled: global.calc.memoryRecalled,
    };
    this.setDispStr = this.setDispStr.bind(this);
    this.setDispLog = this.setDispLog.bind(this);
    this.setDispAnswer = this.setDispAnswer.bind(this);
    this.setDispMemory = this.setDispMemory.bind(this);
    this.setMrcButtonText = this.setMrcButtonText.bind(this);
    this.setMemoryRecalled = this.setMemoryRecalled.bind(this);

    // 操作
    this.onButtonMAdd = this.onButtonMAdd.bind(this);
    this.onButtonMSub = this.onButtonMSub.bind(this);
    this.onButtonMRC = this.onButtonMRC.bind(this);
    this.onButtonFunction = this.onButtonFunction.bind(this);
  }

  // 状態変更用コールバック関数
  setDispStr( dispStr ){
    this.setState({ dispStr: dispStr });
  }
  setDispLog( dispLog ){
    this.setState({ dispLog: dispLog });
  }
  setDispAnswer( dispAnswer ){
    this.setState({ dispAnswer: dispAnswer });
  }
  setDispMemory( dispMemory ){
    this.setState({ dispMemory: dispMemory });
  }
  setMrcButtonText( mrcButtonText ){
    this.setState({ mrcButtonText: mrcButtonText });
  }
  setMemoryRecalled( memoryRecalled ){
    this.setState({ memoryRecalled: memoryRecalled });
  }

  // 操作
  onButtonNumber( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonMAdd(){ this.onButtonNumber( () => {
    global.calcNumberService.addMemory();
  } ); }
  onButtonMSub(){ this.onButtonNumber( () => {
    global.calcNumberService.subMemory();
  } ); }
  onButtonMRC(){ this.onButtonNumber( () => {
    if( global.calc.memoryRecalled ){
      global.calcNumberService.clearMemory();
    } else {
      global.calcNumberService.recallMemory();
    }
  } ); }
  onButtonFunction(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeSet );
    this.props.setMode(global.calc.modeFunction);
  } ); }

  render() {
    console.log("MyNumberA render");

    // 桁区切り
    let dispStr = this.state.dispStr;
    if (global.calc.separatorType == global.calc.separatorTypeDash) {
      dispStr = global.calcNumberService.sepString(dispStr, "'");
    } else if (global.calc.separatorType == global.calc.separatorTypeComma) {
      dispStr = global.calcNumberService.sepString(dispStr, ",");
    }

    return (
      <div>
        <div className="div_log1" onClick={() => {
          global.calc.returnMode = global.calc.modeNumber;
          this.props.setMode(global.calc.modeOption);
        }}>
          <span className="span_log1">{this.state.dispLog}</span>
        </div>
        <div className="div_log2" onClick={() => {
          global.calc.returnMode = global.calc.modeNumber;
          this.props.setMode(global.calc.modeOption);
        }}>
          <span className={global.calc.italicFlag ? "span_log2_italic" : "span_log2"}>{dispStr}</span>
        </div>
        <div className="div_log1" onClick={() => {
          global.calc.returnMode = global.calc.modeNumber;
          this.props.setMode(global.calc.modeOption);
        }}>
          <span className="span_log1">A = {this.state.dispAnswer}&nbsp;&nbsp;M = {this.state.dispMemory}</span>
        </div>
        <div className="div_row">
          <div className="button1 div_color_blue" onClick={this.onButtonMAdd}>
            <span className="span_font_25 span_color_black">M+</span>
          </div>
          <div className="button1 div_color_blue" onClick={this.onButtonMSub}>
            <span className="span_font_25 span_color_black">M-</span>
          </div>
          <div className="button1 div_color_blue" onClick={this.onButtonMRC}>
            <span className={"span_font_25 span_color_" + (global.calc.memoryRecalled ? "red" : "black")}>{this.state.mrcButtonText}</span>
          </div>
          <div className="button1 div_color_red" onClick={this.onButtonFunction}>
            <span className="span_font_25 span_color_white">FNC</span>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("MyNumberA componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyNumberA componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyNumberA componentDidUpdate");
  }
}

class MyNumberB extends React.Component {
  constructor(props) {
    console.log("MyNumberB constructor");
    super(props);

    props.setMyNumberB( this );

    // 状態管理
    this.state = {
      errorFlag: global.calc.errorFlag,
    };
    this.setErrorFlag = this.setErrorFlag.bind(this);

    // 操作
    this.onButtonCE = this.onButtonCE.bind(this);
    this.onButtonC = this.onButtonC.bind(this);
    this.onButtonDEL = this.onButtonDEL.bind(this);
    this.onButtonDiv = this.onButtonDiv.bind(this);
  }

  // 状態変更用コールバック関数
  setErrorFlag( errorFlag ){
    this.setState({ errorFlag: errorFlag });
  }

  // 操作
  onButtonNumber( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonClear( allFlag ){
    global.calcNumberService.clearEntry( allFlag );
  }
  onButtonCE(){
    this.onButtonClear( false );
  }
  onButtonC(){
    this.onButtonClear( true );
  }
  onButtonDEL(){
    if( !global.calc.errorFlag && global.calc.entryFlag ){
      global.calcNumberService.delEntry();
    }
  }
  onButtonDiv(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeDiv );
  } ); }

  render() {
    console.log("MyNumberB render");

    const classNameDivCe = "button2 div_color_" + (global.calc.errorFlag ? "red" : "white");
    const classNameSpanCe = "span_font_32 span_color_" + (global.calc.errorFlag ? "white" : "red");

    return (
      <div>
        <div className="div_row">
          <div className={classNameDivCe} onClick={this.onButtonCE}>
            <span className={classNameSpanCe}>CE</span>
          </div>
          <div className={classNameDivCe} onClick={this.onButtonC}>
            <span className={classNameSpanCe}>C</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButtonDEL}>
            <span className="span_font_32 span_color_black">DEL</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButtonDiv}>
            <span className="span_font_40 span_color_black">÷</span>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("MyNumberB componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyNumberB componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyNumberB componentDidUpdate");
  }
}

class MyNumberC extends React.Component {
  constructor(props) {
    console.log("MyNumberC constructor");
    super(props);

    // 操作
    this.onButtonMul = this.onButtonMul.bind(this);
    this.onButtonSub = this.onButtonSub.bind(this);
    this.onButtonAdd = this.onButtonAdd.bind(this);
    this.onButton0 = this.onButton0.bind(this);
    this.onButton1 = this.onButton1.bind(this);
    this.onButton2 = this.onButton2.bind(this);
    this.onButton3 = this.onButton3.bind(this);
    this.onButton4 = this.onButton4.bind(this);
    this.onButton5 = this.onButton5.bind(this);
    this.onButton6 = this.onButton6.bind(this);
    this.onButton7 = this.onButton7.bind(this);
    this.onButton8 = this.onButton8.bind(this);
    this.onButton9 = this.onButton9.bind(this);
    this.onButtonPoint = this.onButtonPoint.bind(this);
    this.onButtonNegative = this.onButtonNegative.bind(this);
    this.onButtonEqual = this.onButtonEqual.bind(this);
  }

  // 操作
  onButtonNumber( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonMul(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeMul );
  } ); }
  onButtonSub(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeSub );
  } ); }
  onButtonAdd(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeAdd );
  } ); }
  onButton0(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "0" );
  } ); }
  onButton1(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "1" );
  } ); }
  onButton2(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "2" );
  } ); }
  onButton3(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "3" );
  } ); }
  onButton4(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "4" );
  } ); }
  onButton5(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "5" );
  } ); }
  onButton6(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "6" );
  } ); }
  onButton7(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "7" );
  } ); }
  onButton8(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "8" );
  } ); }
  onButton9(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "9" );
  } ); }
  onButtonPoint(){ this.onButtonNumber( () => {
    global.calcNumberService.addPoint();
  } ); }
  onButtonNegative(){ this.onButtonNumber( () => {
    global.calcNumberService.negative();
  } ); }
  onButtonEqual(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeSet );
  } ); }

  render() {
    console.log("MyNumberC render");
    return (
      <div>
        <div className="div_row">
          <div className="button2 div_color_white" onClick={this.onButton7}>
            <span className="span_font_40 span_color_black">7</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButton8}>
            <span className="span_font_40 span_color_black">8</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButton9}>
            <span className="span_font_40 span_color_black">9</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButtonMul}>
            <span className="span_font_40 span_color_black">×</span>
          </div>
        </div>
        <div className="div_row">
          <div className="button2 div_color_white" onClick={this.onButton4}>
            <span className="span_font_40 span_color_black">4</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButton5}>
            <span className="span_font_40 span_color_black">5</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButton6}>
            <span className="span_font_40 span_color_black">6</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButtonSub}>
            <span className="span_font_40 span_color_black">-</span>
          </div>
        </div>
        <div className="div_row">
          <div className="button2 div_color_white" onClick={this.onButton1}>
            <span className="span_font_40 span_color_black">1</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButton2}>
            <span className="span_font_40 span_color_black">2</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButton3}>
            <span className="span_font_40 span_color_black">3</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButtonAdd}>
            <span className="span_font_40 span_color_black">+</span>
          </div>
        </div>
        <div className="div_row">
          <div className="button3 div_color_white" onClick={this.onButtonNegative}>
            <span className="span_font_40 span_color_black">+/-</span>
          </div>
          <div className="button3 div_color_white" onClick={this.onButton0}>
            <span className="span_font_40 span_color_black">0</span>
          </div>
          <div className="button3 div_color_white" onClick={this.onButtonPoint}>
            <span className="span_font_40 span_color_black">.</span>
          </div>
          <div className="button3 div_color_white" onClick={this.onButtonEqual}>
            <span className="span_font_40 span_color_red">=</span>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("MyNumberC componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyNumberC componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyNumberC componentDidUpdate");
  }
}

class MyNumber extends React.Component {
  constructor(props) {
    console.log("MyNumber constructor");
    super(props);

    this.setMyNumberA = this.setMyNumberA.bind(this);
    this.setMyNumberB = this.setMyNumberB.bind(this);
  }

  setMyNumberA( myNumberA ) {
    this.myNumberA = myNumberA;
  }
  setMyNumberB( myNumberB ) {
    this.myNumberB = myNumberB;
  }

  render() {
    console.log("MyNumber render");
    return (
      <div className="body">
        <MyNumberA setMyNumberA={this.setMyNumberA} setMode={this.props.setMode} />
        <MyNumberB setMyNumberB={this.setMyNumberB} />
        <MyNumberC />
      </div>
    );
  }

  componentDidMount() {
    console.log("MyNumber componentDidMount");

    global.calcNumberService.initWithComponent(this.myNumberA, this.myNumberB);
  }

  componentWillUnmount() {
    console.log("MyNumber componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyNumber componentDidUpdate");
  }
}

export default MyNumber;
