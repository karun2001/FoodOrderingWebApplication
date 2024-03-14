import { createContext, useReducer } from "react"

export const CartContext = createContext({
    items : [],
    addItem: (item)=>{},
    removeItem: (id)=>{},
    emptyCart: ()=>{},
});


function cartReducer(state, action){
    if(action.type === "ADD_ITEM"){
        
        const oldItems = [...state.items];
        const indexOfItem = oldItems.findIndex((item)=> item.id === action.meal.id);

        if(indexOfItem> -1){
            const selectedItem = oldItems[indexOfItem];
            let newItem;
            newItem = { ...selectedItem, 
                        quantity: selectedItem.quantity+1,
                      }
            oldItems[indexOfItem] = newItem;

        }
        else{
            const newItem = { ...action.meal ,
                             quantity: 1,
                            }
            oldItems.push(newItem);
        }
        return {...state, items: [...oldItems]}
    } 
    if(action.type == "REMOVE_ITEM"){
        let oldItems = [...state.items];
        const indexOfItem = oldItems.findIndex((meal)=> meal.id === action.id);
        const quantityAtIndex = oldItems[indexOfItem].quantity;
        const existingCartItem = oldItems[indexOfItem];
        if(quantityAtIndex > -1){
            
            const updatedItem = {
                ...existingCartItem,
                quantity: quantityAtIndex-1, 
            }
            oldItems[indexOfItem] = updatedItem;
        } else {
            oldItems.splice(indexOfItem, 1);
        }
        return {...state, items: oldItems};

    }     
    if(action.type == "EMPTY_CART"){
        return {items: []}
    }
    return state;
}


export function CartContextProvider({children}){
    
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});
    
    function addItem(meal){
        console.log(meal);
        dispatchCartAction({type: "ADD_ITEM", meal})
    }
    function removeItem(id){
        dispatchCartAction({type: "REMOVE_ITEM", id})
    }
    function emptyCart(){
        
        dispatchCartAction({type: "EMPTY_CART"})
    }
    const ctxValue = {
        items: cart.items,
        addItem,
        removeItem, 
        emptyCart,   
    };
    
    console.log(ctxValue.items);
    return(
        <CartContext.Provider value = {ctxValue}>
            {children}
        </CartContext.Provider>
    );    
}

export default CartContext;

