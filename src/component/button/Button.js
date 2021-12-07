import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'

function Button(props) {
    return (
        <Link to={props.action ? props.action : "" }>
            <button 
                className={`${props.buttonColor === "main-bg" ? "main-bg" : "button"} ${props.contentColor === 'black' ? 'black' : 'white'} ${props.borderRadius === "left" ? "radiusLeft" : ""} ${props.borderRadius === "right" ? "radiusRight" : ""} ${props.borderRadius === "all" ? "radiusAll" : ""}` }  
                onClick={props.onClickHandler}
            >
                <span className={`button__content ${props.contentSize === 'large' ? 'large' : 'normal'}`}>
                    {
                        props.leftIcon === undefined ? null : (
                            <i class={props.leftIcon}></i>
                        )
                    }

                    {props.content} 

                    {
                        props.rightIcon === undefined ? null : (
                            <i class={props.rightIcon}></i>
                        )
                    }
                </span>
            </button>
        </Link>
    )
}

export default Button
