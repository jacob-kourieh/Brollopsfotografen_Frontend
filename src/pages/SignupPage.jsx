import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../imgs/logo.svg";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function createAccount() {
        if (username.length > 0 && password.length > 0 && email.length > 0) {
            const account = {
                username: username,
                password: password,
                email: email,
                role: "guest",
            };
            setLoading(true)
            const response = await fetch("https://brollopsbackend.onrender.com/api/signup", {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setLoading(false)

            console.log(data);

            if (data.success) {
                localStorage.setItem("username", account.username);
                navigate("/loggain");
            } else {
                alert("Already excists, Registera with anthoer name and password :)");
            }
        }

    }


    return (
        <section className="container">
            <section className="login-form">
                <img className="login-logo" src={logo} alt="" onClick={() => navigate("/loggain")} />
                <h2 className="heading">Skapa Ett Konto</h2>

                <TextField sx={{
                    "& .MuiInputLabel-root": { color: 'white' },//styles the label
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "white", color: 'white', width: "1" },
                    },
                    "& .MuiOutlinedInput-root:active": {
                        "& > fieldset": { borderColor: "white" },
                    },
                }}
                    variant="outlined" label="Username" onChange={(e) => setUsername(e.target.value)} />


                <TextField sx={{
                    "& .MuiInputLabel-root": { color: 'white' },//styles the label
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "white", color: 'white', width: "1" },
                    },
                    "& .MuiOutlinedInput-root:active": {
                        "& > fieldset": { borderColor: "white" },
                    },
                }}
                    variant="outlined" label="Email" onChange={(e) => setEmail(e.target.value)} />


                <TextField sx={{
                    "& .MuiInputLabel-root": { color: 'white' },//styles the label
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "white", color: 'white', width: "1" },
                    },
                    "& .MuiOutlinedInput-root:active": {
                        "& > fieldset": { borderColor: "white" },
                    },
                }}
                    variant="outlined" label="Password" onChange={(e) => setPassword(e.target.value)} />


                {loading ? <CircularProgress color="success" /> : null}
                <Button variant="contained" onClick={() => createAccount()} disabled={loading}>Skapa ett konto</Button>
            </section>
        </section>
    );
}

export default SignupPage;