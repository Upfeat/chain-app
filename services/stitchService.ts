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

class StitchService {
  constructor() {
    this.initDB();
  }

  private client: StitchAppClient = null;
  private mongodb: RemoteMongoClient = null;
  private coarseLocationCollection: RemoteMongoCollection<Location> = null;

  private async initDB() {
    this.client = await Stitch.initializeDefaultAppClient("chain-wmapo");
    await this.client.auth.loginWithCredential(new AnonymousCredential());
    this.mongodb = await this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    this.coarseLocationCollection = this.mongodb
      .db("chain")
      .collection("coarseLocations");
  }

  async pushCoarseLocation(data: Location) {
    await this.coarseLocationCollection.insertOne({
      userId: this.client.auth.user.id,
      ...data
    });
  }
}

export default new StitchService();
