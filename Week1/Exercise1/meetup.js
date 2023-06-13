const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

connection.query("CREATE DATABASE IF NOT EXISTS meetup", (err) => {
  if (err) throw err;
  console.log("Database meetup already created successfully");
});

connection.query("USE meetup", (err) => {
  if (err) throw err;
  console.log("Using meetup database");
});

const createInviteeTable = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(50),
    invitee_by VARCHAR(50)
  )
`;

connection.query(createInviteeTable, (err) => {
  if (err) throw err;
  console.log("Invitee table created");
});

const createRoomTable = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT
  )
`;

connection.query(createRoomTable, (err) => {
  if (err) throw err;
  console.log("Room table created");
});

const createMeetingTable = `CREATE TABLE Meeting (
  meeting_no INT AUTO_INCREMENT PRIMARY KEY,
  meeting_title VARCHAR(255),
  starting_time DATETIME,
  ending_time DATETIME,
  room_no INT
)
`;
connection.query(createMeetingTable, (err) => {
  if (err) throw err;
  console.log("Meeting table created");
});

const insertInviteeData = `
    INSERT INTO Invitee (invitee_name, invitee_by) VALUES
      ('Martha France ', 'Inviter 1'),
      ('Emelia Luks', 'Inviter 2'),
      ('Ndinawe Gene', 'Inviter 3'),
      ('Adebisi Aleks', 'Inviter 4'),
      ('Mabel David', 'Inviter 5')
  `;

connection.query(insertInviteeData, (err) => {
  if (err) throw err;
  console.log("Invitee data inserted");

  const insertRoomData = `
      INSERT INTO Room (room_name, floor_number) VALUES
        ('Room 101', 1),
        ('Room 102', 2),
        ('Room 103', 3),
        ('Room 104', 4),
        ('Room 105', 5)
    `;

  connection.query(insertRoomData, (err) => {
    if (err) throw err;
    console.log("Room data inserted");

    const insertMeetingData = `
        INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
          ('Meeting 1', NOW(), NOW(), 101),
          ('Meeting 2', NOW(), NOW(), 102),
          ('Meeting 3', NOW(), NOW(), 103),
          ('Meeting 4', NOW(), NOW(), 104),
          ('Meeting 5', NOW(), NOW(), 105)
      `;
    connection.query(insertMeetingData, (err) => {
      if (err) throw err;
      console.log("Meeting data inserted");

      connection.end((err) => {
        if (err) throw err;
        console.log("Database connection closed");
      });
    });
  });
});
