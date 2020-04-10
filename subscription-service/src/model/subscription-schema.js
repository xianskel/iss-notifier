const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  email: { type: String, required: true, unique: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true }
});

export default mongoose.model("Subscription", subscriptionSchema);
