// Your Account SID and Auth Token from console.twilio.com
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken, {
  lazyLoading: false,
});

// function to send message to whatsapp 
const sendMessage = async (messages , senderId) => {
    try {
        await client.messages.create({
            to : senderId,
            body : messages,
            from : "whatsapp:+14155238886"
        })
    } catch (error) {
        console.log("Error at Send Message --> " , error)
    }
};

module.exports = {
    sendMessage
};