import  { Box,TextField, Container, IconButton, Button, List, ListItemButton, ListItemText, Collapse }  from '@mui/material';
import { ExpandLess, ExpandMore, Logout } from '@mui/icons-material'
import logo from "../../shared/images/Logo.png"
import { useState } from 'react';

interface Term {
    name: string;
    disciplines: Discipline[];
    open?: boolean;
}

interface Discipline {
    name: string;
    tests: string[];
    open?: boolean;
}

const test: Term[] = [
    {
        name:'Periodo 1',
        disciplines:[
            {
                name:'CSS',
                tests:[
                    "p1", "p2"
                ]
            },
            {
                name:'HTML',
                tests:[
                    "p1"
                ]
            },
            {
                name:'JS',
                tests:[
                ]
            }
        ]
    },
    {
        name:'Periodo 2',
        disciplines:[
            {
                name:'CSS',
                tests:[
                    "p1", "p2"
                ]
            },
            {
                name:'HTML',
                tests:[
                    "p1"
                ]
            }
        ]
    },
    {
        name:'Periodo 3',
        disciplines:[]
    }
]

export const Home: React.FC = () => {
    const [data, setData] = useState<Term[]>(
        test.map( term => ({
            name: term.name,
            open:false,
            disciplines: term.disciplines.map( materia => ({
                name: materia.name,
                open:false,
                tests: materia.tests
            }))
        }))
    )

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

    const handleClickLogout = () => () => {
        console.log("opa")
    };
  
    return(  
        <Container maxWidth={false} sx={{p:0}} >
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
                            label="Pesquise por disciplina"
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
                    <Button sx={{height:'40px'}} variant='outlined'>
                        DISCIPLINAS
                    </Button>

                    <Button sx={{height:'40px'}} variant='outlined'>
                        PESSOA INSTRUTORA
                    </Button>

                    <Button sx={{height:'40px'}} variant='outlined'>
                        ADICIONAR
                    </Button>
                </Box>

                <List
                    sx={{marginTop: '50px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)', borderRadius: '4px' }}
                    component="nav"
                >
                    {
                        data.map( (term, i) => 
                            <Collapse in={true} timeout="auto" unmountOnExit key={i}>
                                <ListItemButton onClick={handleTermClick(i)}>
                                    <ListItemText primary={term.name} />
                                    {term.open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                {term.disciplines.map( (discipline: any, j) => 
                                    <Collapse in={term.open} timeout="auto" unmountOnExit key={`${i}-${j}`}>
                                        <List component="div" disablePadding>

                                            <ListItemButton sx={{ pl: 4 }} onClick={handleDisciplineClick(i, j)}>
                                                <ListItemText primary={discipline.name} />
                                                {discipline.open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>

                                            {discipline.tests.map( (test: string, k: number) => 
                                                <Collapse in={discipline.open} timeout="auto" unmountOnExit key={`${i}-${j}-${k}`}>
                                                    <List component="div" disablePadding>
                                                        <ListItemButton sx={{ pl: 8 }}>
                                                            <ListItemText primary={test} />
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
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