const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const { getById, increasePrice, updateSold } = require('./models/productModel');

const productModel = require('./models/productModel');

const PORT = 3002;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log(`${socket.id} se conectou`)
  socket.on('bid', async (obj) => {
    const updatedProduct = await increasePrice(obj._id);
    io.emit('increasePrice', updatedProduct.value);
  });
});




app.use(bodyParser.json());
app.use(cors());

app.get('/products', async (req, res) => {
  const products = await productModel.getAll();
  res.status(200).json(products);
});

http.listen(PORT, () => {console.log(`Ouvindo na porta ${PORT}`)});
