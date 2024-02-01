import React, { useEffect } from "react";
import styles from "@/component/Page-select/Page-select.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

export default function Detail({
  product_name = "女鞋",
  product_price = 1990,
}) {
  return (
    <>
      <main className={styles.page_nav}>
        <div className="pagination">
          {data.success && data.totalPages
            ? Array(11)
                .fill(1)
                .map((v, i) => {
                  const p = data.page - 5 + i;
                  if (p < 1 || p > data.totalPages) return null;
                  return (
                    <div
                      key={p}
                      className={
                        p === data.page ? "page-item active" : "page-item"
                      }
                    >
                      <Link className="page-link" href={"?page=" + p}>
                        {p}
                      </Link>
                    </div>
                  );
                })
            : null}
        </div>
      </main>
    </>
  );
}