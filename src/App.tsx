import { useEffect, useState } from 'react'
import './App.css'
import './ProductList'
import apiClient from './services/api-client'
import UserService,{User} from './services/user-service'
function App() {
  const [users,setUsers]=useState<User[]>([]);
  const [error,setError]=useState([]);
  const [isLoading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
   const {request,cancel}= UserService.getAll<User>();
    request.then((res)=>{
      setUsers(res.data);
      setLoading(false);
    }).
    catch((error)=>{
      if (error instanceof apiClient) return ;
      console.log(setError(error.message));
      setLoading(false);
    });
    return ()=>cancel();
  },[]);
  const addUser=()=>{
    const originalUsers=[...users];
    const newUser={id:0,name:"jas"};
    setUsers([newUser,...users]);
    UserService.create(newUser).
    then(res=>setUsers([res.data,...users])).
    catch(err=>{
      setError(err.message);
      setUsers(originalUsers);
    })
  }
  const deleteUser=(user:User)=>{
    const originalUsers=[...users];
 setUsers(users.filter(u => u.id !== user.id));
 UserService.delete(user.id).
 catch(err=>{
 setError(err.message);
 setUsers(originalUsers);
}
 );
  }
  const UpdateUser=(user:User)=>{
    const originalUsers=[...users];
    const updatedUser={...user,name:user.name+"!"};
    setUsers(users.map(u => u.id === user.id ? updatedUser: u));
    
    UserService.update(updatedUser).catch(err=>{
      setError(err.message);
      setUsers(originalUsers);
    })
  }
  return (
   <>
   {error && <p className='text-danger'>{error}</p>}
   {isLoading && <div className="spinner-border"></div>}
   <button className="btn btn-primary mb-3" onClick={addUser}>Add</button>
   <ul className='list-group'>
   {users.map(user=>(<li key={user.id} className='list-group-item d-flex justify-content-between'>
    {user.name}
    <div>
    <button className="btn btn-outline-secondary mx-1" onClick={()=>UpdateUser(user)}>Update</button>
    <button className="btn btn-outline-danger" onClick={()=>deleteUser(user)}>Delete</button>
    </div>
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
