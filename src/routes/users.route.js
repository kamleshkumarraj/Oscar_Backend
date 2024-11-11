import { Router } from "express";
import { getAllOrdersByStatus } from "../controllers/getOrders.controller.js";
import { removeCartUser } from "../controllers/removeCart.controller.js";
import { removeSingleCart } from "../controllers/removeSingleCart.controller.js";

export const usersRouter = Router();

usersRouter.route('/orders/:userId').get(getAllOrdersByStatus)
usersRouter.route('/empty-cart/:userId').delete(removeCartUser)
usersRouter.route('/remove-single-cart/:cartId').delete(removeSingleCart)