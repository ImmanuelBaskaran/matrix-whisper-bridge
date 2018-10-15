const WhisperUtils = require('../utils/whisperUtils');
const MatrixUtils = require('../utils/matrixUtils');

class MatrixWhisperBridge {
  init() {
    return Promise.all([
      this.connectToWhisper(),
      this.connectToMatrix(),
    ]);
  }

  connectToWhisper() {
    this.whisperUtils = new WhisperUtils();
    return this.whisperUtils.init();
  }

  connectToMatrix() {
    this.matrixUtils = new MatrixUtils();
    return this.matrixUtils.init();
  }
}

module.exports = MatrixWhisperBridge;
