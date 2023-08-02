import React from "react";
import "./display.css";
import { useState } from "react";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    console.log(otherAddress);
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (error) {
      alert("you dont have access");
    }

    const isEmpty = Object.keys(dataArray).length === 0;
    console.log(isEmpty);
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={item}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images)
    } else {
      alert("No image to display");
    }
  };
  return (
    <div> 
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </div>
  );
};

export default Display;
