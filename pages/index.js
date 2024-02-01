import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/index.module.css'
import { FaChevronRight } from "react-icons/fa6";
import { Layout } from '@/component/ride-layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div className={styles.contain}>
        <img  className={styles.head_img} src="/images/home_pic.jpg"/>
        <h2 className={styles.title}>最新消息</h2>
        <div className={styles.flex_center}>
          <div className={styles.card} style={{marginRight:10}}>
            <div>
              <Image className={styles.img} src={'/images/valentine.jpg'} width={500} height={350}/>
            </div>
            <div className={styles.column} style={{width:500,height:250}}>
            <div>
                <h3 style={{padding:10}}>情人節優惠活動</h3>
                <p style={{padding:10, fontSize:16}}>情人節要到啦！還不知道該去哪裡約會的朋友們來遊樂園兩人同行打8折唷</p>
              </div>
              <div className={styles.flex_spacebetween} style={{height:25}}>
                <p>112/01/17</p>
                <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
              </div>
            </div>
          </div>
          <div className={styles.column} style={{width:630,height:600,marginLeft:10}}>
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/images/lantern.jpg'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
              <div>
                <h4 style={{padding:5}}>元宵猜謎趣</h4>
                <p style={{padding:5, fontSize:12}}>在元宵節的這週天天都有猜燈謎的遊戲喔，喜歡猜謎的朋友千萬不能錯過！</p>
              </div>
                <div className={styles.flex_spacebetween} style={{width:375,height:25, padding:5}}>
                  <p>112/01/03</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/images/fireworks.webp'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
              <div>
                <h4 style={{padding:5}}>跨年煙火宴</h4>
                <p style={{padding:5, fontSize:12}}>即將迎來嶄新的一年，在遊樂園欣賞煙火度過2023最後一天吧~</p>
              </div>
                <div className={styles.flex_spacebetween} style={{width:375,height:25,padding:5}}>
                  <p>112/12/11</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/images/Xmas.jpg'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
              <div>
                <h4 style={{padding:5}}>聖誕活動</h4>
                <p style={{padding:5, fontSize:12}}>聖誕節即將到來，想好要怎麼和親愛的他一起度過了嗎？來遊樂園度過一場甜蜜的約會吧~</p>
              </div>
                
                <div className={styles.flex_spacebetween} style={{width:375,height:25,padding:5}}>
                  <p>112/12/5</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/images/newyear.jpg'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
              <div>
                <h4 style={{padding:5}}>春節早鳥優惠</h4>
                <p style={{padding:5, fontSize:12}}>想利用春節假期到遊樂園放鬆嗎？趕緊手刀訂票訂起來~</p>
              </div>
                <div className={styles.flex_spacebetween} style={{width:375,height:25,padding:5}}>
                  <p>112/12/2</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h1 style={{textAlign:'center',lineHeight:5}}>水世界</h1>
            <p>炎炎夏日，最適合來到水世界，和親朋好友愉快地玩水消暑！</p>
          </div>
        </div>
        <div>
        <Image className={styles.theme_img} src={'/images/ride/w2.jpg'} width={1000} height={600}/>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div>
        <Image className={styles.theme_img2} src={'/images/ride/i8.jpg'} width={1000} height={600}/>
        </div>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h1 style={{textAlign:'center',lineHeight:5}}>冒險之旅</h1>
            <p>你是愛好刺激的人嗎？這裡是喜歡刺激的朋友最佳的去處！</p>
          </div>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h1 style={{textAlign:'center',lineHeight:5}}>慢樂悠遊</h1>
            <p>想要愉快體驗設施卻害怕刺激？這裡可以讓你好好放鬆！</p>
          </div>
        </div>
        <div>
        <Image className={styles.theme_img} src={'/images/ride/s2.jpg'} width={1000} height={600}/>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div>
        <Image className={styles.theme_img2} src={'/images/ride/b1.jpg'} width={1000} height={600}/>
        </div>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h1 style={{textAlign:'center',lineHeight:5}}>樂高天堂</h1>
            <p>盡情徜徉在積木的世界裡，這是喜歡建構積木的小朋友們的天堂！</p>
          </div>
        </div>
      </div>
      <Head><title>首頁</title></Head>
      </Layout>

  )
}
