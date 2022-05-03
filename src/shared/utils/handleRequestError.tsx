import { NavigateFunction } from "react-router"
import { fireAlert } from "./alerts"

export default async function handleRequestError(error: any, logout: () => void, navigate: NavigateFunction){
    console.log(error.response)
    if(error.response.status === 401) {
    await fireAlert("Seção inválida, faça login novamente!")
    logout()
    navigate('/sign-in')
    }
}