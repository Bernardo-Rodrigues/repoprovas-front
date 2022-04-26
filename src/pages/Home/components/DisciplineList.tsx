import  { List, ListItemButton, ListItemText, Collapse, Typography }  from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Fragment, useEffect, useState } from "react"
import useContexts from '../../../shared/hooks/useContexts';
import useApi from '../../../shared/hooks/useApi';
import { useNavigate } from 'react-router-dom';
import TestsList from './TestsList';

interface Props {
    termId: number;
}

export default function DisciplineList({ termId }: Props){
    const contexts = useContexts()
	const { auth, logout } = contexts.auth
	const api = useApi()
    const navigate = useNavigate()
    const [disciplineData, setDisciplineData] = useState<any>([])

    async function getDisciplines(termId: number){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
            const { data } = await api.disicplines.getByTerm(termId, headers)
            setDisciplineData(data.map( (discipline:any) => ({...discipline, open: false})))
		} catch (error: any) {
			console.log(error.response)
			if(error.response.status === 401) {
				logout()
				navigate('/sign-in')
			}
		}
	}
    
    useEffect(()=>{
        getDisciplines(termId)
        //eslint-disable-next-line
    }, [])

    const handleDisciplineClick = async (i: number) => {
        const aux: any[] = [...disciplineData]
        aux[i].open = !aux[i].open
        setDisciplineData(aux);
    };

    if(disciplineData.length === 0) return <Typography sx={{pl:2}}>Não tem nenhuma disciplina nesse período</Typography>

    return (
        <Fragment>
            {disciplineData.map( (discipline: any, i:number) => 
                <List component="div" disablePadding key={`${i}`}>

                    <ListItemButton sx={{ pl: 2 }} onClick={() => handleDisciplineClick(i)}>
                        <ListItemText primary={discipline.name} />
                        {discipline.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={discipline.open} timeout="auto" unmountOnExit>
                        <TestsList disciplineId={discipline.id} by='discipline'/>
                    </Collapse>
                    
                </List>
            )}
        </Fragment>
    )
}