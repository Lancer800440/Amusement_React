import React from 'react';
import styles from '@/styles/login.module.css';
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { USER_GET_ONE, LOGIN } from "@/component/ride-const";
import AuthContext from "@/context/auth-context";
import { useRouter } from "next/router";
import { Layout } from '@/component/ride-layout';
import Link from 'next/link';
import Swal from 'sweetalert2' 
import withReactContent from 'sweetalert2-react-content';
import { FaStar } from "react-icons/fa";



export default function Login() {
  // const [displayInfo, setDisplayInfo] = useState("");
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')
  const {setParkAuth} = useContext(AuthContext)
  const router = useRouter();
  const Alert = withReactContent(Swal) ;
  
  const checkEmail = () =>{
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(!email){
      setEmailError('email為必填');
    }
    else if(email!=='' && email.search(emailRule) === -1){
      setEmailError('email必須符合格式');
    }else{
      setEmailError('');
    }
  }
  const checkPassword = () =>{
    const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
    if(password===""){
      setPasswordError('密碼為必填')
    }
    else if(password && password.search(passwordRule)===-1){
      setPasswordError('密碼須長度6以上，且至少包含一個數字、一個小寫英文字母、一個大寫英文字母');
    }
    else{
      setPasswordError('')
    }
  }
  useEffect(()=>{
    checkEmail
  },[email]);

  useEffect(()=>{
    checkPassword
  },[password])


  const onSubmit = async (e) => {
    e.preventDefault(); // 不要讓表單以傳統的方式送出
    // 檢查格式
    if(email.trim().length == 0){
      setEmailError('email為必填');
      return
    }
    
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(email!==""&&email.search(emailRule)===-1){
      setEmailError('email不符合格式');
    }
    // if(!email){
    //   setEmailError('email不存在');
    //   return
    // }
    if(!password){
      setPasswordError('密碼為必填');
    }
    const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
    if(password && password.search(passwordRule)===-1){
      setPasswordError('密碼須長度6以上，且至少包含一個數字、一個小寫英文字母、一個大寫英文字母');
      return
    }
    const r = await fetch(LOGIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await r.json();
    console.log(data);
    if(!data.success){
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'登入失敗',
              text:data.error,
            })
          }
    })
    }
    
    if(data.success){
      const {id, email, nickname, token} = data;
      // 成功登入時, 寫入 localStorage 做長時間的狀態保存
      localStorage.setItem('park_auth', JSON.stringify({id, email, nickname, token}));
      setParkAuth({id, email, nickname, token});
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'登入成功',
              text:'前往首頁',
            }),
            Alert.fire({
              titleText:'登入成功',
              text:'前往首頁',
              willClose:()=>{
                router.push('/');
              }
            })
          }
    })
      
    }
  };

  return (
    <>
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>會員登入</h2>
        {/* <p>前端取得資料</p>
        <p>帳號：{email}</p>
        <p>密碼：{password}</p> */}
        
        <div className={styles.formborder}>
          <form name="form1" onSubmit={onSubmit}>
            <div 
            onClick={()=>{
              if(email==="" || password===""){
                setEmail('pigpigpig@123.com');
                setPassword('pig3ZZZ');
                setEmailError('');
                setPasswordError('');
              }else{
                setEmail('');
                setPassword('');
              }
            }}
            ><FaStar className={styles.star}/></div>
            <div 
            onClick={()=>{
              if(email==="" || password===""){
                setEmail('pigpig@zzz.com');
                setPassword('123zzzZZZ');
                setEmailError('');
                setPasswordError('');
              }else{
                setEmail('');
                setPassword('');
              }
            }}
            ><FaStar className={styles.star2}/></div>
            <label htmlFor='email'>Email：<br/>
            <input type='text' id="email"
                      name="email"
                      value={email}
                      onChange={((e)=>{setEmail(e.target.value)})}
                      onKeyUp={checkEmail}
                      className={styles.input}/>
            </label>
            <p style={{color:"red",fontSize:16}}>{emailError}</p>
            <label htmlFor='password'>密碼：<br/>
            <input type='password' id="password"
                      name="password"
                      value={password}
                      onChange={((e)=>{setPassword(e.target.value)})}
                      onKeyUp={checkPassword} 
                      className={styles.input}/>
            </label>
            <p style={{color:"red",fontSize:16,width:296.61}}>{passwordError}</p>
            {/* <div style={{marginBottom:10}}>
              忘記密碼
            </div> */}
            <button type='submit' className={styles.button}>登入</button>
            <div className={styles.flex}>
              <span>還不是會員？</span>
              <Link href={'/register'}>
                <span className={styles.register_button}>前往註冊</span>
              </Link>
              
            </div>
            <br/>
            <div>---------------或---------------</div>
            <br/>
            <button type='button' className={styles.google_login}><img className={styles.img} src='../images/google_icon.png'/>快速登入</button>
            {/* {displayInfo ? (
                    displayInfo === "succ" ? (
                      <div>
                        登入成功
                      </div>
                    ) : (
                      <div style={{color:'red'}}>
                        登入失敗
                      </div>
                    )
                  ) : null} */}
          </form>
        </div>
       
      </div>
      </Layout>
      <Head>
        <title>登入</title>
      </Head>
    </>
  )
}
