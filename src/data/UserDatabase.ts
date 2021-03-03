// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Entities
import { UserDTO } from "../business/entities/UserInterfaces"


export class UserDatabase extends BaseDatabase {
    private table = this.tableNames.users

    public create = async ({
        id,
        name,
        nickname,
        email,
        password,
        avatar
    }: UserDTO): Promise<void> => {
        try {
            await this.connection.raw(`            
                INSERT INTO ${this.table} (id, name, nickname, email, password, avatar)
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


    public getByEmail = async (email: string): Promise<UserDTO | undefined> => {
        try {
            const result: any = this.connection.raw(`
                SELECT * FROM ${this.table}
                WHERE
                    email = ${email}
                ;
            `)

            return result[0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}