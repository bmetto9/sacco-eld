import React, { useState, useEffect } from 'react'
import './home.css'
import { Col, Row } from 'react-bootstrap'
import Destinations from '../../assets/data/Destinations.json'
import Navigation from '../../component/navigation/Navigation';
import TravelDetails from '../../assets/data/travelDetailList.json'
import TravelCard from '../../component/travelCard/TravelCard';

function Home() {
    const [navBackground, setNavBackground] = useState('transparent');
    const [navIcon, setNavIcon] = useState('https://res.cloudinary.com/emacon-production/image/upload/v1638363592/the-outlet/Artboard_7_copy_3png_cyyl9i.png')

    useEffect(() => {
        
    }, [])
    const changeNavigationBackground = () => {
        if(window.scrollY >= 80) {
            setNavBackground('theme-color');
            setNavIcon('https://res.cloudinary.com/emacon-production/image/upload/v1638427484/the-outlet/Artboard_7_copy_7png_j6chrh.png')
        } else {
            setNavBackground('transparent')
            setNavIcon('https://res.cloudinary.com/emacon-production/image/upload/v1638363592/the-outlet/Artboard_7_copy_3png_cyyl9i.png')
        }
    }

    window.addEventListener('scroll', changeNavigationBackground);

    return (
        <div className="home">
            <Navigation background={navBackground} logo={navIcon}/>
            {/* <Carousel/> */}

            <div className="hero__section">
                <Row>
                    <Col md={6} className="title">
                        <div>
                            <h1>Eldoret Express</h1>
                            <p>Your travel partner of choice</p>
                        </div>
                        
                    </Col>
                    <Col md={6} className="hero-image">
                        <img src="https://res.cloudinary.com/emacon-production/image/upload/v1638860334/samples/bus-png-30669_1_mbjntx.png"/>
                    </Col>
                </Row>
            </div>

            <Row className="section-2">
            {
                Destinations.map((item, index) => (
                    <React.Fragment>
                        {
                            item.destination === "Nairobi - Eldoret" ? (
                                <React.Fragment>
                                    <Col md={2} className="adBanner">
                                        <div>
                                            <h3>Nairobi - Eldoret</h3>
                                        </div>
                                    </Col>
                                    <Col md={10}>
                                        <Row className="productList">
                                            {
                                                TravelDetails.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        {
                                                            item.travelDetails === "Nairobi - Eldoret"  ? (
                                                                <Col md={3} >
                                                                    <TravelCard
                                                                        time={item.time}
                                                                        day={item.day}
                                                                        date={item.date}
                                                                        travelDetails={item.travelDetails}
                                                                        totalSeatsAvailable={item.totalSeats}
                                                                        amount={item.amount}
                                                                    />
                                                                </Col>
                                                            ) : null
                                                        }
                                                    </React.Fragment>
                                                    
                                                    
                                                ))
                                            } 
                                        </Row>

                                        
                                    </Col>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Col md={10}>
                                        <Row className="productList">
                                            {
                                                TravelDetails.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        {
                                                            item.travelDetails === "Eldoret - Nairobi"  ? (
                                                                <Col md={3} >
                                                                    <TravelCard
                                                                        time={item.time}
                                                                        day={item.day}
                                                                        date={item.date}
                                                                        travelDetails={item.travelDetails}
                                                                        totalSeatsAvailable={item.totalSeats}
                                                                        amount={item.amount}
                                                                    />
                                                                </Col>
                                                            ) : null
                                                        }
                                                    </React.Fragment>
                                                    
                                                    
                                                ))
                                            } 
                                        </Row>

                                        
                                    </Col>
                                    <Col md={2} className="adBanner">
                                        <div>
                                            <h3>Eldoret - Nairobi</h3>
                                        </div>
                                    </Col>
                                </React.Fragment>
                            )
                        }
                    </React.Fragment>
                ))
            }
            </Row>

            
        </div>
    )
}

export default Home
