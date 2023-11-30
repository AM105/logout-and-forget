import { useState } from "react"
import axios from 'axios'
import "./NewSubmit.css"
import { useNavigate } from "react-router-dom"


function NewSubmit() {

    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(otp, password)
        axios.post('http://localhost:5000/submit-otp',
            {
                otp: otp,
                password: password,
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    navigate('/Login')
                    alert('Password Updated.')
                } else {
                    alert('server err / wrong OTP')
                }
            }).catch(err => {
                console.log(err)
            })
    }



    return (
        <>
            <h1 className="cent">  FORGET PASSWORD </h1>

            <div className="set">
                OTP
                <input
                    style={{ marginBottom: '15px' }}
                    onChange={(e) => {
                        setOtp(e.target.value)
                    }}
                    value={otp}
                    className="up"
                    type="text"
                />
                New Password
                <input
                    style={{ marginBottom: '20px' }}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className="up"
                    type="text"
                />
                <button
                    onClick={handleSubmit}
                    className="btn"> CHANGE PASSWORD </button>
            </div>
        </>
    )
}

export default NewSubmit