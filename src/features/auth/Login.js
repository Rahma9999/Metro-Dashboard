import React, { useContext, useEffect, useState } from 'react';
import '../../styles/Login.css';
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../services/AuthContext';
import { Form } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {login, user} = useContext(AuthContext);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
         if (loading) return; // prevent double submit
            setLoading(true);
            setError('');
        try{
            await login(email, password);
            navigate('/');
        }catch(err){
            setError("invalid email or password");
        }finally{
            setPassword('');
            setEmail('');
            setLoading(false);
        }
    };


    useEffect(() => {
        if(user)
            navigate('/');
    }, [user, navigate]);
    
    
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
                    <button type='submit' className='login-btn' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className='my-2' style={{ color: "white" }}>{error}</p>}
                </Form>
            </div>
        </div>
    )
}

export default Login
