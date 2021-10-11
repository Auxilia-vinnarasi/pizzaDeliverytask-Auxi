export const placeOrderReducer=(state={},action)=>{

    switch(action.type)
    {
        case "PLACE_ORDER_REQUEST" :return{
            loading:true
        }
        case "PLACE_ORDER_SUCCESS" :return{
            loading:false,
            success:true
        }
        case "PLACE_ORDER_FAILED" :return{
            loading:false,
            error:action.payload
        }
        default:return state
    }

}

export const getUserOrdersReducer=(state={orders:[]},action)=>{
    //here im having actions here
        switch(action.type)
        {
            //we have to write cases here
            case "GET_USER_ORDERS_REQUEST" :return {
                //whenever the request is sent we have to create one variable loading
                loading:true,
                ...state
            }
            case "GET_USER_ORDERS_SUCCESS" :return{
                //whenever the data is received it may be success or failure
                loading:false,//whatever is this the response is sent 
                orders : action.payload// we ll get pizzas in action.payload
            }
            case "GET_USER_ORDERS_FAILED" :return{
                error:action.payload,
                loading:false//request is failed means
            }
            default :return state
        }
    
    }


    export const getAllOrdersReducer=(state={orders:[]},action)=>{
        //here im having actions here
            switch(action.type)
            {
                //we have to write cases here
                case "GET_ALLORDERS_REQUEST" :return {
                    //whenever the request is sent we have to create one variable loading
                    loading:true,
                    ...state
                }
                case "GET_ALLORDERS_SUCCESS" :return{
                    //whenever the data is received it may be success or failure
                    loading:false,//whatever is this the response is sent 
                    orders : action.payload// we ll get pizzas in action.payload
                }
                case "GET_ALLORDERS_FAILED" :return{
                    error:action.payload,
                    loading:false//request is failed means
                }
                default :return state
            }
        
        }