export const getAllPizzasReducer=(state={pizzas:[]},action)=>{
//here im having actions here
    switch(action.type)
    {
        //we have to write cases here
        case "GET_PIZZAS_REQUEST" :return {
            //whenever the request is sent we have to create one variable loading
            loading:true,
            ...state
        }
        case "GET_PIZZAS_SUCCESS" :return{
            //whenever the data is received it may be success or failure
            loading:false,//whatever is this the response is sent 
            pizzas : action.payload// we ll get pizzas in action.payload
        }
        case "GET_PIZZAS_FAILED" :return{
            error:action.payload,
            loading:false//request is failed means
        }
        default :return state
    }

}


export const addPizzaReducer=(state={},action)=>{//intially the state is empty
    //here im having actions here
        switch(action.type)
        {
            //we have to write cases here
            case "ADD_PIZZA_REQUEST" :return {
                //whenever the request is sent we have to create one variable loading
                loading:true,
                ...state
            }
            case "ADD_PIZZA_SUCCESS" :return{
                //whenever the data is received it may be success or failure
                loading:false,//whatever is this the response is sent 
               success:true,// so we are going to check success in the addpizza component 
            }
            case "ADD_PIZZA_FAILED" :return{
                error:action.payload,
                loading:false//request is failed means
            }
            default :return state
        }
    
    }


    export const getPizzaByIdReducer=(state={},action)=>{
        //here im having actions here
            switch(action.type)
            {
                //we have to write cases here
                case "GET_PIZZABYID_REQUEST" :return {
                    //whenever the request is sent we have to create one variable loading
                    loading:true,
                    ...state
                }
                case "GET_PIZZABYID_SUCCESS" :return{
                    //whenever the data is received it may be success or failure
                    loading:false,//whatever is this the response is sent 
                    pizza : action.payload// we ll get pizza in action.payload
                }
                case "GET_PIZZABYID_FAILED" :return{
                    error:action.payload,
                    loading:false//request is failed means
                }
                default :return state
            }
        
        }

        //add these in store


        export const editPizzaReducer=(state={},action)=>{//intially the state is empty
            //here im having actions here
                switch(action.type)
                {
                    //we have to write cases here
                    case "EDIT_PIZZA_REQUEST" :return {
                        //whenever the request is sent we have to create one variable loading
                        editloading:true,
                        ...state
                    }
                    case "EDIT_PIZZA_SUCCESS" :return{
                        //whenever the data is received it may be success or failure
                        editloading:false,//whatever is this the response is sent 
                        editsuccess:true,// so we are going to check success in the addpizza component 
                    }
                    case "EDIT_PIZZA_FAILED" :return{
                       editerror:action.payload,
                        editloading:false//request is failed means
                    }
                    default :return state
                }
            
            }