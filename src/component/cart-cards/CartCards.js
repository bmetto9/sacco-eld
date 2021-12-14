import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from '../button/Button'
import './cartCards.css'

function CartCards(props) {
    const [count, setCount] = useState(props.numberOfTickets);
    const [amount, setAmount] = useState(props.amount)

    const handleRemoveProduct = () => {}
    const handleAddProduct = () => {
        if (count >=1) {
            setCount(count + 1);
        }
    }

    useEffect(() => {
        setAmount(amount * count)
    }, [amount])

    return (
        <Row className='cartCard'>
            <Col md={3} sm={12}>
                <img src="https://res.cloudinary.com/emacon-production/image/upload/v1638855626/samples/bus-png-30663_gul0nu.png" className='cartCard__image'/>
            </Col>
            <Col md={9} sm={12} className='cartCard__Details'>
                <h4>{props.destination}</h4>
                <p>{`${props.date}   |   ${props.time}`}</p>
                <Row className='cost'>
                    <Col md={6}>
                        <h6>Amount: Ksh{amount}</h6>
                    </Col>
                    <Col md={6} className='quantity_btn'>
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
                    </Col>
                </Row>
                
            </Col>
        </Row>
    )
}

export default CartCards
