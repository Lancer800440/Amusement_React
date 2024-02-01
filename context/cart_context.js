import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext({});

export default CartContext;

// 登入狀態:狀態資料(product_id, email, nickname, token)
export const initCart = {
  product_id: 0,
  name: "",
  price: "",
  amount: "",
  token: "",
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(initCart);
  useEffect(() => {
    const str = localStorage.getItem("cart");
    if (str) {
      try {
        const data = JSON.parse(str);
        if (data.id && data.email) {
          const { id, email, nickname, token } = data;
          setCart({ id, email, nickname, token });
        }
      } catch (ex) {}
    }
  }, []);

  // 登出
  const logout = () => {
    // 登出時, 清除 localStorage 的記錄
    localStorage.removeItem("Cart");
    setCart(initCart);
  };

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
