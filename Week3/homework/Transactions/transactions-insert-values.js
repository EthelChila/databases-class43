const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const insertSampleData = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }

    const insertAccountTable = `
      INSERT INTO account (account_number, balance)
      VALUES
        (101, 5000.00),
        (102, 3000.00),
        (103, 2000.00)
    `;

    connection.query(insertAccountTable, (err, result) => {
      if (err) {
        console.error("Error inserting sample data into account table:", err);
      } else {
        console.log("Sample data inserted into account table");
      }

      connection.end();
    });
  });
};

module.exports = insertSampleData;
