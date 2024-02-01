import Link from "next/link";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import styles from "@/component/Navbar/Navbar.module.css";
import { FaUserAlt } from "react-icons/fa";
import { LuRollerCoaster } from "react-icons/lu";
import { FaTicketAlt } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { parkAuth, logout } = useContext(AuthContext);
  const Alert = withReactContent(Swal);
  const router = useRouter();
  return (
    <>
      <nav className={styles.flex_spacebetween}>
        <Link href="/">
          <img className={styles.logo} src="/images/logo.png" />
        </Link>
        <div className={styles.flex_center}>
          <div
            className={styles.option}
            onClick={(e) => {
              e.preventDefault();
              if (!parkAuth.email) {
                Alert.fire({
                  didOpen: () => {
                    Alert.fire({
                      titleText: "尚未登入",
                      text: "前往登入",
                    }),
                      Alert.fire({
                        titleText: "尚未登入",
                        text: "前往登入",
                        willClose: () => {
                          router.push("/login");
                        },
                      });
                  },
                });
              } else {
                router.push("/user");
              }
            }}
          >
            <Link href="" className={styles.nav_title}>
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
            <Link href="/ride" className={styles.nav_title}>
              <LuRollerCoaster className={styles.mr_10} />
              設施介紹
            </Link>
          </div>
          <div className={styles.option}>
            <Link href="/product/list" className={styles.nav_title}>
              <FaBagShopping className={styles.mr_10} />
              商品專區
            </Link>
          </div>
          <div className={styles.option_ticket}>
            <Link href="/ticket" className={styles.nav_ticket}>
              馬上去購票
            </Link>
          </div>
        </div>

        {parkAuth.email ? (
          <>
            <div className={styles.nav_login_true}>
              <div className={styles.user_nickname}>
                <p className={styles.nav_login_title}>{parkAuth.nickname}</p>
              </div>

              <div className={styles.icon_flex}>
                <Link href="../cart/cart">
                  <div className="fa-solid fa-cart-shopping icon-cart"></div>
                </Link>
              </div>

              <div className={styles.nav_login}>
                <a
                  className={styles.nav_login_title}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    Alert.fire({
                      didOpen: () => {
                        Alert.fire({
                          titleText: "成功登出",
                          text: "前往首頁",
                        }),
                          Alert.fire({
                            titleText: "成功登出",
                            text: "前往首頁",
                            willClose: () => {
                              router.push("/");
                            },
                          });
                      },
                    });
                  }}
                >
                  登出
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.nav_logout_flex}>
              <div className={styles.nav_login}>
                <Link href="#" className={styles.nav_login_title}>
                  <IoCart className={styles.mr_10} />
                </Link>
              </div>
              <div className={styles.nav_login}>
                <Link href="/login" className={styles.nav_login_title}>
                  <FaUserAlt className={styles.mr_10} />
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}
