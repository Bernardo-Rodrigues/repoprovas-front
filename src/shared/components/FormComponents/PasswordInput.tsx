import  { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton }  from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react';

interface Form {
    email: string;
    password: string;
    confirmPassword?: string;
}

interface Props {
    values: Form,
    setValues: (value: React.SetStateAction<Form>) => void
    confirm?: boolean
}

export default function PasswordInput({values, setValues, confirm}: Props){
    const [ showPassword, setShowPassord ] = useState(false)

    const handleChange = (prop: keyof Form) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassord(!showPassword);
    };

    if(confirm) return(
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirme sua senha</InputLabel>
            <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Confirme sua senha"
            />
        </FormControl>
    )

    return(
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Confirme sua senha"
            />
        </FormControl>
    )    
}