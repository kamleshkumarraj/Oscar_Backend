import { Router } from "express";
import { getAllOrders, getAllUsers } from "../controllers/admin/getAllOrders.controller.js";
import { updateStatus } from "../controllers/updateStatus.controller.js";

export const adminHandlerRoute = Router();

adminHandlerRoute.route('/get-all-users').get(getAllUsers);
adminHandlerRoute.route('/get-all-orders').get(getAllOrders);
adminHandlerRoute.route('/change-order-status/:id').post(updateStatus)