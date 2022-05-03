import  { Box, Container }  from '@mui/material';
import { useEffect } from 'react';
import useContexts from '../../shared/hooks/useContexts';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Menu from "./components/Menu"
import TermList from "./components/TermList"
import TeachersList from './components/TeachersList';
import { NewTestForm } from './components/NewTestForm';
import useApi from '../../shared/hooks/useApi';

export const Home: React.FC = () => {
	const contexts = useContexts()
	const { auth } = contexts.auth
	const navigate = useNavigate()
    const pathname = useLocation().pathname.split("/")[1]
    const { handleClose } = contexts.alert

    useEffect(() => {
        if (!auth) {
            navigate("/sign-in");
        }
        handleClose()
        //eslint-disable-next-line
    }, [])
    
    return(  
        <Container disableGutters={true} maxWidth={false} sx={{p:0}} >

            <Header/>
            <Box sx={{width:'700px', margin: '35px auto 0'}}>

                <Menu/>
				{   pathname === 'disciplines' ? <TermList/>
				:   pathname === 'instructors' ? <TeachersList/>
                :   <NewTestForm/>
                }
                
            </Box>
            
        </Container>
    );
};