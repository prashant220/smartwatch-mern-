const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: "Apple Watch Series 10",
    description: "Advanced health sensors and faster chip.",
    image: "https://m.media-amazon.com/images/I/61mFd117IeL._AC_UF894,1000_QL80_.jpg",
    price: 399,
    brand: "Apple",
    stock: 10
  },
  {
    name: "Samsung Galaxy Watch 6",
    description: "Sleek design with health tracking and Wear OS.",
    image: "https://m.media-amazon.com/images/I/61mFd117IeL._AC_UF894,1000_QL80_.jpg",
    price: 329,
    brand: "Samsung",
    stock: 15
  },
  {
    name: "Fitbit Versa 4",
    description: "Fitness-focused smartwatch with long battery life.",
    image: "https://m.media-amazon.com/images/I/61mFd117IeL._AC_UF894,1000_QL80_.jpg",

    price: 199,
    brand: "Fitbit",
    stock: 20
  },
  {
    name: "Fitbit Versa 4",
    description: "Fitness-focused smartwatch with long battery life.",
    image: "https://m.media-amazon.com/images/I/61mFd117IeL._AC_UF894,1000_QL80_.jpg",

    price: 199,
    brand: "Fitbit",
    stock: 20
  },
  {
    name: "Fitbit Versa 4",
    description: "Fitness-focused smartwatch with long battery life.",
    image: "https://m.media-amazon.com/images/I/61mFd117IeL._AC_UF894,1000_QL80_.jpg",

    price: 199,
    brand: "Fitbit",
    stock: 20
  },
  {
    name: "Fitbit Versa 4",
    description: "Fitness-focused smartwatch with long battery life.",
    image: "https://m.media-amazon.com/images/I/61mFd117IeL._AC_UF894,1000_QL80_.jpg",

    price: 199,
    brand: "Fitbit",
    stock: 20
  }
  
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany(); 
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample products inserted!");
    mongoose.disconnect();
  })
  .catch(err => console.error(" Seed error:", err));
