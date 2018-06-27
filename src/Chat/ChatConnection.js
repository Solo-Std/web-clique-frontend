import React, { Component } from 'react';
import ChatTrackingSubscription from './ChatTrackingSubscriptions';
import { Card, Input } from "reactstrap";


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

    this.onSend = this.onSend.bind( this );
    this.renderChat = this.renderChat.bind( this );
  }

  componentWillMount() {
    const { chatId } = this.props;

    this.chatChannel = new ChatTrackingSubscription( {
      chatId,
      onUpdate: this.onChatUpdate,
    } );

    this.chatChannel.subscribe();
  }

  onChatUpdate( data ) {
    console.log("onChatUpdate");
    const { chat } = data;
    this.setState( () => ( { chat } ) );
  }

  onSend( evt ) {
    if ( evt.charCode === 13 ){
      this.chatChannel.send(evt.target.value);
      let _messages = this.state.messages;
      _messages.push(evt.target.value);
      this.setState({messages:_messages})
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
