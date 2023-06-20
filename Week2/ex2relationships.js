const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

connection.connect();

function executeQueries() {
  const createResearchPapersTable = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(100),
      conference VARCHAR(50),
      publish_date DATE,
      author_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(author_id)
    )
  `;

  const createAuthorPaperRelationshipTable = `
    CREATE TABLE IF NOT EXISTS author_paper_relationship (
      author_id INT,
      paper_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(author_id),
      FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
    )
  `;

  const insertAuthors = `
    INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES
      (1, 'John Doe', 'Harvard University', '1990-01-01', 10, 'Male', NULL),
      (2, 'Jane Smith', 'Stanford University', '1991-02-02', 12, 'Female', 1),
      (3, 'Michael Johnson', 'MIT', '1992-03-03', 14, 'Male', 1),
     (4, 'Emily Thompson', 'University of Cambridge', '1993-04-04', 11, 'Female', 3),
    (5, 'Daniel Johnson', 'Stanford University', '1994-05-05', 9, 'Male', 2),
    (6, 'Olivia Anderson', 'Harvard University', '1995-06-06', 13, 'Female', 4),
    (7, 'Matthew Wilson', 'Massachusetts Institute of Technology', '1996-07-07', 12, 'Male', 1),
    (8, 'Sophia Martinez', 'Yale University', '1997-08-08', 10, 'Female', 2),
    (9, 'James Clark', 'University of Oxford', '1998-09-09', 14, 'Male', 3),
    (10, 'Ava Wright', 'California Institute of Technology', '1999-10-10', 8, 'Female', 4),
    (11, 'Ethan Taylor', 'ETH Zurich', '2000-11-11', 11, 'Male', 1),
    (12, 'Isabella Moore', 'University of California, Berkeley', '2001-12-12', 13, 'Female', 3),
    (13, 'Liam Lee', 'University College London', '2002-01-13', 9, 'Male', 4),
    (14, 'Mia Harris', 'Columbia University', '2003-02-14', 12, 'Female', 2),
    (15, 'Noah Thompson', 'Princeton University', '2004-03-15', 10, 'Male', 1)
  `;

  const insertPapers = `
    INSERT INTO research_papers (paper_id, paper_title, conference, publish_date, author_id)
    VALUES
      (1, 'Paper 1', 'Conference A', '2022-01-01', 1),
      (2, 'Paper 2', 'Conference B', '2022-02-02', 2),
      (3, 'Paper 3', 'Conference C', '2022-03-03', 1),
      4. (4, 'Paper 4', 'Conference D', '2022-04-04', 3),
 (5, 'Paper 5', 'Conference E', '2022-05-05', 2),
 (6, 'Paper 6', 'Conference F', '2022-06-06', 1),
 (7, 'Paper 7', 'Conference G', '2022-07-07', 4),
 (8, 'Paper 8', 'Conference H', '2022-08-08', 5),
(9, 'Paper 9', 'Conference I', '2022-09-09', 6),
 (10, 'Paper 10', 'Conference J', '2022-10-10', 2),
 (11, 'Paper 11', 'Conference K', '2022-11-11', 3),
 (12, 'Paper 12', 'Conference L', '2022-12-12', 1),
 (13, 'Paper 13', 'Conference M', '2023-01-01', 4),
(14, 'Paper 14', 'Conference N', '2023-02-02', 5),
 (15, 'Paper 15', 'Conference O', '2023-03-03', 6),
 (16, 'Paper 16', 'Conference P', '2023-04-04', 2),
 (17, 'Paper 17', 'Conference Q', '2023-05-05', 3),
 (18, 'Paper 18', 'Conference R', '2023-06-06', 1),
 (19, 'Paper 19', 'Conference S', '2023-07-07', 4),
 (20, 'Paper 20', 'Conference T', '2023-08-08', 5),
 (21, 'Paper 21', 'Conference U', '2023-09-09', 6),
 (22, 'Paper 22', 'Conference V', '2023-10-10', 2),
 (23, 'Paper 23', 'Conference W', '2023-11-11', 3),
 (24, 'Paper 24', 'Conference X', '2023-12-12', 1),
 (25, 'Paper 25', 'Conference Y', '2024-01-01', 4),
 (26, 'Paper 26', 'Conference Z', '2024-02-02', 5),
 (27, 'Paper 27', 'Conference AA', '2024-03-03', 6),
(28, 'Paper 28', 'Conference BB', '2024-04-04', 2),
 (29, 'Paper 29', 'Conference CC', '2024-05-05', 3),
 (30, 'Paper 30', 'Conference DD', '2024-06-06', 1)
     
  `;

  connection.query(createResearchPapersTable, (error, result) => {
    if (error) throw error;
    console.log("Research papers table created");
    console.log(result);

    connection.query(createAuthorPaperRelationshipTable, (error, result) => {
      if (error) throw error;
      console.log("Author-Paper relationship table created");
      console.log(result);

      connection.query(insertAuthors, (error, result) => {
        if (error) throw error;
        console.log("Authors added successfully");
        console.log(result);

        connection.query(insertPapers, (error, result) => {
          if (error) throw error;
          console.log("Research papers added successfully");
          console.log(result);
          connection.end();
        });
      });
    });
  });
}

executeQueries();
