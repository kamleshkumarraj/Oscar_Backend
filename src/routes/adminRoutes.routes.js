import { Router } from "express";
import { getAllOrders, getAllUsers } from "../controllers/admin/getAllOrders.controller.js";

export const adminHandlerRoute = Router();

adminHandlerRoute.route('/get-all-users').get(getAllUsers);
adminHandlerRoute.route('/get-all-orders').get(getAllOrders);