import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Button } from "react-bootstrap";
import bigStar from "../assets/bigStar.png"
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            console.log(data)
            setDevice(data)
        })
    }, [])

    return(
        <>
        <Container className="d-flex mt-4">
            <Col md={4}>
               <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
            </Col>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <h2 style={{textAlign: 'center'}}>{device.name}</h2>
                    <div className="d-flex align-items-center justify-content-center"
                        style={{background: `url(${bigStar}) no-repeat center center`, height: 240, width: 240, backgroundSize: 'cover', fontSize: 64}}>
                        {device.rating}
                    </div>
                </Row>
            </Col>
            <Col md={4}>
                <Card 
                    className="d-flex flex-column align-items-center justify-content-around"
                    style={{width:300, height:300, fontSize: 32 }}>
                    <h3>От: {device.price} руб.</h3>
                    <Button variant={"outline-dark"}>Добавить в корзину</Button>
                </Card>
            </Col>
            
        </Container>
        <Container className="d-flex flex-column mt-4">
                <h1>Характеристики</h1>
                {device.info && device.info.map((info , index) => {
                    return <Row key={info._id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.description}
                    </Row>
                })}
        </Container>
        </>
    )
}

export default DevicePage