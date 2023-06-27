const createTables = require("./transactions-create-tables");
const insertSampleData = require("./transactions-insert-values");
const transferAmount = require("./transaction");

createTables();
insertSampleData();
transferAmount(101, 102, 1000);
