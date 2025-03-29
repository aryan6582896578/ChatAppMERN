import { io } from 'socket.io-client';
const URL = 'http://localhost:4500';
export const socket = io(URL,{
    autoConnect:false
});