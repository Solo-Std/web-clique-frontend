import React, { Component } from 'react';
import {
  Col, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TimeAgo from 'react-timeago';
import './Feeds.css';
class Feeds extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      items: []
    };

    this.renderItem = this.renderItem.bind( this );
  }

  componentWillMount() {
    axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/` )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { items: data } );
      } );
  }

  renderItem() {
    let data = [];
    this.state.items.forEach((item,idx)=>{
      data.push(
        <ListGroupItem key={idx}>
          <Col xs={"12"}>
            <Row>
              { /*<Col sm="1">*/ }
              <img src="https://picsum.photos/200" width="80" height="60" alt={"cannot load"}/>
              { /*</Col>*/ }
              <Col sm="10">
                <span className="font-lg">
                  <a onClick={ () => this.props.onClick( item[ 'post_id' ] ) }>{ item[ 'post_title' ] }</a><br/>
                </span>
                <a className="text-black-50 font-xs"
                   onClick={() => this.props.onCliqueClick( item[ 'clique_name' ] )}>
                  <strong>#{ item[ 'clique_name' ] }</strong>
                </a><br/>
                <span className="font-xs">Posted by&nbsp;
                  <a className="text-info" onClick={() => {
                    this.props.onProfileClick(item['username']);
                    localStorage.setItem("visiting_profile",item['username']);
                  }}>
                    @{ item[ 'username' ] }</a>
                </span>
                <span className="font-xs">  <TimeAgo date={ item[ 'date_created' ] }/></span>
              </Col>
            </Row>
          </Col>
        </ListGroupItem>
      );
    })
    for ( let i = 0; i < this.state.items.length; i++ ) {

    }
    return data;
  }



  render() {
    return (
      <Col sm={ "12" }>
        <div className="animated fadeIn">
          <ListGroup>
            { this.renderItem() }
          </ListGroup>
        </div>
      </Col>
    );
  }
}

export default Feeds;
