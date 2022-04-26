import  { Box, Container }  from '@mui/material';
import { useEffect, useState } from 'react';
import useContexts from '../../shared/hooks/useContexts';
import { useNavigate } from 'react-router-dom';
import useApi from '../../shared/hooks/useApi';
import Header from './components/Header';
import Menu from "./components/Menu"
import TermList from "./components/TermList"
import TeachersList from './components/TeachersList';

export const Home: React.FC = () => {
	const contexts = useContexts()
	const { auth, logout } = contexts.auth
	const api = useApi()
	const navigate = useNavigate()
	const [filter, setFilter] = useState('disciplines')
	const [termsData, setTermsData] = useState<[]> ([])
	const [teachersData, setTeachersData] = useState<[]>([])

	async function getData(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
			if(filter === 'disciplines'){
				const { data } = await api.terms.getAll(headers)
				setTermsData(data)
			}else {
				const { data } = await api.teachers.getAll(headers)
				setTeachersData(data)
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
  
    return(  
        <Container disableGutters={true} maxWidth={false} sx={{p:0}} >

            <Header filter={filter}/>
            <Box sx={{width:'700px', margin: '35px auto 0'}}>

                <Menu filter={filter} setFilter={setFilter}/>
				{filter === 'disciplines'
				?	<TermList data={termsData}/>
				:	<TeachersList data={teachersData}/>
				}
                
            </Box>
            
        </Container>
    );
};