import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from "axios/index";

class FacebookLoginButton extends React.Component {
  responseFacebook(response) {
    const user = {
      username: response.id,
      password: response.id,
      email: response.email,
      token: response.accessToken
    };

    console.log(user);
    console.log(response);
    return axios.post(`http://localhost:8000/index.php/api/user_master/fb_login`, { user })
      .then(res => {
        if(res === "SUCCESS"){
          console.log("SUCCESS");
        }
        else if(res === "FAILED"){
          console.log("FAILED");
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (
      <FacebookLogin
        cssClass="btn-facebook"
        appId="469693686819110"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    )
  }
}

export default FacebookLoginButton;
