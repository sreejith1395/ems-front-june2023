import React from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../service/basrurl';


function Hometable({displayData,removeuser}) {

  console.log(displayData);
  // console.log(removeuser);
  

  
  return (
    <>

<Table  bordered hover className='mt-3 shadow'>
      <thead>
        <tr>
          <th>#</th>
          <th>Fullname</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Profile</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

    {    
    
      displayData.length>0?

      displayData.map((item,index)=>(

        <tr>
        <td>{index+1}</td>
        <td>{item.fname} {item.lname}</td>
        <td>{item.email}</td>
        <td>{item.mobile}</td>
        <td><button className={item.status==="Active"?"btn btn-success":"btn btn-danger"} >{item.status}</button></td>
        
        <td><img style={{width:"70px",height:"70px"}} src={`${BASE_URL}/uploads/${item.profile}`} alt="no image" /></td>
        <td>

         <Link to={`/view/${item._id}`}> <i class="fa-solid fa-eye fs-3 me-2"></i> </Link>

         <Link to={`/edit/${item._id}`}>  <i class="fa-solid fa-pen fs-3 me-2"></i></Link>

         <span onClick={()=>removeuser(item._id)}><i class="fa-solid fa-trash text-light fs-3"></i></span>

        </td>
      </tr>

      )):<tr className='fw-bolder mt-5 text-danger w-100'>

        Noting to display !!!!!!!
      </tr>
 


        }
       
      </tbody>
    </Table>

    </>
  )
}

export default Hometable