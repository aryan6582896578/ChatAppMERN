import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
const socket = io("http://localhost:4500",{
  path:"/v1",
  withCredentials: true,
  // method:['GET', 'PUT', 'POST']
});


function App() {
  socket.on('connect', (err) => {
    console.error('Connection error:', err);
  });
  socket.on("hello", (...arg) => {
    console.log(...arg,"from server")
  });
  return (
  <>
  <p>hm</p>
  </>
  );
}

export default App
