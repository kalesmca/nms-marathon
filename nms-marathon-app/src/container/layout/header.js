import React, { useEffect, useState } from 'react';
import { AUTH_STATUS } from '../../config/constants';
import './header.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { setAuthStatus } from '../../redux/actions/players';
import { global } from '../../config/locale';
import logoutIcon from '../../assets/power-off-solid.svg';
import signout from '../../assets/signout.svg';
const HeaderComponent = () => {
  const playerState = useSelector((state) => state?.players);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logOutFlag, setLogOutFlag] = useState(false);

  const navigation = (path) => {
    navigate(path);
  };
  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem('auth'));
    if (localAuth && localAuth.mobile) {
      setLogOutFlag(true);
    } else {
      setLogOutFlag(false);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem('auth');
    dispatch(setAuthStatus(AUTH_STATUS.PENDING));
    navigate('');
  };
  // const onPay = () =>{
  //   if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
  //     // window.location.href = "upi://pay?pa=merchant@upi&pn=MyStore&am=250&cu=INR";
  //     console.log("mobile mode")
  //     const upiId = "kalees.sundari@ybl";   // replace with your UPI ID
  //     const name = "Sundareswari";
  //     const amount = 250;             // quoted amount
  //     const note = "Order Payment";

  //     const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
  //       name
  //     )}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  //     window.location.href = upiUrl;
  //   } else {
  //     // alert("UPI payment works only on mobile devices");
  //     console.log("web mode")
  //   }
  // }

  const openUpiApp = () => {
  if (!/Android|iPhone|iPad/i.test(navigator.userAgent)) {
    alert("UPI payment works only on mobile");
    return;
  }

  const upiId = "nmssports@sbi";
  const name = "NMS SPORTS ACADEMY AND WELFARE TRUST";
  const note = "marathon fee test";

  // IMPORTANT: Do NOT prefill amount for personal UPI
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&cu=INR&tn=${encodeURIComponent(note)}`;

  window.location.href = upiUrl;
};
  return (
    <div>
      <div className="header">{global.label.clubName}</div>
      <p className="theme">உலகிற்கே உணவு கொடுக்கும் உன்னதப் பணி செய்பவனே விவசாயி.</p>
      {/* <img src={logoutIcon} alt="SVG Image"></img> */}
      {playerState?.authStatus === 'ADMIN_ACCESS' ||
      playerState?.authStatus === 'SUPER_ADMIN_ACCESS' ? (
        // true? (

        <div className="nav-links">
          <nav>
            <div className="link">
              {/* <i className="fas fa-home" onClick={() => { navigation("/dashboard") }}></i> */}
              <Link to="/authed/dashboard">Dashboard</Link>
            </div>
            <div className="link">
              {/* <i className="fas fa-address-card" onClick={() => { navigation("/member-list") }}></i> */}
              <Link to="/authed/player-list">Player List</Link>
            </div>
            <div className="link">
              {/* <i className="fas fa-chart-line" onClick={() => { navigation("/member-info") }}></i> */}
              <Link to="/authed/registration">Registration</Link>
            </div>
            <div className="link">
              {/* <i className="fas fa-chart-line" onClick={() => { navigation("/member-info") }}></i> */}
              <Link to="/authed/source">Source</Link>
            </div>
            {/* <div className="link">
              <Link onClick={()=>{openUpiApp()}}>PAY</Link>
            </div> */}
          </nav>
        </div>
      ) : (
        ''
      )}
      {logOutFlag || playerState.authStatus != AUTH_STATUS.PENDING ? (
        <div
          onClick={() => {
            logout();
          }}
          className="logout-container"
        >
          <span>
            <a className="logout">Log-out</a>
          </span>
          <span>
            <img src={logoutIcon} alt="SVG Image"></img>
          </span>

          {/* <Button variant="primary" onClick={() => { logout() }}>
                        Logout
                    </Button> */}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default HeaderComponent;
