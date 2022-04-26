import  { Accordion, AccordionSummary, Typography, AccordionDetails }  from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import { Fragment, useState } from "react"
import DisciplineList from './DisciplineList';

interface Props {
    data: [];
}

export default function TermList({ data }: Props){
    const [expanded, setExpanded] = useState(false)

    return (
        <Fragment>
            {data.map( (term: any, i) => (
                <Accordion key={i}>

                    <AccordionSummary expandIcon={<ExpandMore onClick={()=>setExpanded(!expanded)}/>}>

                        <Typography>{`${term.number}° Período`}</Typography>

                    </AccordionSummary>
                    <AccordionDetails>

                        {expanded && <DisciplineList termId={term.id}/>}

                    </AccordionDetails>

                </Accordion>
            ))}
        </Fragment>
    )
}