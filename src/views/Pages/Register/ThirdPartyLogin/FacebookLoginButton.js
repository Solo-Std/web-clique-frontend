import axios from "axios/index";
import React from 'react';
import FacebookLogin from "react-facebook-login";


class FacebookLoginButton extends React.Component{
  constructor(props){
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    return axios.post(`http://localhost:8000/index.php/api/user_master/fb_login`, {
      username: response.id,
      password: response.id,
      facebook_id: response.id,
      email: response.email,
      token: response.accessToken
    })
      .then(res => {
        if(res.data === "SUCCESS"){

        }
        else if(res.data === "FAILED"){
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  render(){
    return (
      <FacebookLogin
        appId="469693686819110"
        autoLoad={true}
        fields="name,email,picture"
        cssClass="btn-facebook"
        icon="fa fa-facebook"
        callback={this.responseFacebook}
        textButton=" Login with Facebook"
      />
    );
  }
}

export default FacebookLoginButton;
