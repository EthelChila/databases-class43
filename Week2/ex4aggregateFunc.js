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
    console.log(
      "These are all the research papers including the number of authors that wrote that paper:"
    );
    const query1 = `
      SELECT rp.paper_title, COUNT(apr.author_id) AS author_count
      FROM research_papers rp
      LEFT JOIN author_paper_relationship apr ON rp.paper_id = apr.paper_id
      GROUP BY rp.paper_id;
    `;
    const results1 = await query(query1);
    console.log(results1);

    console.log(
      "This is the sum of the research papers published by all female authors:"
    );
    const query2 = `
      SELECT COUNT(rp.paper_id) AS total_papers_published
      FROM research_papers rp
      INNER JOIN authors a ON rp.author_id = a.author_id
      WHERE a.gender = 'Female';
    `;
    const results2 = await query(query2);
    console.log(results2);

    console.log("Average of the h-index of all authors per university:");
    const query3 = `
      SELECT university, AVG(h_index) AS average_h_index
      FROM authors
      GROUP BY university;
    `;
    const results3 = await query(query3);
    console.log(results3);

    console.log(
      "This is the sum of the research papers of the authors per university:"
    );
    const query4 = `
      SELECT a.university, COUNT(rp.paper_id) AS total_papers
      FROM authors a
      LEFT JOIN research_papers rp ON a.author_id = rp.author_id
      GROUP BY a.university;
    `;
    const results4 = await query(query4);
    console.log(results4);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    connection.end();
  }
}

executeQueries();
