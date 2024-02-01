export const API_SERVER = "http://localhost:3002";

export const CART_LIST = API_SERVER + "/cart/api";

export const CART_ADD = API_SERVER + "/cart/add";  // method: POST

// 取得某一筆
// http://localhost:3002/cart/api/edit/977
export const CART_GET_ONE = API_SERVER + "/cart/api/edit";  // method: GET
// AB_GET_ONE + "/977"

// 修改某一筆
// /cart/edit/:sid
export const CART_EDIT_ONE = API_SERVER + "/cart/edit";  // method: PUT


// 刪除某一筆
// /cart/:sid
export const CART_DEL_ONE = API_SERVER + "/cart";  // method: DELETE