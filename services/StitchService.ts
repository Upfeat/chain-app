import {
  Stitch,
  AnonymousCredential,
  StitchAppClient,
  RemoteMongoClient,
  RemoteMongoCollection
} from "mongodb-stitch-react-native-sdk";
import { ChainUser, ChainLocation } from "../types";

class StitchService {
  constructor() {
    this.initDB();
  }

  private client: StitchAppClient = null;
  private mongodb: RemoteMongoClient = null;
  private coarseLocationCollection: RemoteMongoCollection<ChainLocation> = null;
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

  async pushCoarseLocation(data: ChainLocation) {
    return this.coarseLocationCollection.insertOne({
      userId: this.client.auth.user.id,
      ...data
    });
  }

  async updateUserObject(data: ChainUser) {
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
