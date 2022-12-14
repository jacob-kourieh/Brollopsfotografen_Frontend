import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import close from "../imgs/closeIcon.svg";
import Button from '@mui/material/Button';


function AdminAlbumPage() {
    const user = localStorage.getItem("username");
    const [pictures, setPictures] = useState([]);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    async function getAlbum() {
        const reqObj = {
            username: user,

        };
        const response = await fetch("https://brollopsbackend.onrender.com/api/album", {
            method: "POST",
            body: JSON.stringify(reqObj),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            setPictures(data.allImages);
        }
    }

    useEffect(() => {
        getAlbum();
    }, []);


    async function deletePhoto(pic) {
        const reqObj = {
            user: user,
            img: pic,
            username: username,
        };
        const response = await fetch("https://brollopsbackend.onrender.com/api/deletephoto", {
            method: "DELETE",
            body: JSON.stringify(reqObj),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.success === true) {
            getAlbum();
        }
    }


    function logout() {
        navigate("/loggain")
        window.localStorage.clear();
        window.sessionStorage.clear();
    }


    return (
        <section className="album-container">
            <h3 className="text-heading"> Welcome <span className="inlogning-name"> {user} </span></h3>
            <div className="logout-btn"> <Button variant="contained" size="small" onClick={() => logout()} >Logga ut</Button> </div>
            {pictures.map((pic, i) => (
                <article className="img-form" key={i}>
                    <img alt="ff" className="album-pic" src={pic}></img>

                    <img
                        alt="pic"
                        src={close}
                        className="remove-btn"
                        onClick={() => deletePhoto(pic)}
                    ></img>
                </article>
            ))}
        </section>
    );
}

export default AdminAlbumPage;