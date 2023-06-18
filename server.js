require("dotenv").config() // Load Environment
require("./src/libraries/databases/database");

const express = require('express');
const webApp = express();
const bodyParser = require('body-parser');
const { foodOrder } = require("./src/controller/user");

webApp.use(helmet())

// webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));

webApp.post('/whatsapp' , foodOrder)

webApp.use(bodyParser.json());

const PORT = process.env.PORT;

webApp.get('/', (req, res) => {
    res.send("Hello world");
});

webApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

