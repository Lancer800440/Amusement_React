import Link from 'next/link';
import styles from '@/styles/user.module.css'
import Head from 'next/head'
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import { USER } from '@/component/ride-const';
import { useRouter } from "next/router";
import { useState,useEffect } from 'react';
import { Layout } from '@/component/ride-layout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content' 


export default function UserInfo() {
  const { parkAuth, logout } = useContext(AuthContext);
  const [data, setData] = useState({});
  const router = useRouter();
  const Alert = withReactContent(Swal) ;

// 如果parkAuth存在,傳送parkAuth
  
  const getUserInfo = async() =>{
    const r = await fetch(USER,{
        method: "GET",
        headers: {
          Authorization: "Bearer " + parkAuth.token,
        },
      })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        }
      })
      .catch((ex) => console.log(ex));
  };

  useEffect(()=>{
    if(parkAuth.email){
      getUserInfo();
    }
    if(!parkAuth.email && !data){
      Alert.fire({ 
  didOpen: () => { 
      Alert.fire({
        titleText:'尚未登入',
        text:'前往登入',
      }),
      Alert.fire({
        titleText:'尚未登入',
        text:'前往登入',
        willClose:()=>{
          router.push('/login');
        }
      })
    }
})
}
},[])



  return (
    <>
    <Layout>
        <div style={{padding:30}} className={styles.flex_center}>
          <div className={styles.left_section}>
            <div className={styles.user_info}>
              <img className={styles.img} src='/images/user/profile.png'/>
              <p>{data.user_nickname}</p>
              <p>{data.user_email}</p>
            </div>
            <div className={styles.column}>
            <Link href='/user'>
              <button className={styles.selected_button}>會員資料</button>
            </Link>
              <Link href='/user/userorder'><button className={styles.button}>會員訂單</button></Link>
              <button className={styles.button}>優惠券</button>
              <button className={styles.button}>我的收藏</button>
              <button className={styles.button} onClick={()=>{
                if(data.user_id){
                  router.push(`/user/edit/${data.user_id}`)
                }else{
                  Alert.fire({ 
                      didOpen: () => { 
                          Alert.fire({
                            titleText:'您尚未登入',
                            text:'前往登入',
                          }),
                          Alert.fire({
                            titleText:'您尚未登入',
                            text:'前往登入',
                            willClose:()=>{
                              router.push('/login');
                            }
                          })
                        }
                      })
                }
              }}>修改資料</button>
              <button className={styles.button} onClick={()=>{
                router.push(`/user/show_reservation`);
              }}>表演預約</button>
              <button className={styles.button} onClick={(e) => {
                    e.preventDefault();
                    logout();
                    Alert.fire({ 
                      didOpen: () => { 
                          Alert.fire({
                            titleText:'登出成功',
                            text:'前往首頁',
                          }),
                          Alert.fire({
                            titleText:'登出成功',
                            text:'前往首頁',
                            willClose:()=>{
                              router.push('/');
                            }
                          })
                        }
                      })
                  }}>登出</button>
            </div>

          </div>
          <div className={styles.info_section}>
            <h2 className={styles.title}>會員資料</h2>
            <table className={styles.table}> 
            <tbody>
              <tr> 
                <th className={styles.th}>姓名</th> 
                <td className={styles.td}>{data.user_name}</td>
                <th className={styles.th}>小名</th>
                <td className={styles.td}>{data.user_nickname}</td>
              </tr>
              <tr>
                <th className={styles.th}>email</th>
                <td colSpan="3" className={styles.td}>{data.user_email}</td>
              </tr>
              <tr>
                <th className={styles.th}>手機號碼</th>
                <td className={styles.td}>{data.phone}</td>
                <th className={styles.th}>生日</th>
                <td className={styles.td}>{data.birthday}</td>
              </tr> 
              <tr>
                <th className={styles.th}>地址</th>
                <td colSpan="3" className={styles.td}>{data.address}</td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </Layout>
      <Head><title>會員中心</title></Head>
    </>
  )
}
