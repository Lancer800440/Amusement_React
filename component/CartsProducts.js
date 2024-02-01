import React from "react";
import { CART_LIST } from "@/components/cartConst";
import useCart from "@/hooks/useCart";
import styles from "@/styles/cart_withing.module.css"

export default function CartsProducts() {
  const [data, setData] = useState({});
  const router = useRouter();
  const getListData = async () => {
    let page = +router.query.page || 1;
    if (page < 1) page = 1;
    try {
      const r = await fetch(CART_LIST);
      const d = await r.json();
      // console.log(value)
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  const { addItem } = useCart("Cart");

  const addToCart = (id) => {
    const item = data.find((el) => el.id === id);
    addItem(item);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">商品列表</h5>
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
              {data.rows &&
                data.rows.map((p) => (
                  <tr key={p.id}>
                    <td>{p.product_id}</td>
                    <td>{p.product_pic}</td>
                    <td>{p.product_name}</td>
                    <td>{p.product_price}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => addToCart(p.id)}
                      >
                        加到購物件
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
