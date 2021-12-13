import React from 'react'
import Navigation from '../../component/navigation/Navigation'
import './travel.css'

import Destinations from '../../assets/data/Destinations.json'
import TravelDetails from '../../assets/data/travelDetailList.json'
import { Row } from 'react-bootstrap'

function Travel() {
    return (
        <div className='travel'>
            <Navigation 
                background='theme-color' 
                logo='https://res.cloudinary.com/emacon-production/image/upload/v1638427484/the-outlet/Artboard_7_copy_7png_j6chrh.png'
            />

            <div className='section-1'>
                {
                    TravelDetails.map((item, index) => (
                        <React.Fragment key={index}>
                            {
                                item.travelDetails === 'Nairobi - Eldoret' ? (
                                    <React.Fragment>
                                        <div className='date'>
                                            {item.date}
                                        </div>

                                        <Row></Row>
                                    </React.Fragment>
                                    
                                ) : null
                            }
                            
                        </React.Fragment>
                    ))
                }
                
            </div>

            <p>Hello</p>
        </div>
    )
}

export default Travel
