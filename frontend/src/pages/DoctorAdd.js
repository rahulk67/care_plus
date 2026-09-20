import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
const DoctorAdd = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/api/user/doctor/add", formData);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }

    }

    const navigate = useNavigate()

    useEffect(() => {
       axiosInstance.get("/api/user/doctors").then((res) => {
        console.log(res.data);
       }).catch((err) => {
        console.log(err);
       })
    },[])

    return (
        <div>
            <h1>Add Doctor</h1>

            <form onSubmit={handleAddDoctor}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                <button type="submit">Add Doctor</button>
            </form>
        </div>
    )
}

export default DoctorAdd