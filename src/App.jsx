import Menu from "./components/Menu";
import Header from "./components/Header";
import { CartContextProvider } from "./Store/CartContext.jsx";
import { useEffect, useState } from "react";
import Cart from "./components/Cart.jsx";
import { CartOpenContextProvider } from "./Store/CartOpenContext.jsx";
import Checkout from "./components/Checkout.jsx";
import useHttp from "./hooks/useHttp.jsx";
const config = {};
function App() {

  const {data:meals, error, isLoading} = useHttp("http://localhost:3000/meals",config,[]);
  if(isLoading){
    return (<h1>Loading...</h1>);
  }
  if(error){
    return(<h1>Error oocured {error.message}</h1>)
  }
  
  return (
    <CartOpenContextProvider>
      <CartContextProvider>
        <Header/>
        <Cart/>
        <Checkout />
        <Menu meals={meals} />
      </CartContextProvider>
    </CartOpenContextProvider>

  );
}

export default App;