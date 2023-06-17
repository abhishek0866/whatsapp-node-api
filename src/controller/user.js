const WA = require("../helper/helper");
const { createUser, getUserById } = require("../models/users/userOrder");
const users = {};

const foodOrder = async (req, res, next) => {
  console.log(req.body);
  let message = req.body.Body.toLowerCase();
  let senderID = req.body.From;

  console.log(message);
  console.log(senderID);

  let responseMessage = '';

  if (message === 'hello') {
    responseMessage = `👋 Hi there! Are you looking to order some delicious food?`;
    responseMessage += `\n\nPlease select an option by replying with yes or no:\n`;
    responseMessage += `1. 🍽️ Yes, I want to eat.\n`;
    responseMessage += `2. ❌ No, thank you.`;
  } else if (message === 'yes') {
    responseMessage = `Great! What meal would you like to order? Reply with a number:\n`;
    responseMessage += `1. 🌅 breakfast\n`;
    responseMessage += `2. 🌞 lunch\n`;
    responseMessage += `3. 🌙 dinner`;
  } else if (message === 'no') {
    responseMessage = `No problem! We'll be here if you change your mind. 😊`;
  } else if (message === '1') {
    users[senderID] = { mealType: 'breakfast' };
    responseMessage = `Awesome! Here are some breakfast options for you:\n`;
    responseMessage += `A. Fresh Omelette\n`;
    responseMessage += `B. Bread\n`;
    responseMessage += `C. Fruit Salad\n`;
  } else if (message === '2') {
    users[senderID] = { mealType: 'lunch' };
    responseMessage = `Great choice! Here are some lunch options for you:\n`;
    responseMessage += `A. Rajma Chawal\n`;
    responseMessage += `B. Pulses and Rice\n`;
    responseMessage += `C. Hyderabadi Biryani\n`;
  } else if (message === '3') {
    users[senderID] = { mealType: 'dinner' };
    responseMessage = `Yummy! Here are some dinner options for you:\n`;
    responseMessage += `A. Khichdi\n`;
    responseMessage += `B. Roti\n`;
    responseMessage += `C. Pizza\n`;
  } else if ((message === 'a' || message === 'b' || message === 'c') && users[senderID]) {
    let selectedFoodItem = '';
    if (users[senderID].mealType === 'breakfast') {
      if (message === 'a') {
        selectedFoodItem = 'Fresh Omelette';
      } else if (message === 'b') {
        selectedFoodItem = 'Bread';
      } else if (message === 'c') {
        selectedFoodItem = 'Fruit Salad';
      }
    } else if (users[senderID].mealType === 'lunch') {
      if (message === 'a') {
        selectedFoodItem = 'Rajma Chawal';
      } else if (message === 'b') {
        selectedFoodItem = 'Pulses and Rice';
      } else if (message === 'c') {
        selectedFoodItem = 'Hyderabadi Biryani';
      }
    } else if (users[senderID].mealType === 'dinner') {
      if (message === 'a') {
        selectedFoodItem = 'Khichdi';
      } else if (message === 'b') {
        selectedFoodItem = 'Roti';
      } else if (message === 'c') {
        selectedFoodItem = 'Pizza';
      }
    }

    // Store the food item selection
    users[senderID].foodItem = selectedFoodItem;
    responseMessage = `You selected ${selectedFoodItem}. Please provide your username in the format 'Username: your_username'.`;
  } else if (message.includes('username') && users[senderID]) {
    // Extract the username from the message
    const username = message.split(':')[1].trim();
    // Store the username
    users[senderID].username = username;
    responseMessage = `Great! Please provide your phone number in the format 'Phone number : your_phone_Number.`;
  } else if (message.includes('phone number') && users[senderID] && users[senderID].username) {
    // Extract the phone number from the message
    const phoneNumber = message.split(':')[1].trim();
    // Store the phone number
    users[senderID].phoneNumber = phoneNumber;
    responseMessage = `Perfect! Now, please provide your address (street, area, city) in the format address : your_adress.`;
  } else if (message.includes('address') && users[senderID] && users[senderID].username && users[senderID].phoneNumber) {
    // Extract the address from the message
    const address = message.split(':')[1].trim();
    // Store the address
    users[senderID].address = address;

    // Create user in the database
    const userData = {
      username: users[senderID].username,
      phone_number: users[senderID].phoneNumber,
      address: users[senderID].address,
      food_item: users[senderID].foodItem
    };

    const createdUser = await createUser(userData);
    console.log("User created:", createdUser);

    // Send a thank you message to the user
    const thankYouMessage = `🙏 Thank you for using our services! Your order has been placed.`;
    await WA.sendMessage(thankYouMessage, senderID);

    // Clear user details after order placement
    delete users[senderID];
  } else {
    responseMessage = `Sorry, I didn't understand that. Please reply with the appropriate option.`;
  }

  // function to send message back to WhatsApp
  if (responseMessage) {
    await WA.sendMessage(responseMessage, senderID);
  }

  res.status(200).end();
};

module.exports = {
  foodOrder
};
