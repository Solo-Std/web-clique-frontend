import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import React from 'react';

class TextField extends React.Component{
  constructor(props){
    super(props);
  }

  renderInput(){
    return (
      <Input type={this.props.type}
             value={this.props.value}
             valid={(this.props.valid === 1)?true:null}
             invalid={(this.props.valid === 0)?true:null}
             onChange={this.props.onChange}
             onBlur={this.props.onBlur}
             placeholder={this.props.placeholder}/>
    );
  }

  renderIcon(){
    return(
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={this.props.icon}/>
        </InputGroupText>
      </InputGroupAddon>
    );
  }

  render(){
    return (
      <FormGroup>
        <InputGroup className="mb-3">
          {this.renderIcon()}
          {this.renderInput()}
        </InputGroup>
      </FormGroup>
    );
  }
}

export default TextField;
