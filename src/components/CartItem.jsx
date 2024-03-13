export default function CartItem({item , add, reduce}){
    return(
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity}x{item.price}
            </p>
            <p className="cart-item-actions"> 
                <button onClick={()=>reduce(item.id)} disabled={item.quantity <= 0} >-</button>
                                {item.quantity}     
                <button onClick={()=>add(item)}>+</button>
            </p>
        </li>
    );
}