import React, {Component} from 'react';
import {
  Button,
  Col, ListGroup, Row
} from 'reactstrap';
import API from "../../../../api";
import './Profile.css';
import {Image} from "react-bootstrap";
import Callout from "./Callout";
import PostList from "../../Lists/PostList";
import imgPlaceholder from '../../../../assets/img/profile-placeholder.jpg';
import isLoggedIn from "../../../../HOC/isLoggedIn";
import Context from "../../../../contexts";

const userState = {
  LOADING: 1,
  CURRENT: 2,
  FRIEND: 3,
  NON_FRIEND: 4
};

class UnwrappedProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: [],
      userState: userState.LOADING,
      image: imgPlaceholder
    };
  }

  unfriend = async () => {
    try {
      this.setState({userState: userState.LOADING});
      await API.post('user_friends_relation/unfriend', {
        visitor: localStorage.getItem("username"),
        visited: this.props.username
      });
      this.is_friend();
    }
    catch (e) {
      console.warn(e);
    }
  }

  add_friend = async () => {
    try {
      this.setState({userState: userState.LOADING});
      await API.post('user_friends_relation/add_friend', {
        visitor: localStorage.getItem("username"),
        visited: this.props.username
      });
      this.is_friend();
    } catch (e) {
      console.warn(e);
    }
  }

  is_friend = async () => {
    try {
      const response = await API.post('user_friends_relation/is_friend', {
        visitor: localStorage.getItem("username"),
        visited: this.props.username
      });
      if (response.data === "SUCCESS")
        this.setState({userState: userState.FRIEND});
      else if (response.data === "FAILED")
        this.setState({userState: userState.NON_FRIEND});
    }
    catch (e) {
      console.warn(e);
    }
  }

  componentWillMount() {
    this.loadImage();
    if (localStorage.getItem('username') === this.props.username)
      this.setState({userState: userState.CURRENT});
    else {
      this.is_friend();
    }
  }

  renderName = () => {
    if (localStorage.getItem('username') === this.props.username)
      return (<div className="container"><h1
        className="display-5">Welcome, {this.props.id}!</h1>
        <p className="lead">View and edit your personal info.</p></div>);
    else
      return (<div className="container"><h1 className="display-5">{this.props.username}'s
        Profile</h1></div>);
  }

  uploadFile = () => {
    this.setState({userState: userState.LOADING});
    let file = document.getElementById("img").files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      let imgData = reader.result.split(',');
      let base64 = imgData.pop();
      let imgExt = imgData.pop();
      API.post('user_master/upload_image', {
        file: base64,
        file_ext: imgExt,
        username: localStorage.getItem("username")
      }).then(res => {
        this.loadImage(res);
      });
    };
  }

  loadImage = (res) => {
    API.post('user_master/get_image', {
      username: this.props.id
    }).then(res => {
      if (res.data !== "FAILED") {
        this.setState({image: res.data['image_ext'] + ',' + res.data['image']});
        if (localStorage.getItem("username") === this.props.username) {
          this.setState({userState: userState.CURRENT})
        }
        else {
          this.is_friend();
        }
      }
      else this.setState({image: imgPlaceholder});
    });
  }

  showUploadButton = () => {
    switch (this.state.userState) {
      case userState.LOADING:
        return (
          <Button disabled active={false}>
            Loading...
          </Button>
        );
      case userState.CURRENT:
        return (
          <div className="mdc-form-field">
            <input className="mdc mdc-button" type="file" id="img" name="Upload"
                   onChange={this.uploadFile.bind(this)}/>
          </div>
        );
      case userState.FRIEND:
        return <Button onClick={this.unfriend}>Unfriend</Button>;
      case userState.NON_FRIEND:
        return <Button onClick={this.add_friend}>Add Friend</Button>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <Row>
            <Col xs="3" md="1">
              <Image alt={"cannot load"} src={this.state.image} circle responsive/>
            </Col>
            <Col xs="9" md="11">
              {this.renderName()}
              {this.showUploadButton()}
            </Col>
          </Row>

          <Row>
            <Callout text="Posts" value="9241" color="blue"/>
            <Callout text="Comments" value="22,643" color="red"/>
            <Callout text="Upvotes" value="78,623" color="yellow"/>
            <Callout text="Karma" value="49,123" color="green"/>
          </Row>
        </div>

        <br/>

        <div className="card-body">
          <h1 className="display-5">Recent Posts</h1>
          <Col sm={"12"}>
            <div className="animated fadeIn">
              <Context.Consumer>
                {({data}) => (
                  <ListGroup>
                    <PostList type="profile" items={data} params={this.props.username}/>
                  </ListGroup>
                )}
              </Context.Consumer>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
const ProfileComponent = isLoggedIn(UnwrappedProfileComponent)

export default ProfileComponent;
