import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import styles from "@/component/Userpay/Paystep/ticketPaystep.module.css";
import Link from "next/link";

export default function TicketPayStep() {
  return (
    <>
      <div className={styles.shopping_step}>
        <Link href={"/cart/ticketCart"}>
          <div>
            <span>
              <FaTicketAlt />
            </span>
            &nbsp; 票券選購
          </div>
        </Link>
        <div>
          <FaChevronRight />
        </div>
        <div>填寫付款資料</div>
        <div>
          <FaChevronRight />
        </div>
        <div>成立訂單</div>
      </div>
    </>
  );
}
