
export default function manageroutesimages(app,upload){
  function checkJwt(req, res, next) {
    console.log("hii")
    try {
      const validToken = verifyJwt(req.cookies.tokenJwt);
      console.log(req.cookies.tokenJwt)
      if (validToken) {
        const usernameValidToken = validToken.username;
        const userIdValidToken = validToken.userId;
        req.validUser = true,
        req.username = usernameValidToken,
        req.userId = userIdValidToken;
      } else {
        req.validUser = false;
      }
    } catch (error) {
      console.log("no cookie jwtcheck image upload");
    }
    next();
  }

app.post("/v1/me/updateProfilePicture", checkJwt, upload.single('img'), async (req, res) => {
    if (req.validUser) {
        const userProfileImage = req.file;
        const url = await uploadImage(userProfileImage)
        console.log("IMAGE URL",url)
        res.json({ status: "fff" });
    }})
}