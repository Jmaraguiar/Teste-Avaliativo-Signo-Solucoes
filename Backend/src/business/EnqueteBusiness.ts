import { Enquete, Options } from "../controller/interfaces/EnqueteInterface";
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

        const treatedOptions = options.map((opt)=>{
            return {
                option: opt,
                votes: 0
            }
        })

        const id = this.idGenerator.generateId()
        await this.enqueteDatabase.inserirEnquete(input, treatedOptions, id)
    }

    pegarEnquetes = async ()=>{
        const enquetes = await this.enqueteDatabase.pegarEnquetes()
        if(!enquetes){
            throw new CustomError(500,"Erro ao pegar as enquetes");
        }

        const treatedEnquetes = enquetes.map((enquete)=>{
            return {
                id: enquete.id,
                title: enquete.title,
                startDate: enquete.startDate,
                endDate: enquete.endDate,
                options: JSON.parse(enquete.options),
                totalVotes: enquete.totalVotes
            }
        })
        return treatedEnquetes
    }

    votarEnquete = async ()=>{
        
    }
}