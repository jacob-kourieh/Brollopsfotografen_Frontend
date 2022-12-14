import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import albumLogo from "../imgs/photoAlbum.svg";
import Button from '@mui/material/Button';


function TakenPhotoPage() {
    let getPhoto = localStorage.getItem("photo");

    const photoRef = useRef(null);
    const navigate = useNavigate();
    function takeNewPic() {
        navigate("/CameraPage");
    }

    useEffect(() => {
        let photo = photoRef.current;
        photo.src = getPhoto;
    }, []);

    return (
        <section className="camera-form">
            <img alt=""
                className="album-logo"
                src={albumLogo}
                onClick={() => navigate("/AlbumPage")}
            ></img>
            <img alt="" className="camera-cap" ref={photoRef} />

            <Button variant="contained" disableElevation onClick={takeNewPic}> FÅNGA ETT NYTT ÖGONBLICK </Button>


        </section>
    );
}

export default TakenPhotoPage;