import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createProduct, fetchProductsFromApi, getCategories} from './productAPI';
import {IProduct} from "../../app/types";

export interface ProductState {
  list:IProduct[];
  selectedProduct:IProduct,
  loading: boolean;
}

const initialState: ProductState = {
  list:[],
  selectedProduct:{
      name:"",
      avatar:"",
      price:0,
      category:"",
      description:"",
      developerEmail:""
  },
  loading: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getProductsAsync = createAsyncThunk(
  'get/all/products',
  async () => {
    const response = await fetchProductsFromApi();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const createProductAsync = createAsyncThunk(
    'create/product',
    async (product :IProduct) => {
      const response = await createProduct(product);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
);
export const getCategoriesAsync = createAsyncThunk(
    'get/all/categories',
    async () => {
        const response = await getCategories();
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
/*    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list =[];
    },*/
   selectProduct:(state,action)=>{
       state.selectedProduct = action.payload
   },

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAsync.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
          state.loading = true;
        })
      .addCase(createProductAsync.fulfilled, (state, action:PayloadAction<any>) => {
          state.loading = false;
          state.list = [...state.list,action.payload];
        })
  },
});

export const {  selectProduct } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
export const selectProducts = (state: RootState) => state.products.list;
export const selectedProduct = (state: RootState) => state.products.selectedProduct;

export const productLoading = (state: RootState) => state.products.loading;

export default productSlice.reducer;