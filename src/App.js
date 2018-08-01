import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import '@coreui/icons/css/coreui-icons.min.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import './scss/style.css'

import {DefaultLayout} from './containers'
import {Login, Page404, Page500, Register} from './views/Pages'
import API from "./api";
import PostContext from './contexts'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
  }

  componentWillMount(){
    this.load()
  }

  load = async () => {
    let response
    response = await API.get(`post_master/`)

    let _data = []
    response.data.map((content, index) => _data[index] = content)
    this.setState({data:_data})
  }

  render() {
    return (
      <PostContext.Provider value={{data:this.state.data}}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login}/>
            <Route exact path="/register" name="Register Page" component={Register}/>
            <Route exact path="/404" name="Page 404" component={Page404}/>
            <Route exact path="/500" name="Page 500" component={Page500}/>
            <Route path="/" name="Home" component={DefaultLayout}/>
          </Switch>
        </HashRouter>
      </PostContext.Provider>
    );
  }
}

export default App;
