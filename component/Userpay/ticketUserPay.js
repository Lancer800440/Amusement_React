import React from "react";
import styles from "@/component/Userpay/ticketUserPay.module.css";
import Image from "next/image";
// import Link from "next/link";
import Paystep from "./Paystep/Paystep";

export default function Userpay() {
  return (
    <>
      <Paystep />
      <main className={styles.form_container}>
        <div className={styles.recipient_information}>
          <div className={styles.recipient_information_title1}>收件人資料</div>
          <div className={styles.recipient_information_title2}>
            <input type="radio" /> 同收件人資料
          </div>
        </div>
      </main>
      <main className={styles.form_container1}>
        <div className={styles.form_flex}>
          <div className={styles.recipient_descs}>
            <div className={styles.recipient_descs_title}>
              <span>*</span> 收件人姓名
            </div>
            <div className={styles.recipient_descs_input}>
              <input type="text" placeholder="請輸入姓名" />
            </div>
          </div>
          <div className={styles.recipient_descs}>
            <div className={styles.recipient_descs_title}>
              <span>*</span> 收件人Email
            </div>
            <div className={styles.recipient_descs_input}>
              <input type="text" placeholder="請輸入Email" />
            </div>
          </div>
        </div>
        <div className={styles.form_flex}>
          <div className={styles.recipient_descs}>
            <div className={styles.recipient_descs_title}>
              <span>*</span> 收件人手機
            </div>
            <div className={styles.recipient_descs_input}>
              <input type="text" placeholder="請輸入手機" />
            </div>
          </div>
          <div className={styles.recipient_descs}>
            <div className={styles.recipient_descs_title}>
              <span>*</span> 收件人電話
            </div>
            <div className={styles.recipient_descs_input}>
              <input type="text" placeholder="請輸入電話" />
            </div>
          </div>
        </div>
        <div className={styles.recipient_descs_address}>
          <div className={styles.recipient_address}>收件人地址</div>
          <div className={styles.recipient_textarea}>
            <textarea cols="30" rols="10" placeholder="請輸入地址"></textarea>
          </div>
        </div>
      </main>

      <main className={styles.form_container}>
        <div className={styles.logistics}>
          <div className={styles.logistics_title}>發票類型</div>
          <div className={styles.logistics_descs}>
            <div>
              <input type="radio" name="bill" /> 雲端發票
            </div>
            <div>
              <input type="radio" name="bill" /> 公司發票
            </div>
            <div className={styles.ml30}>
              <input type="radio" name="bill" /> 發票捐贈
            </div>
          </div>
        </div>

        <div className={styles.logistics}>
          <div className={styles.logistics_title}>付款方式</div>
          <div className={styles.logistics_descs}>
            <div>
              <input type="radio" name="pay" /> 行動支付
            </div>
            <div>
              <input type="radio" name="pay" /> 信用卡支付
            </div>
            <div>
              <input type="radio" name="pay" /> 超商付款
            </div>
          </div>
        </div>

        <div className={styles.logistics}>
          <div className={styles.logistics_title}>取貨方式</div>
          <div className={styles.logistics_descs}>
            <div>
              <input type="radio" name="address" /> 收件地址
            </div>
            <div>
              <input type="radio" name="address" /> 超商取貨
            </div>
          </div>
        </div>

        <div className={styles.total_container}>
          <div className={styles.total_info}>
            <div>總計</div>
            <div>$1800</div>
            <div className={styles.pay_button}>
              <button className={styles.pay_button_word}>結帳</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
