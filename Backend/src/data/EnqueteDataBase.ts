import { Enquete, EnqueteDbDTO, Options, OptionsArray } from "../controller/interfaces/EnqueteInterface"
import { BaseDatabase } from "./BaseDatabase"

export class EnqueteDatabase extends BaseDatabase {
    inserirEnquete = async (input: Enquete, options: OptionsArray, id: string)=>{
        try {
            const {title,startDate,endDate} = input
            await BaseDatabase.connection("Enquetes")
            .insert({
                id,
                title,
                startDate,
                endDate,
                options: JSON.stringify(options)
            })

        } catch (error: any) {
            throw new Error(error.sqlMessage); 
        }
    }

    pegarEnquetes = async ()=>{
        try {
           const enquetes = await BaseDatabase.connection("Enquetes")
           .select("*")

           return enquetes 

        } catch (error: any) {
            throw new Error(error.sqlMessage); 
        }
    }

    pegarEnquetePorID = async (id: string):Promise<EnqueteDbDTO>=>{
        try {

            const enquete = await BaseDatabase.connection("Enquetes")
            .select("*")
            .where({id})

            return enquete && enquete[0]
            
        } catch (error: any) {
            throw new Error(error.sqlMessage); 
        }
    }

    votarEnquete = async (id: string,enquete: EnqueteDbDTO)=>{
        try {
            const {options,totalVotes} = enquete
            await BaseDatabase.connection("Enquetes")
            .update({options: JSON.stringify(options),totalVotes})
            .where({id})
            
        } catch (error: any) {
            throw new Error(error.sqlMessage); 
        }
    }
}