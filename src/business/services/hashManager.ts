// External Library
import * as bcrypt from "bcryptjs"


// Encryption functions
export class Hash {
    public generate = async (plainText: string): Promise<string> => {
        const salt: string = await bcrypt.genSalt(Number(process.env.BCRYPT_COST))

        const cypheredText: string = await bcrypt.hash(plainText, salt)

        return cypheredText
    }

    public compare = async (plainText: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(plainText, hash)
    }
}
