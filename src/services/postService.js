import prisma from "../prisma/client.js";

export async function posts () {
    return await prisma.post.findMany({
        include: {
            comments: true
        }
    });
}

export async function postById (postId) {
    return await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            comments: true
        }
    });
}

export async function create (userId, title, content) {
    return await prisma.post.create({
        data: {
            title, 
            content,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
}

export async function modify (postId, title, content) {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title,
            content
        }
    });
}

export async function remove (postId) {
    return await prisma.post.delete({
        where: {
            id: postId
        }
    });
}