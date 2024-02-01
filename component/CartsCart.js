import React from "react";
import useCart from "@/hooks/useCart";
import styles from "@/styles/cart_withing.module.css"

export default function CartsCart() {
  const { cart, removeItem, changeQuantity } = useCart("ProductCart");

  return (
    <container className={styles.cartContainer}>
      <div className={styles.title}>購物車</div>

      {!cart || !cart.length ? (
        <div className="alert alert-secondary" role="alert">
          購物車內沒有商品
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    className={styles.checkbox1}
                    style={{ marginRight: "50px" }}
                  />
                </th>
                <th scope="col">商品照片</th>
                <th scope="col">商品名稱</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
                <th scope="col">總計</th>
                <th scope="col">刪除</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input
                      type="checkbox"
                      className={styles.checkbox1}
                      style={{ marginRight: "50px" }}
                    />
                  </td>
                  <td>{p.product_pic}</td>
                  <td>{p.product_name}</td>
                  <td>{p.product_price}</td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      value={p.quantity}
                      onChange={(e) =>
                        changeQuantity({ ...p, quantity: e.target.value })
                      }
                    />
                  </td>
                  <td>{p.quantity * p.product_price}</td>
                  <td>
                    <button onClick={() => removeItem(p)}>刪除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="alert alert-success" role="alert">
            總計: {cart.reduce((a, v) => a + v.product_price * v.quantity, 0)}
          </div>
        </>
      )}
    </container>
  );
}
