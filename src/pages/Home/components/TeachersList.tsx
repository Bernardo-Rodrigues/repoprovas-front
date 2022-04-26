import  { Accordion, AccordionSummary, Typography, AccordionDetails }  from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import { Fragment, useEffect, useState } from "react"
import Teacher from "../../../shared/interfaces/Teacher"
import TestsList from './TestsList';
import useContexts from '../../../shared/hooks/useContexts';
import useApi from '../../../shared/hooks/useApi';
import { useNavigate } from 'react-router';

export default function TeachersList(){
    const contexts = useContexts()
	const { auth, logout } = contexts.auth
	const api = useApi()
    const navigate = useNavigate()
    const [teacherData, setTeacherData] = useState<any[]>([])

    async function getTeachers(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
            const { data } = await api.teachers.getAll(headers)
            setTeacherData(data.map( (teacher:any) => ({...teacher, open: false})))
		} catch (error: any) {
			console.log(error.response)
			if(error.response.status === 401) {
				logout()
				navigate('/sign-in')
			}
		}
	}

    useEffect(() => {
        getTeachers()
        //eslint-disable-next-line
    }, [])

    function handleExpand(teacherIndex: any){
        const aux: any[] = [...teacherData]
        aux[teacherIndex].open = !aux[teacherIndex].open
        setTeacherData(aux);
    }

    return (
        <Fragment>
            {teacherData.map( (teacher:any, i:number) => (
                <Accordion key={i}>

                    <AccordionSummary
                        expandIcon={<ExpandMore onClick={()=> handleExpand(i)}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
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