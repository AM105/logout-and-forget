import { useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(name,email,password)
        axios.post('http://localhost:5000/Register',
            {
                name,email,password
            })
            .then(res => {
                console.log(res.data)
              navigate("/Login")
              setName("")
              setEmail("")
              setPassword("")
                if (res.data.code === 200) {
                    alert('Signup success.')
                } else {
                    alert('Error.')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (<>
        
        <div className="outcard">
        <h1 className="center"> Register </h1>
      Name
            <input
                onChange={(e) => {
                    setName(e.target.value)
                }}
                value={name}
                className="inputs"
                type="name" /> <br /> <br />
            Email
            <input
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                value={email}
                className="inputs"
                type="email" /> <br /> <br />
            Password
            <input
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                value={password}
                className="inputs" type="password" /> <br /> <br />
            <button
                onClick={handleSubmit}
                className="btns"> SUBMIT </button>
            <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/Login'}> Login </Link>
        </div>
    </>
    )
}


export default Register


