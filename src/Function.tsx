import './Function.css';
import React from 'react';

type MyFunctionAProps = {
  setMyFunctionA: (myFunctionA: MyFunctionA) => void;
  setMode: (newMode: number) => void;
};
export class MyFunctionA extends React.Component<MyFunctionAProps, {
  // state
  dispStr: string;
  dispAngle: string;
  dispMemory: string;
  mrcButtonText: string;
  memoryRecalled: boolean;
}> {
  constructor(props: MyFunctionAProps) {
    console.log("MyFunctionA constructor");
    super(props);

    props.setMyFunctionA( this );

    // 状態管理
    this.state = {
      dispStr: "0",
      dispAngle: "RAD",
      dispMemory: "0",
      mrcButtonText: "MR",
      memoryRecalled: global.calc.memoryRecalled,
    };
    this.setDispStr = this.setDispStr.bind(this);
    this.setDispAngle = this.setDispAngle.bind(this);
    this.setDispMemory = this.setDispMemory.bind(this);
    this.setMrcButtonText = this.setMrcButtonText.bind(this);
    this.setMemoryRecalled = this.setMemoryRecalled.bind(this);

    // 操作
    this.onButtonMAdd = this.onButtonMAdd.bind(this);
    this.onButtonMSub = this.onButtonMSub.bind(this);
    this.onButtonMRC = this.onButtonMRC.bind(this);
    this.onButtonNumber = this.onButtonNumber.bind(this);
  }

  // 状態変更用コールバック関数
  setDispStr( dispStr: string ){
    this.setState({ dispStr: dispStr });
  }
  setDispAngle( dispAngle: string ){
    this.setState({ dispAngle: dispAngle });
  }
  setDispMemory( dispMemory: string ){
    this.setState({ dispMemory: dispMemory });
  }
  setMrcButtonText( mrcButtonText: string ){
    this.setState({ mrcButtonText: mrcButtonText });
  }
  setMemoryRecalled( memoryRecalled: boolean ){
    this.setState({ memoryRecalled: memoryRecalled });
  }

  // 操作
  onButtonFunction( func: () => void ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonMAdd(){ this.onButtonFunction( () => {
    global.calcFunctionService.addMemory();
  } ); }
  onButtonMSub(){ this.onButtonFunction( () => {
    global.calcFunctionService.subMemory();
  } ); }
  onButtonMRC(){ this.onButtonFunction( () => {
    if( global.calc.memoryRecalled ){
      global.calcFunctionService.clearMemory();
    } else {
      global.calcFunctionService.recallMemory();
    }
  } ); }
  onButtonNumber(){ this.onButtonFunction( () => {
    global.calcFunctionService.setOp();
    this.props.setMode(global.calc.modeNumber);
  } ); }

  render() {
    console.log("MyFunctionA render");

    // 桁区切り
    let dispStr = this.state.dispStr;
    if (global.calc.separatorType == global.calc.separatorTypeDash) {
      dispStr = global.calcFunctionService.sepString(dispStr, "'");
    } else if (global.calc.separatorType == global.calc.separatorTypeComma) {
      dispStr = global.calcFunctionService.sepString(dispStr, ",");
    }

    return (
      <div>
        <div className="div_log1" onClick={() => {
          global.calc.returnMode = global.calc.modeFunction;
          this.props.setMode(global.calc.modeOption);
        }}>
          <span className="span_log1">{this.state.dispAngle}</span>
        </div>
        <div className="div_log2" onClick={() => {
          global.calc.returnMode = global.calc.modeFunction;
          this.props.setMode(global.calc.modeOption);
        }}>
          <span className={global.calc.italicFlag ? "span_log2_italic" : "span_log2"}>{dispStr}</span>
        </div>
        <div className="div_log1" onClick={() => {
          global.calc.returnMode = global.calc.modeFunction;
          this.props.setMode(global.calc.modeOption);
        }}>
          <span className="span_log1">M = {this.state.dispMemory}</span>
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
          <div className="button1 div_color_red" onClick={this.onButtonNumber}>
            <span className="span_font_25 span_color_white">NUM</span>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("MyFunctionA componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyFunctionA componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyFunctionA componentDidUpdate");
  }
}

type MyFunctionBProps = {
  setMyFunctionB: (myFunctionB: MyFunctionB) => void;
};
export class MyFunctionB extends React.Component<MyFunctionBProps, {
  // state
  angleButtonText: string;
  errorFlag: boolean;
}> {
  constructor(props: MyFunctionBProps) {
    console.log("MyFunctionB constructor");
    super(props);

    props.setMyFunctionB( this );

    // 状態管理
    this.state = {
      angleButtonText: "DEG",
      errorFlag: global.calc.errorFlag,
    };
    this.setAngleButtonText = this.setAngleButtonText.bind(this);
    this.setErrorFlag = this.setErrorFlag.bind(this);

    // 操作
    this.onButtonCE = this.onButtonCE.bind(this);
    this.onButtonC = this.onButtonC.bind(this);
    this.onButtonAngle = this.onButtonAngle.bind(this);
    this.onButtonSqrt = this.onButtonSqrt.bind(this);
  }

  // 状態変更用コールバック関数
  setAngleButtonText( angleButtonText: string ){
    this.setState({ angleButtonText: angleButtonText });
  }
  setErrorFlag( errorFlag: boolean ){
    this.setState({ errorFlag: errorFlag });
  }

  changeAngle(){
    if( global.calcFunctionService.angle() == global.calc.angleTypeRad ){
      global.calcFunctionService.setAngle( global.calc.angleTypeDeg );
    } else if( global.calcFunctionService.angle() == global.calc.angleTypeDeg ){
      global.calcFunctionService.setAngle( global.calc.angleTypeGrad );
    } else if( global.calcFunctionService.angle() == global.calc.angleTypeGrad ){
      global.calcFunctionService.setAngle( global.calc.angleTypeRad );
    }
  }

  // 操作
  onButtonFunction( func: () => void ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonClear( allFlag: boolean ){
    global.calcFunctionService.clearEntry( allFlag );
  }
  onButtonCE(){
    this.onButtonClear( false );
  }
  onButtonC(){
    this.onButtonClear( true );
  }
  onButtonAngle(){ this.onButtonFunction( () => {
    this.changeAngle();
  } ); }
  onButtonSqrt(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcSqrt();
    global.calcFunctionService.setOp();
  } ); }

  render() {
    console.log("MyFunctionB render");

    const classNameDivCe: string = "button2 div_color_" + (global.calc.errorFlag ? "red" : "white");
    const classNameSpanCe: string = "span_font_32 span_color_" + (global.calc.errorFlag ? "white" : "red");

    return (
      <div>
        <div className="div_row">
          <div className={classNameDivCe} onClick={this.onButtonCE}>
            <span className={classNameSpanCe}>CE</span>
          </div>
          <div className={classNameDivCe} onClick={this.onButtonC}>
            <span className={classNameSpanCe}>C</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButtonAngle}>
            <span className="span_font_25 span_color_black">{this.state.angleButtonText}</span>
          </div>
          <div className="button2 div_color_white" onClick={this.onButtonSqrt}>
            <span className="span_font_40 span_color_black">√</span>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("MyFunctionB componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyFunctionB componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyFunctionB componentDidUpdate");
  }
}

class MyFunctionC extends React.Component {
  constructor(props: {}) {
    console.log("MyFunctionC constructor");
    super(props);

    // 操作
    this.onButtonSin = this.onButtonSin.bind(this);
    this.onButtonCos = this.onButtonCos.bind(this);
    this.onButtonTan = this.onButtonTan.bind(this);
    this.onButtonArcSin = this.onButtonArcSin.bind(this);
    this.onButtonArcCos = this.onButtonArcCos.bind(this);
    this.onButtonArcTan = this.onButtonArcTan.bind(this);
    this.onButtonLog = this.onButtonLog.bind(this);
    this.onButtonLog10 = this.onButtonLog10.bind(this);
    this.onButtonSqr = this.onButtonSqr.bind(this);
    this.onButtonExp = this.onButtonExp.bind(this);
    this.onButtonExp10 = this.onButtonExp10.bind(this);
    this.onButtonInt = this.onButtonInt.bind(this);
  }

  // 操作
  onButtonFunction( func: () => void ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonSin(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcSin();
    global.calcFunctionService.setOp();
  } ); }
  onButtonCos(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcCos();
    global.calcFunctionService.setOp();
  } ); }
  onButtonTan(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcTan();
    global.calcFunctionService.setOp();
  } ); }
  onButtonArcSin(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcArcSin();
    global.calcFunctionService.setOp();
  } ); }
  onButtonArcCos(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcArcCos();
    global.calcFunctionService.setOp();
  } ); }
  onButtonArcTan(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcArcTan();
    global.calcFunctionService.setOp();
  } ); }
  onButtonLog(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcLog();
    global.calcFunctionService.setOp();
  } ); }
  onButtonLog10(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcLog10();
    global.calcFunctionService.setOp();
  } ); }
  onButtonSqr(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcSqr();
    global.calcFunctionService.setOp();
  } ); }
  onButtonExp(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcExp();
    global.calcFunctionService.setOp();
  } ); }
  onButtonExp10(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcExp10();
    global.calcFunctionService.setOp();
  } ); }
  onButtonInt(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcInt();
    global.calcFunctionService.setOp();
  } ); }

  render() {
    console.log("MyFunctionC render");
    return (
      <div>
        <div className="div_row">
          <div className="button2 func1 div_color_white" onClick={this.onButtonSin}>
            <span className="span_font_32 span_color_black">sin</span>
          </div>
          <div className="button2 func1 div_color_white" onClick={this.onButtonCos}>
            <span className="span_font_32 span_color_black">cos</span>
          </div>
          <div className="button2 func2 div_color_white" onClick={this.onButtonTan}>
            <span className="span_font_32 span_color_black">tan</span>
          </div>
        </div>
        <div className="div_row">
          <div className="button2 func1 div_color_white" onClick={this.onButtonArcSin}>
            <span className="span_font_32 span_color_black">asin</span>
          </div>
          <div className="button2 func1 div_color_white" onClick={this.onButtonArcCos}>
            <span className="span_font_32 span_color_black">acos</span>
          </div>
          <div className="button2 func2 div_color_white" onClick={this.onButtonArcTan}>
            <span className="span_font_32 span_color_black">atan</span>
          </div>
        </div>
        <div className="div_row">
          <div className="button2 func1 div_color_white" onClick={this.onButtonLog}>
            <span className="span_font_32 span_color_black">ln</span>
          </div>
          <div className="button2 func1 div_color_white" onClick={this.onButtonLog10}>
            <span className="span_font_32 span_color_black">log</span>
          </div>
          <div className="button2 func2 div_color_white" onClick={this.onButtonSqr}>
            <span className="span_font_32 span_color_black">sqr</span>
          </div>
        </div>
        <div className="div_row">
          <div className="button3 func1 div_color_white" onClick={this.onButtonExp}>
            <span className="span_font_32 span_color_black">exp</span>
          </div>
          <div className="button3 func1 div_color_white" onClick={this.onButtonExp10}>
            <span className="span_font_32 span_color_black">exp10</span>
          </div>
          <div className="button3 func2 div_color_white" onClick={this.onButtonInt}>
            <span className="span_font_32 span_color_black">int</span>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("MyFunctionC componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyFunctionC componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyFunctionC componentDidUpdate");
  }
}

