import prisma from "../prisma/client.js";

class UserService {
    static async create({ name, email, password }) {
        return prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }

    static async users() {
        return await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                createdAt: true
            }
        })
    }

    static async findPublicUser (email) {
        return await prisma.user.findUnique({
            where: { email },
            select: {
                name: true,
                email: true,
                createdAt: true
            }
        })
    }

    static async findPrivateUser (email) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }
}


export default UserService;