const express = require("express");
const zod = require("zod");
const cors = require('cors');
require('dotenv').config()

const { createTodoSchema, updateTodoSchema } = require("./types");
const { Todo } = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.post("/todos", async (req, res) => {
  console.log(req.body)
  const createPayload = req.body;
  console.log(createPayload);
  const response = createTodoSchema.safeParse(createPayload);
  if (!response.success) {
    return res.status(411).json({ msg: "Wrong input fields" });
  }
  // put it in mongoDB
  try {
    const todo = await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });
    return res.json({ msg: "todo created" });
  } catch (error) {
    res.status(500).json({ msg: "not able to create todo", err: error });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.json({ todos: todos });
  } catch (error) {
    res.status(500).json({ msg: "not able to create todo", err: error });
  }
});

app.put("/completed", async (req, res) => {
  const id = req.body.id;
  const response = updateTodoSchema.safeParse({ id });
  if (!response.success) {
    return res.status(411).json({ msg: "You have given wrong inputs" });
  }
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          completed: true,
        },
      },
      { new: true }
    );
    return res.json({ updatedTodo: todo });
  } catch (error) {}
});

app.delete("/todos", async(req, res) => {
  const id = req.body.id;
  const response = updateTodoSchema.safeParse({ id });
  if (!response.success) {
    return res.status(411).json({ msg: "You have given wrong inputs" });
  }
  await Todo.deleteOne({_id: id})
  return res.json({msg: "todo deleted successfully"})

});



app.listen(3000,()=>{
    console.log("server running at 3000");
})