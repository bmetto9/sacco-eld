import React, { useState } from 'react'
import './travelCard.css'
import Button from '../button/Button'

function TravelCard(props) {
    const [favStatus, setFaveStatus] = useState(false);
    const [count, setCount] = useState(0);
    const [seatsAvailable, setSeatsAvailable] = useState(props.totalSeatsAvailable)

    const handleFavStatus = () => {
        setFaveStatus(!favStatus);
    }

    const handleAddProduct = () => {
        if (count >= 0 && count <= 11){
            setCount(count + 1)
            setSeatsAvailable(seatsAvailable - 1);
        } else {
            setCount(0)
        }
    }

    const handleRemoveProduct = () => {
        if (count >= 0 && count <= 11){
            setCount(count - 1);
            setSeatsAvailable(seatsAvailable + 1);
        } else {
            setCount(0)
        }
    }

    return (
        <div className="card">
            <div className="imgBx">
                <img src="https://res.cloudinary.com/emacon-production/image/upload/v1638855626/samples/bus-png-30663_gul0nu.png"/>
            </div>

            <div className={`addFav-btn ${favStatus ? 'active' : ''}`}>
                <i class={`bx ${favStatus ? 'bxs-heart' : 'bx-heart'}`} onClick={handleFavStatus}></i>
            </div>

            <div className="contentBx">
                <p>{`${props.date}    ${props.time}`}</p>
                <h5>{props.travelDetails}</h5>
                <h2 className="price">{props.amount}.<small>00</small></h2>
                <p>{seatsAvailable} Seats Available</p>
                <div className="buyBtn">
                    {
                        count === 0 ? (
                            <Button
                                content="Book Seat"
                                contentColor='white'
                                contentSize="large"
                                onClickHandler={handleAddProduct}
                                buttonColor="main-bg"
                                borderRadius="all"
                            />
                        ) : (
                            <React.Fragment>
                                <Button
                                    content="-"
                                    contentColor='black'
                                    contentSize="large"
                                    onClickHandler={handleRemoveProduct}
                                    borderRadius="left"
                                />

                                <p>
                                    <i class='bx bx-bus'></i> {count}
                                </p>

                                <Button
                                    content="+"
                                    contentColor='black'
                                    contentSize="large"
                                    onClickHandler={handleAddProduct}
                                    borderRadius="right"
                                />
                            </React.Fragment>
                        )
                    }
                    
                </div>
                
            </div>
        </div>
    )
}

export default TravelCard
