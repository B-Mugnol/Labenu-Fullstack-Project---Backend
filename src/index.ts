// External Libraries
import cors from "cors"
import express from "express"
import { AddressInfo } from "net"


// Routes
import { userRouter } from "./controller/routes/userRouter"


// Application setup
const app = express()

app.use(express.json())
app.use(cors())


// Application endpoints
app.use("/user", userRouter)


// Server
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})