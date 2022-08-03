export interface Options {
    option: string,
    votes: number
}

export type OptionsArray = Options[]

export interface Enquete {
    title: string,
    startDate: string,
    endDate: string,
    options: string[]
}

