import React, {Component} from 'react'
import {Col, ListGroup} from 'reactstrap'
import './Feeds.css'
import PostList from "../Lists/PostList"
import isLoggedIn from "../../../HOC/isLoggedIn"
import PostContext from '../../../contexts'

class UnwrappedFeeds extends Component {
  render = () => {
    return (
      <Col sm={"12"}>
        <div className="animated fadeIn">
          <PostContext.Consumer>
            {({data}) => (
              <ListGroup>
                <PostList type="all" items={data}/>
              </ListGroup>
            )}
          </PostContext.Consumer>
        </div>
      </Col>
    )
  }
}

const Feeds = isLoggedIn(UnwrappedFeeds)

export default Feeds
