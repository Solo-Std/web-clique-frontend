import React, { Component } from 'react';
import { Card, Input } from "reactstrap";
import ReconnectingWebSocket from 'reconnecting-websocket';

const WEBSOCKET_HOST = 'wss://websocket-clique.herokuapp.com/';

class ChatConnection extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      chat: {},
      messages: [],
      message: ''
    };

    this.inbox = new ReconnectingWebSocket(WEBSOCKET_HOST + "/receive");
    this.outbox = new ReconnectingWebSocket(WEBSOCKET_HOST + "/submit");

    this.inbox.onmessage = (message) =>{
      let data = JSON.parse(message.data);
      console.log(data);
      let _messages = this.state.messages;
      _messages.push(data);
      this.setState({messages:_messages});
    };

    this.inbox.onclose = () =>{
      console.log('inbox closed');
      this.inbox = new WebSocket(WEBSOCKET_HOST + "/receive");
    };

    this.outbox.onclose = () =>{
      console.log('outbox closed');
      this.outbox = new WebSocket(WEBSOCKET_HOST + "/submit");
    };

    this.onSend = this.onSend.bind( this );
    this.renderChat = this.renderChat.bind( this );
  }

  onSend( evt ) {
    if ( evt.charCode === 13 ){
      let data = {
        text:evt.target.value,
        user:localStorage.getItem("username")
      };
      this.outbox.send(JSON.stringify({text:data.text, user:data.user}));
      this.setState( { message: '' } );
    }
  }

  renderChat(){
    let _data = [];
    this.state.messages.forEach((msg,idx)=>{
      _data.push(<p key={idx}>{msg.user} : {msg.text}</p>);
    });
    return _data;
  }

  render() {
    return (
      <Card className="fixed-bottom">
        { this.renderChat() }
        <Input type="text"
               value={ this.state.message }
               onChange={ ( evt ) => this.setState( { message: evt.target.value } ) }
               onKeyPress={ this.onSend }
               placeholder="Send Chat"/>
      </Card>
    );
  }
}

export default ChatConnection;
