import  { Box, TextField, IconButton, Typography }  from '@mui/material';
import { Logout } from '@mui/icons-material'
import Logo from '../../../shared/components/Logo';
import useContexts from '../../../shared/hooks/useContexts';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header (){
    const contexts = useContexts()
    const { logout } = contexts.auth
    const { setSearch } = contexts.search
    const pathname = useLocation().pathname.split("/")[1]
    const navigate = useNavigate()

    const handleClickLogout = () => {
        logout()
        navigate("/sign-in");
    };

    return(
        <Box sx={{display:'flex', height:'250px', position:"relative", borderBottom:1, borderColor:'#c4c4c4'}}>

            <Box sx={{flex:1, position:'absolute', top:'50px', left:'60px'}}>
                <Logo/>
            </Box>
            
            {pathname === 'test'
            ?   <Typography sx={{flex:1, position:'absolute', bottom:'35px', left:'calc(50% - 130px)', fontSize:'30px'}}>Adicione uma prova</Typography>
            :   <Box sx={{flex:1, position:'absolute', bottom:'25px', left:'calc(50% - 228px)'}}>

                    <Box component="form" noValidate sx={{ mt: 1, width:'458px' }}>
                        <TextField
                            onChange={(e)=> setSearch(e.target.value)}
                            margin="normal"
                            fullWidth
                            id="search"
                            label={`Pesquise por ${pathname === 'disciplines' ? 'disciplina': 'pessoa instrutora'}`}
                            name="search"
                            autoFocus
                        />
                    </Box>

                </Box>
            }
            
            <Box sx={{flex:1, position:'absolute', top:'30px', right:'20px'}}>

                <IconButton onClick={handleClickLogout} >
                    <Logout sx={{fontSize:'40px'}}/>
                </IconButton>

            </Box>
        </Box>
    )
}