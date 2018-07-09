import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {Launcher} from 'react-chat-window';

const WEBSOCKET_HOST = 'wss://websocket-clique.herokuapp.com';

class ChatConnection extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      messageList: []
    };

    this.inbox = new ReconnectingWebSocket(WEBSOCKET_HOST + "/receive");
    this.outbox = new ReconnectingWebSocket(WEBSOCKET_HOST + "/submit");

    this.inbox.onmessage = (message) =>{
      let _data = JSON.parse(message.data);
      let _text = _data['author'] + "\n" + _data.data.text;
      console.log(_data);
      this.setState({
        messageList: [...this.state.messageList, {
          author: _data['author']===localStorage.getItem("username")?"me":"them",
          type: 'text',
          data: { text:_text }
        }]
      });
    };

    this.inbox.onclose = () =>{
      this.inbox._connect();
    };

    this.inbox.onopen = () =>{

    };

    this.outbox.onclose = () =>{
      this.outbox._connect();
    };

    this.outbox.onopen = () => {

    };
  }

  _onMessageWasSent(message) {
    message['author'] = localStorage.getItem("username");
    this.outbox.send(JSON.stringify(message));
  }

  render() {
    return (
      <div className="fixed-bottom">
        <Launcher
          agentProfile={{
            teamName: 'Global Chat',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji={false}
        />
      </div>
    );
  }
}

export default ChatConnection;
