import React from 'react';
import './loginBody.scss';
import marathon2025 from '../../assets/images/marathon2025.jpeg';
import LoginComponent from './loginComponent';
import Card from 'react-bootstrap/Card';
import openGirls from '../../assets/images/open_girls.jpeg';
import openBoys from '../../assets/images/open_boys.jpeg';
import u19 from '../../assets/images/U_14.jpeg';
import u10 from '../../assets/images/U_10.jpeg';
import u14 from '../../assets/images/U_14.jpeg';
import marthon_event_img_url from "../../assets/images/marathon_events.png"
import {
  OPEN_BOYS_MAP_URL,
  U_10_MAP_URL,
  U_14_MAP_URL,
  U_19_MAP_URL,
  OPEN_GIRLS_MAP_URL
} from '../../config/constants';
import Alert from 'react-bootstrap/Alert';

const LoginBodyComponent = () => {
  const mapNavigationClick = (url) => {
    window.open(url, '_blank'); // new tab
  };
  return (
    <div className="login-body-container">
      <div>
        <LoginComponent />
      </div>
      <div>
        <Alert variant={'warning'} className="payment-dashboard-info">
                  
                  <div className="payment-amount">
                    <span >Registration Fee: </span>
                    <span className="currency">₹</span>
                    <span className="price">200</span>
                    <span className="per-player">/per player</span>
                  </div>
                 
                </Alert>
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
        <input type="radio" name="tab" id="tab0" defaultChecked />
        <input type="radio" name="tab" id="tab1" />
        <input type="radio" name="tab" id="tab2" />
        <input type="radio" name="tab" id="tab3" />
        <input type="radio" name="tab" id="tab4" />
        <input type="radio" name="tab" id="tab5" />

        <div className="tabs">
          <label htmlFor="tab0">Events</label>
          <label htmlFor="tab1">Open Boys Route-Map</label>
          <label htmlFor="tab2">Open Girls Route-Map</label>
          <label htmlFor="tab3">U_14 Boys/Girls Route-Map</label>
          <label htmlFor="tab4">U_10 Boys/Girls Route-Map</label>
           <label htmlFor="tab5">Under 19 Route-Map</label>
        </div>

        <div className="content">
          <div
            className="image tab0"
            // onClick={() => {
            //   mapNavigationClick(OPEN_MAP_URL);
            // }}
          >
            <img src={marthon_event_img_url} alt="Events" />
          </div>
          <div
            className="image tab1"
            onClick={() => {
              mapNavigationClick(OPEN_BOYS_MAP_URL);
            }}
          >
            <img src={openBoys} alt="Open Boys" />
          </div>
          <div
            className="image tab2"
            onClick={() => {
              mapNavigationClick(OPEN_GIRLS_MAP_URL);
            }}
          >
            <img src={openGirls} alt="Open Girls" />
          </div>
          <div
            className="image tab3"
            onClick={() => {
              mapNavigationClick(U_14_MAP_URL);
            }}
          >
            <img src={u14} alt="Under 14" />
          </div>
          <div
            className="image tab4"
            onClick={() => {
              mapNavigationClick(U_10_MAP_URL);
            }}
          >
            <img src={u10} alt="Under 10" />
          </div>
          <div
            className="image tab5"
            onClick={() => {
              mapNavigationClick(U_19_MAP_URL);
            }}
          >
            <img src={u19} alt="Under 19" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBodyComponent;
