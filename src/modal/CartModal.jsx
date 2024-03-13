import { useEffect, useRef } from "react";
import {createPortal} from "react-dom";
export default function CartModal({children, open, className="", onClose}){
    console.log("checkout");
    const modalRef = useRef();

    useEffect(()=>{
        if(open){
            modalRef.current.showModal();
        }
        return ()=>{
            modalRef.current.close();
        }
    }, [open])

    return createPortal(
        <dialog 
            ref={modalRef} 
            className= {`modal ${className}`}
            onClose={onClose} 
        >
            {children}
        </dialog>,
        document.getElementById('modal')
    );    
}