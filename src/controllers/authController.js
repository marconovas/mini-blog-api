import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../services/userService.js";

const SECRET = process.env.JWT_SECRET;

export async function register (req, res) {
    const { name, email, password } = req.body;

    try{
        //CHECK IF USER ALREADY EXISTS
        const existingUser = await UserService.findPrivateUserByEmail(email);
        
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User Already Exists."
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await UserService.createUser(
            name,
            email,
            hashedPassword
        );
        
       return res.status(201).json({
            success: true,
            message: "New User Created."
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

export async function login (req, res) {
    const { email, password } = req.body;

    const user = await UserService.findPrivateUserByEmail(email);

    if (!user) return res.status(401).json({
        success: false,
        message: "Invalid Credentials."
    })

    const valid = await bcrypt.compare(password, user.password);

    if(!valid){
        return res.status(401).json({
            success: false, 
            message: "Invalid Credentials."
        });
    }

    //TOKEN
    const TOKEN = jwt.sign(
        {
            userId : user.id,
            role: user.role
        },
        SECRET,
        {
            expiresIn: '1h'
        }
    );

    return res.status(200).json({
        success: true,
        TOKEN
    });
}