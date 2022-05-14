import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { Select, Table } from 'antd';
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
// import {Button,Modal} from 'antd'
import { Form, Input, Button, message ,Modal} from 'antd';


function Item() {
  const[itemsData,setItemsData]=useState([])
  const[addEditModalVisibility,setAddEditModalVisibility]=useState(false)
  const[editingItem,setEditingItem]=useState(null)
  const dispatch=useDispatch()
  const getAllItems=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then(response=>{
      dispatch({type:'hideLoading'})
      console.log(response.data)
setItemsData(response.data)    })
.catch(err=>{
  dispatch({type:'hideLoading'})
      console.log(err)
    })
  }
  const deleteItem=(record)=>{
    dispatch({type:'showLoading'})
    axios.post('/api/items/delete-item',{itemId:record._id}).then(response=>{
      dispatch({type:'hideLoading'})
      message.success('Item deleted Successfully')
      getAllItems()
    })
.catch(err=>{
  dispatch({type:'hideLoading'})
  message.error('Something went wrong')
      console.log(err)
    })
  }

  useEffect(()=>{
    getAllItems()
    console.log('Items Data=>',itemsData)
  },[])

  const columns=[
    {title:'Name',dataIndex:'name'},
    {title:'Image',dataIndex:'image',render:(image,record)=><img src={image} alt="" height="60" width="60"/>},
    {title:"Price",dataIndex:'price'},
    {title:"Category",dataIndex:'category'},
    
    {title:"Actions",dataIndex:"_id",render:(id,record)=><div className="d-flex">

       <EditOutlined className='mx-2' onClick={()=>{
         setEditingItem(record)
         setAddEditModalVisibility(true)
         
       }}/>
      <DeleteOutlined className='mx-2' onClick={()=>{
        deleteItem(record)
      }}/>
     

      
    </div>}
]
const onFinish=(values)=>{
  dispatch({type:'showLoading'})
  if(editingItem===null){
    axios.post('/api/items/add-item',values).then(response=>{
      dispatch({type:'hideLoading'})
      message.success('Item added successfully')
      setAddEditModalVisibility(false)
      getAllItems()
  
    })
  .catch(err=>{
  dispatch({type:'hideLoading'})
  message.error('Something went wrong')
      console.log(err)
    })
  }else{
    axios.post('/api/items/edit-item',{...values,itemId:editingItem._id}).then(response=>{
      dispatch({type:'hideLoading'})
      message.success('Item edited successfully')
      setEditingItem(null)
      setAddEditModalVisibility(false)
      getAllItems()
  
    })
  .catch(err=>{
  dispatch({type:'hideLoading'})
  message.error('Something went wrong')
      console.log(err)
    })
  }
}
  return (
   <DefaultLayout>
     <div className='d-flex justify-content-between'>
       <h3>Items</h3>
       <Button type="primary" onClick={()=>setAddEditModalVisibility(true)}>Add Item</Button>
     </div>
     <Table columns={columns} dataSource={itemsData} bordered/>
     {addEditModalVisibility && (<Modal visible={addEditModalVisibility}
      title={`${editingItem !==null ?'Edit Item ': "Add New Item"}`}
      footer={false}
       onCancel={()=>{
         setEditingItem(null)
        setAddEditModalVisibility(false)
       }}> 

     <Form layout='vertical' onFinish={onFinish} initialValues={editingItem}>     
     <Form.Item name="name" label="Name">
       <Input placeholder='Enter the name'/>
     </Form.Item>
     <Form.Item name="price" label="Price">
       <Input placeholder='Enter the price'/>
     </Form.Item>
     <Form.Item name="image" label="Image">
       <Input placeholder='Enter the image url'/>
     </Form.Item>
     <Form.Item name='category' label="Category">
<Select >
  <Select.Option value="fruits">Fruits</Select.Option>
  <Select.Option value="vegetables">Vegetables</Select.Option>
  <Select.Option value="meat">Meat</Select.Option>
</Select>   
  </Form.Item>
  <div className='d-flex justify-content-end'>
    <Button htmlType='submit' type="primary">Save</Button>
  </div>
  </Form>
     </Modal>)}

   </DefaultLayout>
  )
}

export default Item