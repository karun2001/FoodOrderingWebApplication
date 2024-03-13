import logoImg from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../Store/CartContext";
import CartOpenContext from "../Store/CartOpenContext"; 

export default function Header(){
    const ctxValue = useContext(CartContext);
    const totalCartItems = ctxValue.items.reduce((acc, item)=> acc+item.quantity ,0)
    const cartOpenctx = useContext(CartOpenContext);
    function handleShowCart(){
        cartOpenctx.showCart();
    }

    return(
        <div id="main-header">
            <div id="title">
                <img src={logoImg}  alt="food ordering app logo" />
                <h1 id="title">Food Ordering App</h1> 
            </div>
            <button 
                className="text-button"
                onClick={handleShowCart} 
            >Cart ({totalCartItems}) </button>      
        </div>
    );
}