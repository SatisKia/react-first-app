import './App.css';
import './Global';
import CalcFunctionService from './service/CalcFunctionService';
import CalcNumberService from './service/CalcNumberService';
import MyFunction from './Function';
import type { MyFunctionA, MyFunctionB } from './Function';
import MyNumber from './Number';
import type { MyNumberA, MyNumberB } from './Number';
import MyOption from './Option';
import React from 'react';

declare global {
  var calcNumberService: MyCalcNumberService;
  var calcFunctionService: MyCalcFunctionService;
}

class MyCalcNumberService extends CalcNumberService {
  componentA?: MyNumberA;
  componentB?: MyNumberB;

  initWithComponent( componentA: MyNumberA, componentB: MyNumberB ){
    this.componentA = componentA;
    this.componentB = componentB;

    super.init();
  }
  init(){
    super.init();
  }

  setDispError( type: number ){
    if( type == global.calc.errorTypeDivideByZero ){
      this.componentA!.setDispStr( "Divide by zero" );
    } else if( type == global.calc.errorTypePositiveInfinity ){
      this.componentA!.setDispStr( "Infinity" );
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      this.componentA!.setDispStr( "-Infinity" );
    } else if( type == global.calc.errorTypeNotANumber ){
      this.componentA!.setDispStr( "NaN" );
    }
  }
  setDispResult( value: number ){
    this.componentA!.setDispStr( this.valueToString( value, 15 ) );
  }
  setDispEntry( entry: string ){
    this.componentA!.setDispStr( entry );
  }
  clearDispLog(){
    this.componentA!.setDispLog( "" );
  }
  setDispLog( value: number, opType: number ){
    if( opType == global.calc.opTypeDiv ){
      this.componentA!.setDispLog( this.valueToString( value, 10 ) + " ÷" );
    }
    if( opType == global.calc.opTypeMul ){
      this.componentA!.setDispLog( this.valueToString( value, 10 ) + " ×" );
    }
    if( opType == global.calc.opTypeSub ){
      this.componentA!.setDispLog( this.valueToString( value, 10 ) + " -" );
    }
    if( opType == global.calc.opTypeAdd ){
      this.componentA!.setDispLog( this.valueToString( value, 10 ) + " +" );
    }
  }
  addDispLog( value: number ){
    this.componentA!.setDispLog( this.componentA!.state.dispLog + " " + this.valueToString( value, 10 ) + " =" );
  }
  setDispAnswer( value: number ){
    this.componentA!.setDispAnswer( this.valueToString( value, 10 ) );
  }
  setDispMemory( value: number ){
    this.componentA!.setDispMemory( this.valueToString( value, 10 ) );
  }
  memoryRecalled( flag: boolean ){
    this.componentA!.setMrcButtonText( flag ? "MC" : "MR" );
  }
  errorChanged( flag: boolean ){
    this.componentB!.setErrorFlag( flag );
  }
}

class MyCalcFunctionService extends CalcFunctionService {
  componentA?: MyFunctionA;
  componentB?: MyFunctionB;

  initWithComponent( componentA: MyFunctionA, componentB: MyFunctionB ){
    this.componentA = componentA;
    this.componentB = componentB;

    super.init();
  }
  init(){
    super.init();
  }

  setDispError( type: number ){
    if( type == global.calc.errorTypeDivideByZero ){
      this.componentA!.setDispStr( "Divide by zero" );
    } else if( type == global.calc.errorTypePositiveInfinity ){
      this.componentA!.setDispStr( "Infinity" );
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      this.componentA!.setDispStr( "-Infinity" );
    } else if( type == global.calc.errorTypeNotANumber ){
      this.componentA!.setDispStr( "NaN" );
    }
  }
  setDispResult( value: number ){
    this.componentA!.setDispStr( this.valueToString( value, 15 ) );
  }
  setDispEntry( entry: string ){
    this.componentA!.setDispStr( entry );
  }
  setDispMemory( value: number ){
    this.componentA!.setDispMemory( this.valueToString( value, 10 ) );
  }
  memoryRecalled( flag: boolean ){
    this.componentA!.setMrcButtonText( flag ? "MC" : "MR" );
  }
  errorChanged( flag: boolean ){
    this.componentB!.setErrorFlag( flag );
  }

  angleChanged( type: number ){
    if( type == global.calc.angleTypeRad ){
      this.componentA!.setDispAngle( "RAD" );
      this.componentB!.setAngleButtonText( "DEG" );
    } else if( type == global.calc.angleTypeDeg ){
      this.componentA!.setDispAngle( "DEG" );
      this.componentB!.setAngleButtonText( "GRAD" );
    } else if( type == global.calc.angleTypeGrad ){
      this.componentA!.setDispAngle( "GRAD" );
      this.componentB!.setAngleButtonText( "RAD" );
    }
  }
}

class App extends React.Component<{}, {
  // state
  mode: number;
}> {
  constructor(props: {}) {
    console.log("App constructor");
    super(props);

    // グローバルデータとサービス
    global.calc.init();
    global.calcNumberService   = new MyCalcNumberService();
    global.calcFunctionService = new MyCalcFunctionService();

    // 状態管理
    this.state = {
      mode: global.calc.mode
    };
    this.setMode = this.setMode.bind(this);

    window.onlanguagechange = (event) => {
      const isEnglish = global.calc.isEnglish();
      document.title = isEnglish ? "Calculator" : "電卓";
    };
  }

  // 状態変更用コールバック関数
  setMode(newMode: number) {
    if (newMode == global.calc.modeNumber) {
      global.calcNumberService.init();
    } else if (newMode == global.calc.modeFunction) {
      global.calcFunctionService.init();
    }
    this.setState({ mode: newMode });
  }

  render() {
    console.log("App render");
    const { mode } = this.state;
    return (
      <div className="App">
        <div style={{ display: (mode === global.calc.modeNumber) ? "block" : "none" }}>
          <MyNumber setMode={this.setMode} />
        </div>
        <div style={{ display: (mode === global.calc.modeFunction) ? "block" : "none" }}>
          <MyFunction setMode={this.setMode} />
        </div>
        <div style={{ display: (mode === global.calc.modeOption) ? "block" : "none" }}>
          <MyOption setMode={this.setMode} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("App componentDidMount");
  }

  componentWillUnmount() {
    console.log("App componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("App componentDidUpdate");
  }
}

export default App;
