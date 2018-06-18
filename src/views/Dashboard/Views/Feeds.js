import React, { Component } from 'react';
import {
  Col, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TimeAgo from 'react-timeago';

class Feeds extends Component{
  constructor(props) {
    super(props);

    this.state = {
      items:[]
    };

    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount(){
    axios.get(`http://localhost:8000/index.php/api/post_master/`)
      .then(response =>{
        let data = [];
        response.data.map((content,index) => data[index] = content);
        this.setState({items:data});
      })
  }

  renderItem(){
    console.log("renderItem()");
    let data = [];
    console.log(this.state.items);
    for(let i = 0; i<this.state.items.length; i++){
      data.push(
        <ListGroupItem tag="a" onClick={()=>this.props.onClick(this.state.items[i]['post_id'])}>
          <Row>
            {/*<Col sm="1">*/}
            <img src="https://picsum.photos/200" width="80" height="60"/>
            {/*</Col>*/}
            <Col sm="10">
              <span className="font-lg">{this.state.items[i]['post_title']}<br/></span>
              <a className="text-black-50 font-xs" href="#">
                <strong>#{this.state.items[i]['clique_name']}</strong>
              </a><br/>
              <span className="font-xs">Posted by <a href="#">@{this.state.items[i]['username']}</a></span>

              <span className="font-xs">  <TimeAgo date={this.state.items[i]['date_created']} /></span>
            </Col>
          </Row>
        </ListGroupItem>
      )
    }
    return data;
  }

  render() {
    console.log("render()");
    console.log(this.state.items);
    return (
      <Col sm={"12"}>
        <div className="animated fadeIn">
          <ListGroup>
            {this.renderItem()}
          </ListGroup>
        </div>
      </Col>
    );
  }
}

export default Feeds;
