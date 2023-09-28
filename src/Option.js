import './Option.css';
import React from 'react';

class MyOption extends React.Component {
  constructor(props) {
    console.log("MyOption constructor");
    super(props);

    this.state = {
      italicFlag: global.calc.italicFlag,
      separatorType: global.calc.separatorType,
      imageFlag: global.app.imageFlag,
      imageUrl: global.app.imageUrl,
      imageX: global.app.imageX,
      imageY: global.app.imageY
    };

    this.back = this.back.bind(this);
    this.handleChangeItalic = this.handleChangeItalic.bind(this);
    this.handleChangeSeparatorTypeNone = this.handleChangeSeparatorTypeNone.bind(this);
    this.handleChangeSeparatorTypeDash = this.handleChangeSeparatorTypeDash.bind(this);
    this.handleChangeSeparatorTypeComma = this.handleChangeSeparatorTypeComma.bind(this);
    this.handleChangeImageUrl = this.handleChangeImageUrl.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.handleChangeImageX = this.handleChangeImageX.bind(this);
    this.handleChangeImageY = this.handleChangeImageY.bind(this);
  }

  // 戻る
  back() {
    console.log("back");

    global.app.save();

    this.props.setMode(global.calc.returnMode);
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

  // 画像URL
  handleChangeImageUrl(event) {
    global.app.imageFlag = false;
    global.app.imageUrl = event.target.value;
    global.app.reload();

    this.setState({
      imageFlag: global.app.imageFlag,
      imageUrl: global.app.imageUrl,
      imageX: global.app.imageX,
      imageY: global.app.imageY
    });
  }

  // 画像を読み込む
  loadImage() {
    console.log("loadImage");

    global.app.imageFlag = true;

    this.setState({ imageFlag: global.app.imageFlag });
  }

  // 画像を設定解除
  removeImage() {
    console.log("removeImage");

    global.app.imageFlag = false;

    this.setState({ imageFlag: global.app.imageFlag });
  }

  // 水平方向の配置
  handleChangeImageX(event) {
    global.app.imageX = event.target.value;
    console.log("handleChangeImageX " + global.app.imageX);

    this.setState({ imageX: global.app.imageX });
  }

  // 垂直方向の配置
  handleChangeImageY(event) {
    global.app.imageY = event.target.value;
    console.log("handleChangeImageY " + global.app.imageY);

    this.setState({ imageY: global.app.imageY });
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
    const strImageUrl       = isEnglish ? "Image URL" : "画像URL";
    const strLoadImage      = isEnglish ? "Load image" : "画像を読み込む";
    const strRemoveImage    = isEnglish ? "Remove image" : "画像を設定解除";
    const strImageX         = isEnglish ? "Horizontal alignment" : "水平方向の配置";
    const strImageY         = isEnglish ? "Vertical alignment" : "垂直方向の配置";

    const { italicFlag, separatorType, imageFlag, imageUrl, imageX, imageY } = this.state;

    const backgroundImage = imageFlag ? "url(" + imageUrl + ")" : "";
    const backgroundPosition = "" + imageX + "% " + imageY + "%";
    const shadowRB = imageFlag ? " shadow_rb" : "";

    return (
      <div className="option_body" style={{
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: backgroundPosition
      }}>
        <div className="div_return" onClick={this.back}>
          <span className="span_return">{strBack}</span>
        </div>
        <div className="div_option">
          <fieldset className="checkbox1">
            <label>
              <input type="checkbox" name="checkbox1" checked={italicFlag} onChange={this.handleChangeItalic} />
              <span className={"span_option" + shadowRB}>&nbsp;{strItalic}</span>
            </label>
          </fieldset>
          <div className="div_space"></div>
          <div>
            <span className={"span_option" + shadowRB}>{strSeparator}:</span>
          </div>
          <fieldset className="radio1">
            <label>
              <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeNone} onChange={this.handleChangeSeparatorTypeNone} />
              <span className={"span_option" + shadowRB}>&nbsp;{strSeparatorNone}</span>
            </label>
          </fieldset>
          <fieldset className="radio1">
            <label>
              <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeDash} onChange={this.handleChangeSeparatorTypeDash} />
              <span className={"span_option" + shadowRB}>&nbsp;{strSeparatorUpper}</span>
            </label>
          </fieldset>
          <fieldset className="radio1">
            <label>
              <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeComma} onChange={this.handleChangeSeparatorTypeComma} />
              <span className={"span_option" + shadowRB}>&nbsp;{strSeparatorLower}</span>
            </label>
          </fieldset>
          <div className="div_space"></div>
          <div>
            <span className={"span_option" + shadowRB}>{strImageUrl}:</span>
          </div>
          <input className="input1" type="text" value={imageUrl} onChange={this.handleChangeImageUrl} />
          <div className="div_space"></div>
          <div className="div_row">
            <button onClick={this.loadImage}>{strLoadImage}</button>
            <div className="div_space_h"></div>
            <button onClick={this.removeImage}>{strRemoveImage}</button>
          </div>
          <div className="div_space"></div>
          <div>
            <span className={"span_option" + shadowRB}>{strImageX}:</span>
          </div>
          <input className="input2" type="range" min="0" max="100" step="1" value={imageX} onChange={this.handleChangeImageX} />
          <div>
            <span className={"span_option" + shadowRB}>{strImageY}:</span>
          </div>
          <input className="input2" type="range" min="0" max="100" step="1" value={imageY} onChange={this.handleChangeImageY} />
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

  componentDidUpdate() {
    console.log("MyOption componentDidUpdate");
  }
}

export default MyOption;
