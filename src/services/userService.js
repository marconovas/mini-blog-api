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

    static async editUser( id, data ) {
        return await prisma.user.update({
            where: { id },
            data
        });
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
                id: true,
                name: true,
                email: true,
                createdAt: true,
                bio: true,
                
                posts: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        id: true,
                        postId: true,
                        content: true,
                        createdAt: true,

                        user: {
                            select: {
                                id: true,
                                name: true
                            }
                        },

                        post: {
                            select: {
                                id: true,
                                title: true
                            }
                        }
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