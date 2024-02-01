import React, { useState } from 'react'
import styles from '@/styles/ride_search.module.css'
import { useEffect } from 'react'

export default function SearchSupport(props) {
  const [searchSupport,setSearchSupport]=useState(0)
  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromSupport(searchSupport)
  }, [searchSupport])
  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:85}}>特殊支援</span>
        <span className={searchSupport===2? styles.selected_children_button: styles.children_button} style={{width:100}} 
        onClick={()=>{
          setSearchSupport(searchSupport===0? 2:0)
          }
          }>輪椅可搭乘</span>
      </span>
    </>
  )
}
