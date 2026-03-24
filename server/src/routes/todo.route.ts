import { Router } from "express";
import {
  createTodoHandler,
  getAllTodosHandler,
  getTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
} from "../controllers/todo.controllers";

const router = Router();

router.post("/createTodo", createTodoHandler);

router.get("/getAllTodos", getAllTodosHandler);
router.get("/getTodo/:id", getTodoHandler);

router.put("/updateTodo", updateTodoHandler);
router.delete("/deleteTodo", deleteTodoHandler);
