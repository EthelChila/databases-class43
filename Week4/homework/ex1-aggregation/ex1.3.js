const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://chila:BanaB0406@cluster0.edui4ph.mongodb.net/";

const dbName = "databaseWeek4";
const collectionName = "population";

const getContinentInfo = async (year, age) => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection
      .aggregate([
        {
          $match: {
            Year: year,
            Age: age,
            Country: { $regex: /^[A-Z]+$/ },
          },
        },
        {
          $addFields: {
            TotalPopulation: { $add: ["$M", "$F"] },
          },
        },
      ])
      .toArray();

    console.log(result);

    client.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

getContinentInfo("2020", "100+");
