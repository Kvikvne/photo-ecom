import { useState, useEffect } from "react";
import axios from "axios";

export const usePhotos = () => {
  const [mainPhoto, setMainPhoto] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/photos", { withCredentials: true })
      .then((response) => setMainPhoto(response.data), {
        withCredentials: true,
      })
      .catch((error) => console.error("Error:", error), {
        withCredentials: true,
      });
  }, []);
  return { mainPhoto };
};
