// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Entities
import { UserDTO } from "../business/entities/userInterfaces"


export class UserDatabase extends BaseDatabase {
    
    public readonly create = async ({
        id,
        name,
        nickname,
        email,
        password,
        avatar
    }: UserDTO): Promise<void> => {
        try {
            await this.connection.raw(`            
                INSERT INTO ${this.tableNames.users} (id, name, nickname, email, password, avatar)
                VALUES (
                    "${id}",
                    "${name}",
                    "${nickname}",
                    "${email}",
                    "${password}",
                    "${avatar}"
                );
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


    public readonly getByEmail = async (email: string): Promise<UserDTO | undefined> => {
        try {
            const result: any = this.connection.raw(`
                SELECT * FROM ${this.tableNames.users}
                WHERE
                    email = ${email}
                ;
            `)

            return result[0][0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}