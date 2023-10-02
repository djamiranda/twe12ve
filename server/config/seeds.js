const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Jordan 1" },
    { name: "Jordan 2" },
    { name: "Jordan 3" },
    { name: "Jordan 4" },
    { name: "Jordan 5" },
    { name: "Jordan 6" },
    { name: "Jordan 7" },
    { name: "Jordan 8" },
    { name: "Jordan 9" },
    { name: "Jordan 10" },
    { name: "Jordan 11" },
    // { name: "Jordan 12" },
  ]);

  console.log("Models loaded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Jordan 1",
      description:
        "Chicago",
      image: "Jordan_1.jpg",
      category: categories[0]._id,
      price: 180.00,
      quantity: 1500.00,
    },
    {
      name: "Jordan 2",
      description:
        "Jordan 2",
      image: "Jordan_2.jpg",
      category: categories[1]._id,
      price: 200.00,
      quantity: 2,
    },
    {
      name: "Jordan 3",
      category: categories[2]._id,
      description:
        "Jordan 3",
      image: "Jordan_3.jpg",
      price: 200.00,
      quantity: 3,
    },
    {
      name: "Jordan 4",
      category: categories[3]._id,
      description:
        "Jordan 4",
      image: "Jordan_4.jpg",
      price: 225.00,
      quantity: 4,
    },
    {
      name: "Jordan 5",
      category: categories[4]._id,
      description:
        "Jordan 5",
      image: "Jordan_5.jpg",
      price: 200.00,
      quantity: 5,
    },
    {
      name: "Jordan 6",
      category: categories[5]._id,
      description:
        "Jordan 6",
      image: "Jordan_6.jpg",
      price: 225.00,
      quantity: 6,
    },
    {
      name: "Jordan 7",
      category: categories[6]._id,
      description:
        "Jordan 7",
      image: "Jordan_7.jpg",
      price: 200.00,
      quantity: 7,
    },
    {
      name: "Jordan 8",
      category: categories[7]._id,
      description:
        "Jordan 8",
      image: "Jordan_8.jpg",
      price: 225.00,
      quantity: 8,
    },
    {
      name: "Jordan 9",
      category: categories[8]._id,
      description:
        "Jordan 9",
      image: "Jordan_9.jpg",
      price: 190.00,
      quantity: 9,
    },
    {
      name: "Jordan 10",
      category: categories[9]._id,
      description:
        "Jordan 10",
      image: "Jordan_10.jpg",
      price: 190.00,
      quantity: 10,
    },
    {
      name: "Jordan 11",
      category: categories[10]._id,
      description:
        "Jordan 11",
      image: "Jordan_11.jpg",
      price: 235.00,
      quantity: 11,
    },
    // {
    //   name: "Jordan 12",
    //   category: categories[11]._id,
    //   description:
    //     "Jordan 12",
    //   image: "Jordan_12.jpg",
    //   price: 200.00,
    //   quantity: 12,
    // },
  ]);

  console.log("Kicks loaded");

  await User.deleteMany();

  await User.create({
    firstName: "Michael",
    lastName: "Jordan",
    email: "michael@jordan.com",
    password: "password",
    orders: [
      {
        products: [products[0]._id, products[2]._id, products[4]._id],
      },
    ],
  });

  await User.create({
    firstName: "Daniel",
    lastName: "Miranda",
    email: "daniel@jordan.com",
    password: "password",
  });

  console.log("Players loaded");

  process.exit();
});
