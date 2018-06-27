import React, { Component } from 'react';
import ChatTrackingSubscription from './ChatTrackingSubscriptions';
import { Input } from "reactstrap";


class ChatConnection extends React.Component {
  constructor( props ) {
    super( props );
    // let access_token = localStorage.getItem( ACCESS_TOKEN_NAME );
    // let client = localStorage.getItem( CLIENT_NAME );
    this.state = {
      chat: {},
      message: ''
    };

    this.onSend = this.onSend.bind( this );
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
      this.setState( { message: '' } );
    }
  }

  render() {
    const { chat } = this.state;

    return (
      <div>
        <Input type="text"
               value={ this.state.message }
               className="fixed-bottom"
               onChange={ ( evt ) => this.setState( { message: evt.target.value } ) }
               onKeyPress={ this.onSend }
               placeholder="Send Chat"/>
      </div>
    );
  }
}

export default ChatConnection;
