import {
  Stitch,
  AnonymousCredential,
  StitchAppClient,
  RemoteMongoClient,
  RemoteMongoCollection
} from "mongodb-stitch-react-native-sdk";

type Location = {
  startTime: number;
  endTime: number;
  zone: string;
  userId?: string;
};

type User = {
  userId?: string;
  pushToken?: string;
};

class StitchService {
  constructor() {
    this.initDB();
  }

  private client: StitchAppClient = null;
  private mongodb: RemoteMongoClient = null;
  private coarseLocationCollection: RemoteMongoCollection<Location> = null;
  private userCollection: RemoteMongoCollection<Location> = null;

  private async initDB() {
    this.client = await Stitch.initializeDefaultAppClient("chain-wmapo");
    await this.client.auth.loginWithCredential(new AnonymousCredential());
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    this.coarseLocationCollection = this.mongodb
      .db("chain")
      .collection("coarseLocations");

    this.userCollection = this.mongodb.db("chain").collection("users");
  }

  async pushCoarseLocation(data: Location) {
    return this.coarseLocationCollection.insertOne({
      userId: this.client.auth.user.id,
      ...data
    });
  }

  async updateUserObject(data: User) {
    return this.userCollection.updateOne(
      { userId: this.client.auth.user.id },
      { userId: this.client.auth.user.id, ...data },
      {
        upsert: true
      }
    );
  }
}

export default new StitchService();
