require("dotenv").config();
const { MongoClient } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const episode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne(episode);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  const episode2Season2 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });

  console.log(`The title of episode 2 in season 2 is ${episode2Season2.title}`);

  const blackRiverEpisode = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`
  );

  const cliffEpisodes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: "CLIFF" })
    .toArray();

  const cliffEpisodeTitles = cliffEpisodes.map((episode) => episode.title);

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodeTitles}`
  );

  const cliffLighthouseEpisodes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
    .toArray();

  const cliffLighthouseEpisodeTitles = cliffLighthouseEpisodes.map(
    (episode) => episode.title
  );

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffLighthouseEpisodeTitles}`
  );
}

async function updateEpisodeExercises(client) {
  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`
  );
}

const mongodbUrl = process.env.MONGODB_URL;

async function main() {
  if (mongodbUrl == null) {
    throw Error(
      "You did not set up the environment variable correctly. Did you create a '.env' file and add the MongoDB connection URL?"
    );
  }

  const client = new MongoClient(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await seedDatabase(client);

    await createEpisodeExercise(client);

    await findEpisodesExercises(client);

    await updateEpisodeExercises(client);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

main();
