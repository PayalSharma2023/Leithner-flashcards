const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name:{
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: [isEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "minimum length for password is 6"],
    },

    image: {
      type: String,
    },

    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
  },
  { timestamps: true }
);

//fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user was created and saved", doc);
  next();
});

//hashing password before saving it to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

//creating a static method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("users", userSchema);

module.exports = User;