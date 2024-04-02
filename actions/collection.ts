"use server"
import prisma from "@/lib/prisma";
import { SchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";

export async function createCollectionAction(form: SchemaType) {
    const user = await currentUser()
    if (!user) {
        throw new Error("No user exists")
    }
    return await prisma.collection.create({
        data: {
            userId: user.id,
            name: form.name,
            color: form.color
        }
    })
}

export async function deleteCollectionAction(id: number) {
    const user = await currentUser()
    if (!user) {
        throw new Error("No user exists")
    }
    return await prisma.collection.delete({
        where: {
            id: id,
            userId: user.id
        }
    })
}