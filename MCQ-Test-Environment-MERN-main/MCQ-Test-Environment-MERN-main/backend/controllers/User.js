const User = require('../models/userModel');

const bcryptjs = require ('bcryptjs')

const jwt = require('jsonwebtoken')

const Login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Invalid data"
            })
        };
        const user= await  User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isMatch = await bcryptjs.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const tokenData={
            id:user._id
        }
        const token = await jwt.sign(tokenData,"abhi" ,{expiresIn:"1d"});
        return res.status(200).cookie("token",token,{httpOnly:true}).json({
            message:`welcome back ${user.fullName}`,
            success:true
        })

    } catch(error){
        console.log(error);
    }
}

const Logout = async(req,res)=>{
    return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
        message:"user logged out",
        success:true
    })
}

const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                    success: false,
                    message: "Invalid data"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword= await bcryptjs.hash(password,16)
     
        const newUser = await User.create({
            fullName,
            email,
            password:hashedPassword
        });

        
        return res.status(201).json({
            success: true,
            message: "Account created",
            data: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {Register,Login,Logout};
