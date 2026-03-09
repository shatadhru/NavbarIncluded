import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare + Google DNS

import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
}

