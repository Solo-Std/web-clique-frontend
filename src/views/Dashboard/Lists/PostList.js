import React, {Component} from 'react';
import { Col, ListGroupItem, Row } from "reactstrap";
import CliqueLink from "../Links/CliqueLink";
import PostLink from "../Links/PostLink";
import ProfileLink from "../Links/ProfileLink";
import API from "../../../api";




class PostList extends Component{
  constructor(props){
    super(props);

    this.state = {
      items: []
    };

    this.load = this.load.bind(this);
  }

  async load(){
    let response;
    if(this.props.data === "all")
      response = await API.get( `post_master/` );
    else if(this.props.data === "profile")
      response = await API.get( `post_master/fetch_user_posts/` + this.props.param );
    else if(this.props.data === "clique")
      response = await API.get( `post_master/get_clique_post/` + localStorage.getItem('visiting_clique') );

    let data = [];
    response.data.map( ( content, index ) => data[ index ] = content );
    this.setState( { items: data } );
  }

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(){
    if(this.props.data === "clique" && this.props.param !== localStorage.getItem('visiting_clique')){
      this.load();
    }
  }

  render() {
    let data = [];
    if(this.state.items.length>0)
    {
      this.state.items.forEach( ( item, idx ) => {
        data.push(
          <ListGroupItem key={ idx }>
            <Col xs={ "12" }>
              <Row>
                <img src="https://picsum.photos/200" width="80" height="60" alt={ "cannot load" }/>
                <Col sm="10">
                  <PostLink onClick={ this.props.onPostClick }
                            value={ item }/>
                  <CliqueLink onClick={ this.props.onCliqueClick }
                              value={ item }/>
                  <ProfileLink onClick={ this.props.onProfileClick }
                               value={ item }/>
                </Col>
              </Row>
            </Col>
          </ListGroupItem>
        );
      } );
      return data;
    }

    else if(this.state.items.length ==0){
      data.push
      (

        <ListGroupItem>
          <Col xs={ "12" }>
            <Row>
              <Col sm="10">
                <p>
                  You have no posts yet :(</p>
              </Col>
            </Row>
          </Col>
        </ListGroupItem>
      )
      return data;
    }
  }
}

export default PostList;
