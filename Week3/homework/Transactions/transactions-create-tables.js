const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const createTables = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }

    const createAccountTable = `
      CREATE TABLE account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(10, 2)
      )
    `;

    const createAccountChangeTable = `
      CREATE TABLE account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date DATE,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
      )
    `;

    connection.query(createAccountTable, (err, result) => {
      if (err) {
        console.error("Error creating account table:", err);
      } else {
        console.log("Account table created");
      }
    });

    connection.query(createAccountChangeTable, (err, result) => {
      if (err) {
        console.error("Error creating account_changes table:", err);
      } else {
        console.log("Account_changes table created");
      }

      connection.end();
    });
  });
};

module.exports = createTables;
