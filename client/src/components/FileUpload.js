import React from "react";
import axios from "axios";
import { useState } from "react";
import "./fileUpload.css";
const FileUpload = ({account, contract, provider}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        console.log("0");
        const formData = new FormData();
        formData.append("file", file);
        console.log("1");
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "af7fefaf113cf0a5d074",
            pinata_secret_api_key: "56e87653fca60629df223c4b8451acda6f99826e8bef31f85425d9ad0bc56a7f",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("2");
        if (resFile.data && resFile.data.IpfsHash) {
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash)
          console.log("3");
          console.log("Contract Object2:", contract);
          await contract.add(account, ImgHash);
          console.log("4")
          alert("Successfully image uploaded");
          setFile(null);
          setFileName("No image selected");
        } else {
          throw new Error("Invalid response data format");
        }
      } catch (error) {
        console.error("Error while uploading image:", error);
        alert("Unable to upload image: " + error.message);
      }
      
    }
  };
  const retriveFile = async (e) => {
    const data = e.target.files[0];
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          name="data"
          id="file-upload"
          onChange={retriveFile}
        ></input>
        <span className="textArea">Image :{fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
