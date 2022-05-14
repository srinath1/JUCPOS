import React,{useEffect} from 'react'
import { Form, Input, Button, message ,Modal, Row, Col} from 'antd';
import  '../resoursces/authentication.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'


const Register = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const onFinish=(values)=>{
      dispatch({type:'showLoading'})
       axios.post('/api/users/register',values).then(res=>{
        dispatch({type:'hideLoading'})

         message.success('Registeration successful,Please wait for the approval')
       }).catch(()=>{
        dispatch({type:'hideLoading'})

         message.error('Something went wrong')
       })
    }
    useEffect(()=>{
      if(localStorage.getItem('pos-user')){
        navigate('/home')
      }
    },[])
  return (
    <div className="authentication">
    <Row>
        <Col lg={8} xs={22}>
        <Form layout='vertical' onFinish={onFinish}>   
        <b><h2>JUC Canteen POS</h2>  </b>
        <br/>
        <h2>Register</h2>
     <Form.Item name="name" label="Name">
       <Input placeholder='Enter the name'/>
     </Form.Item>
     <Form.Item name="userId" label="User ID">
       <Input placeholder='Enter the UserId'/>
     </Form.Item>
     <Form.Item name="password" label="Password">
       <Input placeholder='Enter the Password' type="password"/>
     </Form.Item>
     
     <div className='d-flex justify-content-between align-items-center distance'>
  <Link to="/login">already registered ? click here to Login</Link>
    <Button htmlType='submit' type="primary" className='distance'>Register</Button>
  </div>
  </Form>
        </Col>
    </Row>
    </div>
  )
}

export default Register