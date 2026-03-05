import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import '../../styles/Login.css';
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
import { FloatingLabel, Form } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const {login} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(
                "https://metrodb-production.up.railway.app/api/v1/admin/login",
                {email, password}
            );
            console.log(res);
            const token = res.data.token;
            const adminName = res.data.data.admin.name;
            localStorage.setItem('name', adminName);
            
            login(token);
            navigate('/');
        }catch(err){
            setError("invalid email or password");
        }finally{
            setPassword('');
            setEmail('');
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token)
            navigate('/');
    }, [navigate]);
    
    
    return (
        <div className='loginContainer d-flex flex-column'>
            
            <div className="login-box d-flex flex-column">
            <h2>Log In</h2>
                <Form onSubmit={handleLogin}>
                    <div className="input-box">
                        <span className="icon">
                            <MdEmail />
                        </span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <MdLock />
                        </span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>password</label>
                    </div>
                    <button type="submit">Login</button> 
                    {error && <p className='my-2' style={{ color: "white" }}>{error}</p>}
                </Form>
            </div>
        </div>
    )
}

export default Login
