import  { Box,TextField, Container, IconButton, Button, List, ListItemButton, ListItemText, Collapse }  from '@mui/material';
import { ExpandLess, ExpandMore, Logout } from '@mui/icons-material'
import logo from "../../shared/images/Logo.png"
import { useEffect, useState } from 'react';
import useContexts from '../../shared/hooks/useContexts';
import { useNavigate } from 'react-router-dom';
import useApi from '../../shared/hooks/useApi';

interface Term {
    number: number;
    disciplines: Discipline[];
    open?: boolean;
}

interface Discipline {
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

export const Home: React.FC = () => {
	const contexts = useContexts()
	const api = useApi()
	const { auth, logout } = contexts.auth
	const navigate = useNavigate()
	const [filter, setFilter] = useState('disciplines')
	const [data, setData] = useState<Term[]>([])

	

	async function getData(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
			const { data} = await api.tests.getTests(filter, headers)
			
			setData(data.map( (term: Term) => ({
				number: term.number,
				open:false,
				disciplines: term.disciplines.map( (discipline: Discipline) => ({
					name: discipline.name,
					open:false,
					teachers: discipline.teachers.map( (teacher: Teacher) => ({
						name: teacher.name,
						tests: teacher.tests.map( (test: Test) => ({
							name: test.name,
							category: test.category
						}))
					}))
				}))
			})))
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          search: data.get('search')
        });
    };

    const handleTermClick = (i: number) => () => {
        const aux: any[] = [...data]
        aux[i].open = !aux[i].open
        setData(aux);
    };

    const handleDisciplineClick = (i: number, j:number) => () => {
        const aux: any[] = [...data]
        aux[i].disciplines[j].open = !aux[i].disciplines[j].open
        setData(aux);
    };

    const handleClickLogout = () => {
        logout()
        navigate("/sign-in");
    };
  
    return(  
        <Container disableGutters={true} maxWidth={false} sx={{p:0}} >
            <Box sx={{display:'flex', height:'250px', position:"relative", borderBottom:1, borderColor:'#c4c4c4'}}>
                <Box sx={{flex:1, position:'absolute', top:'50px', left:'60px'}}>
                    <img src={logo} alt="logo"/>
                </Box>

                <Box sx={{flex:1, position:'absolute', bottom:'25px', left:'calc(50% - 228px)'}}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width:'458px' }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="search"
                            label={`Pesquise por ${filter === 'disciplines' ? 'disciplina': 'professor'}`}
                            name="search"
                            autoFocus
                        />
                    </Box>
                </Box>

                <Box sx={{flex:1, position:'absolute', top:'30px', right:'20px'}}>
                    <IconButton onClick={handleClickLogout} >
                        <Logout sx={{fontSize:'40px'}}/>
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{width:'700px', margin: '35px auto 0'}}>
                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Button sx={{height:'40px'}} variant={filter === 'disciplines' ? 'contained' : 'outlined'} onClick={()=>setFilter('disciplines')}>
                        DISCIPLINAS
                    </Button>

                    <Button sx={{height:'40px'}} variant={filter === 'teachers' ? 'contained' : 'outlined'} onClick={()=>setFilter('teachers')}>
                        PESSOA INSTRUTORA
                    </Button>

                    <Button sx={{height:'40px'}} variant='outlined'>
                        ADICIONAR
                    </Button>
                </Box>

                <List
                    sx={{margin: '50px  0', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)', borderRadius: '4px' }}
                    component="nav"
                >
                    {
                        data.map( (term, i) => 
                            <Collapse in={true} timeout="auto" unmountOnExit key={i}>
                                <ListItemButton onClick={handleTermClick(i)}>
                                    <ListItemText primary={`${term.number}° Período`} />
                                    {term.open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                {term.disciplines.map( (discipline: any, j) => 
                                    <Collapse in={term.open} timeout="auto" unmountOnExit key={`${i}-${j}`}>
                                        <List component="div" disablePadding>

                                            <ListItemButton sx={{ pl: 4 }} onClick={handleDisciplineClick(i, j)}>
                                                <ListItemText primary={discipline.name} />
                                                {discipline.open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>

                                            {discipline.teachers.map( (teacher: Teacher, k: number) => 
												teacher.tests.map( (test: Test, l: number) => 
													<Collapse in={discipline.open} timeout="auto" unmountOnExit key={`${i}-${j}-${k}`}>
														<List component="div" disablePadding>
															<ListItemButton sx={{ pl: 8 }}>
																<ListItemText primary={test.category} secondary={`${test.name} (${teacher.name})`} ></ListItemText>
															</ListItemButton>
														</List>
													</Collapse>
												)
												
											)}   
                                        </List>
                                    </Collapse>
                                )}
                            </Collapse>
                        )
                    }
                </List>
            </Box>
            
        </Container>
            

    );
};