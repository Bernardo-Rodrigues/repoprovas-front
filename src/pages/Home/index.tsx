import  { Box, Container }  from '@mui/material';
import { useEffect, useState } from 'react';
import useContexts from '../../shared/hooks/useContexts';
import { useNavigate } from 'react-router-dom';
import useApi from '../../shared/hooks/useApi';
import Header from './components/Header';
import Menu from "./components/Menu"
import TermList from "./components/TermList"
import TeachersList from './components/TeachersList';
import Term from "../../shared/interfaces/Term"
import Teacher from "../../shared/interfaces/Teacher"

export const Home: React.FC = () => {
	const contexts = useContexts()
	const api = useApi()
	const { auth, logout } = contexts.auth
	const navigate = useNavigate()
	const [filter, setFilter] = useState('disciplines')
	const [termsData, setTermsData] = useState<Term[]> ([])
	const [teachersData, setTeachersData] = useState<Teacher[]>([])

	async function getData(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
			const { data } = await api.tests.getTests(filter, headers)
			if(filter === 'disciplines'){
				data.forEach( (term:any) => term.disciplines.forEach( (discipline:any) => discipline.open = false ))
				setTermsData(data)
			}else setTeachersData(data)
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
  
    return(  
        <Container disableGutters={true} maxWidth={false} sx={{p:0}} >

            <Header filter={filter}/>
            <Box sx={{width:'700px', margin: '35px auto 0'}}>

                <Menu filter={filter} setFilter={setFilter}/>
				{filter === 'disciplines'
				?	<TermList data={termsData} setData={setTermsData}/>
				:	<TeachersList data={teachersData}/>
				}
                
            </Box>
            
        </Container>
    );
};