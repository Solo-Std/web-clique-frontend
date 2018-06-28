import React, {Component} from 'react';
import axios from "axios/index";
import { Col, ListGroupItem, Row } from "reactstrap";
import CliqueLink from "./Links/CliqueLink";
import PostLink from "./Links/PostLink";
import ProfileLink from "./Links/ProfileLink";

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
      response = await axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/` );
    else if(this.props.data === "profile")
      response = await axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/fetch_user_posts/` + this.props.param );
    else if(this.props.data === "clique")
      response = await axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/get_clique_post/` + this.props.param );

    let data = [];
    response.data.map( ( content, index ) => data[ index ] = content );
    this.setState( { items: data } );
  }

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(){
    if(this.props.data === "clique"){
      this.load();
    }
  }

  render() {
    let data = [];
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
}

export default PostList;
