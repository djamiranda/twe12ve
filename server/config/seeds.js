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
        "2015 Chicago - Style: 555088 101",
      image: "Jordan_1.jpg",
      category: categories[0]._id,
      price: 160.00,
      quantity: 1500.00,
    },
    {
      name: "Jordan 2",
      description:
        "2022 Chicago - Style: DX2454 106",
      image: "Jordan_2.jpg",
      category: categories[1]._id,
      price: 200.00,
      quantity: 210.00,
    },
    {
      name: "Jordan 3",
      category: categories[2]._id,
      description:
        "2018 Black Cement 3 -  Style: 854262 001",
      image: "Jordan_3.jpg",
      price: 200.00,
      quantity: 565.00,
    },
    {
      name: "Jordan 4",
      category: categories[3]._id,
      description:
        "2019 BRED 4 - Style: 308497 060",
      image: "Jordan_4.jpg",
      price: 225.00,
      quantity: 560.00,
    },
    {
      name: "Jordan 5",
      category: categories[4]._id,
      description:
        "2020 Fire Red Metallic Silver - Style: DA1911 102",
      image: "Jordan_5.jpg",
      price: 200.00,
      quantity: 242.00,
    },
    {
      name: "Jordan 6",
      category: categories[5]._id,
      description:
        "2019 Travis Scott Medium Olive - Style: CN1084 200",
      image: "Jordan_6.jpg",
      price: 225.00,
      quantity: 439.00,
    },
    {
      name: "Jordan 7",
      category: categories[6]._id,
      description:
        "2022 Trophy Room - Style: DM1195 474",
      image: "Jordan_7.jpg",
      price: 225.00,
      quantity: 230.00,
    },
    {
      name: "Jordan 8",
      category: categories[7]._id,
      description:
        "2014 Doernbecher - Style: 729893 480",
      image: "Jordan_8.jpg",
      price: 190.00,
      quantity: 10000.00,
    },
    {
      name: "Jordan 9",
      category: categories[8]._id,
      description:
        "2010 Premio Bin 23 - Style: 410917 101",
      image: "Jordan_9.jpg",
      price: 175.00,
      quantity: 1287.00,
    },
    {
      name: "Jordan 10",
      category: categories[9]._id,
      description:
        "2013 Steel - Style: 310805 103",
      image: "Jordan_10.jpg",
      price: 170.00,
      quantity: 744.00,
    },
    {
      name: "Jordan 11",
      category: categories[10]._id,
      description:
        "2018 Concord - Style: 378037 100",
      image: "Jordan_11.jpg",
      price: 220.00,
      quantity: 419.00,
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
