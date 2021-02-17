const express=require("express");
const io=require("socket.io")(8000)
const app=express();

app.use(express.static("public"));
var users={};

app.get("/",function(req,res){
  //if(users.length <= 2)
  //{
    res.sendFile(__dirname + "/index.html");
  //}
})

    io.on("connection",socket =>{
    socket.on("new-user-joined",name =>{
    console.log("new user",name);
    users[socket.id]=name;
    socket.broadcast.emit("user-joined",name);
    console.log(name,"joined the chat");
   })

    socket.on("send",message=>{
    socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    console.log(users);
  });
})

app.listen("3000",function(){
  console.log("server started");
})
