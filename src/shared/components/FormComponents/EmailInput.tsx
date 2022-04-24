import  { FormControl, InputLabel, OutlinedInput }  from '@mui/material';

interface Form {
    email: string;
    password: string;
    confirmPassword?: string;
}

interface Props {
    values: Form,
    setValues: (value: React.SetStateAction<Form>) => void
}

export default function EmailInput({values, setValues}: Props){
    const handleChange = (prop: keyof Form) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return(
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
    )
}