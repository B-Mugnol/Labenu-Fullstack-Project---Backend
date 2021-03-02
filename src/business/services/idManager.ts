// External Library
import { v4 } from "uuid"


export class IdManager {
    public generate = (): string => v4()
}
