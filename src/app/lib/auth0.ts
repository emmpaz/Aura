'use server'
import { ManagementClient } from "auth0"


export const createManagementClient = async () => {
    const client = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN ?? "",
        clientId: process.env.AUTH0_MACHINE_CLIENT_ID ?? "",
        clientSecret: process.env.AUTH0_MACHINE_SECRET_ID ?? "",
        
    })
    return client;
}