type MyFunctionProps = {
  setMode: (newMode: number) => void;
};
class MyFunction extends React.Component<MyFunctionProps> {
  myFunctionA?: MyFunctionA;
  myFunctionB?: MyFunctionB;

  constructor(props: MyFunctionProps) {
    console.log("MyFunction constructor");
    super(props);

    this.setMyFunctionA = this.setMyFunctionA.bind(this);
    this.setMyFunctionB = this.setMyFunctionB.bind(this);
  }

  setMyFunctionA( myFunctionA: MyFunctionA ) {
    this.myFunctionA = myFunctionA;
  }
  setMyFunctionB( myFunctionB: MyFunctionB ) {
    this.myFunctionB = myFunctionB;
  }

  render() {
    console.log("MyFunction render");
    return (
      <div className="body">
        <MyFunctionA setMyFunctionA={this.setMyFunctionA} setMode={this.props.setMode} />
        <MyFunctionB setMyFunctionB={this.setMyFunctionB} />
        <MyFunctionC />
      </div>
    );
  }

  componentDidMount() {
    console.log("MyFunction componentDidMount");

    global.calcFunctionService.initWithComponent(this.myFunctionA!, this.myFunctionB!);
  }

  componentWillUnmount() {
    console.log("MyFunction componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("MyFunction componentDidUpdate");
  }
}

export default MyFunction;
