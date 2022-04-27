import  { LinearProgress, List, ListItemButton, ListItemText, Typography }  from '@mui/material';
import { Fragment, useEffect, useState } from "react"
import useContexts from '../../../shared/hooks/useContexts';
import useApi from '../../../shared/hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { fireAlert } from '../../../shared/utils/alerts';

interface Props {
    disciplineId?: number;
    teacherId?: number;
    by: string;
}

export default function TestsList({ disciplineId, teacherId, by }: Props){
    const contexts = useContexts()
	const api = useApi()
	const { auth, logout } = contexts.auth
    const navigate = useNavigate()
    const [tests, setTests] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    
    async function getTests(){
        const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
            if(by === 'discipline'){
                const { data } = await api.tests.getByDiscipline(disciplineId, headers)
                setTests(data)
            } else {
                const { data } = await api.tests.getByTeacher(teacherId, headers)
                setTests(data)
            }
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
    
    useEffect(()=>{
        getTests()
        //eslint-disable-next-line
    }, [])
    
    const categoriesHash:any = {}

    tests.forEach( (test:any) => {
        if(!categoriesHash[test.category.name]) categoriesHash[test.category.name] = [{name:test.name, teacher: test.teacherDiscipline.teacher?.name, discipline: test.teacherDiscipline.discipline?.name}]
        else categoriesHash[test.category.name].push({name:test.name, teacher: test.teacherDiscipline.teacher?.name, discipline: test.teacherDiscipline.discipline?.name})
    }) 
    
    if(isLoading) return <LinearProgress />
    if(tests.length === 0) return <Typography sx={{pl:4}}>Não tem prova para nenhuma categoria {by === 'discipline' ? 'dessa disciplina' : 'desse professor'}</Typography>

    return (
        <Fragment>
                {Object.entries(categoriesHash).map( (category:any, i: number) => (
                    <Fragment key={`${i}`}>
                        <Typography sx={{pl:4}}>{category[0]}</Typography>
                        <List component="div" disablePadding>
                        {category[1].map( (test: any, j: number) => 
                            <ListItemButton sx={{ pl: 4 }} key={`${i}-${j}`}>
                                <ListItemText primary={test.category} secondary={`${test.name} (${by === 'discipline' ? test.teacher : test.discipline})`} ></ListItemText>
                            </ListItemButton>
                        )}
                        </List>
                    </Fragment>
                ))}
        </Fragment>
    )
}