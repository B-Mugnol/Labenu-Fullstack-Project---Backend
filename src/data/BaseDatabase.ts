// External libraries
import knex from "knex"
import Knex from "knex"


export abstract class BaseDatabase {

    private static connection: Knex | null = null;

    protected tableNames = {
        images: "Images_LFSP",
        imageTagRelation: "Image_Tag_Relation_LFSP",
        tags: "Tags_LFSP",
        users: "Users_LFSP"
    }

    protected get connection(): Knex {
        if (!BaseDatabase.connection) {
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    multipleStatements: true,
                },
            })
        }

        return BaseDatabase.connection;
    }

    public static async destroyConnection(): Promise<void> {
        if (BaseDatabase.connection) {
            await BaseDatabase.connection.destroy()
            BaseDatabase.connection = null
        }
    }
}