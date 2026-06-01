import prisma from "../prisma/client.js";

class UserService {
    static async createUser( name, email, password ) {
        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }

    static async deleteUser (id) {
        return await prisma.user.delete({
            where: { id }
        });
    }

    static async getUsers() {
        return await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                createdAt: true
            }
        })
    }

    static async findSafeUserById (id) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                name: true,
                email: true,
                createdAt: true,
                
                posts: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        title: true,
                        content: true,
                        createdAt: true
                    }
                },
                
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        postId: true,
                        content: true,
                        createdAt: true
                    }
                }
            }
        });
    }

    static async findSafeUserByEmail (email) {
        return await prisma.user.findUnique({
            where: { email },
            select: {
                name: true,
                email: true,
                createdAt: true
            }
        })
    }

    static async findPrivateUserById (id) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,

                posts: true,
                comments: true
            }
        })
    }

    static async findPrivateUserByEmail (email) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }
}


export default UserService;