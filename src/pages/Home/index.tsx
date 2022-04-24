import  { Box,TextField, Container, IconButton, Button, List, ListItemButton, ListItemText, Collapse, Accordion, AccordionSummary, Typography, AccordionDetails }  from '@mui/material';
import { ExpandLess, ExpandMore, Logout } from '@mui/icons-material'
import logo from "../../shared/images/Logo.png"
import { Fragment, useEffect, useState } from 'react';
import useContexts from '../../shared/hooks/useContexts';
import { useNavigate } from 'react-router-dom';
import useApi from '../../shared/hooks/useApi';
import Header from './components/Header';
import Menu from "./components/Menu"
import TermList from "./components/TermList"

interface Term {
    number: number;
    disciplines: DisciplineWithTeacher[];
    open?: boolean;
}

interface DisciplineWithTeacher {
    name: string;
    teachers: Teacher[];
    open?: boolean;
}


interface Teacher {
    name: string;
    tests: Test[]
}

interface Test {
    name: string;
	category: string;
}

interface TestsByTeacher {
	name: string;
	disciplines: []
	open?: boolean
}
export const Home: React.FC = () => {
	const contexts = useContexts()
	const api = useApi()
	const { auth, logout } = contexts.auth
	const navigate = useNavigate()
	const [filter, setFilter] = useState('disciplines')
	const [data, setData] = useState<Term[]>([])
	const [data2, setData2] = useState<TestsByTeacher[]>([])

	async function getData(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
			const { data } = await api.tests.getTests(filter, headers)
			
			if(filter === 'disciplines'){
				setData(data.map( (term:any) => ({
					number: term.number,
					disciplines: term.disciplines.map( (discipline:any) => ({
						name: discipline.name,
						open:false,
						categories: discipline.categories.map( (category:any) => ({
							name: category.name,
							tests: category.tests.map( (test:any) => ({
								name: test.name,
								teacher: test.teacher
							}))
						}))
					}))
				})))
			}else{
				setData2(data.map( (teacher: any) => ({
					name: teacher.name,
					open:false,
					disciplines: teacher.disciplines.map( (discipline: any) => ({
						tests: discipline.tests.map( (test: Test) => ({
								name: test.name,
								category: test.category,
								discipline: discipline.name
						}))
						
					}))
				})))
			}
			
		} catch (error: any) {
			console.log(error.response)
			if(error.response.status === 401) {
				logout()
				navigate('/sign-in')
			}
		}
	}

	useEffect(() => {
        getData()
        //eslint-disable-next-line
    }, [filter])

    useEffect(() => {
        if (!auth) {
            navigate("/sign-in");
        }
        //eslint-disable-next-line
    }, [])

    

    const handleDisciplineClick = (i: number, j:number) => () => {
        const aux: any[] = [...data]
        aux[i].disciplines[j].open = !aux[i].disciplines[j].open
        setData(aux);
    };
  
    return(  
        <Container disableGutters={true} maxWidth={false} sx={{p:0}} >

            <Header filter={filter}/>
            <Box sx={{width:'700px', margin: '35px auto 0'}}>

                <Menu filter={filter} setFilter={setFilter}/>
				{filter === 'disciplines'
				?	<TermList data={data} setData={setData}/>
				:	data2.map( (teacher, i) => (
						<Accordion key={i}>

							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
							<Typography>{teacher.name}</Typography>
							</AccordionSummary>
							<AccordionDetails>

								{teacher.disciplines.length === 0 
									?	<Typography sx={{pl:2}}>Não tem nenhuma prova para esse professor</Typography>
									:	teacher.disciplines.map( (discipline: any, j) =>
											<List component="div" disablePadding key={`${i}-${j}`}>
												{discipline.tests.map((test: any, k:number) =>
													<ListItemButton sx={{ pl: 4 }} key={`${i}-${j}-${k}`}>
														<ListItemText primary={test.category} secondary={`${test.name} (${test.discipline})`}/>
													</ListItemButton>
												)}
											</List>
										)
								}

							</AccordionDetails>

						</Accordion>
					))
				}
                
            </Box>
            
        </Container>
    );
};