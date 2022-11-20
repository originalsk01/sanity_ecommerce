import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const [totalQuantities, setTotalQuantities] = useState(0);

    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        //Check if product already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        //We increase the total price of the cart and the cart quantity
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {

            //Update the cart items
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart. `);
    }

    const onRemove = (product) => {
        //Find product in the cart
        foundProduct = cartItems.find((item) => item._id === product._id);
         //Splice to remove the product from the cart
         const newCartItems = cartItems.filter((item) => item._id !== product._id);

         setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
         setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
         setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        //Find product in the cart
        foundProduct = cartItems.find((item) => item._id === id);
        //Find index of the product in the cart
        index = cartItems.findIndex((product) => product._id === id);
        //Splice to remove the product from the cart
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {

            //Increase the quantity of the foundProduct and the cart quantity of the product
            setCartItems(
                cartItems.map((item, i) =>
                    i === index
                        ? { ...foundProduct, quantity: foundProduct.quantity + 1 }
                        : item
                )
            );
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                //Decrease the quantity of the foundProduct and the cart quantity of the product
                setCartItems(
                    cartItems.map((item, i) =>
                        i === index
                            ? { ...foundProduct, quantity: foundProduct.quantity - 1 }
                            : item
                    )
                );
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {

            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                setShowCart,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                setQty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}>

            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);