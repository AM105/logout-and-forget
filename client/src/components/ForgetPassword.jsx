import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css"

function ForgetPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleSubmit = () => {
        console.log(email)
        axios.post('http://localhost:5000/send-otp',
            {
                email: email,
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    navigate('/otp')
                } else {
                    alert('Email / Server Error.')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    
    return (
        <>
            <h1 className="cent">Forget Password</h1>
            <div className="set">
                Email
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="up"
                    type="text"
                />
                <button
                    onClick={handleSubmit}
                    className="btn"
                  // Disable the button during loading
                >
                 Send OTP
                </button>
               
            </div>
        </>
    );
}

export default ForgetPassword;
