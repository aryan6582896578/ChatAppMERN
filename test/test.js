// app.post("/hash/:id",async (req, res)=>{
//     console.log(req.body)
//     console.log(req.params.id)
//     // const hh = await hash('sha256', req.params.id);  //090b235e9eb8f197f2dd927937222c570396d971222d9009a9189e2b6cc0a2c1
//     const hash = createHash('sha256');
//     hash.update(req.params.id);
//     // console.log(hash.digest("base64")) //CQsjXp648Zfy3ZJ5NyIsVwOW2XEiLZAJqRieK2zAosE=
//     // console.log(hash.digest("base64url")) //CQsjXp648Zfy3ZJ5NyIsVwOW2XEiLZAJqRieK2zAosE
//     //console.log(hash.digest("binary")) //#^¸ñòÝy7",W♥Ùq"-        ©↑+lÀ¢Á
//     console.log(hash.digest("hex")) //090b235e9eb8f197f2dd927937222c570396d971222d9009a9189e2b6cc0a2c1
//     res.send(hash)
//     })