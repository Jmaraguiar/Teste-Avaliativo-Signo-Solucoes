export interface Options {
    option: string,
    votes: number
}

export type OptionsArray = Options[]

export interface Enquete {
    title: string,
    startDate: string | Date,
    endDate: string | Date,
    options: string[] 
}

export interface EnqueteDbDTO {
    id: string,
    title: string,
    startDate: string | Date,
    endDate: string | Date,
    options: string,
    totalVotes: number
}

