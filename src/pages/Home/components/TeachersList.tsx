import  { Accordion, AccordionSummary, Typography, AccordionDetails, CircularProgress }  from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import { Fragment, useEffect, useState } from "react"
import TestsList from './TestsList';
import useContexts from '../../../shared/hooks/useContexts';
import useApi from '../../../shared/hooks/useApi';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import { fireAlert } from '../../../shared/utils/alerts';

export default function TeachersList(){
    const contexts = useContexts()
	const { auth, logout } = contexts.auth
    const { search } = contexts.search
	const api = useApi()
    const navigate = useNavigate()
    const [teacherData, setTeacherData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function getTeachers(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
            const { data } = await api.teachers.getAll(search, headers)
            setTeacherData(data.map( (teacher:any) => ({...teacher, open: false})))
            setIsLoading(false)
		} catch (error: any) {
			console.log(error.response)
			if(error.response.status === 401) {
                await fireAlert("Seção inválida, faça login novamente!")
				logout()
				navigate('/sign-in')
			}
		}
	}

    useEffect(() => {
        getTeachers()
        //eslint-disable-next-line
    }, [search])

    function handleExpand(teacherIndex: any){
        const aux: any[] = [...teacherData]
        aux[teacherIndex].open = !aux[teacherIndex].open
        setTeacherData(aux);
    }

    if(isLoading) return <Box sx={{display:"flex", justifyContent:"center"}}><CircularProgress /></Box>
    if(teacherData.length === 0) return <Typography textAlign='center'>Não tem nenhum professor cadastrado</Typography>
    
    return (
        <Fragment>
            {teacherData.map( (teacher:any, i:number) => (
                <Accordion key={i}>

                    <AccordionSummary expandIcon={<ExpandMore/>} onClick={()=> handleExpand(i)}>
                    <Typography>{teacher.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        {teacher.open && <TestsList teacherId={teacher.id} by='teacher'/>}

                    </AccordionDetails>

                </Accordion>
            ))}
        </Fragment>
    )
}