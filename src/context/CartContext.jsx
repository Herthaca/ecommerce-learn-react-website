import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {
        const existing = cartItems.find((item) => item.id === product.id);
        if(existing) {
            const currentQuantity = existing.quantity;
            const updatedCartItems = cartItems.map((item) =>
                item.id === product.id 
                    ? { ...item, quantity: currentQuantity + 1 } 
                    : item);
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { id: product.id, quantity: 1 }]);
        }
    }

    function getCartItemsWithProducts() {
        return cartItems.map((items) => ({
            ...items,
            product: getProductById(items.id)
            })).filter(item => item.product);
    }
    
    function removeFromCart(productId) {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(
            cartItems.map((item) =>
                item.id === productId ? {...item, quantity } : item));
    }

    function getCartTotal() {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);

        return total;
    }

    function clearCart() {
        setCartItems([]);
    }
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    return context;
}