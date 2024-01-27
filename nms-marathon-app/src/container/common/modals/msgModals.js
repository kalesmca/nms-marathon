import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PopupContext } from '../../../config/context';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_STATUS, adminList } from '../../../config/constants';
import { setAuthStatus } from '../../../redux/actions/players';
import ViewPlayerComponent from '../view-player/viewPlayer';
import EditPlayerComponent from '../../player-list/editPlayer';

const MessageModal = (props) => {

  const components = {
    ViewPlayerComponent: ViewPlayerComponent,
    EditPlayerComponent: EditPlayerComponent
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.players)
  const [flag, setFlag] = useState(true)
  const { msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(false); 
    }, 2000);
    return () => clearTimeout(timer);

  }, [])

  const loginAuthentication = () => {
    // let navPath = "/authed/registration" //Entry closed
    let navPath = ""
    let localAuth = JSON.parse(localStorage.getItem("auth"));
    let filteredList = adminList.filter((admin)=> admin.mobile == localAuth.mobile) 
    // if (localAuth.mobile == "8682890117") {
      if(filteredList?.length){
        
      localAuth.access = filteredList[0].auth;
      navPath = "/authed/player-list"
    } else if (playerState.regPlayerList?.length) {
      localAuth.access = AUTH_STATUS.REGISTERED;
      navPath = "/authed/dashboard"
    } else {
      localAuth.access = AUTH_STATUS.NOT_REGISTERED;
    }
    dispatch(setAuthStatus(localAuth.access))
    localStorage.setItem("auth", JSON.stringify(localAuth))

    navigate(navPath);
    setPopupObj({})
    setMsgPopupFlag(false);
  }


  const onClose = () => {
    if (navigationPath) {
      setTimeout(()=>{
        navigate(navigationPath);
      },1000)
      
      setMsgPopupFlag(false);
    } else {
      setMsgPopupFlag(false)
    }
  }
  const Component = popupObj.componentName ? components[popupObj.componentName] : "" 

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={msgPopupFlag}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{popupObj?.title ? popupObj.title : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            popupObj?.componentName ? <Component player={popupObj.props}/> : popupObj?.content ? popupObj.content : "Default MESSAGE"
          }
          {/* {popupObj?.content ? popupObj.content : "Default MESSAGE"} */}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            {popupObj?.btn1 ? popupObj.btn1 : "OK"}
          </Button>
          {popupObj.btn2 ?
            (<Button variant="primary" disabled={flag} onClick={() => { loginAuthentication() }} >
              {popupObj.btn2}
            </Button>) : ""}
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;