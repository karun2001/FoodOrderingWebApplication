import { useContext, useState } from "react";
import CartModal from "../modal/CartModal";
import {CartContext} from "../Store/CartContext";
import {CartOpenContext} from "../Store/CartOpenContext";
import Input from "./Input";
import useHttp from "../hooks/useHttp";

const config = {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json' 
    },
}

export default function Checkout({onClose}){    
 
    const ctxValue = useContext(CartContext);
    const items = ctxValue.items;
    const cartTotalPrice = ctxValue.items.reduce(
        (total, item)=> total+ (item.quantity * item.price) , 0);
    const ctxProgress = useContext(CartOpenContext);
    
    const { data, error, isLoading, sendRequest, clearData} = useHttp('http://localhost:3000/orders', config,)


    function handleClose(){
        ctxProgress.hideCheckOut();
    }

    function handleEmptyCart(){
        ctxProgress.hideCheckOut();
        ctxValue.emptyCart();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();
        
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); 

        sendRequest( JSON.stringify({
                    order: { items,
                             customer: customerData}  
                    })
        );
    }
    let modalActions = 
    <p className="modal-actions"> 
        <button className="buttonText" type="button" onClick={handleClose}>Close</button>
        <button className="button" >Submit Order</button>
    </p>
    
    if(isLoading){
        modalActions = <span>Submitting form...</span>
    }
    
    if(data && !error){
        console.log("this is data", data);
        return (
        <CartModal open={ctxProgress.progress == "checkout"} onClose={handleClose}>
            <h2>Success</h2>
            <p>Your order was placed sucessfully.</p>
            <p className="modal-actions">
                <button onClick={handleEmptyCart} className="button">Okay</button>
            </p>
        </CartModal>)
    }
    return(
        <CartModal open={ctxProgress.progress == "checkout"} onClose={handleClose} >
            <h3>Checkout</h3>
            <p>Total Amount {cartTotalPrice}</p>
            <form onSubmit={handleSubmit}>
                <Input id="name" label="Name" type="text"/>
                <Input id="email" label="Email" type="email"/>
                <Input id="street" label="Street" type="text"/>
                <div className="control-row">
                    <Input id="postal-code" label="Postal Code" type="text" />
                    <Input id="city" label="City" type="text"/>
                </div>  
                {error && <p>Failed to submit order..</p>}     
                {modalActions}
            </form>
        </CartModal>
    );
}