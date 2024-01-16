import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from '../components/Contextshare'
import Alert from 'react-bootstrap/Alert';
import { deleteUser, getUsers } from '../service/allapi';

function Home() {
  const[alluserData,setalluserData]=useState([])
  const { registerData, setregisterData } = useContext(registerContext)
  const[showspin,setshowSpin]=useState(true)
  const[search,setSearch]=useState("")

  console.log(search);


  useEffect(() => {
    
    getAllEmployees()

    setTimeout(() => {
      setshowSpin(false)
    }, 2000);
  
   
  }, [search])

  // api call for get all employees 
  const getAllEmployees=async()=>{

    const response=await getUsers(search)

    console.log(response);

    if(response.status==200){
      setalluserData(response.data)
    }
    else{
      alert('can not fetch data')
    }

 }
  console.log(alluserData);

// delete employee

const removeUser=async(id)=>{
  const response=await deleteUser(id)
  console.log(id);

  if(response.status===200){
    getAllEmployees()
  }
  else{
    alert('operation failed !!!! please try after some time')
  }
}




  return (
    <>

    
      {
         
          registerData&&<Alert variant='success' onClose={()=>setregisterData("")} dismissible >
           {registerData.fname.toUpperCase()} registered successfully..........
          </Alert>
      }




    { 

      showspin?
       <LoadingSpinner/>:
      <div>
        <div className='container'>
  
          <div className='search d-flex align-items-center mt-3'>
  
            <span>Search:</span>
            <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='Search By Employee Name' className='form-control ms-2' style={{ width: "400px" }} />
            <Link to={'/add'} className='btn btn-warning ms-auto'> <i class="fa-solid fa-user-plus"></i> Add  </Link></div>
        </div>
  
  
        <div className='table mt-5'>
  
          <h1 className='fw-bolder'>List Of All Employees</h1>
  
           <Hometable displayData={alluserData} removeuser={removeUser}/>
  
        </div>
        
      </div>
      }




    </>
  )
}

export default Home