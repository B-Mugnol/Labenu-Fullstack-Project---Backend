// Error
import { InvalidInputError } from "../../error/InvalidInputError"


export class Verify {
    public string = (strObj: any): void => {
        for (let str in strObj) {

            if (typeof strObj[str] !== "string") {
                throw new InvalidInputError(`${str} is of the wrong type: ${typeof strObj[str]} instead of string.`)
            } else if (strObj[str] === "") {
                throw new Error(`The required field "${str}" is empty.`)
            }
        }
    }


    public length = (key: string, keyName: string, minLength: number) => {
        if (key.length < minLength) {
            throw new InvalidInputError(`${keyName} has insufficient length. Mininum length is ${minLength}.`)
        }
    }


    public email = (email: string) => {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const isEmail = emailRegExp.test(email)

        if (!isEmail) {
            throw new InvalidInputError("Invalid email.")
        }
    }


    public objectKeys = (reqObject: any, validKeys: string[], optionalKeys?: string[]): void => {

        if (!optionalKeys) {
            if (Object.keys(reqObject).length < validKeys.length) {
                throw new InvalidInputError(`Missing key(s) in requisition. Valid keys are: ${validKeys.join(", ")}.`)
            } else if (Object.keys(reqObject).length > validKeys.length) {
                throw new InvalidInputError(`Found extra key(s) in requisition. Valid keys are: ${validKeys.join(", ")}.`)
            }

            for (let key in reqObject) {
                if (!validKeys.includes(key)) {
                    throw new Error(`Invalid key in requisition. Valid keys are: ${validKeys.join(", ")}.`)
                }

                if (!reqObject[key] && reqObject[key] !== 0) {
                    throw new Error(`Empty value in the required field: "${key}".`)
                }
            }
        } else {
            const requiredKeys = validKeys.reduce((requiredArray: string[], currentKey: string): string[] => {
                if (!optionalKeys.includes(currentKey)) {
                    return [...requiredArray, currentKey]
                } else return [...requiredArray]
            }, [])

            let obligatoryReqObject: any = {}

            for (let key in reqObject) {
                if (requiredKeys.includes(key)) {

                    obligatoryReqObject = {
                        ...obligatoryReqObject,
                        [key]: reqObject[key]
                    }

                } else {
                    obligatoryReqObject = { ...obligatoryReqObject }
                }

            }

            this.objectKeys(obligatoryReqObject, requiredKeys)
        }
    }


}
