const UserModel = require("../model/User.js");
const Jwt = require("jsonwebtoken")
const generator = require("generate-password")

class EventController {
  static login = async (req, res) => {
      

    try {
      const { data } = req.body 
      const { email,name,userImage}=data
     const user = await UserModel.findOne({ email: email })
    if(user)
    {
         const data = {
          userID:user._id,email:user.email,name:user.name,imageUrl:user.imageUrl
        }
           const token=Jwt.sign(data,
            process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
           res.send({
              "status": "success", "message": "Login successfully", data: {
              data,token
             }})
    }
      else
        {
          try {
            var password = generator.generate({
              length: 10,
              numbers: true
            }); 
 
            const doc=new UserModel({
              name:name,
              email:email,
              password: password,
              imageUrl:userImage
            })

            await doc.save()
            const user = await UserModel.findOne({ email: email })
            const data1 = {
              userID:user._id,email:user.email,name:user.name,imageUrl:user.imageUrl
            }
              
            const data2 = {
                email:user.email,name:user.name,imageUrl:user.imageUrl
              }
            
            const token=Jwt.sign(data1,
              process.env.JWT_SECRET_KEY,{expiresIn:"5d"})
            res.send({"status":"success","message":"registration successfully",data: {
            data:data2,token
          }})
          } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"unable to register"})
           }
        }
      
      
    } catch (error) {
      console.log("error---------------------->",error)
    }
       
    } 
}

module.exports = EventController;
