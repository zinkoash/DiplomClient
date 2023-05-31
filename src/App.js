import '././App.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter"
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react';
import { check } from './http/userAPI';
import Loader from './components/Load';
import { Context } from '.';
import { fetchAllPractice } from './http/practiceAPI';
import { fetchAllTheory } from './http/theoryAPI';
import { getStudents } from './http/studentAPI';
import { fetchAllControl } from './http/controlApi';


const MyApp =observer(() => {
  const { user, practices,theoryes,students,controls } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
    const userInfo = await check().catch(()=>null)
    const practicesInfo = (await fetchAllPractice()).data
    const theoryesInfo = (await fetchAllTheory()).data
    const studentsInfo = (await getStudents()).data
    const controlsInfo = (await fetchAllControl()).data
    if (!ignore) {
      user.setUser(userInfo);
      user.setIsAuth(Boolean(userInfo));
      practices.setPractices(practicesInfo)
      theoryes.setTheoryes(theoryesInfo)
      students.setStudents(studentsInfo)
      controls.setControls(controlsInfo)
    }
  }
  let ignore = false;
  fetchData().then(()=>setLoading(false))
  return () => {
    
    ignore = true;
  }

}, [])
if (loading) {
  return <Loader/>
}
  return (

    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
})

export default MyApp;
