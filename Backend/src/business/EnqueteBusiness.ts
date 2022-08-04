import { Enquete, EnqueteDbDTO, Options } from "../controller/interfaces/EnqueteInterface";
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

        const treatedStartDate = new Date(startDate)
        const treatedEndDate = new Date(endDate)
        input.startDate = treatedStartDate
        input.endDate = treatedEndDate

        console.log(input.startDate)
        console.log(input.endDate)

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
                startDate: new Date(enquete.startDate).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }),
                endDate: new Date(enquete.endDate).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }),
                totalVotes: enquete.totalVotes
            }
        })
        return treatedEnquetes
    }

    pegarEnquetePorId = async (id:string)=>{
        const enquete = await this.enqueteDatabase.pegarEnquetePorID(id)
        if(!enquete){
            throw new CustomError(500,"Erro ao pegar as enquetes");
        }

        const treatedEnquetes = {
                id: enquete.id,
                title: enquete.title,
                startDate: enquete.startDate,
                endDate: enquete.endDate,
                options: JSON.parse(enquete.options),
                totalVotes: enquete.totalVotes  
        }
        return treatedEnquetes
    }

    votarEnquete = async (id: string,vote: string)=>{
        if(!id){
            throw new CustomError(400,"Faltando ID da enquete");
        }

        const enquete = await this.enqueteDatabase.pegarEnquetePorID(id)

        const today = new Date(Date.now())
        const enqueteStartDay = enquete.startDate
        const enqueteEndDay = enquete.endDate

        if(today < enqueteStartDay || today > enqueteEndDay){
            throw new CustomError(503,"Esta enquete está fora da data válida");
        }

        const options = JSON.parse(enquete.options)
        enquete.options = options.map((object: Options)=>{
            if(object.option == vote){
                object.votes += 1
            }
            return object
        })
        enquete.totalVotes += 1
        
        await this.enqueteDatabase.votarEnquete(id,enquete)
    }
}