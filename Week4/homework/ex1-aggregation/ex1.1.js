const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://chila:BanaB0406@cluster0.edui4ph.mongodb.net/";

const dbName = "databaseWeek4";
const collectionName = "population";

const filePath =
  "/Users/chilachila/Desktop/databases-class43/Week4/homework/ex1-aggregation/population_pyramid_1950-2022.csv";

const importData = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();

    const session = client.startSession();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        data.M = parseInt(data.M, 10);
        data.F = parseInt(data.F, 10);

        documents.push(data);
      })
      .on("end", async () => {
        try {
          await collection.insertMany(documents, { session });

          console.log("Data imported successfully");
        } catch (error) {
          console.error("Error inserting data:", error);
        } finally {
          session.endSession();
          client.close();
        }
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

importData();
