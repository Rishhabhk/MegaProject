import { createSlice } from "@reduxjs/toolkit"
// import { Toast } from "react-hot-toast"


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state, value) {
            state.totalItems = value.payload
        }
        //add to cart
        //remove from card
        //reset cart
    }
})


export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;