const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const transferAmount = (accountFrom, accountTo, amount) => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }

    connection.query("START TRANSACTION", async (err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        connection.end();
        return;
      }

      try {
        const accountFromBalanceResult = await query(
          "SELECT balance FROM account WHERE account_number = ?",
          [accountFrom]
        );
        const accountFromBalance = accountFromBalanceResult[0].balance;

        if (accountFromBalance < amount) {
          throw new Error("Insufficient balance");
        }

        const accountToResult = await query(
          "SELECT * FROM account WHERE account_number = ?",
          [accountTo]
        );

        if (accountToResult.length === 0) {
          throw new Error(
            `The user with account number ${accountTo} is not found`
          );
        }

        await query(
          "UPDATE account SET balance = balance - ? WHERE account_number = ?",
          [amount, accountFrom]
        );

        await query(
          "UPDATE account SET balance = balance + ? WHERE account_number = ?",
          [amount, accountTo]
        );

        await query(
          `INSERT INTO account_changes (account_number, amount, changed_date, remark)
          VALUES (?, ?, CURDATE(), 'Transfer to Account ${accountTo} from Account ${accountFrom}')`,
          [accountTo, amount]
        );

        connection.query("COMMIT", (err) => {
          if (err) {
            console.error("Error committing transaction:", err);
          } else {
            console.log("Transaction complete");
          }

          connection.end();
        });
      } catch (error) {
        connection.query("ROLLBACK", (err) => {
          if (err) {
            console.error("Error rolling back transaction:", err);
          }
        });
        connection.end();
        throw error;
      }
    });
  });
};

module.exports = transferAmount;
