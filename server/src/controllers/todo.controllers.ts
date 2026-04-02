import { Request, Response } from "express";
import { createTodoSchema } from "../utils/validations";
import z from "zod";
import { Todo } from "../modals/todo.modal";

export const createTodoHandler = async (req: Request, res: Response) => {
  try {
    const result = createTodoSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input data",
        error: z.flattenError(result.error),
      });
    }

    const todo = await Todo.create(result.data);

    return res.status(201).json({
      message: "Todo Created Successfully",
      todo,
    });
  } catch (error) {
    console.error("Error in createTodoHandler", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getAllTodosHandler = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({
      message: "Todos fetched Successfully",
      todos,
    });
  } catch (error) {
    console.error("Error in getAllTodosHandler", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getTodoHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: "Todo fetched successfully",
      todo,
    });
  } catch (error) {
    console.error("Error in getTodoHandler", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};


export const updateTodoHandler = async (req:Request, res: Response) => {
  
}; 
