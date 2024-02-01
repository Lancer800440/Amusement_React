export const API_SERVER = "http://localhost:3002";
// 設施清單
export const RIDE_LIST = API_SERVER + "/ride/api";
// 設施單筆資料
export const RIDE_GET_ONE = API_SERVER + "/ride/api/details";
// 表演清單
export const SHOW_LIST = API_SERVER + "/show/api";
// 表演單筆資料
export const SHOW_GET_ONE = API_SERVER + "/show/api/details";
// 商店清單
export const SHOP_LIST = API_SERVER + "/shop/api";
// 商店單筆資料
export const SHOP_GET_ONE = API_SERVER + "/shop/api/details";
// 比對資料否符合格式
export const USER_LIST = API_SERVER + "/register/api/";
// 新增(註冊新會員)
export const USER_ADD = API_SERVER + "/register/add";
// 維護清單
export const MAINTAIN_GET_LIST = API_SERVER + "/maintenance/api";
// 取得單筆會員資料
export const USER_GET_ONE = API_SERVER + "/register/api/edit"
// 編輯會員資料
export const USER_EDIT = API_SERVER + "/register/edit"
// 登入取得token存入localstorage
export const LOGIN = API_SERVER + "/login-jwt";
// 會員在登入狀態時進入會員中心的首頁取得會員資料表格
export const USER = API_SERVER + "/user";
// 會員在登入狀態時進入會員中心的表演預約取得表演預約資料
export const USER_RESERVATION = API_SERVER + "/reservation/api";
// 設施詳細頁下方取得與該設施相同類型的其他設施
export const GET_3_SAME_TYPE_RIDE = API_SERVER + "/ride/type/api";
// 餐廳詳細頁下方取得與該餐廳同樣類型的其他餐廳
export const GET_SAME_TYPE_SHOP = API_SERVER + "/shop/type/api";
// 取得下次維護時間
export const MAINTAIN_GET_TIME = API_SERVER + "/ride/time/api";
// 會員在登入狀態時進行表演預約
export const USER_RESERVATION_ADD = API_SERVER + "/reservation/add/api";
// 會員在登入狀態時更改表演預約
export const USER_RESERVATION_EDIT = API_SERVER + "/reservation/edit/api";
// 會員在登入狀態時刪除某筆預約資料
export const USER_RESERVATION_DELET = API_SERVER + "/reservation/delete";
// 取得單筆表演被預約的座位
export const GET_DISABLEDSEAT = API_SERVER + "/reservation/get_seat/api";
// 取得排除某使用者後單筆表演被預約的座位
export const GET_OTHERDISABLEDSEAT = API_SERVER + "/reservation/get_seat/edit/api";











