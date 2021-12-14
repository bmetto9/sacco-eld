import React, { useState, useRef, useEffect, useContext } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Form from '../form/Form';
import './navigation.css'
import menuData from '../../assets/data/menu.json'
import Modal from '../modal/Modal'
import cartData from '../../assets/data/CartData.json'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../helpers/firebaseConf';
import CartCards from '../cart-cards/CartCards';
import Button from '../button/Button';
import { validEmail } from '../../regex/Regex';

import queryString from 'query-string'
import {AuthContext} from '../../context/Auth'

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user click toogle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)){
            content_ref.current.classList.toggle('active')
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)){
                content_ref.current.classList.remove('active')
            }
        }
    })
}

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

const renderSignInModal = (signInputData, handleSignUpModal, handleForgotPasswordModal, handleSignInForm, loading) => {
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
                buttonContent={loading ? renderLoading() : "Sign In"}
                buttonColor="main-bg"
                buttonContentColor="white"
                borderRadius="all"
                auth={true}
                handleForgotPasswordBtn={handleForgotPasswordModal}
                handleForm={handleSignInForm}
            />

            <span className="remember__forgotPass">
                <a href='#' onClick={handleSignUpModal}>Do not have an account? Create one</a>
            </span>
        </div>
        
    )
}

const renderSignUpModal = (signUpInputData, handleSignInModal, handleSignUpform, loading) => {
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
                buttonContent={loading ? renderLoading() : "Sign Up"}
                buttonColor="main-bg"
                buttonContentColor="white"
                borderRadius="all"
                handleForm={handleSignUpform}
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
    // const { currentUser } = useContext(AuthContext)

    const [loading, setLoading] = useState(false);
    const [searchProduct, setSearchProduct] = useState();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authType, setAuthType] = useState('sign-in');

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();

    const [emailErr, setEmailErr] = useState(false);

    const menu_ref = useRef(null);
    const menu_toggle_ref = useRef(null);

    clickOutsideRef(menu_ref, menu_toggle_ref);

    const setActiveMenu = () => menu_ref.current.classList.add('active');
    const closeMenu = () => menu_ref.current.classList.remove('active');

    useEffect(() => {
        const { signIn } = queryString.parse(window.location.search)
        setShowAuthModal(signIn);
        setAuthType('sign-in')
    })

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

    const handleSignUpform = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (!validEmail.test(email)){
                alert('Invalid Email Format');
                setLoading(false);
            } else {
                const user = await createUserWithEmailAndPassword( auth, email, password); 
                console.log(user); 
                setLoading(false);
                setShowAuthModal(false);
            }
        } catch (error) {
            alert(error.message)
            setLoading(false);
        }
        
    }

    const handleSignInForm = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (!validEmail.test(email)){
                setEmailErr(true);
                alert('Invalid Email Format')
                setLoading(false);
            } else {
                const user = await signInWithEmailAndPassword(auth, email, password);
                console.log(user);
                setLoading(false);
                setShowAuthModal(false);
            }
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    const handleSignOut = async () => {
        await signOut(auth )
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
                {/* {
                    currentUser === undefined || null ? (
                        <div className="authentication-btn" onClick={() => setShowAuthModal(true)}>
                            <i class='bx bx-user'></i>
                            <p>Sign In</p>
                        </div>
                    ) : (
                        <div className="authentication-btn">
                            <i class='bx bx-user'></i>
                            <p>{currentUser.email}</p>
                        </div>
                    )
                } */}

                    <div className="authentication-btn" onClick={() => setShowAuthModal(true)}>
                            <i class='bx bx-user'></i>
                            <p>Sign In</p>
                        </div>
                

                <Modal
                    show={showAuthModal}
                    onHide={handleOnCloseAuthModal}
                    title={authType === 'sign-in' ? 'Sign In' : 'Sign In' && authType === 'sign-up' ? 'Sign Up' : '' && authType === 'forgot-password' ? 'Forgot Password?' : ''}
                    renderBody={authType === 'sign-in' ? renderSignInModal(signInInputData, handleSignUpModal, handleForgotPasswordModal, handleSignInForm, loading, emailErr) : [] && authType === 'sign-up' ? renderSignUpModal(signUpInputData, handleSignInModal, handleSignUpform, loading) : renderSignInModal(signInInputData, handleSignUpModal, handleForgotPasswordModal, emailErr) && authType === 'forgot-password' ? renderForgotPasswordModal : renderSignInModal(signInInputData, handleSignUpModal, handleForgotPasswordModal)}
                />

                <div 
                    className="cart-btn"
                    ref={menu_toggle_ref}
                    onClick={() => setActiveMenu()}
                >
                    <i class='bx bx-cart' ></i>
                    <div className="cart-quantity">
                        2
                    </div>
                </div>
                <div className='cart-menu' ref={menu_ref}>
                    <h4>Cart</h4>
                    <div 
                        className='cart-menu__close'
                        onClick={() => closeMenu()}
                    >
                        <i className="bx bx-x"></i>
                    </div>

                    {
                        cartData.map((item, index) => (
                            <CartCards
                                key={index}
                                destination={item.destination}
                                date={item.date}
                                time={item.depatureTime}
                                amount={item.amount}
                                numberOfTickets={item.numberOfTickets}
                            />
                        ))
                    }
                    

                    <div className='checkout-btn'>
                        <Button
                            content="Check Out"
                            buttonColor='main-bg'
                            onClickHandler={''}
                            borderRadius="all"
                            action='/checkout'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
