import { Router } from "express"
import { getAllOrdersByStatus } from "../controllers/getOrders.controller.js";

export const usersRouter = Router();

usersRouter.route('/orders/:id').get(getAllOrdersByStatus)