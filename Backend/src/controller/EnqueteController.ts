import { Request, Response } from "express";
import { EnqueteBusiness } from "../business/EnqueteBusiness";
import { Enquete } from "./interfaces/EnqueteInterface";

export class EnqueteController {
    constructor(
        private enqueteBusiness: EnqueteBusiness
    ){}

    criarEnquete = async (req: Request, res: Response)=>{
        try {
            const {title,startDate,endDate,options} = req.body

            const input: Enquete = {
                title,
                startDate,
                endDate,
                options
            }

            await this.enqueteBusiness.criarEnquete(input)
            res.status(201).send({message: "Enquete criada com sucesso"})

        } catch (error: any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }

    pegarEnquetes = async (req: Request, res: Response)=>{
        try {
            
        } catch (error: any) {
            
        }
    }

    votarEnquete = async (req: Request, res: Response)=>{
        try {
            
        } catch (error: any) {
            
        }
    }
}