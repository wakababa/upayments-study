import axios from "axios";
import React, {Dispatch, useEffect,useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector } from "../app/hooks";
import { Loading } from "../components/Loading";
import { Products } from "../features/product/Products";
import {getProductsAsync, productLoading, selectProduct, selectProducts } from "../features/product/productSlice";
import {IProduct} from "../app/types";

const Home=()=>{
    const products = useAppSelector(selectProducts);
    const loading = useAppSelector(productLoading);
    const [category,setCategory] = useState("")
    const [categories,setCategories] = useState([])
    const dispatch = useAppDispatch();
    const navigation =useNavigate()

    const navigateToDetail=(production:IProduct)=>{
        dispatch(selectProduct({...production}))
        navigation("/detail")
    }
    useEffect(()=>{
            axios.get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/")
                .then(res=>{
                    setCategories(res.data)
                })
                .catch((err)=>console.log(err))
       dispatch(getProductsAsync())
    },[])

    if(loading) return <Loading/>

    return(
     <div>
        <div className="m-5 flex justify-start">
            <select
                className="w-100 h-10 pl-3 pr-6 ml-12 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                placeholder="Category"
                onChange={(e)=>{
                    setCategory(e.target.value)
                }}
                value={category}
            >
                <option value={""}>All</option>
                {categories.map((cat: { name: string | null | undefined })=>{
                    return(<option >{cat.name}</option>)
                })}
            </select>
        </div>
         <div className="grid grid-cols-4 gap-4 p-20">
                {[...products.filter(prodct=>{
                    if(category === ""){
                        return prodct
                    }
                    if(prodct.category === category){
                        return  prodct
                    }

                })].map(prd=>{
                    return(
                    <div
                        onClick={()=>navigateToDetail(prd)}
                        className="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                        <a href="#"  className="flex justify-center">
                            <img className=" object-contain h-96 w-48" src={prd.avatar} alt=""/>
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{prd.name}</h5>
                            </a>
                            <p className="mb-2 font-normal text-gray-500 dark:text-gray-300 ">{prd.category}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">{prd.description.slice(0,100)}</p>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">{`$${prd.price}`}</span>
                            </div>
                            <a
                               className="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                                Read more
                                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    )
                })}
            </div>
     </div>
    )
}
export default Home