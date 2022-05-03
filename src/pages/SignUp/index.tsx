import  { Container, Box }  from '@mui/material';
import Logo from '../../shared/components/Logo';
import { useState } from 'react';
import { fireAlert } from '../../shared/utils/alerts';
import useApi from '../../shared/hooks/useApi';
import { useNavigate } from 'react-router-dom';
import GithubLogin from "../../shared/components/GithubLogin"
import { Form, EmailInput, PasswordInput, FormFooter } from "../../shared/components/FormComponents"
import FormInterface from '../../shared/interfaces/Form';
import * as styles from "../../shared/style/styles"
import useContexts from '../../shared/hooks/useContexts';

export const SignUp: React.FC = () => {
  const api = useApi()
  const navigate = useNavigate()
  const [values, setValues] = useState<FormInterface>({ email: '', password: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState(false);
  const contexts = useContexts()
  const { setMessage } = contexts.alert
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password, confirmPassword } = values
    event.preventDefault();
    
    if(password !== confirmPassword) {
      setMessage({ type: "error", text: "As senhas precisam coincidir" });
      setPasswordError(true)
      return
    }else setPasswordError(false)

    try {
      await api.user.signUp({ email, password })
      navigate("/sign-in");
    } catch (error: any) {
      fireAlert((error.response.data))
    }
  }
  
  return(
    <Container sx={styles.Container}>      
        
      <Logo/>
      <Box sx={styles.Box}>
          
          <h2>Cadastro</h2>
          <GithubLogin/>
          <Form handleSubmit={handleSubmit}>

            <EmailInput values={values} setValues={setValues}/>
            <PasswordInput passwordError={passwordError} values={values} setValues={setValues}/>
            <PasswordInput passwordError={passwordError} values={values} setValues={setValues} confirm={true}/>
            <FormFooter type={"register"}/>
            
          </Form>
          
      </Box>

    </Container>
  );
};