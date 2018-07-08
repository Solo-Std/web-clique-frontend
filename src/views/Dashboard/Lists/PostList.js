import React, {Component} from 'react';
import { Col, ListGroupItem, Row } from "reactstrap";
import CliqueLink from "../Links/CliqueLink";
import PostLink from "../Links/PostLink";
import ProfileLink from "../Links/ProfileLink";
import API from "../../../api";
import Skeleton from 'react-skeleton-loader';


class PostList extends Component{
  constructor(props){
    super(props);

    this.state = {
      items: [],
      loading: true
    };

    this.load = this.load.bind(this);
  }

  async load(){
    let response;
    this.setState({loading:true});
    if(this.props.data === "all")
      response = await API.get( `post_master/` );
    else if(this.props.data === "profile")
      response = await API.get( `post_master/fetch_user_posts/` + this.props.param );
    else if(this.props.data === "clique")
      response = await API.get( `post_master/get_clique_post/` + this.props.param );

    let data = [];
    response.data.map( ( content, index ) => data[ index ] = content );
    this.setState( { items: data } );


    this.setState({loading:false});
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

    if(this.state.loading == true)
    {
      this.state.items.forEach( ( item, idx ) => {
        data.push(
          <ListGroupItem key={ idx }>
            <Col xs={ "12" }>
              <Row>
                <Skeleton width="80px" height="60px"/>
                {/*<img src="https://picsum.photos/200" width="80" height="60" alt={ "cannot load" }/>*/}
                <Col sm="10">
                  <PostLink onClick={ this.props.onPostClick }
                            value={ item }
                            loading={this.state.loading}/>
                  <CliqueLink onClick={ this.props.onCliqueClick }
                              value={ item }
                              loading={this.state.loading}/>
                  <ProfileLink onClick={ this.props.onProfileClick }
                               value={ item }
                               loading={this.state.loading}/>
                </Col>
              </Row>
            </Col>
          </ListGroupItem>
        );
      } );
      return data;
    }

    else if(this.state.items.length>0)
    {
      this.state.items.forEach( ( item, idx ) => {
        data.push(
          <ListGroupItem key={ idx }>
            <Col xs={ "12" }>
              <Row>
                <img src="https://picsum.photos/200" width="80" height="60" alt={ "cannot load" }/>
                <Col sm="10">
                  <PostLink onClick={ this.props.onPostClick }
                            value={ item }
                            loading={this.state.loading}/>
                  <CliqueLink onClick={ this.props.onCliqueClick }
                              value={ item }
                              loading={this.state.loading}/>
                  <ProfileLink onClick={ this.props.onProfileClick }
                               value={ item }
                               loading={this.state.loading}/>
                </Col>
              </Row>
            </Col>
          </ListGroupItem>
        );
      } );
      return data;
    }

    else if(this.state.items.length ==0 && this.state.loading == false){
      data.push
      (

        <ListGroupItem>
          <Col xs={ "12" }>
            <Row>
              <Col sm="10">
                <p>
                  There are no posts here</p>
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
