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

    const task = await Todo.create(result.data);

    return res.status(201).json({
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    console.error("Error in createTodoHandler", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};


export const getAllTodosHandler = async (req:Request,res: Response) => {
    
};