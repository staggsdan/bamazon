var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    readProducts();
  });
  
var bamazonInventory = "";  
function readProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(" * * * Welcome to Bamazon * * * ");
      for (let i = 0; i < res.length; i++) {
          bamazonInventory = (`Available for purchase: ${res[i].product_name}, $${res[i].price}
          Department: ${res[i].department_name}, Item ID: ${res[i].item_id}
          `);
          
          console.log(bamazonInventory)
      }
    customerPrompt();
    });
  }

// validation layout cribbed from google -- can't remember doing this as a class
var valid = (v) => {
    if (Number.isInteger(v) && v > 0) {
        return true
    } else {
        return "Please enter your input as a number."
    }
}



function customerPrompt() {
    
    inquirer
    .prompt([
    {
        type: "input",
        name: "inventoryChoice",
        message: "What would you like to purchase?",
        validate: valid,
        filter: Number
    },
    {
        type: "input",
        name: "purchaseQuantity",
        message: "How many would you like to purchase?",
        validate: valid,
        filter: Number
    }
    ])
    .then(function(answer){
        var customerChoice = answer.inventoryChoice;
        var customerQuantity = answer.purchaseQuantity;

        inventoryCheck(customerChoice, customerQuantity)
        
        })
}

function inventoryCheck(id_num, quantity){
    connection.query(`SELECT * FROM products WHERE item_id = ${id_num}`, function(err, res) {
        if (err) throw err;
        if (quantity > res[0].stock_quantity){
            console.log("We're sorry but we can't accomodate that quantity");
            connection.end();
          } else {
            console.log("we can accomodate that order");
            var newTotal = (res[0].stock_quantity - quantity)
            decreaseInventory(id_num, newTotal);
          }
    })
}

function decreaseInventory(id_num, newTotal){
    connection.query(`UPDATE products SET stock_quantity = ${newTotal} WHERE item_id = ${id_num} LIMIT 1`, function(err, res) {
        if (err) throw err;

    console.log("We're shipping it out, have a great day")
    console.log("this is where I'll figure out how to log an inventory check to display the change to the sql database for the user to observe")
    connection.end();
}


