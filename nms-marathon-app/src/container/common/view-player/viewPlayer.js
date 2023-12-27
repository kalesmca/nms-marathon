import React, { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { PAYMENT_STATUS } from '../../../config/constants'
import { updateUser } from '../../../redux/API/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerList } from '../../../redux/actions/players';
import { formatAppDate } from '../../../config/utils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewPlayerComponent = (props) => {
    const localAuth = JSON.parse(localStorage.getItem("auth"));
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const playersState = useSelector((state)=> state.players)
    const updatePlayer = (status) => {
        let player = JSON.parse(JSON.stringify(props.player));
        player.paymentStatus = status;
        let updateInfoObj = {
            updatedBy: localAuth?.mobile,
            upatedOn: formatAppDate(new Date())
        }
        if (player.updatedByList) {
            player.updatedByList.push(updateInfoObj)
        } else {
            player.updatedByList = [{ updateInfoObj }]
        }
        updateUser(player);
        const timer = setTimeout(() => {
            dispatch(getPlayerList())
        }, 1000);
        return () => clearTimeout(timer);

    }
    console.log(props, playersState);

    return (
        <div>
            <Alert variant={"info"}>
                <Container>
                    <Row>
                        <Col>Name</Col>
                        <Col>{props?.player?.name}</Col>
                    </Row>
                    <Row>
                        <Col>Aadhar Number</Col>
                        <Col>{props?.player?.adharNumber}</Col>
                    </Row>
                    <Row>
                        <Col>Club/School</Col>
                        <Col>{props?.player?.clubName}</Col>
                    </Row>
                    <Row>
                        <Col>Date of Birth</Col>
                        <Col>{props?.player?.dob}</Col>
                    </Row>
                    <Row>
                        <Col>Payment Events</Col>
                        <Col><span>{props?.player?.selectedEvents[0]?.eventName},{" "}{props?.player?.selectedEvents[1]?.eventName}</span></Col>
                    </Row>
                    <Row>
                        <Col>Payment Status</Col>
                        <Col>{props?.player?.paymentStatus}</Col>
                    </Row>
                    <Row>
                        <Col>Player GPAY number </Col>
                        <Col>{props?.player?.upi}</Col>
                    </Row>
                    <Row>
                        <Col>Contact</Col>
                        <Col>{props?.player?.mobile}</Col>
                    </Row>
                    <Row>
                        <Col>Created BY</Col>
                        <Col>{props?.player?.registerMobile}</Col>
                    </Row>
                    {
                           playersState?.authStatus === "ADMIN_ACCESS" || playersState?.authStatus === "SUPER_ADMIN_ACCESS" ? (
                        // true ? (

                            <Row>
                                <Col><Button variant="primary" disabled={flag} onClick={() => { setFlag(true); updatePlayer(PAYMENT_STATUS[0]) }} > PAID </Button></Col>
                                <Col><Button variant="primary" disabled={flag} onClick={() => { setFlag(true); updatePlayer(PAYMENT_STATUS[3]) }} > NMS </Button></Col>
                                <Col> <Button variant="primary" disabled={flag} onClick={() => { setFlag(true); updatePlayer(PAYMENT_STATUS[2]) }} > UN_PAID </Button></Col>
                            </Row>) : ""

                    }

                </Container>









            </Alert>
        </div>
    )
}

export default ViewPlayerComponent;