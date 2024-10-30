import { Router } from "express"
import { getAllOrdersByStatus } from "../controllers/getOrders.controller.js";
import isLoggedIn from "../controllers/isLoggedIn.controller.js";

export const usersRouter = Router();

usersRouter.route('/orders/:userId').get(getAllOrdersByStatus)