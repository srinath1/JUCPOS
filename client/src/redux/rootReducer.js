const initialState={
    loading:false,
    cartItems:[]
}
export const rootReducer=(state=initialState,action)=>{
    console.log('reducer action',action.payload)
    switch(action.type){
        case 'addToCart':
            console.log('red ran')
            return{
            ...state,
            cartItems:[...state.cartItems,action.payload]
        }
        case 'deletefromCart':
            return{
                ...state,
                cartItems:state.cartItems.filter(item=>item._id !==action.payload._id )
            }
        case 'updateCart':
            return{
                cartItems:state.cartItems.map(cartItem=>cartItem._id==action.payload._id ?{...cartItem,quantity:action.payload.quantity}:cartItem)
            }
            case 'showLoading':
                return{
                    ...state,
                    loading:true
                }
                case 'hideLoading':
                    return{
                        ...state,
                        loading:false
                    }
        default:return state
    }
}