import React, { Component } from 'react';
import {inbox, outbox} from './WSAPI';
import { Card, Input } from "reactstrap";
import ReconnectingWebSocket from 'reconnecting-websocket';

const WEBSOCKET_HOST = 'wss://websocket-clique.herokuapp.com/';

class ChatConnection extends Component {
  constructor( props ) {
    super( props );
    // let access_token = localStorage.getItem( ACCESS_TOKEN_NAME );
    // let client = localStorage.getItem( CLIENT_NAME );
    this.state = {
      chat: {},
      messages: [],
      message: ''
    };

    this.inbox = new ReconnectingWebSocket(WEBSOCKET_HOST + "/receive");
    this.outbox = new ReconnectingWebSocket(WEBSOCKET_HOST + "/submit");

    this.inbox.onmessage = (message) =>{
      console.log(message.data);
      let data = message.data;
      let _messages = this.state.messages;
      _messages.push(data);
      this.setState({messages:_messages});
    };

    this.inbox.onclose = () =>{
      console.log('inbox closed');
      if(inbox.url!==null)this.inbox = new WebSocket(inbox.url);
    };

    this.outbox.onclose = () =>{
      console.log('outbox closed');
      if(outbox.url!==null)this.outbox = new WebSocket(outbox.url);
    };

    this.onSend = this.onSend.bind( this );
    this.renderChat = this.renderChat.bind( this );
  }

  onSend( evt ) {
    if ( evt.charCode === 13 ){
      this.outbox.send(evt.target.value);
      this.setState( { message: '' } );
    }
  }

  renderChat(){
    let _data = [];
    this.state.messages.forEach((msg,idx)=>{
      _data.push(<p key={idx}>{msg}</p>);
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
