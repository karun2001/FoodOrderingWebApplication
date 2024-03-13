import Menu from "./components/Menu";
import Header from "./components/Header";
import { CartContextProvider } from "./Store/CartContext.jsx";
import { fetchData } from "./http.js";
import { useEffect, useState } from "react";
import Cart from "./components/Cart.jsx";
import { CartOpenContextProvider } from "./Store/CartOpenContext.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {

  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  useEffect(()=>{
    async function fetchMeals(){
      try{
        const fetchedMeals = await fetchData();
        setMeals(fetchedMeals);
      } catch(error) {
        console.log(error);
        setError({message: error.message || "Failed to fetch"});
      } 
    }
    fetchMeals();
  },[]);


  
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