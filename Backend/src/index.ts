import { app } from "./app";
import { enqueteRouter } from "./controller/routes/EnqueteRouter";



app.use("/enquete", enqueteRouter)