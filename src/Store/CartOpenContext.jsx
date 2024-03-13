import { createContext, useState } from "react";

export const CartOpenContext = createContext({
    progress: '',
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckOut: ()=>{},
    hideCheckOut: ()=>{}, 
} );

export function CartOpenContextProvider({children}){
    const [progress, setProgress] = useState('');
    
    function showCart(){
        setProgress('cart');
    }
    function hideCart(){
        setProgress('')
    }
    function showCheckOut(){
        setProgress('checkout');
    }
    function hideCheckOut(){
        setProgress('');
    }

    const ctxValue = {
        progress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut,
    }
    
    return(
        <CartOpenContext.Provider value={ctxValue}>
            {children}
        </CartOpenContext.Provider>
    )

}

export default CartOpenContext;