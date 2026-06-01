import prisma from "../prisma/client.js";

export async function getComments () {
    return await prisma.comment.findMany({
        select: {
            id: true,
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
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export async function getCommentById (id) {
    return await prisma.comment.findUnique({
        where: { id },
        select: {
            id: true,
            postId: true,
            content: true,
            createdAt: true,
            userId: true,
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
    });
}

export async function commentsByUser(userId) {
    return await prisma.comment.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });
}

export async function getCommentsByPost (postId) {
    return await prisma.comment.findMany({
        where: { postId },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
                select:{
                    id: true,
                    name: true
                }
            }
        }
    })
}

export async function newComment (content, userId, postId) {
    return await prisma.comment.create({
        data: {
            content,
            user: {
                connect: {
                    id: userId
                }
            },
            post: {
                connect: {
                    id: postId
                }
            }
        }
    })
}

export async function modifyComment (id, content) {
    return await prisma.comment.update({
        where: {id},
        data: {
            content
        }
    });
}

export async function removeComment (id){
    return await prisma.comment.delete({
        where: { id }
    });
}