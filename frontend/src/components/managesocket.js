import { io } from 'socket.io-client';
const url = `${import.meta.env.VITE_SERVERURL}/${import.meta.env.VITE_VERSION}/@me/chat/`
export const socket = io(`${import.meta.env.VITE_SERVERURL}`,{autoConnect: false});
export function getJwtCookie(){  
    const cookie = document.cookie.match(/(?:^|;\s*)tokenJwt=([^;]*)/);
    if(cookie){
        return cookie[1]
      }
}
