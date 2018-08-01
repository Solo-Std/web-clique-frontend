import React, {Component} from 'react'
import API from "../api"
import {Redirect} from "react-router-dom"

const isLoggedOut = (WrappedComponent) => {
  return class HOC extends Component {
    constructor(props) {
      super(props)
      this.state = {
        valid_session: true
      }
    }

    componentWillMount() {
      this.check()
    }

    check = () => {
      if (localStorage.getItem("session_token") === null ||
        localStorage.getItem("username") === null) {
        this.setState({valid_session: false});
      }
      else return API.post(`user_master/check_session`,
        {
          session_token: localStorage.getItem("session_token"),
          username: localStorage.getItem("username")
        })
        .then(res => {
          if (res.data === "SUCCESS")
            this.setState({valid_session: true});
          else
            this.setState({valid_session: false});
        })
        .catch(error => {
          console.log(error);
        });
    }

    logout = () => {
      localStorage.removeItem('session_token')
      this.setState({valid_session: false})
    }

    render() {
      return (
        <div>
          {this.state.valid_session? <Redirect to='/feeds'/>:null}
          <WrappedComponent
            logout={this.logout}
            check={this.check}
            {...this.props}
          />
        </div>
      );
    }
  }
}

export default isLoggedOut
