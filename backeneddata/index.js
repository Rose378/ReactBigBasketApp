const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const path = require('path')
const ip = require('ip');

//mongodbconnect
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//configure dotenv
dotenv.config({path:'./config/config.env'});

//cors config
app.use(cors())
//configure express to receive form data
// app.use(express.urlencoded({extended:true , parameterLimit:100000, limit: "100mb"}))

// app.use(express.json());

// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


const PORT = process.env.PORT || 9000;
console.log('server started on port:', PORT, ip.address());
app.get('/' , (request,response) => {
    response.send('Welcome to express serverr by ROSEMARY')
});

//connect to mongo db database
mongoose.connect(process.env.MONGODB_PROD_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('connected to DB sucessfully......')
}).catch((err) => {
    console.error(err);
    process.exit(1) //will stop node js process if unable o connect to DB
});

//configure thw router
app.use('/api' , require('./router/apirouter'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(PORT,host,()=> {
//     console.log(`server started at https://${host}:${PORT}`)
// })
app.listen(PORT,"0.0.0.0");
