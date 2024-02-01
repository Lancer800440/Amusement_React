import React, { useState, useEffect } from 'react';
import styles from '@/styles/register.module.css';
import Head from 'next/head';
import { USER_ADD } from '@/component/ride-const';
import { z } from "zod";
import Swal from 'sweetalert2'; 
import withReactContent from 'sweetalert2-react-content'; 
import { useRouter } from 'next/navigation';
import { Layout } from '@/component/ride-layout';
import { FaStar } from "react-icons/fa";


export default function Register() {
  const router=useRouter();
  const [registerForm, setRegisterForm]=useState(
    {
      user_name: "",
      user_email: "",
      user_password:"",
      rePassword:"",
      avatar: "/images/user/profile.png",
      birthday: "",
      phone: "",
      address: "",
      user_nickname:"",
      address:""
    }
  );
  const Alert = withReactContent(Swal) 
  
  // const [displayInfo, setDisplayInfo] = useState(""); // "", "succ", "fail"

  const changeHandler = (e) => {
    const { name, id, value } = e.target;
    console.log({ name, id, value });
    
    // setDisplayInfo("");
    setRegisterForm({ ...registerForm, [id]: value });
    /*
    setMyForm((old) => {
      return { ...old, [id]: e.target.value };
    });
    */
  };
  const [nameError,setNameError]=useState('')
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')
  const [password2Error,setPassword2Error]=useState('')
  const [phoneError,setPhoneError]=useState('')

  
  const checkName = ()=>{
    if(registerForm.user_name===""){
      setNameError('姓名為必填')
    }
    else{
      setNameError('')
    }
  }
  const checkEmail = () =>{
    
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(registerForm.user_email !== "" && registerForm.user_email.search(emailRule) === -1){
      setEmailError('email必須符合格式');
    }
    else if(registerForm.user_email==""){
      setEmailError('email為必填');
    }
    else{
      setEmailError('');
    }
  }

  const checkPhone = () =>{
    const phoneRule = /^09\d{8}$/;
    if(registerForm.phone!==""&& registerForm.phone.search(phoneRule)===-1){
      setPhoneError('手機號碼不符合格式');
    }
    if(registerForm.phone===""||registerForm.phone!==""&& registerForm.phone.search(phoneRule)!==-1){
      setPhoneError('');
    }
  }

  const checkPassword = () =>{
    const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
    if(registerForm.user_password===""){
      setPasswordError('密碼為必填')
    }
    else if(registerForm.user_password!==""&& registerForm.user_password.search(passwordRule)===-1){
      setPasswordError('密碼不符合格式，長度6以上且至少包含一個數字一個小寫英文字母，一個大寫英文字母');
    }
    else{
      setPasswordError('')
    }
  }
  const checkPassword2 = () =>{
    if(registerForm.rePassword===registerForm.user_password){
      setPassword2Error('')
    }
    else{
      setPassword2Error('輸入的密碼與第一次不同');
    }
  }
  useEffect(()=>{
    checkName
  },[registerForm.user_name])

  useEffect(()=>{
    checkEmail
  },[registerForm.user_email])

  useEffect(()=>{
    checkPhone
  },[registerForm.phone])

  useEffect(()=>{
    checkPassword
  },[registerForm.user_password])

  useEffect(()=>{
    checkPassword2
  },[registerForm.rePassword,registerForm.user_password])

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: 檢查各個欄位的資料
    let ispass = true
    if(registerForm.user_name.trim().length == 0){
        setNameError('姓名為必填');
        ispass = false;
      }
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(registerForm.user_email===""){
      setEmailError('email為必填');
      ispass = false;
    }
    else if(registerForm.user_email!==""&&registerForm.user_email.search(emailRule)===-1){
      setEmailError('email不符合格式');
      ispass = false;
    }
    else{
      setEmailError('');
    }
    const phoneRule = /^09\d{8}$/;
    if(registerForm.phone!==""&& registerForm.phone.search(phoneRule)===-1){
      setPhoneError('手機號碼不符合格式');
      ispass = false;
    }
    const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
    if(registerForm.user_password===""){
      setPasswordError('密碼為必填');
      ispass = false;
    }
    if(registerForm.user_password!==""&& registerForm.user_password.search(passwordRule)===-1){
      setPasswordError('密碼不符合格式');
      ispass = false;
    }
    if(registerForm.rePassword===registerForm.user_password){
      setPassword2Error('');
    }
    else{
      setPassword2Error('輸入的密碼與第一次不同');
      ispass = false;
    }
    if(!ispass){
      // setDisplayInfo("fail");
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'註冊失敗',
              text:'請檢查輸入的資料是否符合格式',
            })
          }
    })
    }
    if(ispass){
      const r = await fetch(USER_ADD, {
      method: "POST",
      body: JSON.stringify(registerForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await r.json();
    if (responseData.success) {
      // setDisplayInfo("succ");
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'註冊成功',
              text:'前往登入',
            }),
            Alert.fire({
              titleText:'註冊成功',
              text:'前往登入',
              willClose:()=>{
                router.push('/login');
              }
            })
          }
    })
    } else {
      // setDisplayInfo("fail");
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'註冊失敗',
              text:responseData.error,
            })
          }
    })
    }
    }


  };

  // console.log("re-render---", new Date());
  return (
    <Layout>
      <div className={styles.contain}>
        <h2 className={styles.title}>會員註冊</h2>
        {/* <div>
          <p>前端取得資料:</p>
          <p>會員姓名：{registerForm.user_name}</p>
          <p>帳號：{registerForm.user_email}</p>
          <p>密碼：{registerForm.user_password}</p>
          <p>再次驗證密碼：{registerForm.rePassword}</p>
          <p>手機：{registerForm.phone}</p>
          <p>小名：{registerForm.user_nickname}</p>
          <p>頭貼：{registerForm.avatar}</p>
          <p>生日:{registerForm.birthday}</p>
          <p>地址:{registerForm.address}</p>
        </div> */}
        <div className={styles.formborder}>
          <form name="form1" onSubmit={onSubmit}>
          <div 
            onClick={()=>{
              if(registerForm.user_name==="" || 
              registerForm.user_email==="" ||
              registerForm.user_password==="" ||
              registerForm.rePassword==="" ||
              registerForm.phone=== "" ||
              registerForm.address=== "" ||
              registerForm.user_nickname===""
              ){
                setRegisterForm(
                  {
                    user_name: "豬豬豬",
                    user_email: "pigpigpig@123.com",
                    user_password:"pig3ZZZ",
                    rePassword:"pig3ZZZ",
                    avatar: "/images/user/profile.png",
                    phone: "0915151515",
                    address: "豬豬的窩",
                    user_nickname:"豬3",
                  }
                );
                setNameError('');
                setEmailError('');
                setPasswordError('');
                setPassword2Error('');
                setPhoneError('');
              }else{
                setRegisterForm(
                  {
                    user_name: "",
                    user_email: "",
                    user_password:"",
                    rePassword:"",
                    avatar: "/images/user/profile.png",
                    phone: "",
                    address: "",
                    user_nickname:"",
                  }
                );
              }
            }}
            ><FaStar className={styles.star}/></div>
            <div className={styles.flex}>
              <div className={styles.column}>
                  <div className={styles.padding30}>
                    <img className={styles.img} src={registerForm.avatar}/>
                  </div>
                  <label htmlFor="avatar">
                    <input type="hidden"
                      id="avatar"
                      name="avatar"
                      value={registerForm.avatar}
                      onChange={changeHandler}/>
                      {/* <input type="file" id="avatar"
                      name="avatar"
                      onChange={changeHandler} /> */}
                  </label>
                  <div className={styles.flex}>
                    {/* <button type='button' className={styles.upload_button}>
                      <img className={styles.icon} src='/images/Upload.png'/>
                上傳大頭照
                    </button> */}
                    
                  </div>
                <p className={styles.flex}>
                  <img className={styles.icon} src='/images/Edit.png'/>
                  <label htmlFor="user_nickname">
                    <input className={styles.nickname} placeholder='小名' type="text"
                      id="user_nickname"
                      name="user_nickname"
                      value={registerForm.user_nickname}
                      onChange={changeHandler}/>
                  </label>
                </p>
              </div>
              <div>
                <label htmlFor="user_name">
                <span className={styles.red}>*</span>會員姓名：<br/>
                  <input type='text' className={styles.input} id="user_name"
                      name="user_name"
                      value={registerForm.user_name}
                      onChange={changeHandler} onKeyUp={checkName}  placeholder='請輸入真實姓名'/>
                </label>
                <p style={{color:"red",fontSize:16}}>{nameError}</p>
                <label htmlFor="user_email"><span className={styles.red}>*</span>帳號：<br/>
                  <input type='email' className={styles.input} id="user_email"
                      name="user_email"
                      value={registerForm.user_email}
                      onChange={changeHandler} onKeyUp={checkEmail} placeholder='請輸入email'/>
                </label>
                <p style={{color:"red",fontSize:16}}>{emailError}</p>
                <label htmlFor="user_password"><span className={styles.red}>*</span>密碼：<br/>
                  <input type='password' className={styles.input} id="user_password"
                      name="user_password"
                      value={registerForm.user_password}
                      onChange={changeHandler} onKeyUp={checkPassword} placeholder='請輸入密碼'/>
                </label>
                <p style={{color:"red",fontSize:16,width:550}}>{passwordError}</p>
                <label htmlFor="rePassword"><span className={styles.red}>*</span>再次確認密碼：<br/>
                  <input type='password' id="rePassword"
                      name="rePassword" className={styles.input} value={registerForm.rePassword} onChange={changeHandler} onKeyUp={checkPassword2} placeholder='請輸入一樣的密碼'/>
                </label>
                <p style={{color:"red",fontSize:16}}>{password2Error}</p>
                <label htmlFor="user_phone">手機號碼：<br/>
                  <input type='text' className={styles.input} id="phone"
                      name="phone"
                      value={registerForm.phone}
                      onChange={changeHandler} onKeyUp={checkPhone} placeholder='請輸入手機號碼'/>
                </label>
                <p style={{color:"red",fontSize:16}}>{phoneError}</p>
                <label htmlFor="birthday">生日：<br/>
                  <input type='date' className={styles.input} id="birthday"
                      name="birthday"
                      value={registerForm.birthday}
                      onChange={changeHandler}/>
                </label>
                <br/>
                <label htmlFor="address">地址：<br/>
                  <input type='text' className={styles.input} id="address"
                      name="address"
                      value={registerForm.address}
                      onChange={changeHandler} placeholder='請輸入地址'/>
                </label>
                <br/>
              </div>
            </div>
            
            <div className={styles.flex}>
              
              <button type='submit' className={styles.button}>註冊</button>
              {/* {displayInfo ? (
                    displayInfo === "succ" ? (
                      <div>
                        資料新增成功
                      </div>
                    ) : (
                      <div style={{color:'red'}}>
                        新增發生錯誤!!!
                      </div>
                    )
                  ) : null} */}
            </div>
          </form>
        </div>
      </div>
      <Head><title>註冊</title></Head>
    </Layout>
  )

}