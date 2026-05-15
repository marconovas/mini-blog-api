import prisma from "../prisma/client.js";

export async function users () {
    return await prisma.user.findMany({
        select: {
            name: true,
            email: true,
            createdAt: true
        }
    });
}

export async function userById (id) {
    return prisma.user.findUnique({
        where: {id},
        select: {
            name: true,
            email: true,
            createdAt: true
        }
    })
}

//TESTING PROPUSES ONLY, REMOVE AND USE AUTH!!!
export async function create (name, email, password) {
    return prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });
}