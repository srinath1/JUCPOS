import React, { useEffect,useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import Item from '../components/Item'
import { Row,Col } from 'antd'
import '../resoursces/items.css'
import {useDispatch} from 'react-redux'
const HomePage = () => {
  const[itemsData,setItemsData]=useState([])
  const[selectedCategory,setSelectedCategory]=useState('fruits')
  const categories=[
    {name:'fruits',imageURL:"https://tse2.mm.bing.net/th?id=OIP.gVSI3TUO7sQ5VQdIXHpykwHaE8&pid=Api&P=0&w=264&h=176"},
    {
      name:'vegetables',imageURL:"https://tse3.mm.bing.net/th?id=OIP.qMkv_mJbd6iModg-8_NE0gHaEo&pid=Api&P=0&w=264&h=165"
    },
    {
      name:'meat',imageURL:"https://tse4.mm.bing.net/th?id=OIP.V9vSX5b6LaJeJ3mV8W8iRwHaEK&pid=Api&P=0&w=331&h=186"
    }
  ]
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
  useEffect(()=>{
    getAllItems()
  },[])
  return (
    <DefaultLayout>
    <div className='d-flex categories' >
    {categories.map(category=>{
      return <div
      key={category.name}
      onClick={()=>setSelectedCategory(category.name)}
       className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
        <h4>{category.name}</h4>
        <img src={category.imageURL} height="60" width="80"/>
      </div>
    })}

    </div>
      <Row gutter={20}>

      {itemsData.filter(i=>i.category===selectedCategory).map(item=>{
        return <Col xs={24} lg={6} md={12} sm={6} key={item.key} key={item.id}>
        <Item item={item}/>

        </Col>
      })}

      </Row>
    </DefaultLayout>
  )
}

export default HomePage