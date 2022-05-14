import { Button } from 'antd'
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'


const Item = (item) => {
    console.log('Item=>',item)
    const newItem=item.item
    const dispatch = useDispatch()
    function addTocart(){
        dispatch({type:'addToCart' , payload : {...newItem , quantity:1}})
    }
    
  return (
    <div className='item' key={item.item._id}>
        <h4 className='newname'>{item.item.name}</h4>
        <img src={item.item.image} alt="" height="100" width="100"/>
        <h4 className='price'><b>Price : </b> {item.item.price}DKK </h4>
        <div className='d-flex justify-content-end'>
        <Button onClick={()=>addTocart()}>Add To Cart</Button>        </div>

    </div>
  )
}

export default Item