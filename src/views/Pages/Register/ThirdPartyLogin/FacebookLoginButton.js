import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookLoginButton extends React.Component {
  responseFacebook(response) {
    console.log(response)
  }

  render() {
    return (
      <FacebookLogin
        cssClass="btn-facebook"
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    )
  }
}

export default FacebookLoginButton;
