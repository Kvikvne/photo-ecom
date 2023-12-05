import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePhotos = () => {
    const [mainPhoto, setMainPhoto] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3000/photos")
        .then((response) => setMainPhoto(response.data))
        .catch((error) => console.error("Error:", error));
    }, []);
    return { mainPhoto };
}