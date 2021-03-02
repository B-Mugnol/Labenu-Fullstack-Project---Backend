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

}