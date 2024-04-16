import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [addonItems, setAddonItems] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.item_id === item.item_id
    );

    if (existingItemIndex !== -1) {
      // Item already exists, increment its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].item_quantity += 1;
      updatedCartItems[existingItemIndex].item_comments = item.item_comments;
      setCartItems(updatedCartItems);
    } else {
      // Item does not exist, add it to the cart
      setCartItems([...cartItems, { ...item, item_quantity: 1 }]);
    }
  };

  const addAddonToCart = (addon) => {
    const existingAddonIndex = addonItems.findIndex(
      (addonItem) => addonItem.addon_id === addon.addon_id
    );

    if (existingAddonIndex !== -1) {
      // Addon already exists, increment its quantity
      const updatedAddonItems = [...addonItems];
      updatedAddonItems[existingAddonIndex].addon_quantity += 1;
      setAddonItems(updatedAddonItems);
    } else {
      // Addon does not exist, add it to the addonItems array
      setAddonItems([...addonItems, { ...addon, addon_quantity: 1 }]);
    }
  };

  const removeAddonFromCart = (addonId) => {
    const updatedAddonItems = addonItems.map((addon) => {
      if (addon.addon_id === addonId) {
        // Decrement the addon's quantity
        return {
          ...addon,
          addon_quantity: Math.max(0, addon.addon_quantity - 1),
        };
      }
      return addon;
    });

    // Remove addons with quantity zero
    const filteredAddonItems = updatedAddonItems.filter(
      (addon) => addon.addon_quantity > 0
    );

    setAddonItems(filteredAddonItems);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.item_id === itemId) {
        // Decrement the item's quantity
        return {
          ...item,
          item_quantity: Math.max(0, item.item_quantity - 1),
        };
      }
      return item;
    });

    // Remove items with quantity zero
    const filteredCartItems = updatedCartItems.filter(
      (item) => item.item_quantity > 0
    );

    setCartItems(filteredCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    setAddonItems([]);
  };

  const calculateTotal = () => {
    let grandTotal = 0;

    // get cartItems total
    cartItems.forEach((item) => {
      grandTotal += item.item_quantity * parseFloat(item.item_price);
    });

    // get addonItems total
    addonItems.forEach((addon) => {
      grandTotal += addon.addon_quantity * parseFloat(addon.addon_price);
    });

    return grandTotal;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotal,
        addAddonToCart,
        addonItems,
        removeAddonFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
