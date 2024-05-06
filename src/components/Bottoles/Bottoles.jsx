import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottoles.css";
import { addToLs, getStoredCard, removeFromLs } from "../utilies/localStorage";
import Cart from "../Cart/Cart";

const Bottoles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottole.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLs(bottle.id);
  };

  const handleRemoveFromCart = id => {
      const remainingCart = cart.filter(bottle => bottle.id !== id);
      setCart(remainingCart);
      removeFromLs(id);

  }

  useEffect(() => {
    console.log(bottles.length);
    if (bottles.length > 0) {
      const storedCard = getStoredCard();
      console.log(storedCard, bottles);
      const saveCard = [];

      for(const id of storedCard){
        console.log(id)
        const bottle = bottles.find(bottle => bottle.id ===id)
        if(bottle){
            saveCard.push(bottle)
        }
      }  
      console.log('save Card', saveCard);
      setCart(saveCard)



    }
  }, [bottles]);

  return (
    <div>
      <h2>Bottoles Available : {bottles.length}</h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottoles;
