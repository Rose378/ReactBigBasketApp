const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const path = require('path')
// const ip = require('ip');

//mongodbconnect
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// app.get('/', (req, res) => {
//     const ip = req.ip; // This retrieves the IP address of the client making the request
//     res.send(`Your IP address is: ${ip}`);
//     console.log(ip)
//   });
//configure dotenv
dotenv.config({path:'./config/config.env'});

//cors config
// app.use(cors({
//     origin: 'https://rose-bigbasket.netlify.app', // Update with your Netlify app URL
//     methods: ['GET', 'POST'], // Specify allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
//   }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://rose-bigbasket.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


const PORT = process.env.PORT || 9000;
// console.log('server started on port:', PORT, ip.address());
app.get('/api' , (request,response) => {
    response.send('Welcome to express serverr by ROSEMARY')
});

//connect to mongo db database
mongoose.connect(process.env.MONGODB_PROD_URL).then(()=>{
    console.log('connected to DB sucessfully......')
}).catch((err) => {
    console.error(err);
    process.exit(1) //will stop node js process if unable o connect to DB
});


   
//configure thw router
app.use('/' , require('./functions/apirouter'));

app.use(express.static(path.join(__dirname, '/Users/suresh/Desktop/RoseMaryReactApps/ClientsideBIGBASKETapp/ReactBigBasketApp/clientfrontend/build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'clientfrontend/build', 'index.html'));
// });

// app.listen(PORT,host,()=> {
//     console.log(`server started at https://${host}:${PORT}`)
// })
app.listen(PORT,"0.0.0.0");
