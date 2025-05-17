import { io } from 'socket.io-client';
const url = `${import.meta.env.VITE_SERVER}/${import.meta.env.VITE_VERSION}/@me/chat/`
export const socket = io(`${import.meta.env.VITE_SERVER}`,{autoConnect: false});

