const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line func-names
clientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// eslint-disable-next-line func-names
clientSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("Incorrect Password");
  } else throw Error("Incorrect Email");
};

module.exports = mongoose.model("clients", clientSchema);
