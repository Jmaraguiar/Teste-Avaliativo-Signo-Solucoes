import express from "express";
import { EnqueteBusiness } from "../../business/EnqueteBusiness";
import { IdGenerator } from "../../business/services/IdGenerator";
import { EnqueteDatabase } from "../../data/EnqueteDataBase";
import { EnqueteController } from "../EnqueteController";

export const enqueteRouter = express.Router()

const enqueteBusiness = new EnqueteBusiness(
    new EnqueteDatabase(),
    new IdGenerator()
)

const enqueteController = new EnqueteController(enqueteBusiness)

enqueteRouter.post("/create", enqueteController.criarEnquete)

enqueteRouter.put("/vote/:id", enqueteController.votarEnquete)

enqueteRouter.get("/getAll", enqueteController.pegarEnquetes)

enqueteRouter.get("/getEnquete/:id", enqueteController.pegarEnquetePorId)





