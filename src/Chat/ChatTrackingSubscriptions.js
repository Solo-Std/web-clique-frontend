import ActionCable from 'actioncable';

const WEBSOCKET_HOST = 'ws://localhost:4000/cable';

export default function ChatTrackingSubscription(
  chatId,
  { onUpdate = () => {} } = {}
) {

  this.cable = ActionCable.createConsumer(WEBSOCKET_HOST);
  this.channel;
  this.chatId = chatId;
  this.onUpdate = onUpdate;

  this.send = (data) => {
    console.log("sending : '"+data+"'");

    this.channel.send({
      sent_by: "Owen", body: data
    });
  };

  this.subscribe = () => {
    this.channel = this.cable.subscriptions.create(
      { channel: 'RoomChannel', room_id: this.chatId },
      {
        connected: this.connected,
        disconnected: this.disconnected,
        received: this.received,
        rejected: this.rejected,
      }
    );
  };

  this.received = (data) => {
    console.log(`Received Data: ${data['body']}`);

    this.onUpdate(data);
  };

  this.connected = () => {
    console.log(`Tracking Chat`);
  };

  this.disconnected = () => {
    console.warn(`Chat for was disconnected.`);
  };

  this.rejected = () => {
    console.warn('I was rejected! :(');
  };
}
