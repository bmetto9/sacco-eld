import React, { useState, useEffect } from 'react'
import Navigation from '../../component/navigation/Navigation'
import './travel.css'
import queryString from 'query-string'

import Destinations from '../../assets/data/Destinations.json'
import TravelDetails from '../../assets/data/travelDetailList.json'
import { Row, Col } from 'react-bootstrap'
import TravelCard from '../../component/travelCard/TravelCard'

function Travel() {
    const [destination, setDestination] = useState();

    useEffect(() => {
        const { category } = queryString.parse(window.location.search);
        setDestination(category);
    })

    return (
        <div className='travel'>
            <Navigation 
                background='theme-color' 
                logo='https://res.cloudinary.com/emacon-production/image/upload/v1638427484/the-outlet/Artboard_7_copy_7png_j6chrh.png'
            />

            <div className='section-1'>
                <Row>
                    {
                        TravelDetails.map((item, index) => (
                            <React.Fragment key={index}>
                                {
                                    item.travelDetails === 'Nairobi - Eldoret' && destination === "nairobi-eldoret" ? (
                                        <Col md={3}>
                                            <TravelCard
                                                time={item.time}
                                                day={item.day}
                                                date={item.date}
                                                travelDetails={item.travelDetails}
                                                totalSeatsAvailable={item.totalSeats}
                                                amount={item.amount}
                                            />
                                        </Col>
                                        
                                    ) : (<></>) &&

                                    item.travelDetails === 'Eldoret - Nairobi' && destination === "eldoret-nairobi" ? (
                                        <Col md={3}>
                                            <TravelCard
                                                time={item.time}
                                                day={item.day}
                                                date={item.date}
                                                travelDetails={item.travelDetails}
                                                totalSeatsAvailable={item.totalSeats}
                                                amount={item.amount}
                                            />
                                        </Col>
                                        
                                    ) : (<></>)
                                }
                                
                            </React.Fragment>
                        ))
                    }
                </Row>
                
                
            </div>

            <p>Hello</p>
        </div>
    )
}

export default Travel
