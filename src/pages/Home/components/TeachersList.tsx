import  { List, ListItemButton, ListItemText, Accordion, AccordionSummary, Typography, AccordionDetails }  from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import { Fragment } from "react"
import Teacher from "../../../shared/interfaces/Teacher"

interface Props {
    data: Teacher[];
}

export default function TeachersList({ data }: Props){
    return (
        <Fragment>
            {data.map( (teacher:any, i:number) => (
                <Accordion key={i}>

                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>{teacher.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        {teacher.categories.length === 0 
                            ?	<Typography sx={{pl:2}}>Não tem nenhuma prova para esse professor</Typography>
                            :	teacher.categories.map( (category: any, j:number) =>
                                    <Fragment key={`${i}-${j}`}>
                                        <Typography sx={{pl:4}}>{category.name}</Typography>
                                        <List component="div" disablePadding key={`${i}-${j}`}>
                                            {category.tests.map((test: any, k:number) =>
                                                <ListItemButton sx={{ pl: 4 }} key={`${i}-${j}-${k}`}>
                                                    <ListItemText secondary={`${test.name} (${test.discipline})`}/>
                                                </ListItemButton>
                                            )}
                                        </List>
                                    </Fragment>
                                )
                        }

                    </AccordionDetails>

                </Accordion>
            ))}
        </Fragment>
    )
}