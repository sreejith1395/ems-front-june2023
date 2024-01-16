import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../service/allapi';
import { useContext } from 'react';
import { registerContext } from '../components/Contextshare';
import { useNavigate } from 'react-router-dom';

function Add() {

  const { registerData, setregisterData } = useContext(registerContext)
  const navigate = useNavigate()
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },

  ];

  // to hold normal inputs
  const [normalInputs, setnormalInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })

  // to hold status

  const [status, setStatus] = useState("")

  // to hold file uploaing content 

  const [profile, setProfile] = useState("")


  const [preview, setpreview] = useState("")



  useEffect(() => {

    if (profile) {
      URL.createObjectURL(profile)
      setpreview(URL.createObjectURL(profile))
    }



  }, [profile])


  // to get normal inputs from text box
  const getandsetInput = (e) => {
    const { name, value } = e.target
    setnormalInput({ ...normalInputs, [name]: value })

  }
  console.log(normalInputs);

  // to get status
  console.log(status);

  //  to get profile
  const getandsetprofile = (e) => {
    console.log(e.target.files[0]);
    setProfile(e.target.files[0])
  }
  console.log(profile);


  const handleSubmit = async (e) => {
    e.preventDefault()

    const { fname, lname, email, mobile, gender, location } = normalInputs

    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !profile) {
      toast.warning("please fill the form completely")
    }
    else {
      // toast.success("form filled completely")

      const data = new FormData()

      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("profile", profile)
      data.append("location", location)

      const headers = {
        "content-type": "multipart/form-data"
      }

      // make api call 

      const result = await addUser(data, headers)

      console.log(result);

      if (result.status === 200) {

        setnormalInput({
          ...normalInputs,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""


        })

        setStatus("")
        setProfile("")
        setregisterData(result.data)
        navigate('/')







      }
      else {
        toast.error("request failed")
      }



    }

  }


  return (
    <>

      <div className='conatiner mt-3'>

        <h1 className='text-center Fw-bolder'>Add New Employee Details</h1>

        <div className='shadow border rounded p-2 mt-3'>

          <div className='text-center'>

            <img style={{ width: "70px", height: "70px" }} src={preview ? preview : "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png"} alt="no image" />

          </div>

          <Form className="mt-3">


            <Row>

              {/* first name */}
              <FloatingLabel controlId="floatingInputfname" className='mb-3 col-lg-6' label="firstname">
                <Form.Control type="text" name='fname' onChange={e => getandsetInput(e)} value={normalInputs.value} placeholder="firstname" />
              </FloatingLabel>

              {/* last name */}
              <FloatingLabel controlId="floatingInputlname" className='mb-3 col-lg-6' label="lastname">
                <Form.Control type="text" name='lname' onChange={e => getandsetInput(e)} value={normalInputs.value} placeholder="lastname" />
              </FloatingLabel>

              {/* email */}

              <FloatingLabel controlId="floatingInputemail" className='mb-3 col-lg-6' label="e-mail">
                <Form.Control type="email" name='email' onChange={e => getandsetInput(e)} value={normalInputs.value} placeholder="e-mail" />
              </FloatingLabel>

              {/* mobile number */}
              <FloatingLabel controlId="floatingInputmobile" className='mb-3 col-lg-6' label="mobile">
                <Form.Control type="text" name='mobile' onChange={e => getandsetInput(e)} value={normalInputs.value} placeholder="mobile" />
              </FloatingLabel>

              {/* gender  */}

              <Form.Group className='mb-3 col-lg-6'>
                <Form.Label>Select Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  value="Male"
                  label="Male"
                  name='gender'
                  onChange={e => getandsetInput(e)}
                />
                <Form.Check
                  type={"radio"}
                  value="Female"
                  label="Female"
                  name='gender'
                  onChange={e => getandsetInput(e)}
                />
              </Form.Group>

              {/* status */}



              <Form.Group className='mb-3 col-lg-6'>
                <Form.Label>Select Employee Status</Form.Label>

                <Select options={options} onChange={e => setStatus(e.value)} />

              </Form.Group>

              {/* profile photo */}

              <Form.Group className='mb-3 col-lg-6'>
                <Form.Label>Choose a Profile Picture</Form.Label>

                <Form.Control type="file" onChange={e => getandsetprofile(e)} name='user_profile' />

              </Form.Group>

              {/* location */}
              <FloatingLabel controlId="floatingInputlocation" className='mb-3 col-lg-6 mt-3' label="location">
                <Form.Control type="text" name='location' onChange={e => getandsetInput(e)} value={normalInputs.value} placeholder="location" />
              </FloatingLabel>


              <Button type='submit' variant='primary' onClick={e => handleSubmit(e)} > Submit</Button>

            </Row>




          </Form>

        </div>




      </div>

      <ToastContainer />

    </>
  )
}

export default Add