# matrix-whisper-bridge

This is a bridging script that links together Matrix with the Status messaging platform.

This project was created during TADHACK 2018, using https://github.com/noman-land/matrix-whisper-bridge created by Status as a starting point.

Be sure to set the roomId variable in the code to whatever matrix roomID you choose.

Instructions for running the bridge are as follows

### Development

1. Clone repository and enter project folder

    ```
    git clone https://github.com/noman-land/matrix-whisper-bridge.git
    cd matrix-whisper-bridge
    ```

2. Install dependencies

    ```
    npm install
    ```
    
3. [Install geth](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum)

4. Launch lightweight testnet with proper whisper settings for Status chat protocol

    ```
    geth --testnet --light --shh.pow=0.002
    ```
    
5. You need to add Status peers so you can join the network. 

    First connect to the running geth instance

    ```
    geth --testnet attach
    ```

    Then add the peers from this list: https://github.com/status-im/status-go/blob/develop/params/cluster.go
    
    ```
    var peers = ['enode://436cc6f674928fdc9a9f7990f2944002b685d1c37f025c1be425185b5b1f0900feaf1ccc2a6130268f9901be4a7d252f37302c8335a2c1a62736e9232691cc3a@174.138.105.243:30404','enode://5395aab7833f1ecb671b59bf0521cf20224fe8162fc3d2675de4ee4d5636a75ec32d13268fc184df8d1ddfa803943906882da62a4df42d4fccf6d17808156a87@206.189.243.57:30404','enode://7427dfe38bd4cf7c58bb96417806fab25782ec3e6046a8053370022cbaa281536e8d64ecd1b02e1f8f72768e295d06258ba43d88304db068e6f2417ae8bcb9a6@104.154.88.123:30404','enode://ebefab39b69bbbe64d8cd86be765b3be356d8c4b24660f65d493143a0c44f38c85a257300178f7845592a1b0332811542e9a58281c835babdd7535babb64efc1@35.202.99.224:30404','enode://a6a2a9b3a7cbb0a15da74301537ebba549c990e3325ae78e1272a19a3ace150d03c184b8ac86cc33f1f2f63691e467d49308f02d613277754c4dccd6773b95e8@206.189.108.68:30304','enode://207e53d9bf66be7441e3daba36f53bfbda0b6099dba9a865afc6260a2d253fb8a56a72a48598a4f7ba271792c2e4a8e1a43aaef7f34857f520c8c820f63b44c8@35.224.15.65:30304','enode://436cc6f674928fdc9a9f7990f2944002b685d1c37f025c1be425185b5b1f0900feaf1ccc2a6130268f9901be4a7d252f37302c8335a2c1a62736e9232691cc3a@174.138.105.243:30404','enode://5395aab7833f1ecb671b59bf0521cf20224fe8162fc3d2675de4ee4d5636a75ec32d13268fc184df8d1ddfa803943906882da62a4df42d4fccf6d17808156a87@206.189.243.57:30404','enode://7427dfe38bd4cf7c58bb96417806fab25782ec3e6046a8053370022cbaa281536e8d64ecd1b02e1f8f72768e295d06258ba43d88304db068e6f2417ae8bcb9a6@104.154.88.123:30404','enode://ebefab39b69bbbe64d8cd86be765b3be356d8c4b24660f65d493143a0c44f38c85a257300178f7845592a1b0332811542e9a58281c835babdd7535babb64efc1@35.202.99.224:30404','enode://a6a2a9b3a7cbb0a15da74301537ebba549c990e3325ae78e1272a19a3ace150d03c184b8ac86cc33f1f2f63691e467d49308f02d613277754c4dccd6773b95e8@206.189.108.68:30304','enode://207e53d9bf66be7441e3daba36f53bfbda0b6099dba9a865afc6260a2d253fb8a56a72a48598a4f7ba271792c2e4a8e1a43aaef7f34857f520c8c820f63b44c8@35.224.15.65:30304'];
    peers.forEach(function addPeer(peer) { admin.addPeer(peer); });
    exit
    ```
6. Run the app:

    ```
    npm start
    ```
