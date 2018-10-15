const net = require('net');
const Web3 = require('web3');

const {
  createStatusPayload,
  topicFromChannelName,
} = require('./statusUtils');


class WhisperUtils {
  init() {

    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    this.shh = this.web3.shh;

    return new Promise((resolve, reject) => {
      this.createWhisperIdentity().then(
        sig => {
          this.sig = sig;
          resolve(this);
        },
        error => reject(error),
      );
    });
  }

  createWhisperIdentity() {
    return this.shh.newKeyPair();
  }

  getPublicKey() {
    return this.shh.getPublicKey(this.sig);
  }

   listen(channel) {
    const topic = topicFromChannelName(channel);
          this.shh.generateSymKeyFromPassword(channel)
              .then(async symKeyID => {
                  const filter = await this.shh.newMessageFilter({
                      symKeyID,
                      poll_interval: 600,
                  })
                  var msg = await this.shh.getFilterMessages(filter)
                  console.log(msg)
              })



    return new Promise(resolve => {
      this.shh.generateSymKeyFromPassword(channel)
        .then(symKeyID => {
          const subscription = this.shh.subscribe('messages', {
            minPow: 0.5,
            symKeyID,
            topic: [topic],
          });
          resolve(subscription);
        }

        );
    });
  }

  send(channel, message) {
    const payload = createStatusPayload({ content: message });
    return this.shh.generateSymKeyFromPassword(channel)
      .then(symKeyID => {
          this.shh.post({
              "payload":payload,
              powTarget: 0.005,
              powTime: 3,
              sig: this.sig,
              symKeyID,
              topic: topicFromChannelName(channel),
              ttl: 100,
          },(error,data)=>{
              if(error){
                  console.log("Error " + error);
              }else{
                  console.log("Sending " + data);
              }

          })
      });
  }
}

module.exports = WhisperUtils;
