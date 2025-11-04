import axios from 'axios';
const host = import.meta.env.VITE_BASE_URL || 'http://61.153.188.157:10010';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
let isRefresh = false;
let success = false;
export async function tryRefreshToken(){
  if(isRefresh){
    while (isRefresh){
      await sleep(10)
    }
    return success;
  }
  isRefresh = true;
  // 尝试刷新token
  let resp = await axios.get(host + "/as/accounts/refresh", {withCredentials: true});
  if (resp.status === 200 && resp.data.code === 200) {
    sessionStorage.setItem("token", resp.data.data)
    success = true;
  }else{
    sessionStorage.removeItem("token");
    success = false;
  }
  isRefresh = false;
  return success;
}
