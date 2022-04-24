import  { Container, Box }  from '@mui/material';
import Logo from '../../shared/components/Logo';
import { useEffect, useState } from 'react';
import { fireAlert } from '../../shared/utils/alerts';
import useApi from '../../shared/hooks/useApi';
import { useNavigate } from 'react-router-dom';
import useContexts from '../../shared/hooks/useContexts';
import GithubLogin from "../../shared/components/GithubLogin"
import { Form, EmailInput, PasswordInput, FormFooter } from "../../shared/components/FormComponents"
import FormInterface from '../../interfaces/Form';
import * as styles from "../../shared/style/styles"

export const SignIn: React.FC = () => {
  const api = useApi()
  const navigate = useNavigate()
  const contexts = useContexts()
  const { auth, login } = contexts.auth
  const [values, setValues] = useState<FormInterface>({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (auth) navigate("/timeline");

    //eslint-disable-next-line
  }, [])
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await api.auth.signIn(values)
      login(data)
      navigate("/");
    } catch (error: any) {
      fireAlert((error.response.data))
    }
  }
  
  return(
    <Container sx={styles.Container}>      
        
      <Logo/>
      <Box sx={styles.Box}>
          
          <h2>Login</h2>
          <GithubLogin/>
          <Form handleSubmit={handleSubmit}>

            <EmailInput values={values} setValues={setValues}/>
            <PasswordInput values={values} setValues={setValues}/>
            <FormFooter type={"login"}/>

          </Form>

      </Box>

    </Container>
  );
};