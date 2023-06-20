const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

connection.connect();

function query(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function executeQueries() {
  try {
    console.log("Names of authors and their corresponding mentors:");
    const query1 = `
      SELECT a.author_name, m.author_name AS mentor_name
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
    `;
    const results1 = await query(query1);
    console.log(results1);

    console.log("Authors and their published paper titles:");
    const query2 = `
      SELECT a.author_name, IFNULL(rp.paper_title, 'No Research Paper') AS published_paper_title
      FROM authors a
      LEFT JOIN research_papers rp ON a.author_id = rp.author_id;
    `;
    const results2 = await query(query2);
    console.log(results2);

    connection.end();
  } catch (error) {
    console.error("Error:", error);
  }
}

executeQueries();
