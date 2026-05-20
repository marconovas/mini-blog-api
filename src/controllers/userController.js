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
