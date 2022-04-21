import  { Container, Box, Button, FormControl, Link, InputAdornment, IconButton, InputLabel, OutlinedInput }  from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import logo from "../../shared/images/Logo.png"
import { useState } from 'react';
import { fireAlert } from '../../shared/utils/alerts';
import useApi from '../../shared/hooks/useApi';
import { useNavigate } from 'react-router-dom';

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export const SignUp: React.FC = () => {
  const api = useApi()
  const navigate = useNavigate()
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password, confirmPassword } = values
    event.preventDefault();
    
    if(password !== confirmPassword) {
      return await fireAlert("Passwords must be the same")
    }

    try {
      await api.user.signUp({ email, password })
      navigate("/sign-in");
    } catch (error: any) {
      fireAlert((error.response.data))
    }
  }
  
  const handleClickShowPassword = (prop: keyof State) => () => {
    setValues({...values, [prop]: !values[prop]});
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
    return(
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '55px' }}>      
            
            <img src={logo} alt="logo"/>
            
            <Box sx={{marginTop: '185px', width: '465px', textAlign: 'center'}}>
                
                <h2>Cadastro</h2>

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

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'25px' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      type='text'
                      value={values.email}
                      onChange={handleChange('email')}
                      label="Email"
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword('showPassword')}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirme sua senha"
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirme sua senha</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-confirm-password"
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      value={values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowPassword('showConfirmPassword')}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirme sua senha"
                    />
                  </FormControl>
                  
                  <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', heigth:'36px', marginTop:'15px'}}>
                    <Box>
                      <Link href="/sign-in" variant="body2">
                        Já possuo cadastro
                      </Link>
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width:'116px' }}
                    >
                      Cadastrar
                    </Button>
                  </Box>
                </Box>
            </Box>

        </Container>

    );
};