const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to the database");
});

function queryPromise(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function createTableAddColumn() {
  try {
    const table = `
      CREATE TABLE IF NOT EXISTS authors (
        author_id INT PRIMARY KEY,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('Male', 'Female', 'Other')
      )
    `;

    const column = `
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor
      FOREIGN KEY (mentor)
      REFERENCES authors(author_id)
    `;

    console.log("Authors table has been created");
    const tableResult = await queryPromise(table);
    console.log(tableResult);

    console.log("MENTOR COLUMN HAS BEEN ADDED");
    const columnResult = await queryPromise(column);
    console.log(columnResult);

    connection.end();
  } catch (err) {
    console.error("Error:", err);
  }
}

createTableAddColumn();
