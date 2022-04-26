import  { Accordion, AccordionSummary, Typography, AccordionDetails }  from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import { Fragment, useState } from "react"
import Teacher from "../../../shared/interfaces/Teacher"
import TestsList from './TestsList';

interface Props {
    data: Teacher[];
}

export default function TeachersList({ data }: Props){
    const [expanded, setExpanded] = useState(false)

    return (
        <Fragment>
            {data.map( (teacher:any, i:number) => (
                <Accordion key={i}>

                    <AccordionSummary
                        expandIcon={<ExpandMore onClick={()=>setExpanded(!expanded)}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>{teacher.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        {expanded && <TestsList teacherId={teacher.id} by='teacher'/>}

                    </AccordionDetails>

                </Accordion>
            ))}
        </Fragment>
    )
}