import userService from "../services/userService.js";

export async function getUsers (req, res) {
    try{
        const users = await userService.getUsers();

        return res.json({
            success: true,
            users
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function getUserById (req, res) {
    const userId = req.params.id;

    try{
        const user = await userService.findSafeUserById(userId); ////

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not Found."
            });
        }

        return res.status(200).json({
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


//UPDATE USER
export async function updateUser (req, res) {
    const userId = req.params.id;
    const { bio } = req.body;

    try{
        if(
            req.user.userId !== Number(userId) && 
            req.user.role !== "ADMIN"
        ){
            res.status(403).json({
                success: false,
                message: "Forbidden."
            })
        }

        const user = await userService.editUser(
            userId,
            { bio }
        );


        return res.status(200).json({
            success: true,
            user
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        }) 
    }
}

//USER DELETE
export async function deleteUserById(req, res) {
    const userId = req.params.id;

    try{
        const user = await userService.findSafeUserById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found."
            });
        }

        if(
            req.user.userId !== userId && 
            req.user.role !== "ADMIN"
        ){
            return res.status(403).json({
                success: false,
                message: "Action Forbidden."
            });
        }

        await userService.deleteUser(userId);

        return res.status(200).json({
            success: true,
            message: "User Removed Successfully."
        });
        
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

///ADMIN
export async function getPrivateUserInfo (req, res) {
    const userId = req.params.id;

    try{
        const user = userService.findPrivateUserById(userId);
        
        if(!user){
            res.status(404).json({
                success: false,
                message: "User Not Found."
            });
        }

        if(req.user.role !== "ADMIN"){
            return res.status(403).json({
                success: false,
                message: "Forbidden Action."
            })
        }
        
        return res.status(200).json({
            success: true,
            user
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}