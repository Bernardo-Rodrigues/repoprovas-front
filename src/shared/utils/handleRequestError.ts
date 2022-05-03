import { useNavigate } from "react-router"
import useContexts from "../hooks/useContexts"
import { fireAlert } from "./alerts"

export default async function handleRequestError(error: any){
    const contexts = useContexts()
	const { logout } = contexts.auth
    const navigate = useNavigate()

    console.log(error.response)
    if(error.response.status === 401) {
    await fireAlert("Seção inválida, faça login novamente!")
    logout()
    navigate('/sign-in')
    }
}