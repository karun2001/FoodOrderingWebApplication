import { useContext, useState } from "react";
import CartModal from "../modal/CartModal";
import {CartContext} from "../Store/CartContext";
import {CartOpenContext} from "../Store/CartOpenContext";
import Input from "./Input";
import { putData } from "../http";

export default function Checkout({onClose}){    
 
    const ctxValue = useContext(CartContext);
    const items = ctxValue.items;
    const cartTotalPrice = ctxValue.items.reduce(
        (total, item)=> total+ (item.quantity * item.price) , 0);
    const ctxProgress = useContext(CartOpenContext);
    
    function handleClose(){
        ctxProgress.hideCheckOut();
    }

    function handleSubmit(event){
        event.preventDefault();
        
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        
        fetch('http://localhost:3000/orders',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              order: {
                items,
                customer: customerData
              }  
            })

        });
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
                <p className="modal-actions"> 
                    <button className="buttonText" type="button" onClick={handleClose}>Close</button>
                    <button className="button" >Submit Order</button>
                </p>
            </form>
        </CartModal>
    );
}