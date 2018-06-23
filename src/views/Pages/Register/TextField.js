import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import React from 'react';
import {validState} from './Register'

class TextField extends React.Component{
  renderInput(){
    return (
      <Input type={this.props.type}
             value={this.props.value}
             valid={(this.props.valid === validState.VALID)?true:null}
             invalid={(this.props.valid !== validState.NONE &&
                        this.props.valid !== validState.VALID)?true:null}
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
