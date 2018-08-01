import React, { Component } from 'react';
import {
  Card,
  Col, Container, ListGroup, Row
} from 'reactstrap';
import API from "../../../api";
import { Button } from "rmwc/Button/index";
import PostList from "../Lists/PostList";
import isLoggedIn from "../../../HOC/isLoggedIn";
import Context from "../../../contexts";

class UnwrappedCliqueComponent extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      subbed: false
    };
  }

  renderTitle = () => {
    return (
      <Card>
        <Container>
          <Row>
            <Col>
              <h1>#{ this.props.clique_name }</h1>
            </Col>
          </Row>
          <Row>
            {this.renderSubButton()}
            <Col>
              <Button>Create Post</Button>
            </Col>
          </Row>
        </Container>
      </Card>

    );
  }

  renderSubButton = () => {
    if(!this.state.subbed){
      return(
        <Col>
          <p onClick={ this.subscribe }><Button>Subscribe</Button></p>
        </Col>
      );
    }
    else{
      return(
        <Col>
          <p onClick={ this.unsubscribe }><Button>Unsubscribe</Button></p>
        </Col>
      );
    }
  }

  componentWillMount(){
    this.check_subscription();
  }

  check_subscription = () => {
    API.get( `subscribed_clique_relation/checksubscription/` + localStorage.getItem("username") + "/" + this.props.clique_name)
      .then(response=>{
        this.setState({subbed:response.data});
      });
  }

  subscribe = () => {
    console.log( localStorage.getItem( 'username' ) + " IS NOW SUBSCRIBED TO " + this.props.clique_name );
    API.post( `subscribed_clique_relation/`,
      {
        clique_name: this.props.clique_name,
        username: localStorage.getItem( 'username' )
      } )
      .then( res => {
        this.check_subscription();
      } )
      .catch( error => {
        console.log( error );
      } );
  }

  unsubscribe = () => {
    console.log( localStorage.getItem( 'username' ) + " IS NOW UNSUBSCRIBED FROM " + this.props.clique_name );
    API.post( `subscribed_clique_relation/unsubscribe`,
      {
        username: localStorage.getItem("username"),
        clique_name: this.props.clique_name,
      } )
      .then( res => {
        this.check_subscription();
      } )
      .catch( error => {
        console.log( error );
      } );
  }

  render() {
    return (
      <Col sm={ "12" }>
        <div className="animated fadeIn">
          { this.renderTitle() }
          <Context.Consumer>
            {({data}) => (
              <ListGroup>
                <PostList type="clique" items={data} params={this.props.clique_name}/>
              </ListGroup>
            )}
          </Context.Consumer>
        </div>
      </Col>
    );
  }
}

const CliqueComponent = isLoggedIn(UnwrappedCliqueComponent)

export default CliqueComponent;
