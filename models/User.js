const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  guild: String,
  user: String,
  email: String,
  password: String, // Hashed password
  c1: {
    cash: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    id: Object,
    inv: Array,
    builds: Array,
    cars: Array,
    police_points: {
      type: Array, 
      default: [
        { name: "login", value: 0 },
        { name: "claim_report", value: 0 },
        { name: "status", value: 0 },
        { name: "others", value: 0 }
      ]
    }
  },
  c2: {
    cash: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    id: Object,
    inv: Array,
    builds: Array,
    cars: Array,
    police_points: {
      type: Array, 
      default: [
        { name: "login", value: 0 },
        { name: "claim_report", value: 0 },
        { name: "status", value: 0 },
        { name: "others", value: 0 }
      ]
    }
  }
});

module.exports = model("User", UserSchema);
