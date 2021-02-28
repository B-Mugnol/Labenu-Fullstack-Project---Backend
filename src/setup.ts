import { BaseDatabase } from "./data/BaseDatabase";

class Setup extends BaseDatabase {

    public async createTables(): Promise<void> {
        try {
            await this.connection.raw(`
                CREATE TABLE IF NOT EXISTS ${this.tableNames.users} (
                    id VARCHAR(255) PRIMARY KEY,   
                    name VARCHAR(255) NOT NULL,
                    nickname VARCHAR(255) NOT NULL UNIQUE,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    avatar VARCHAR(2083) NOT NULL
                );
                
                
                CREATE TABLE IF NOT EXISTS ${this.tableNames.images} (
                    id VARCHAR(255) PRIMARY KEY,   
                    subtitle TEXT NOT NULL,
                    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    file_path VARCHAR(2083),
                    file BLOB,
                    collection VARCHAR(255) NOT NULL,
                    author_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (author_id) REFERENCES ${this.tableNames.users}(id)
                );
                
                
                CREATE TABLE IF NOT EXISTS ${this.tableNames.tags} (
                    id VARCHAR(255) PRIMARY KEY,
                    tag VARCHAR(255) NOT NULL UNIQUE
                );
                
                
                CREATE TABLE IF NOT EXISTS ${this.tableNames.imageTagRelation} (
                    image_id VARCHAR(255) NOT NULL,
                    tag_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (image_id) REFERENCES ${this.tableNames.images}(id),
                    FOREIGN KEY (tag_id) REFERENCES ${this.tableNames.tags}(id)
                );
            `)

            console.log("Setup successful.")

        } catch (error) {
            console.log(error.message)
            console.log("Setup failed")

        } finally {
            BaseDatabase.destroyConnection()

        }
    }
}

new Setup().createTables()
