import React, { useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Form from '../form/Form';
import './navigation.css'
import menuData from '../../assets/data/menu.json'
import Modal from '../modal/Modal'

const renderLoading = () => (
    <Spinner animation="border" variant="light"/>
)

const renderSearchForm = (item, index) => (
    <React.Fragment key={index}>
        <div className='input'>
            <input
                required
                type={item.type}
                placeholder={item.placeholder}
                value={item.stateValue}
                onChange={item.onChange}
            />
        </div>
    </React.Fragment>
)

const renderSignInForm = (item, index) => (
    <React.Fragment key={index}>
        <div className='input-black'>
            <input
                required
                type={item.type}
                placeholder={item.placeholder}
                value={item.value}
                onChange={item.onChange}
            />
        </div>
    </React.Fragment>
)

const renderSignUpForm = (item, index) => (
    <React.Fragment key={index}>
        <div className='input-black'>
            <input
                required
                type={item.type}
                placeholder={item.placeholder}
                value={item.value}
                onChange={item.onChange}
            />
        </div>
    </React.Fragment>
)

const renderSignInModal = (signInputData, handleSignUpModal, handleForgotPasswordModal) => {
    const socialIcons = [
        {
            icon: "bx bxl-google",
            targetLink: ''
        },
        {
            icon: "bx bxl-facebook-circle",
            targetLink: ''
        }
    ]
    return (
        <div>
            <h6>Welcome Back! Sign In to continue shopping with us</h6>
            <Form
                flexForm={false}
                formInputData={signInputData}
                renderForm={(item, index) => renderSignInForm(item, index)}
                buttonContent="Sign In"
                buttonColor="main-bg"
                buttonContentColor="white"
                borderRadius="all"
                auth={true}
                handleForgotPasswordBtn={handleForgotPasswordModal}
            />

            <span className="remember__forgotPass">
                <a href='#' onClick={handleSignUpModal}>Do not have an account? Create one</a>
            </span>
        </div>
        
    )
}

const renderSignUpModal = (signUpInputData, handleSignInModal) => {
    const socialIcons = [
        {
            icon: "bx bxl-google",
            targetLink: ''
        },
        {
            icon: "bx bxl-facebook-circle",
            targetLink: ''
        }
    ]
    return (
        <div>
            <h6>Welcome Back! Sign In to continue shopping with us</h6>
            <Form
                flexForm={false}
                formInputData={signUpInputData}
                renderForm={(item, index) => renderSignUpForm(item, index)}
                buttonContent="Sign Up"
                buttonColor="main-bg"
                buttonContentColor="white"
                borderRadius="all"
            />

            <span className="remember__forgotPass">
                <a href='#' onClick={handleSignInModal}>Already have an account? Sign In</a>
            </span>
        </div>
        
    )
}

const renderForgotPasswordModal = () => (
    <></>
)

function Navigation(props) {
    const [searchProduct, setSearchProduct] = useState();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authType, setAuthType] = useState('sign-in');

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [yearOfBirth, setYearOfBirth] = useState();

    const searchInputData = [
        {
            type: 'text',
            placeholder: 'Search....',
            value: searchProduct,
            onChange: (e) => setSearchProduct(e.target.value)
        }
    ]

    const signInInputData = [
        {
            type: 'text',
            placeholder: 'Email',
            value: email,
            onChange: (e) => setEmail(e.target.value)
        },
        {
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value)
        }
    ]

    const signUpInputData = [
        {
            type: 'text',
            placeholder: 'Name',
            value: name,
            onChange: (e) => setName(e.target.value)
        },
        {
            type: 'text',
            placeholder: 'Email Address',
            value: email,
            onChange: (e) => setEmail(e.target.value)
        },
        {
            type: 'text',
            placeholder: 'Phone Number',
            value: phone,
            onChange: (e) => setPhone(e.target.value)
        },
        {
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value)
        },
        {
            type: 'text',
            placeholder: `Birth year, to verify if you're 18+ `,
            value: yearOfBirth,
            onChange: (e) => setYearOfBirth(e.target.value)
        }
    ]

    const handleOnCloseAuthModal = () => {
        setShowAuthModal(!showAuthModal);
        setAuthType('sign-in')
    }

    const handleSignInModal = () => {
        setAuthType('sign-in')
    }

    const handleSignUpModal = () => {
        setAuthType('sign-up')
    }

    const handleForgotPasswordModal = () => {
        setAuthType('forgot-password')
    }

    return (
        <div className={`navigation ${props.background}`}>
            <Link to="/" className="company-logo">
                <img src="https://res.cloudinary.com/emacon-production/image/upload/v1638855626/samples/bus-png-30663_gul0nu.png" alt="The Outlet" />
            </Link>
            
            <Form
                flexForm={true}
                formInputData={searchInputData}
                renderForm={(item, index) => renderSearchForm(item, index)}
                buttonContent="Search"
                borderRadius="right"
            />

            {
                menuData.map((item, index) => (
                    <Link to={item.link} key={index} className="menuLinks">
                        {item.placeholder}
                    </Link>
                ))
            }

            <div className="authentication-cart-wrapper">
                <div className="authentication-btn" onClick={() => setShowAuthModal(true)}>
                    <i class='bx bx-user'></i>
                    <p>Sign In</p>
                </div>

                <Modal
                    show={showAuthModal}
                    onHide={handleOnCloseAuthModal}
                    title={authType === 'sign-in' ? 'Sign In' : 'Sign In' && authType === 'sign-up' ? 'Sign Up' : '' && authType === 'forgot-password' ? 'Forgot Password?' : ''}
                    renderBody={authType === 'sign-in' ? renderSignInModal(signInInputData, handleSignUpModal, handleForgotPasswordModal) : renderSignInModal(signInInputData, handleSignUpModal, handleForgotPasswordModal) && authType === 'sign-up' ? renderSignUpModal(signUpInputData, handleSignInModal) : renderSignInModal(signInInputData, handleSignUpModal, handleForgotPasswordModal) && authType === 'forgot-password' ? renderForgotPasswordModal : renderSignInModal(signInInputData, handleSignUpModal, handleForgotPasswordModal)}
                />

                <div className="cart-btn">
                    <i class='bx bx-cart' ></i>
                    <div className="cart-quantity">
                        2
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
