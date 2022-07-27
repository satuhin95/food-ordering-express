import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    categories:[],
    error:null,
    status:'idle'
}
export const categoriesSlice =createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchcategories.fulfilled,(state,action)=>{
            state.status = 'fulfilled'
            state.categories= [...action.payload.data]
        });
        builder.addCase(fetchcategories.pending,(state,action)=>{
            state.status = 'pending'
        })
    }
})
export const {getcategories} = categoriesSlice.actions
export default categoriesSlice.reducer
export const fetchcategories = createAsyncThunk('categories/fetchPosts',async()=>{
    const response = await fetch('http://localhost:8000/categories')
    const data = await response.json()
    return data
})

export const selectAllCategories = state => state.categories