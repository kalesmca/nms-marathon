import React from "react";
import "./loginBody.scss";
import marathon2025 from "../../assets/images/marathon2025.jpeg";
import LoginComponent from "./loginComponent";
import Card from "react-bootstrap/Card";
import openCat from "../../assets/images/open.jpeg";
import u19 from "../../assets/images/u_19.jpeg";
import u10 from "../../assets/images/U_10.jpeg";
import u14 from "../../assets/images/U_14.jpeg";
import { OPEN_MAP_URL, U_10_MAP_URL, U_14_BOYS_MAP_URL, U_14_GIRLS_MAP_URL, U_19_MAP_URL } from "../../config/constants";

const LoginBodyComponent = () => {
  const mapNavigationClick = (url) => {
    window.open(url, "_blank"); // new tab
  };
  return (
    <div className="login-body-container">
      <div>
        <LoginComponent />
      </div>
      {/* <div>
                <div className="map-img-header"> </div>
                <div className="map-img">
                    <img className="img" src={openCat} ></img>
                </div>

            </div>
            <div>
                <div className="map-img-header"> </div>
                <div className="map-img">
                    <img className="img" src={openCat} ></img>
                </div>

            </div> */}

      <div className="tabs-container">
        <input type="radio" name="tab" id="tab1" defaultChecked />
        <input type="radio" name="tab" id="tab2" />
        <input type="radio" name="tab" id="tab3" />
        <input type="radio" name="tab" id="tab4" />

        <div className="tabs">
          <label htmlFor="tab1">Open_Category</label>
          <label htmlFor="tab2">Under 19</label>
          <label htmlFor="tab3">Under 14</label>
          <label htmlFor="tab4">Under 10</label>
        </div>

        <div className="content">
          <div className="image tab1" onClick={() => { mapNavigationClick(OPEN_MAP_URL) }}>
            <img src={openCat} alt="Open Category" />
          </div>
          <div className="image tab2" onClick={() => { mapNavigationClick(U_19_MAP_URL) }}>
            <img src={u19} alt="Under 19" />
          </div>
          <div className="image tab3" onClick={() => { mapNavigationClick(U_14_BOYS_MAP_URL) }}>
            <img src={u14} alt="Under 14" />
          </div>
          <div className="image tab4" onClick={() => { mapNavigationClick(U_10_MAP_URL) }}>
            <img src={u10} alt="Under 10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBodyComponent;
