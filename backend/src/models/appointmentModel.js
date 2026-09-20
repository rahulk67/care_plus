import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    patientName: {type : String},
    age:{type:Number},
    gender:{type:String},
    patientPhone: {type : String},
    patientAddress: {type : String},
    doctor: {type : String},
    appointmentDate: {type : String},
    appointmentTime: {type : String},
    symptoms: {type : String},
    status: {type : String, default: "Pending"},
   
    
}, {timestamps : true})

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment


