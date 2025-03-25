import { verifyJwt } from "../database/managedata.js";

export default async function runsocket(socket){

socket.use((socket,next)=>{
    const validToken = verifyJwt(socket.handshake.auth.jwt)
    try {
        let usernamee = validToken.username
        if(validToken){
          socket.validUser = true,
          socket.username = usernamee
          socket.path = socket.handshake.auth.path
        }else{
          req.validUser = false
        }
      } catch (error) {
        console.log("no jwt socket check")
      }
    
    next()
})

        socket.on('connection', (socket) => {
            
            if(socket.validUser){
                console.log(`${socket.username} connected`);
                socket.join(`${socket.path}`);
                socket.on(`${socket.path}`, (data) => {
                  console.log(`Message received in room ${socket.path}:`, data);
                  socket.server.to(`${socket.path}`).emit(`${socket.path}`, data); // Broadcast to users in the same room
                });
                
            }
          });
          
}