import { useContext } from "react";
import CartModal from "../modal/CartModal";
import CartOpenContext from "../Store/CartOpenContext";
import CartContext from "../Store/CartContext";
import {currencyFormatter} from "../util/currencyFormatter"
import CartItem from "./CartItem";

export default function Cart(){
    const ctxValue = useContext(CartContext);
    const cartTotalPrice = ctxValue.items.reduce((total, item)=> total+ (item.quantity * item.price) , 0)
    const progressCtx = useContext(CartOpenContext);

    function handleCloseCart(){
        progressCtx.hideCart();
    }
    function handleIncreaseQuantity(item){
        ctxValue.addItem(item);
    }
    function handleReduceQuantity(id){
        ctxValue.removeItem(id);
    }
    function handleCheckout(){
        progressCtx.showCheckOut();
    }

    return(
        <CartModal open={progressCtx.progress === "cart"} onClose={progressCtx.progress == "cart" ? handleCloseCart : null }>
            <h3>Your Cart</h3>
            <ul>
            {
                ctxValue.items.map((item)=>{
                    return(
                        <CartItem key={item.id} 
                            item={item} 
                            add={handleIncreaseQuantity} 
                            reduce={handleReduceQuantity}
                        />
                    )
                } )
            }
            <p className="cart-total">{currencyFormatter.format(cartTotalPrice)}</p>
            </ul>
            <p className="modal-actions">
                <button className="buttonText" onClick={handleCloseCart}>Close</button>
                <button className="button" onClick={handleCheckout}>Go to Checkout</button>
            </p>
        </CartModal>
    )
}