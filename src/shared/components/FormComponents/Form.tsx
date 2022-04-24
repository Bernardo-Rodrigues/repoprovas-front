import  { Box }  from '@mui/material';

interface Props {
    children: React.ReactNode,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export default function Form({ children, handleSubmit }: Props){
    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'25px' }}>
            {children}
        </Box>
    )
}