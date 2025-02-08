import React from 'react'
import './modal.css'

export default function Modal({children,onClose}) {
    return (
        <>
            <div className="backdrop" onClick={onClose}> </div>
                <dialog className='modal' open>
                    {children}
                </dialog>   
        </>
    )
}