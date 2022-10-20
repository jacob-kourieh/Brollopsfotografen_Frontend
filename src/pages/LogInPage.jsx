import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../imgs/logo.svg";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';



function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gustrole, setGustRole] = useState("guest");
    const [loading, setLoading] = useState(false);


    async function Login() {

        const user = {
            username: username,
            password: password,
            role: gustrole,
        };
        setLoading(true)
        const response = await fetch("https://brollopsbackend.onrender.com/api/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },

        });

        const data = await response.json()
        setLoading(false)

        console.log(data);
        if (data.success) {
            localStorage.setItem("username", data.user);
            sessionStorage.setItem("token", data.token);

            navigate("/CameraPage");
        } else {
            alert(
                "This account does not exist;)"
            );
        }


    }
    return (
        <section className="container">


            <section className="login-form">
                <img className="login-logo" src={logo} alt="" onClick={() => navigate("/")} />
                <h1 className="start-h1">BRÖLLOPSFOTOGRAFEN</h1>
                <TextField sx={{
                    "& .MuiInputLabel-root": { color: 'white' },//styles the label
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "white", color: 'white', width: "1" },
                    },
                    "& .MuiOutlinedInput-root:active": {
                        "& > fieldset": { borderColor: "white", color: 'white' },
                    },
                }}
                    variant="outlined" label="Username" onChange={(e) => setUsername(e.target.value)} />

                <TextField sx={{
                    "& .MuiInputLabel-root": { color: 'white' },//styles the label
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "white", color: 'white', width: "1" },
                    },


                    "& .MuiOutlinedInput-root:active": {
                        "& > fieldset": { borderColor: "white", color: 'white' },
                    },
                }}
                    variant="outlined" label="Password" onChange={(e) => setPassword(e.target.value)} />


                {loading ? <CircularProgress color="success" /> : null}
                <Button variant="contained" onClick={() => Login()} disabled={loading}>Logga in</Button>
                <Button variant="contained" onClick={() => navigate("/skapakonto")}>Skapa Ett Konto</Button>
                <Button variant="contained" onClick={() => navigate("/Admin")}>Admin</Button>
            </section>
        </section>
    );
}

export default LoginPage;
