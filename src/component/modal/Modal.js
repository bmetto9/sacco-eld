import React from 'react'
import './modal.css'

function Modal(props) {
    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onHide}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className='modal-title'>{props.title}</h2>
                    <a href="#" className="modal-closeBtn" onClick={props.onHide}>
                        <i class='bx bx-x'></i>
                    </a>
                </div>

                <div className="modal-body">
                    {
                        props.renderBody ? props.renderBody : (<></>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal
