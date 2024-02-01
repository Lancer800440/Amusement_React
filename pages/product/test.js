// 在開頭的 import 區塊加入以下的 import
import { useEffect } from "react";

// ...

export default function Detail() {
  const [selectedSize, setSelectedSize] = useState("M"); // 預設選擇 M 尺寸
  const [selectedColor, setSelectedColor] = useState("白"); // 預設選擇白色

  // ...

  useEffect(() => {
    // 在取得資料後，設定預設的顏色和尺寸
    if (getData.product_size) {
      setSelectedSize(getData.product_size);
    }
    if (getData.product_color) {
      setSelectedColor(getData.product_color);
    }
  }, [getData]);

  // ...

  return (
    <>
      <Layout key={getData.product_id}>
        <main className={styles.container}>
          <div className={styles.detailContainer}>
            {/* ... */}
            <div className={styles.desc_flex}>
              <div className={styles.desc_title}>Size</div>
              <div className={styles.size_desc}>
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <div key={size}>
                    <button
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                      className={selectedSize === size ? styles.selected : ""}
                    >
                      {size}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.desc_flex}>
              <div className={styles.desc_title}>Color</div>
              <div className={styles.color_desc}>
                {["白", "黑", "紅", "藍"].map((color) => (
                  <div key={color}>
                    <button
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                      className={selectedColor === color ? styles.selected : ""}
                    >
                      {color}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* ... */}
          </div>
        </main>
      </Layout>
    </>
  );
}

