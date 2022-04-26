import  { Box, Container }  from '@mui/material';
import { useEffect, useState } from 'react';
import useContexts from '../../shared/hooks/useContexts';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Menu from "./components/Menu"
import TermList from "./components/TermList"
import TeachersList from './components/TeachersList';

export const Home: React.FC = () => {
	const contexts = useContexts()
	const { auth } = contexts.auth
	const navigate = useNavigate()
	const [filter, setFilter] = useState('disciplines')

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
				?	<TermList/>
				:	<TeachersList/>
				}
                
            </Box>
            
        </Container>
    );
};