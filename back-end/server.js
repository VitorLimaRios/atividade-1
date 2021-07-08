const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');

const productModel = require('./models/productModel');

const PORT = 3002;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/products', async (req, res) => {
  const products = await productModel.getAll();
  res.status(200).json(products);
});

http.listen(PORT);
