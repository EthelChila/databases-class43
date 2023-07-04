const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://chila:BanaB0406@cluster0.edui4ph.mongodb.net/";

const dbName = "databaseWeek4";
const collectionName = "Accounts";

const setupData = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const accounts = [
      {
        account_number: 104,
        balance: 5000,
        account_changes: [],
      },
      {
        account_number: 105,
        balance: 3000,
        account_changes: [],
      },
      {
        account_number: 106,
        balance: 7000,
        account_changes: [],
      },
    ];

    await collection.insertMany(accounts);

    client.close();

    console.log("Data setup successfully completed.");
  } catch (error) {
    console.error("Error:", error);
  }
};

setupData();
