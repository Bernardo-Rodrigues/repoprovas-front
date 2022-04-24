import  { List, ListItemButton, ListItemText, Collapse, Accordion, AccordionSummary, Typography, AccordionDetails }  from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Fragment } from "react"

interface Props {
    data: Term[];
    setData: (value: React.SetStateAction<Term[]>) => void
}

interface Term {
    number: number;
    disciplines: Discipline[];
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

export default function TermList({ data, setData }: Props){
    const handleDisciplineClick = (i: number, j:number) => () => {
        const aux: any[] = [...data]
        aux[i].disciplines[j].open = !aux[i].disciplines[j].open
        setData(aux);
    };

    return (
        <Fragment>
            {data.map( (term, i) => (
                    <Accordion key={i}>

                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>{`${term.number}° Período`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            {term.disciplines.length === 0 
                                ?	<Typography sx={{pl:2}}>Não tem nenhuma disciplina nesse período</Typography>
                                    
                                :	term.disciplines.map( (discipline: any, j) => 
                                        <List component="div" disablePadding key={`${i}-${j}`}>

                                            <ListItemButton sx={{ pl: 2 }} onClick={handleDisciplineClick(i, j)}>
                                                <ListItemText primary={discipline.name} />
                                                {discipline.open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>

                                            {discipline.categories.length === 0 
                                                ?	<Collapse in={discipline.open} timeout="auto" unmountOnExit>
                                                        <Typography sx={{pl:4}}>Não tem prova para nenhuma categoria dessa disciplina</Typography>
                                                    </Collapse>
                                                :	<Collapse in={discipline.open} timeout="auto" unmountOnExit key={`${i}-${j}`}>
                                                        {
                                                            discipline.categories.map( (category:any, k: number) => (
                                                                <Fragment key={`${i}-${j}-${k}`}>
                                                                    <Typography sx={{pl:4}}>{category.name}</Typography>
                                                                    <List component="div" disablePadding>
                                                                    {category.tests.map( (test: any, l: number) => 
                                                                        <ListItemButton sx={{ pl: 4 }} key={`${i}-${j}-${k}-${l}`}>
                                                                            <ListItemText primary={test.category} secondary={`${test.name} (${test.teacher})`} ></ListItemText>
                                                                        </ListItemButton>
                                                                    )}
                                                                    </List>
                                                                </Fragment>
                                                            
                                                            ))
                                                        }
                                                    </Collapse>
                                            }  
                                        </List>
                                )
                            }
                        </AccordionDetails>

                    </Accordion>
            ))}
        </Fragment>
    )
}