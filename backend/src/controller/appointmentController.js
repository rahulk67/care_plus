import Appointment from "../models/appointmentModel.js";

const addAppointment = async (req,res) => {
    try {
        const { patientName, age, gender, patientPhone, patientAddress, doctor, appointmentDate, appointmentTime, symptoms } = req.body;
        console.log("Req body: ", req.body)
        if(!patientName || !age || !gender || !patientPhone || !patientAddress || !doctor || !appointmentDate || !appointmentTime || !symptoms){
            return res.status(400).json({message:"All fields are required"})
        }
        const newAppointment = await Appointment.create({patientName, age, gender, patientPhone, patientAddress, doctor, appointmentDate, appointmentTime, symptoms})
        return res.status(201).json({message:"Appointment created successfully", appointment:newAppointment})
    } catch (error) {
        console.log(error);
    }
}

const appointmentsList = async (req, res) => {
    console.log(req.user,"cchhekc jswn")
    try {
        const appointments = await Appointment.find({})
        return res.status(200).json({appointments})
    } catch (error) {
        console.log(error);
    }
}


const updateAppointment = async (req,res)=>{
    
    try {
        console.log(req.body,"ffg")
        const { id } = req.body;
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
        return res.status(200).json({message:"Appointment updated successfully", appointment})
    } catch (error) {
        console.log(error);
    }
}

export {addAppointment, appointmentsList,updateAppointment}