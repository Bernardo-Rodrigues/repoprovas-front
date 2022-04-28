import  { Box, Button }  from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Menu (){
    const navigate = useNavigate()
    const pathname = useLocation().pathname.split("/")[1]
    
    return(
        <Box mb='50px' sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>

            <Button sx={{height:'40px'}} variant={pathname === 'disciplines' ? 'contained' : 'outlined'} onClick={()=>navigate('/disciplines')}>
                DISCIPLINAS
            </Button>
            <Button sx={{height:'40px'}} variant={pathname === 'teachers' ? 'contained' : 'outlined'} onClick={()=>navigate('/instructors')}>
                PESSOA INSTRUTORA
            </Button>
            <Button sx={{height:'40px'}} variant={pathname === 'test' ? 'contained' : 'outlined'} onClick={()=>navigate('/test')}>
                ADICIONAR
            </Button>

        </Box>
    )
}