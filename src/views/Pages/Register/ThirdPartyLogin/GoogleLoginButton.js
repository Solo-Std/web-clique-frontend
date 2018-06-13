import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from "axios/index";

class GoogleLoginButton extends React.Component{
  responseGoogle(response) {
    const user = {
      username: response.googleId,
      password: response.googleId,
      email: response.profileObj.email,
      token: response.accessToken
    };

    console.log(user);
    console.log(response);
    return axios.post(`http://localhost:8000/index.php/api/user_master/gp_login`, { user })
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
  };

  render(){
    return (
        <GoogleLogin
          className="btn-google-plus"
          clientId="709282008481-2140ljc3dd865ld0rp818lklnh381di8.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
    )
  }
}

export default GoogleLoginButton
