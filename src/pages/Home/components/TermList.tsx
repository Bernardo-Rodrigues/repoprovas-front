import  { Accordion, AccordionSummary, Typography, AccordionDetails, CircularProgress }  from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import { Fragment, useEffect, useState } from "react"
import DisciplineList from './DisciplineList';
import useContexts from '../../../shared/hooks/useContexts';
import useApi from '../../../shared/hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import handleRequestError from '../../../shared/utils/handleRequestError';

export default function TermList(){
    const contexts = useContexts()
	const { auth, logout } = contexts.auth
	const api = useApi()
    const [termsData, setTermsData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    async function getTerms(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
            const { data } = await api.terms.getAll(headers)
            setTermsData(data.map( (term:any) => ({...term, open: false})))
            setIsLoading(false)
		} catch (error: any) {
			handleRequestError(error, logout, navigate)
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

    if(isLoading) return <Box sx={{display:"flex", justifyContent:"center"}}><CircularProgress /></Box>
    if(termsData.length === 0) return <Typography textAlign='center'>Não tem nenhum período cadastrado</Typography>

    return (
        <Fragment>
            {termsData.map( (term: any, i) => (
                <Accordion key={i}>

                    <AccordionSummary expandIcon={<ExpandMore/>} onClick={() => handleExpand(i)}>

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