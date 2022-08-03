import { Enquete } from "../controller/interfaces/EnqueteInterface"
import { BaseDatabase } from "./BaseDatabase"

export class EnqueteDatabase extends BaseDatabase {
    inserirEnquete = async (input: Enquete, id: string)=>{
        try {
            const {title,startDate,endDate,options} = input
            await BaseDatabase.connection("Enquetes")
            .insert({
                id,
                title,
                startDate,
                endDate
            }).then(()=>{
                options.map( async (item)=>{
                    await BaseDatabase.connection("Enquete_options")
                    .insert({
                        enqueteID: id,
                        option: item
                    })
                })
            })

            console.log("cheguei aqui")
        } catch (error: any) {
            throw new Error(error.sqlMessage); 
        }
    }

    pegarEnquetes = async ()=>{
        try {
            
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