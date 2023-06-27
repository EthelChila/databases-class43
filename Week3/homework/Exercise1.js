const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log("Connected to the database.");

    createTables()
      .then(insertData)
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        connection.end();
      });
  }
});

function createTables() {
  const createMemberTable = `
    CREATE TABLE Members (
      member_id INT PRIMARY KEY,
      member_name VARCHAR(255),
      member_address VARCHAR(255)
    )
  `;

  const createDinnersTable = `
    CREATE TABLE Dinners (
      dinner_id VARCHAR(10) PRIMARY KEY,
      dinner_date DATE
    )
  `;

  const createVenueTable = `
    CREATE TABLE Venues (
      venue_code VARCHAR(3) PRIMARY KEY,
      venue_description VARCHAR(255)
    )
  `;

  const createFoodsTable = `
    CREATE TABLE Foods (
      food_code VARCHAR(3) PRIMARY KEY,
      food_description VARCHAR(255)
    )
  `;

  const createDinnersMembersTable = `
    CREATE TABLE Dinner_Members (
      member_id INT,
      dinner_id VARCHAR(10),
      FOREIGN KEY (member_id) REFERENCES Members(member_id),
      FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id)
    )
  `;

  const createDinnersVenueTable = `
    CREATE TABLE Dinner_Venues (
      dinner_id VARCHAR(10),
      venue_code VARCHAR(3),
      FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
      FOREIGN KEY (venue_code) REFERENCES Venues(venue_code)
    )
  `;

  const createDinnersFoodsTable = `
    CREATE TABLE Dinner_Foods (
      dinner_id VARCHAR(10),
      food_code VARCHAR(3),
      FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
      FOREIGN KEY (food_code) REFERENCES Foods(food_code)
    )
  `;

  const createTableQueries = [
    createMemberTable,
    createDinnersTable,
    createVenueTable,
    createFoodsTable,
    createDinnersMembersTable,
    createDinnersVenueTable,
    createDinnersFoodsTable,
  ];

  return Promise.all(
    createTableQueries.map((query) => {
      return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Table created:", results);
            resolve();
          }
        });
      });
    })
  );
}

function insertData() {
  const insertMemberTable = `
    INSERT INTO Members (member_id, member_name, member_address)
    VALUES
      (1, 'Amit', '325 Max park'),
      (2, 'Ben', '24 Hudson lane'),
      (3, 'Cristina', '516 6th Ave'),
      (4, 'Dan', '89 John St'),
      (5, 'Gabor', '54 Vivaldi St'),
      (6, 'Hema', '9 Peter St')
  `;

  const insertDinnersTable = `
    INSERT INTO Dinners (dinner_id, dinner_date)
    VALUES
      ('D00001001', '2020-03-15'),
      ('D00001002', '2020-03-15'),
      ('D00001003', '2020-03-20'),
      ('D00001004', '2020-03-25'),
      ('D00001005', '2020-03-26'),
      ('D00001006', '2020-04-01')
  `;

  const insertVenueTable = `
    INSERT INTO Venues (venue_code, venue_description)
    VALUES
      ('B01', 'Grand Ball Room'),
      ('B02', 'Zoku Roof Top'),
      ('B03', 'Goat Farm'),
      ('B04', "Mama's Kitchen"),
      ('B05', 'Hungry Hungary')
  `;

  const insertFoodsTable = `
    INSERT INTO Foods (food_code, food_description)
    VALUES
      ('C1', 'Curry'),
      ('C2', 'Cake'),
      ('S1', 'Soup'),
      ('P1', 'Pie'),
      ('T1', 'Tea'),
      ('M1', 'Mousse'),
      ('F1', 'Falafel'),
      ('G1', 'Goulash'),
      ('P2', 'Pasca')
  `;

  const insertDinnersMembers = `
    INSERT INTO Dinner_Members (member_id, dinner_id)
    VALUES
      (1, 'D00001001'),
      (2, 'D00001002'),
      (3, 'D00001002'),
      (4, 'D00001003'),
      (1, 'D00001003')
  `;

  const insertDataQueries = [
    insertMemberTable,
    insertDinnersTable,
    insertVenueTable,
    insertFoodsTable,
    insertDinnersMembers,
  ];

  return Promise.all(
    insertDataQueries.map((query) => {
      return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Data inserted:", results);
            resolve();
          }
        });
      });
    })
  );
}

/* 1. Columns that violate 1NF are:
-food_code because contains multiple values: C1, C2; S1, C2; P1, T1, M1; F1, M1; G1, P2
-food_description because it also contains multiple values: Curry, Cake; Soup, Cake; Pie, Tea, Mousse; Falafal, Mousse; Goulash, Pasca
  2. Entities that can be extracted are:
-Members (member_id, member_name, member_address)
-Dinners (dinner_id, dinner_date, venue_code)
-Venues (venue_code, venue_description)
-Foods (food_code, food_description)
  3. Tables and columns for a 3NF compliant solution are:
-Members (member_id, member_name, member_address)
-Dinners (dinner_id, dinner_date, venue_code)
-Venues (venue_code, venue_description)
-Foods (food_code, food_description)
-Dinner_Members (dinner_id, member_id)
*/
