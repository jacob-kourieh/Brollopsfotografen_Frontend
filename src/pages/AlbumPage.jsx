import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cameraLogo from "../imgs/logo.svg";
import close from "../imgs/closeIcon.svg";
import Button from '@mui/material/Button';

function AlbumPage() {
    const user = localStorage.getItem("username");
    const [pictures, setPictures] = useState([]);

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
            <img
                className="album-logo"
                src={cameraLogo}
                alt=""
                onClick={() => navigate("/CameraPage")}
            />
            <div className="logout-btn"> <Button variant="contained" size="small" onClick={() => logout()} >Logga ut</Button> </div>

            {pictures.map((pic, i) => (
                <article className="img-form" key={i}>
                    <img alt="" className="album-pic" src={pic}></img>

                    <img
                        alt=""
                        src={close}
                        className="remove-btn"
                        onClick={() => deletePhoto(pic)}
                    ></img>

                </article>
            ))}
        </section>
    );
}

export default AlbumPage;
