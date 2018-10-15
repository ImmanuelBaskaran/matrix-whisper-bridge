
class MatrixUtils {

    async init() {
        var sdk = require("matrix-js-sdk");
        var client = sdk.createClient("http://matrix.org");



        return new Promise((resolve, reject) => {
            client.loginWithPassword("Your Username", "Your Password", (error,data)=>{
                resolve(sdk.createClient({
                    baseUrl: "http://matrix.org",
                    accessToken: data.access_token,
                    userId: data.user_id
                }));
            })
    });
    }


    send(Room, message) {
        sendMessage(Room, message, null, null);
    }



}
module.exports = MatrixUtils;
