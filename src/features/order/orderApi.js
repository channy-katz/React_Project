//פה כל הקריאות לשרת בקשר להזמנה
//שמירת ההזמנה בשרת וכדו'

import axios from "axios";
let baseUrl = "http://localhost:4000/api/order"
//קריאה לשרת שעושה הוספה להזמנה

export const addOrder = (order, token) => {
  return axios.post(baseUrl, order, { headers: { "x-access-token": token } })
}

