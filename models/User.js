const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  guild: String,
  user: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
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

// Hash password before saving to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with stored hash
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
