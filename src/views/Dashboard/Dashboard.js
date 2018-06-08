import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    return (

      <Col sm={"9"}>
        <div className="animated fadeIn">
          <Card>
            <CardBody>
              <Row>
                <img src="https://picsum.photos/200" width="50" height="50"/>
                <Col sm="9">
                  <CardTitle className="mb-0">[Bug] Kenapa doi ga peka?</CardTitle>
                  <Row>
                    <Col sm="1">
                      <div className="small text-muted">@heri</div>
                    </Col>

                    <Col sm="6">
                      <div className="small text-muted">an hour ago</div>
                    </Col>
                  </Row>
                  I don't have that subreddit in the subreddit menu of the old design but it appear on the new design and it's not possible to remove or unsubscribe from it.
                  I don't have that subreddit in the subreddit menu of the old design but it appear on the new design and it's not possible to remove or unsubscribe from it.
                  I don't have that subreddit in the subreddit menu of the old design but it appear on the new design and it's not possible to remove or unsubscribe from it.
                </Col>
              </Row>

              <Row>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Row>
                <img src="https://picsum.photos/100" width="50" height="50"/>
                <Col sm="9">

                  <Row>
                    <Col sm="4">
                      <div className="small text-muted">@adjiedjiewhy</div>
                    </Col>
                  </Row>
                  I don't have that subreddit in the subreddit menu of the old design but it appear on the new design and it's not possible to remove or unsubscribe from it.
                  I don't have that subreddit in the subreddit menu of the old design but it appear on the new design and it's not possible to remove or unsubscribe from it.
                  I don't have that subreddit in the subreddit menu of the old design but it appear on the new design and it's not possible to remove or unsubscribe from it.


                  <Row>
                    <Col sm={"1"}>
                      <Button>
                        Like
                      </Button>
                    </Col>
                    <Col sm={"1"}>
                      <Button>
                        Reply
                      </Button>
                    </Col>
                    <Col sm={"2"}>
                      <div className="small text-muted">2 hours ago</div>
                    </Col>
                  </Row>


                </Col>

              </Row>

              <Row>

              </Row>
            </CardBody>
          </Card>

        </div>
      </Col>









    );
  }
}

export default Dashboard;
