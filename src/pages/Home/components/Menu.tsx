import  { Box, Button }  from '@mui/material';

interface Props {
    filter: string,
    setFilter: (value: React.SetStateAction<string>) => void
}

export default function Menu ({ filter, setFilter }: Props){
    return(
        <Box mb='50px' sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>

            <Button sx={{height:'40px'}} variant={filter === 'disciplines' ? 'contained' : 'outlined'} onClick={()=>setFilter('disciplines')}>
                DISCIPLINAS
            </Button>
            <Button sx={{height:'40px'}} variant={filter === 'teachers' ? 'contained' : 'outlined'} onClick={()=>setFilter('teachers')}>
                PESSOA INSTRUTORA
            </Button>
            <Button sx={{height:'40px'}} variant='outlined'>
                ADICIONAR
            </Button>

        </Box>
    )
}