import React from 'react';
import PropTypes from 'prop-types';

export default class EditableLabel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: this.props.isEditing || false,
      text: this.props.text || ""
    };
  }

  handleFocus = event => {
    if (this.state.isEditing) {
      if (typeof this.props.onFocusOut === 'function') {
        this.props.onFocusOut(this.state.text);
      }
    }
    else {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.state.text);
      }
    }

    this.setState({
      isEditing: !this.state.isEditing
    });
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    if (this.state.isEditing) {
      return <div>
        <input type="text"
          className={this.props.inputClassName}
          value={this.state.text}
          onChange={this.handleChange}
          onBlur={this.handleFocus}
          style={{
            width: this.props.inputWidth,
            height: this.props.inputHeight,
            fontSize: this.props.inputFontSize,
            fontWeight: this.props.inputFontWeight,
            borderWidth: this.props.inputBorderWidth

          }}
          maxLength={this.props.inputMaxLength}
          placeholder={this.props.inputPlaceHolder}
          tabIndex={this.props.inputTabIndex}
          autoFocus/>
      </div>
    }

    return <div>
      <label className={this.props.labelClassName}
        onClick={this.handleFocus}
        style={{
          fontSize: this.props.labelFontSize,
          fontWeight: this.props.labelFontWeight
        }}>
        {this.state.text}
      </label>
    </div>;
  }
}

EditableLabel.propTypes = {
  text: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,

  labelClassName: PropTypes.string,
  labelFontSize: PropTypes.string,
  labelFontWeight: PropTypes.string,

  inputMaxLength: PropTypes.number,
  inputPlaceHolder: PropTypes.string,
  inputTabIndex: PropTypes.number,
  inputWidth: PropTypes.string,
  inputHeight: PropTypes.string,
  inputFontSize: PropTypes.string,
  inputFontWeight: PropTypes.string,
  inputClassName: PropTypes.string,
  inputBorderWidth: PropTypes.string,

  onFocus: PropTypes.func,
  onFocusOut: PropTypes.func
};
