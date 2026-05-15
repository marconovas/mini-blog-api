import * as userService from "../services/userService.js";

export async function getUsers (req, res) {
    try{
        const users = await userService.users();

        res.json({
            success: true,
            users
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function getUserById (req, res) {
    const userId = parseInt(req.params.id);

    if(isNaN(userId)){
        return res.status(400).json({
            success: false,
            message: "Invalid Data."
        });
    }

    try{
        const user = await userService.userById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not Found."
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export async function newUser (req, res) {
    const name = req.body.name || "";
    const email = req.body.email || "";
    const password = req.body.password || "";

    if(name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0){
        return res.status(400).json({
            success: false,
            message: "Invalid Data."
        })
    }

    try{
        await userService.create(name, email, password);

        res.status(201).json({
            success: true,
            message: "New User Added."
        })
    } catch(error) {

        if(error.code === 'P2002'){ //DUPLICATED DATA/EMAIL ERROR
            return res.status(409).json({
                success: false,
                message: "E-mail already Taken."
            });
        }

        return res.status(500).json({
            success: false,
            message: "User Was not Created."
        })
    }
}