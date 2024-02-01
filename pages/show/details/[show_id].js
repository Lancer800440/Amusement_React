import React from "react";
import styles from "@/styles/show_detail.module.css";
import Head from "next/head";
import { SHOW_GET_ONE } from "@/component/ride-const";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/auth-context";
import { useRouter } from "next/router";
import Link from "next/link";
import "react-custom-cursors/dist/index.css";
import { Layout } from '@/component/ride-layout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content' 
import { USER_RESERVATION_ADD , GET_DISABLEDSEAT , USER_RESERVATION } from '@/component/ride-const';

export default function ShowDetail() {
  // 表演詳細頁預約頁面
  const seat = [
    [
      "",
      "",
      "",
      "A4",
      "A5",
      "",
      "A7",
      "A8",
      "A9",
      "",
      "A11",
      "A12",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "B3",
      "B4",
      "B5",
      "",
      "B7",
      "B8",
      "B9",
      "",
      "B11",
      "B12",
      "B13",
      "",
      "",
    ],
    [
      "",
      "C2",
      "C3",
      "C4",
      "C5",
      "",
      "C7",
      "C8",
      "C9",
      "",
      "C11",
      "C12",
      "C13",
      "C14",
      "",
    ],
    [
      "D1",
      "D2",
      "D3",
      "D4",
      "D5",
      "",
      "D7",
      "D8",
      "D9",
      "",
      "D11",
      "D12",
      "D13",
      "D14",
      "D15",
    ],
    [
      "E1",
      "E2",
      "E3",
      "E4",
      "E5",
      "",
      "E7",
      "E8",
      "E9",
      "",
      "E11",
      "E12",
      "E13",
      "E14",
      "E15",
    ],
    [
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "",
      "F7",
      "F8",
      "F9",
      "",
      "F11",
      "F12",
      "F13",
      "F14",
      "F15",
    ],
    [
      "G1",
      "G2",
      "G3",
      "G4",
      "G5",
      "",
      "G7",
      "G8",
      "G9",
      "",
      "G11",
      "G12",
      "G13",
      "G14",
      "G15",
    ],
    [
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "",
      "H7",
      "H8",
      "H9",
      "",
      "H11",
      "H12",
      "H13",
      "H14",
      "H15",
    ],
    [
      "I1",
      "I2",
      "I3",
      "I4",
      "I5",
      "I6",
      "I7",
      "I8",
      "I9",
      "I10",
      "I11",
      "I12",
      "I13",
      "I14",
      "I15",
    ],
  ];
  const [getData, setGetData] = useState({
    show_id: 0,
    show_name: "",
    show_pic: "",
    show_info: "",
    show_info2: "",
    show_group: "",
    show_day: "",
  });
  const { parkAuth } = useContext(AuthContext);
  const Alert = withReactContent(Swal);

  const [toggle,setToggle]=useState(false)
  const handleToggle=()=>{
    setToggle(true)
  }
  const [selectedSeat,setSelectedSeat]=useState([]);
  const [disabledSeat,setDisabledSeat]=useState([]);
  const router = useRouter();
  const toggleSelectedSeat = (cell) =>{
    setSelectedSeat((selectedSeat)=>{
      let nowSelected = [];
      if (selectedSeat.includes(cell)) {
        nowSelected = selectedSeat.filter((seat) => seat !== cell);
      } else {
        nowSelected = [...selectedSeat, cell];
      }
      console.log(nowSelected);
      return nowSelected;
    })
  }

  const getDisabledSeat = async() =>{
    if(getData.show_id !==0){
      try {
      const r = await fetch(GET_DISABLEDSEAT + '?'+ `show_id=${getData.show_id}`);
      const d = await r.json();
      console.log(d);
      let seats = [];
      d.rows.forEach((row) => {
        // seats.concat(row.seat_number);
        seats = [...seats, ...row.seat_number];
        console.log(row.seat_number)
      })
      
      console.log(seats)
      console.log(...seats)
      setDisabledSeat(seats);
      // console.log(d)
    } catch (ex) {
      console.log(ex)
    }
    }
    
  }

  useEffect(() => {
    // 取得該筆表演的詳細資料
    const show_id = +router.query.show_id;
    console.log({ show_id, raw: router.query.show_id });
    // 有抓到值時
    if (router.query.show_id !== undefined) {
      if (!show_id) {
        router.push("/show"); //show_id 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(SHOW_GET_ONE + "/" + show_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/show"); // 沒拿到資料, 跳到列表頁
            } else {
              setGetData({ ...data.row });
              // formData['show_id'] =getData.show_id
              // setFormdata({
              //   show_id:getData.show_id
              // })
              // getDisabledSeat();
              // console.log(disabledSeat)
            }
          })

          .catch((ex) => console.log(ex));
      }
    }
  }, [router.query.show_id]);
  
  useEffect(()=>{
    getDisabledSeat();
  },[getData.show_id])

  const onSubmit = async (e) => {
    e.preventDefault();
    let ispass = true
    if(!parkAuth.id || parkAuth.id ===0){
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'預約失敗',
              text:'請先登入會員才能預約喔',
            }),
            Alert.fire({
              titleText:'預約失敗',
              text:'請先登入會員才能預約喔',
              willClose:()=>{
                router.push('/login');
              }
            })
          }
        })
        return ispass=false;
      }
    if(parkAuth.id !==0 && getData.show_id !==0){
      // const show_id = +router.query.show_id;
      // const user_id = +router.query.user_id;
      fetch(USER_RESERVATION  
      + `?show_id=${getData.show_id}`
      + '&' + `user_id=${parkAuth.id}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.rows && data.rows.length > 0) {
              Alert.fire({ 
                didOpen: () => { 
                    Alert.fire({
                      titleText:'您先前已預約',
                      text:'要前往修改預約座位嗎？',
                      showCancelButton: true,
                    }).then((check) => {
                      if(check.isConfirmed){
                        router.push('/show_reservation/`${show_id}`')
                      }else{
                        return
                      }
                    })
                  }
                })
            }
            return
          })

          .catch((ex) => console.log(ex));
    }
    if(parkAuth && selectedSeat==[]){
      // formData['user_id'] = parkAuth.id;
      // setFormdata({
      //   user_id : parkAuth.id
      // });
      Alert.fire({
        didOpen: () => {
          Alert.fire({
            titleText: "預約失敗",
            text: "您尚未選擇座位",
          });
        },
      });
      return (ispass = false);
    }

    if (ispass) {
      // setFormdata({
      //   user_id : parkAuth.id,
      // })
      const formData = new FormData();
      formData.append("user_id", parkAuth.id);
      formData.append("show_id", getData.show_id);
      if (selectedSeat != []) {
        selectedSeat.forEach((seat) => {
          formData.append("selected_seat", seat);
        });
      }

      const r = await fetch(USER_RESERVATION_ADD, {
        method: "POST",
        body: formData,
        //   headers: {
        //   "Content-Type": "application/json",
        // },
      });
      const responseData = await r.json();
      if (responseData.success) {
        Alert.fire({
          didOpen: () => {
            Alert.fire({
              titleText: "預約成功",
              text:
                "前往確認預約資訊：您預約的表演為" +
                getData.show_group +
                "帶來的" +
                getData.show_name +
                "，演出時間：" +
                getData.show_day +
                "的" +
                getData.start +
                "至" +
                getData.finish +
                "，預約座位：" +
                selectedSeat.join("，"),
            }),
              Alert.fire({
                titleText: "預約成功",
                text:
                  "前往確認預約資訊：您預約的表演為" +
                  getData.show_group +
                  "帶來的" +
                  getData.show_name +
                  "，演出時間：" +
                  getData.show_day +
                  "的" +
                  getData.start +
                  "至" +
                  getData.finish +
                  "，預約座位：" +
                  selectedSeat.join("，"),
                willClose: () => {
                  router.push("/user/show_reservation");
                },
              });
          },
        });
      } else {
        Alert.fire({
          didOpen: () => {
            Alert.fire({
              titleText: "預約失敗",
              text: responseData.error,
            });
          },
        });
      }
    }
  };

  return (
    <>
    <div key={getData.show_id}>
    <Layout>
      <div className={styles.contain}>
        <div style={{width:1200}}>
          <img className={styles.img} width='100%' height={300} src={`/images/show/${getData.show_pic}`} />
          <div className={styles.space_between}>
            <h2 className={styles.title}>{getData.show_name}</h2>
            <Link href={'/show'}>
              <button className={styles.button} style={{width:150}}>返回列表頁</button>
            </Link>
            
          </div>
          
          <h3 style={{marginBottom:20}}>表演資訊</h3>
          <div style={{lineHeight:2}}>
            <p>演出團隊：{getData.show_group}</p>
            <p>演出日期：{getData.show_day}</p>
            <p>演出時間：{getData.start} 至 {getData.finish}</p>
            <p>演出地點：樂高天堂主題館旁的演藝廳</p>
            <p>表演簡介：</p>
          </div>
          <p style={{marginTop:7}}>{getData.show_info}{getData.show_info2}</p>
          {!toggle? (
            <>
              <button className={styles.button} onClick={handleToggle}>預約</button>
            </>
          )
          :
          (
            <>
              <div className={styles.flex_center} style={{width:400, margin:'auto' , marginTop:50, marginBottom:50}}>
                <div className={styles.flex_center}><span className={styles.mini_seat}> </span>可預約</div>
                <div className={styles.flex_center}><span className={styles.mini_disabled_seat}> </span>已被預約</div>
              </div>
              <div style={{marginLeft:105,marginTop:50}} className={styles.seat_center}>
              <div>
                {seat.map((row, i) => (
                  <div key={i}>
                    {row.map((cell, j) => (
                      <span 
                      className={`${selectedSeat.includes(cell)? styles.selected_seat : styles.seat} ${disabledSeat.indexOf(cell)!==-1? styles.disabled_seat : styles.seat}`} key={j} 
                      style={cell===''? {opacity:0, cursor:'not-allowed'} : {cursor:'pointer'}} 
                      id={cell}
                      onClick={()=>{
                        if(cell !=='' && !disabledSeat.includes(cell)){
                          toggleSelectedSeat(cell);
                        }
                        console.log("這是編號："+cell)
                        }}>{cell? cell : "0"}</span>
                    ))}
                  </div>
                ))}
              </div>
              </div>
                <button onClick={onSubmit} style={{width:1200}} className={styles.button}>預約</button>
              {/* <p>您預約的表演為{getData.show_group}帶來的{getData.show_name}</p>
              <p>演出時間：{getData.show_day}的{getData.start} 至 {getData.finish}</p>
              <p>預約座位：{selectedSeat.join('，')}</p> */}
            </>
          )}
            <Head><title>表演詳細資訊</title></Head>
          </div>
        </div>
    </Layout>
        
      </div>
    </>
  )
}