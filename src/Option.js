import './Option.css';
import React from 'react';

class MyOption extends React.Component {
  constructor(props) {
    console.log("MyOption constructor");
    super(props);

    this.state = {
      italicFlag: global.calc.italicFlag,
      separatorType: global.calc.separatorType
    };

    this.handleChangeItalic = this.handleChangeItalic.bind(this);
    this.handleChangeSeparatorTypeNone = this.handleChangeSeparatorTypeNone.bind(this);
    this.handleChangeSeparatorTypeDash = this.handleChangeSeparatorTypeDash.bind(this);
    this.handleChangeSeparatorTypeComma = this.handleChangeSeparatorTypeComma.bind(this);
  }

  // イタリック
  handleChangeItalic(event) {
    console.log("handleChangeItalic");

    global.calc.italicFlag = !global.calc.italicFlag;
    global.calc.save(global.calc.saveItalicFlag);

    this.setState({ italicFlag: global.calc.italicFlag });
  }

  // 桁区切り
  handleChangeSeparatorTypeNone(event) {
    console.log("handleChangeSeparatorTypeNone");

    global.calc.separatorType = global.calc.separatorTypeNone;
    global.calc.save(global.calc.saveSeparatorType);

    this.setState({ separatorType: global.calc.separatorType });
  }
  handleChangeSeparatorTypeDash(event) {
    console.log("handleChangeSeparatorTypeDash");

    global.calc.separatorType = global.calc.separatorTypeDash;
    global.calc.save(global.calc.saveSeparatorType);

    this.setState({ separatorType: global.calc.separatorType });
  }
  handleChangeSeparatorTypeComma(event) {
    console.log("handleChangeSeparatorTypeComma");

    global.calc.separatorType = global.calc.separatorTypeComma;
    global.calc.save(global.calc.saveSeparatorType);

    this.setState({ separatorType: global.calc.separatorType });
  }

  render() {
    console.log("MyOption render");

    const isEnglish = global.calc.isEnglish();
    const strBack           = isEnglish ? "Return" : "戻る";
    const strItalic         = isEnglish ? "Display calculation results in italics" : "計算結果をイタリックに";
    const strSeparator      = isEnglish ? "Separator" : "桁区切り";
    const strSeparatorNone  = isEnglish ? "None" : "なし";
    const strSeparatorUpper = isEnglish ? "Upper" : "上部";
    const strSeparatorLower = isEnglish ? "Lower" : "下部";

    const { italicFlag, separatorType } = this.state;

    return (
      <div className="option_body">
        <div className="div_return" onClick={() => { this.props.setMode(global.calc.returnMode); }}>
          <span className="span_return">{strBack}</span>
        </div>
        <div className="div_option">
          <fieldset className="checkbox1">
            <label>
              <input type="checkbox" name="checkbox1" checked={italicFlag} onChange={this.handleChangeItalic} />
              <span className="span_option">&nbsp;{strItalic}</span>
            </label>
          </fieldset>
          <div className="div_space"></div>
          <div>
            <span className="span_option">{strSeparator}:</span>
          </div>
          <fieldset className="radio1">
            <label>
              <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeNone} onChange={this.handleChangeSeparatorTypeNone} />
              <span className="span_option">&nbsp;{strSeparatorNone}</span>
            </label>
          </fieldset>
          <fieldset className="radio1">
            <label>
              <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeDash} onChange={this.handleChangeSeparatorTypeDash} />
              <span className="span_option">&nbsp;{strSeparatorUpper}</span>
            </label>
          </fieldset>
          <fieldset className="radio1">
            <label>
              <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeComma} onChange={this.handleChangeSeparatorTypeComma} />
              <span className="span_option">&nbsp;{strSeparatorLower}</span>
            </label>
          </fieldset>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("MyOption componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyOption componentWillUnmount");
  }
}

export default MyOption;
