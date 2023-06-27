const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

function connectDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function setupDatabase() {
  try {
    await connectDatabase();

    const sqlFilePath = path.join(__dirname, "world.sql");
    const sql = fs.readFileSync(sqlFilePath, "utf8");
    const sqlStatements = sql.split(";");

    for (const statement of sqlStatements) {
      await executeQuery(statement);
    }
  } catch (err) {
    throw err;
  }
}

async function getPopulation(table, name, code) {
  try {
    const query = "SELECT Population FROM ?? WHERE Name = ? AND code = ?";
    const values = [table, name, code];

    const result = await executeQuery(query, values);

    if (result.length === 0) {
      throw new Error("Not found");
    }

    console.log(`Population: ${result[0].Population}`);
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
}

async function run() {
  try {
    await setupDatabase();
    await getPopulation("Country", "Netherlands", "NLD");
  } catch (err) {
    throw err;
  }
}

run();
