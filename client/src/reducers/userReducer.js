
//here the reducer returns two params one is initial state and another one is action
export const registerUserReducer=(state={},action)=>{

        switch(action.type)
        {
            case "USER_REGISTER_REQUEST" :return{
                loading:true
            }
            case "USER_REGISTER_SUCCESS" :return{
                loading:false,
                success:true
            }
            case "USER_REGISTER_FAILED" :return{
                loading:false,
                error:action.payload
            }
            default:return state
        }

}

export const loginUserReducer=(state={},action)=>{

    switch(action.type)
    {
        case "USER_LOGIN_REQUEST" :return{
            loading:true
        }
        case "USER_LOGIN_SUCCESS" :return{
            loading:false,
            success:true,
            currentUser:action.payload
        }  
        case "USER_LOGIN_FAILED" :return{
            loading:false,
            error:action.payload
        }
        default:return state
    }

}



export const getAllUsersReducer=(state={users:[]},action)=>{
    //here im having actions here
        switch(action.type)
        {
            //we have to write cases here
            case "GET_USERS_REQUEST" :return {
                //whenever the request is sent we have to create one variable loading
                loading:true,
                ...state
            }
            case "GET_USERS_SUCCESS" :return{
                //whenever the data is received it may be success or failure
                loading:false,//whatever is this the response is sent 
               users : action.payload// we ll get pizzas in action.payload
            }
            case "GET_USERS_FAILED" :return{
                error:action.payload,
                loading:false//request is failed means
            }
            default :return state
        }
    
    }