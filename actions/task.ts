"use server"
import prisma from "@/lib/prisma";
import { SchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTaskAction({content, expiresAt, collectionId}: SchemaType) {
    const user = await currentUser()
    if (!user) {
        throw new Error("No user exists")
    }
    return await prisma.task.create({
        data: {
            userId: user.id,
            content,
            expiresAt,
            Collection: {
                connect: {
                    id: collectionId
                }
            }
        }
    })
}

export async function setTaskDoneAction(id: number) {
    const user = await currentUser()
    if (!user) {
        throw new Error("No user exists")
    }
    return await prisma.task.update({
        where: {
            id: id,
            userId: user.id
        },
        data: {
            done: true
        }
    })
}