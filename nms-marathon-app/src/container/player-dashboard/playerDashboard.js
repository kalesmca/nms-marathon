import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerList } from '../../redux/actions/players';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { PopupContext } from '../../config/context';
import Alert from 'react-bootstrap/Alert';
import './playerDashboard.scss';
import qrImage from '../../assets/paraman.jpeg';

const PlayerDashboard = () => {
  const playersState = useSelector((state) => state.players);
  const [playerList, setPlayerList] = useState(playersState.regPlayerList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setMsgPopupFlag, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext);

  useEffect(() => {
    console.log('appSate:', playersState);
  });
  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem('auth'));
    if (!localAuth || !localAuth.mobile) {
      navigate('');
    }
  }, []);
  useEffect(() => {
    setPlayerList(playersState.regPlayerList);
  }, [playersState]);

  const navigation = () => {
    setNavigationPath('registration');
    setPopupObj({ title: 'SUCCESS', content: 'Add more player' });
    setMsgPopupFlag(true);
  };

  const getStatusClass = (status) => {
    if (status?.toLowerCase() === 'paid') return 'status-paid';
    return 'status-pending';
  };

  return (
    <div className="dashboard-container">
      <div >
        <Alert variant={'warning'} className="payment-dashboard-info">
                  
                  <div className="payment-amount">
                    <span >Registration Fee: </span>
                    <span className="currency">₹</span>
                    <span className="price">200</span>
                    <span className="per-player">per player</span>
                  </div>
                  <div className="qr-section">
                    <p className="scan-text">Scan QR Code to Pay via UPI</p>
                    <img src={qrImage} style={{ width: '200px' }} alt="Scan QR to pay ₹200" />
                  </div>
                </Alert>
      </div>
      <div className="table-container">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Chest No</th>
              <th>T-Shirt</th>
              {/* <th>Pay Status</th> */}
            </tr>
          </thead>
          <tbody>
            {playerList?.length ? (
              playerList.map((player, pIndex) => {
                return (
                  <tr key={pIndex}>
                    <td data-label="#">{pIndex + 1}</td>
                    <td data-label="Name">{player.name}</td>
                    <td data-label="Category">{player.playerCategory}</td>
                    <td data-label="Chest No">{player.chestNumber || '-'}</td>
                    <td data-label="T-Shirt">{player.tShirtSize}</td>
                    {/* <td data-label="Status">
                      <span className={getStatusClass(player.paymentStatus)}>
                        {player.paymentStatus || 'Pending'}
                      </span>
                    </td> */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  No Players Registered Yet
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div>
        <Button
          className="btn-add-player"
          onClick={() => {
            navigation();
          }}
        >
          Add More Player
        </Button>
      </div>
      <div>
        <Alert variant={'warning'}>
          <div>Contact : Arivu : 9994374553/ Kalimuthu: 9944419808/ Kaleeswaran : 8682890117</div>
        </Alert>
      </div>
    </div>
  );
};

export default PlayerDashboard;
