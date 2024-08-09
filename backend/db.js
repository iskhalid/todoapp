const mongoose = require("mongoose");

//use .env
mongoose.connect(
    process.env.MONGODB_URI
  )
  .catch((error) => {
    console.log("Failed to connect to mongodb", error);
  });

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    completed: Boolean,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  Todo,
};
