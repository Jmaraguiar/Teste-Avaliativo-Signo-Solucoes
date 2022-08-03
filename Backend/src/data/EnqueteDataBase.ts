import { Enquete, Options, OptionsArray } from "../controller/interfaces/EnqueteInterface"
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

    votarEnquete = async ()=>{
        try {
            
        } catch (error: any) {
            throw new Error(error.sqlMessage); 
        }
    }
}