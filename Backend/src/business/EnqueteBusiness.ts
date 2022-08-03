import { Enquete } from "../controller/interfaces/EnqueteInterface";
import { EnqueteDatabase } from "../data/EnqueteDataBase";
import { CustomError } from "./errors/CustomError";
import { IdGenerator } from "./services/IdGenerator";

export class EnqueteBusiness {
    constructor(
        private enqueteDatabase: EnqueteDatabase ,
        private idGenerator: IdGenerator
    ){}

    criarEnquete = async (input: Enquete)=>{
        const {title,startDate,endDate,options} = input

        if(!title || !startDate || !endDate || !options){
            throw new CustomError(400,"Faltando informações de cadastro");
        }

        if(options.length < 3){
            throw new CustomError(400,"É necessario inserir no mínimo 3 opções");
        }

        const id = this.idGenerator.generateId()
        await this.enqueteDatabase.inserirEnquete(input, id)
    }

    pegarEnquetes = async ()=>{
        
    }

    votarEnquete = async ()=>{
        
    }
}