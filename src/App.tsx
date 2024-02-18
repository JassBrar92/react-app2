import { useEffect, useState } from 'react'
import './App.css'
import './ProductList'
import ProductList from './ProductList'
import axios, { AxiosError } from 'axios'
interface User{
  id:number,
  name:string
 }
function App() {
  /*
  const [users,setUsers]=useState<User[]>([]);
  const [error,setError]=useState([]);
  useEffect(()=>{
    axios.get<User[]>("https://jsonplaceholder.typicode.com/xusers").
    then((res)=>setUsers(res.data)).
    catch((error)=>console.log(setError(error.message)));
  },[]);
  return <ul>
   <>
   {error&&<p>{error}</p>}
   {users.map(user=><li key={user.id}>{user.name}</li>)}
   </>
  </ul>
   */
  const [users,setUsers]=useState<User[]>([]);
  const [error,setError]=useState([""]);
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
      const res=await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
      }
      catch(err){
        setError((err as AxiosError).message);
      }
    }
    fetchUser();
  },[]);
  return <ul>
   <>
   {error&&<p>{error}</p>}
   {users.map(user=><li key={user.id}>{user.name}</li>)}
   </>
  </ul>

  /*
  const connect=()=>console.log("Connecting");
  const disconnect=()=>console.log("Disconnecting");
  useEffect(()=>{
    connect();
    return ()=>disconnect();
  })*/
 /* const [category,setCategory]=useState("");

return(
  <div>
    <select className="form-select" onChange={(event)=>setCategory(event.target.value)}>
      <option value=''></option>
      <option value='Clothing'>Clothing</option>
      <option value='Household'>Household</option>
    </select>
    <ProductList category={category}/>
  </div>
)*/
 /*const ref=useRef<HTMLInputElement>(null);
  useEffect(()=>{
    if(ref.current) ref.current.focus();
  });
  useEffect(()=>{
    document.title="My App"
  });
  return(
  <div>
  <input ref={ref} type="text" className="form-control" />
  </div>);*/
}

export default App
