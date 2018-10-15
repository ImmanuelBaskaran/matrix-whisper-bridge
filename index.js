//const transit = require('transit-js');

const MatrixWhisperBridge = require('./app/MatrixWhisperBridge');
const { decodeStatusPayload } = require('./utils/statusUtils');

const CHANNEL = 'noman-test';

const roomId = "Your Matrix room id here";

const bridge = new MatrixWhisperBridge();


bridge.init().then(([whisperUtils,MatrixUtils]) => {
  whisperUtils.getPublicKey().then(publicKey => {
      whisperUtils.send(CHANNEL, 'Bot is alive');
    whisperUtils.listen(CHANNEL).then(
      subscription => {
        subscription.on('data', (result) => {
          const [, [message]] = decodeStatusPayload(result.payload);
          const isMe = publicKey === result.sig;
          const name = isMe ? 'Bot' : result.sig.slice(0, 10);

          console.log('From:', name, 'at', result.timestamp);
          console.log('Topic:', result.topic);
          console.log('Message:', message, '\n');

          MatrixUtils.sendMessage(roomId, message);

          if (!isMe) {
            whisperUtils.send(CHANNEL, `${message} back`);
          }
        }

        );
        subscription.on('error', error => console.log('OH NO', error));
        subscription.on('end', () => console.log('ENDED'));

      },(error)=>{
            console.log(error);
        }
      ,
    );
  },(error)=>{
     console.log(error);
  });

    MatrixUtils.on("event", function(event) {
      if (event.event.type === "m.room.message") {
                if (event.sender.roomId === roomId) {
                  console.log(event.event.content.body);
                whisperUtils.send(CHANNEL, event.event.content.body);
            }
        }
    });
  MatrixUtils.startClient({initialSyncLimit: 10});
});
