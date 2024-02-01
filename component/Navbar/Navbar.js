import Link from "next/link";
// import React from 'react'
// import ThemeContext, { themes } from "@/context/theme-context";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import styles from "@/component/Navbar/Navbar.module.css";
import { FaUserAlt } from "react-icons/fa";
import { LuRollerCoaster } from "react-icons/lu";
import { FaTicketAlt } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";


export default function Navbar() {
  // const { theme, setTheme } = useContext(ThemeContext);
  // const { parkAuth, logout } = useContext(AuthContext);
  return (
    <>
      <nav className={styles.flex_spacebetween}>
        <Link href="/">
          <img src="/images/logo.jpg" className={styles.logo} />
        </Link>
        <div className={styles.flex_center}>
          <div className={styles.option}>
            <Link href="/user" className={styles.nav_title}>
              <FaUserAlt className={styles.mr_10} />
              會員中心
            </Link>
          </div>
          <div className={styles.option}>
            <Link href="/ticket" className={styles.nav_title}>
              <FaTicketAlt className={styles.mr_10} />
              購票資訊
            </Link>
          </div>
          <div className={styles.option}>
            <Link href="/ticket" className={styles.nav_title}>
              <LuRollerCoaster className={styles.mr_10} />
              設施介紹
            </Link>
          </div>
          <div className={styles.option}>
            <Link href="/product" className={styles.nav_title}>
              <FaBagShopping className={styles.mr_10} />
              商品專區
            </Link>
          </div>
          <div className={styles.option_ticket}>
            <Link href="/product" className={styles.nav_ticket}>
              馬上去購票
            </Link>
          </div>
        </div>

        {/* <>
          <div className={styles.nav_login_flex}>
            <div className={styles.user_nickname}><a>{}Hi~景頁</a></div>
            <div className={styles.nav_login_true}>
              <Link href="/profile" className={styles.nav_user_img}></Link>
            </div>
            <div className={styles.user_nickname}>
              <a        
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className={styles.nav_logout}
              >
                登出
              </a>
            </div>
          </div>
        </> */}

        <>
          <div className={styles.nav_logout_flex}>
            <div className={styles.nav_login}>
              <Link href="/login" className={styles.nav_login_title}>
                <IoCart className={styles.mr_10} />
              </Link>
            </div>
            <div className={styles.nav_login}>
              <Link href="/register" className={styles.nav_login_title}>
                <FaUserAlt className={styles.mr_10} />
              </Link>
            </div>
          </div>
        </>

        {/* )} */}
        {/* {parkAuth.email ? ( */}

        {/* ) : ( */}
      </nav>
    </>
  );
}
