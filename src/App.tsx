import { useEffect, useState } from 'react'
import './App.css'
import './ProductList'
import ProductList from './ProductList'
import axios, { AxiosError, CanceledError } from 'axios'
interface User{
  id:number,
  name:string
 }
function App() {
  const [users,setUsers]=useState<User[]>([]);
  const [error,setError]=useState([]);
  const [isLoading,setLoading]=useState(false);
  useEffect(()=>{
    const controller=new AbortController();
    setLoading(true);
    axios.get<User[]>("https://jsonplaceholder.typicode.com/users",{signal:controller.signal}).
    then((res)=>{
      setUsers(res.data);
      setLoading(false);
    }).
    catch((error)=>{
      if (error instanceof CanceledError) return ;
      console.log(setError(error.message));
      setLoading(false);
    });
    return ()=>controller.abort();
  },[]);
  const deleteUser=(user:User)=>{
    const originalUsers=[...users];
 setUsers(users.filter(u => u.id !== user.id));
 axios.delete("https://jsonplaceholder.typicode.com/xusers/"+user.id).
 catch(err=>{
 setError(err.message);
 setUsers(originalUsers);
}
 );
  }
  return (
   <>
   {error && <p className='text-danger'>{error}</p>}
   {isLoading && <div className="spinner-border"></div>}
   <ul className='list-group'>
   {users.map(user=>(<li key={user.id} className='list-group-item d-flex justify-content-between'>
    {user.name}
    <button className="btn btn-outline-danger" onClick={()=>deleteUser(user)}>Delete</button>
    </li>))}
   </ul>
   </>
  );
  /*const [users,setUsers]=useState<User[]>([]);
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
  </ul>*/

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
