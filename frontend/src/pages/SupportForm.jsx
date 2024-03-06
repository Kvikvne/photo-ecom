import css from "./Styles/SupportForm.module.css";
import { useState } from "react";
import axios from "axios";

import SmallLoader from "../components/Loaders/SmallLoader";
import Checkmark from "../components/Loaders/Checkmark";

const REQ_URL = import.meta.env.VITE_UTIL;

export default function SupportForm() {
  const [supportData, setSupportData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    description: "",
    attch: null,
  });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [messageSent, setMessageSent] = useState(false);
  const [attchError, setAttchError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("first_name", supportData.first_name);
    formData.append("last_name", supportData.last_name);
    formData.append("email", supportData.email);
    formData.append("subject", supportData.subject);
    formData.append("description", supportData.description);
    formData.append("attch", supportData.attch);

    const config = {
      withCredentials: true,

      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    axios
      .post(`${REQ_URL}/support/send-email`, formData, config)
      .then((response) => {
        setAttchError("");
        setLoading(false);
        setMessageSent(true);
        
      })
      .catch((error) => {
        setAttchError("File size is too large");
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSupportData((prevData) => ({
      ...prevData,
      attch: e.target.files[0],
    }));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.form}>
          <form onSubmit={handleSubmit}>
            <div className={css.header}>
              <h2>Contact Support</h2>
            </div>
            <div className={css.group}>
              <div className={css.inputBox}>
                <input
                  value={supportData.first_name}
                  onChange={handleInputChange}
                  name="first_name"
                  type="text"
                  required
                />
                <span>First Name</span>
              </div>
              <div className={css.inputBox}>
                <input
                  value={supportData.last_name}
                  onChange={handleInputChange}
                  name="last_name"
                  type="text"
                  required
                />
                <span>Last Name</span>
              </div>
            </div>
            <div className={css.inputBox}>
              <input
                value={supportData.email}
                onChange={handleInputChange}
                name="email"
                type="text"
                required
              />
              <span>Email</span>
            </div>
            <div className={css.inputBox}>
              <input
                value={supportData.subject}
                onChange={handleInputChange}
                name="subject"
                type="text"
                required
              />
              <span>Subject</span>
            </div>
            <div className={css.inputBox}>
              <textarea
                value={supportData.description}
                onChange={handleInputChange}
                name="description"
                type="text"
                required
              />
              <span>Description</span>
            </div>
            <div className={css.inputAttach}>
              <span>Attachment (no files more than 5 MB)</span>

              <input
                onChange={handleFileChange}
                name="attch"
                type="file"
                accept="image/jpeg, image/png"
              />

              {loading && (
                <progress value={uploadProgress} max="100"></progress>
              )}
              <span style={{ color: "red", marginLeft: "12px" }}>{attchError}</span>
            </div>

            {messageSent && (
              <div className={css.success}>
                Message sent
                <Checkmark />
              </div>
            )}
            <button className={css.submitBtn} type="submit">
              {loading ? <SmallLoader /> : "Submit"}
            </button>
          </form>
          <div className={css.disclaimer}>
            <p>
              Before reaching out, please review our returns and refunds policy{" "}
              <a href="/returns-refunds"> here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
