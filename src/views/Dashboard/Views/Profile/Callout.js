import React, {Component} from 'react';
import { Col } from "reactstrap";

class Callout extends Component{
  constructor(props){
    super(props);

    this.generateCalloutClass = this.generateCalloutClass.bind(this);
  }

  generateCalloutClass(){
    switch ( this.props.color ){
      case "blue":
        return "callout callout-info";
      case "red":
        return "callout callout-danger";
      case "yellow":
        return "callout callout-warning";
      case "green":
        return "callout callout-success";
      default:
        return "callout callout-info";
    }
  }

  render(){
    return (
      <Col md="3" xs="6">
        <div className={this.generateCalloutClass()}>
          <small className="text-muted">{this.props.text}</small>
          <br/>
          <strong className="h4">{this.props.value}</strong>
        </div>
      </Col>
    );
  }
}

export default Callout;
