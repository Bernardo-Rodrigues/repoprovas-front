import  { Accordion, AccordionSummary, Typography, AccordionDetails }  from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import { Fragment, useEffect, useState } from "react"
import DisciplineList from './DisciplineList';
import useContexts from '../../../shared/hooks/useContexts';
import useApi from '../../../shared/hooks/useApi';
import { useNavigate } from 'react-router-dom';

export default function TermList(){
    const contexts = useContexts()
	const { auth, logout } = contexts.auth
	const api = useApi()
    const navigate = useNavigate()
    const [termsData, setTermsData] = useState<any[]>([])

    async function getTerms(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
            const { data } = await api.terms.getAll(headers)
            setTermsData(data.map( (term:any) => ({...term, open: false})))
		} catch (error: any) {
			console.log(error.response)
			if(error.response.status === 401) {
				logout()
				navigate('/sign-in')
			}
		}
	}

    useEffect(() => {
        getTerms()
        //eslint-disable-next-line
    }, [])

    function handleExpand(termIndex: any){
        const aux: any[] = [...termsData]
        aux[termIndex].open = !aux[termIndex].open
        setTermsData(aux);
    }

    return (
        <Fragment>
            {termsData.map( (term: any, i) => (
                <Accordion key={i}>

                    <AccordionSummary expandIcon={<ExpandMore onClick={() => handleExpand(i)}/>}>

                        <Typography>{`${term.number}° Período`}</Typography>

                    </AccordionSummary>
                    <AccordionDetails>

                        {term.open && <DisciplineList termId={term.id}/>}

                    </AccordionDetails>

                </Accordion>
            ))}
        </Fragment>
    )
}