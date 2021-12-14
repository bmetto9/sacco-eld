import React from 'react'
import './form.css'
import Button from '../button/Button'
import { Form as BootstrapForm } from 'react-bootstrap'

function Form(props) {
    return (
        <div className="form">
            <form className={`${props.flexForm ? 'flex-form' : ''}`}>
                {
                    props.formInputData && props.renderForm ? (
                        <React.Fragment>
                            {
                                props.formInputData.map((item, index) => props.renderForm(item, index))
                            }
                        </React.Fragment>
                    ) : null
                }

                {
                    props.auth ? (
                        <div className="remember__forgotPass">
                            {/* <BootstrapForm.Group className="" controlId="formBasicCheckbox">
                                <BootstrapForm.Check type="checkbox" label="Remember Me" />
                            </BootstrapForm.Group> */}

                            <a href="#" onClick={props.handleForgotPasswordBtn}>Forgot Password?    </a>
                        </div>
                    ) : null
                }

                <Button
                    content={props.buttonContent}
                    onClickHandler={props.handleForm}
                    borderRadius={props.borderRadius}
                    buttonColor={props.buttonColor}
                />
            </form>
        </div>
    )
}

export default Form
