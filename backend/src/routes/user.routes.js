import { Router } from "express";
import { userRegister, userLogin, doctorsList, doctorAdd } from "../controller/userController.js";
import { addAppointment, appointmentsList, updateAppointment, adminAppointmentsList } from "../controller/appointmentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/doctors", doctorsList);
router.post("/doctor/add", doctorAdd);
router.post("/appointment/add", authMiddleware, addAppointment);
router.get("/appointment/list", authMiddleware, appointmentsList);
router.get("/appointment/list/admin", adminAppointmentsList);
router.post("/appointment/update", updateAppointment);
// update-appointment


export default router;
