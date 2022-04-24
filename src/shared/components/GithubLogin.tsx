import { Fragment } from "react"
import  { Box, Button }  from '@mui/material';

export default function GithubLogin(){
    return(
        <Fragment>
            <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#424445', marginTop: '30px' }}
            >
                ENTRAR COM O GITHUB
            </Button>

            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: '20px'}}>
                <Box sx={{height:'1px', backgroundColor:'#c4c4c4', width:'47%'}} />
                ou
                <Box sx={{height:'1px', backgroundColor:'#c4c4c4', width:'47%'}} />
            </Box>
        </Fragment>
    )
}