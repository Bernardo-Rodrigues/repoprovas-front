import  { List, ListItemButton, ListItemText, Collapse, Typography, LinearProgress }  from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Fragment, useEffect, useState } from "react"
import useContexts from '../../../shared/hooks/useContexts';
import useApi from '../../../shared/hooks/useApi';
import TestsList from './TestsList';
import handleRequestError from '../../../shared/utils/handleRequestError';
import { useNavigate } from 'react-router';

interface Props {
    termId: number;
}

export default function DisciplineList({ termId }: Props){
    const contexts = useContexts()
	const { auth, logout } = contexts.auth
    const { search } = contexts.search
	const api = useApi()
    const [disciplineData, setDisciplineData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    async function getDisciplines(termId: number){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
            const { data } = await api.disicplines.getByTerm(termId, search, headers)
            setDisciplineData(data.map( (discipline:any) => ({...discipline, open: false})))
            setIsLoading(false)
		} catch (error: any) {
			handleRequestError(error, logout, navigate)
		}
	}
    
    useEffect(()=>{
        getDisciplines(termId)
        //eslint-disable-next-line
    }, [search])

    const handleDisciplineClick = async (i: number) => {
        const aux: any[] = [...disciplineData]
        aux[i].open = !aux[i].open
        setDisciplineData(aux);
    };

    if(isLoading) return <LinearProgress />
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