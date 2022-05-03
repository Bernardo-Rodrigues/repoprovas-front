import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../shared/components/FormComponents";
import useApi from "../../../shared/hooks/useApi";
import useContexts from "../../../shared/hooks/useContexts";
import Test from "../../../shared/interfaces/Test";
import { fireAlert } from "../../../shared/utils/alerts";
import handleRequestError from "../../../shared/utils/handleRequestError"

export const NewTestForm: React.FC = () => {
  const contexts = useContexts()
	const { auth } = contexts.auth
  const { setMessage } = contexts.alert
  const [disciplineData, setDisciplineData] = useState<any>([])
  const [categoriesData, setCategoriesData] = useState<any>([])
  const [teachersData, setTeachersData] = useState<any>([])
  const api = useApi()
  const navigate = useNavigate()
  const [values, setValues] = useState<Test>({ name: '', pdf: '', category: '', discipline:'', teacher:'' });
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let error
    Object.values(values).forEach( value => {
      if(!value || value.length === 0) error = true
    })
    if(error) {
      setMessage({ type: "error", text: "Preencha todos os campos" }); 
      return;
    }
    try {
      const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
      await api.tests.postTest(values, headers)
      setMessage({ type: "success", text: "Prova adicionada com sucesso!" });
      navigate('/instructors')
    } catch (error: any) {
      fireAlert((error.response.data))
    }
  }

  const handleChange = (key: keyof Test, value?: any | null) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if(key === "pdf" && event.target.files !== null) value = event.target.files[0]
    if(!value) value = event.target.value
    setValues({ ...values, [key]: value });
  };
  
  async function getDisciplines(){
    const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
    try {
      const { data } = await api.disicplines.getAll(headers)
      setDisciplineData(data.map( (discipline: any) => discipline.name))
    } catch (error: any) {
      handleRequestError(error)
    }
  }

  async function getCategories(){
    const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
    try {
      const { data } = await api.categories.getAll(headers)
      setCategoriesData(data.map( (category: any) => category.name))
    } catch (error: any) {
      handleRequestError(error)
    }
  }

  async function getTeachersByDiscipline(){
		const headers = { headers: { Authorization: `Bearer ${auth.token}` }}
		try {
      const { data: discipline } = await api.teachers.getByDiscipline(values.discipline, headers)
      setTeachersData(discipline.teachersDisciplines.map( (teacherDiscipline: any) => teacherDiscipline.teacher.name))
		} catch (error: any) {
			handleRequestError(error)
		}
	}
    
  useEffect(()=>{
      getDisciplines()
      getCategories()
      //eslint-disable-next-line
  }, [])

  useEffect(()=>{
    if(values.discipline?.length > 0) getTeachersByDiscipline()
    //eslint-disable-next-line
  }, [values.discipline])

  return(
      <Form handleSubmit={handleSubmit}>
        <TextField label="Título da prova" variant="outlined" onChange={handleChange('name')}/>
        <TextField type="file" variant="outlined" onChange={handleChange('pdf')}/>
        <Autocomplete
          options={categoriesData}
          renderInput={(params) => <TextField {...params} label="Categoria" />}
          onChange={(event: any, newValue: string | null)=>{setValues({ ...values, category: newValue as string })}}
        />
        <Autocomplete
          options={disciplineData}
          renderInput={(params) => <TextField {...params} label="Disciplina" />}
          onChange={(event: any, newValue: string | null)=>{setValues({ ...values, discipline: newValue as string })}}
        />
        <Autocomplete
          disabled={values.discipline === "" || !values.discipline}
          options={teachersData}
          renderInput={(params) => <TextField {...params} label="Pessoa Instrutora" />}
          onChange={(event: any, newValue: string | null)=>{setValues({ ...values, teacher: newValue as string })}}
        />
        <Button type="submit" variant="contained">
          ENVIAR
        </Button>
      </Form>
  );
};