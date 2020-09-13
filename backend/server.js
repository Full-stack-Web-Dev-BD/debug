const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
// proxy error solved here 
const cors=require('cors')
const config=require('./config');
const userRoute=require('./routes/userRoute');
const productRoute=require('./routes/productRoute');
const orderRoute=require('./routes/orderRoute');
const uploadRoute=require('./routes/uploadRoute');

const app = express();

app.use(cors())


app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => {
  
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true},err=>{
  if(err){
    return console.log('Database connection error')
    console.log(err)
  }else{
    console.log("database connected")
  }
})

  console.log('Server started at http://localhost:5000');
});

