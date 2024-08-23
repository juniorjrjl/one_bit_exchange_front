import type { AxiosResponse } from "axios"
import api from "./api"

export type ConvertResponse = {
    value: number
}

export type AvailableResponse = {
    symbol: string
    description: string
}

const exchangeService = {
    available: async() => {
        try{
            const res = api.get<AvailableResponse[], AxiosResponse<AvailableResponse[]>>("/available")
            return res
        }catch(err){
            throw err;
        }
    }, 
    convert: async (source: string, target: string, amount: number) => {
        try{
            const res = api.get<ConvertResponse, AxiosResponse<ConvertResponse>>(`/convert?source=${source}&target=${target}&amount=${amount}`)
            return res
        }catch(err){
            throw err
        }
    }
}

export default exchangeService;
