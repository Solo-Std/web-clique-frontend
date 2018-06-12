import React from 'react';
import { GoogleLogin } from 'react-google-login';

class GoogleLoginButton extends React.Component{
  responseGoogle(response) {
    console.log(response);
  };

  render(){
    return (
        <GoogleLogin
          className="btn-google-plus"
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
    )
  }
}

export default GoogleLoginButton
