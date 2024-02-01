import { useState } from "react";

export function useOrderList (orderId){
  const [orderList, setOrderList] = useState([])

  useEffect(()=>{
    // fetch order (/order/api)
    fetch().then((orders)=>{
      orders.forEach((order)=>{
        // fetch order detail list (/order/details)
        fetch()
        // fetch order detail 2 (/order/details2)
        fetch()
      })
    })
  })

  return {
    orderList
  }
}

[
  {
    order_id: '1',
    user_id: 'user',
    bill_id: '1',
    order_details: {
      product_id: '1',
      user_but_qty: 3,
      price: 1500
    },
    order_infos: {

    }
  }
]

const {orderList} = useOrderList(orderId)



function useProductList ({category}){
  const [productList, setProductList] = useState([])

  useEffect(()=>{
    fetch({
      body: {
        category
      }
    }).then((data)=>{
        setProductList(data)
    })
  },[])

  return {productList}
}


function List(){
  const {productList} = useProductList({
    category: '1'
  })



  return (
    <div>{productList.map(/.../)}</div>
  )
}