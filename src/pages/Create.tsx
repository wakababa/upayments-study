import axios from "axios"
import React, { useState,useEffect } from "react"
import { useAppDispatch } from "../app/hooks"
import { createProductAsync } from "../features/product/productSlice"
import {useNavigate} from 'react-router-dom'
import { Loading } from "../components/Loading"
const Create =()=>{
    const [avatar,setAvatar] = useState("")
    const [name,setName] = useState("")
    const [price,setPrice] = useState(0)
    const [category,setCategory] = useState("")
    const [categories,setCategories] = useState([])
    const [description,setDescription] = useState("")
    const [developerEmail,setDeveloperMail] = useState("")
    const [loading,setLoading] = useState(false)
    const dispatch = useAppDispatch();
    const navigation = useNavigate()
    const handleSubmit=()=>{
        if((!!avatar.trim().length) && (!!name.trim().length) && (!!category.trim().length) && (!!description.trim().length) && (!!developerEmail.trim().length) ) {
            dispatch(createProductAsync({
                name: name,
                avatar:avatar,
                developerEmail: developerEmail,
                price: price,
                description: description,
                category: category
            }))
            navigation("/")
        }
    }
    useEffect(()=>{
       axios.get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/")
           .then(res=>{
               setLoading(true)
               setCategories(res.data)
               setCategory(res.data[0].name)
               setLoading(false)
            })
           .catch((err)=>console.log(err))
    },[])
    if(loading) return <Loading/>
    return(
        <div className="w-full grid place-items-center mt-56">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Creat Product</h5>
            <input defaultValue={name} onChange={(e)=>setName(e.target.value)}
                   className="mb-5 w-1/5 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                     type="text" placeholder="Product Name" id="forms-labelOverInputCode"/>
            <textarea
                defaultValue={description} onChange={(e)=>setDescription(e.target.value)}
                className="mb-5 w-1/5  h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
               placeholder="Descriptipn" id="forms-labelOverInputCode"/>
            <input
                defaultValue={avatar} onChange={(e)=>setAvatar(e.target.value)}
                className="mb-5 w-1/5 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                   type="text" placeholder="Image Url" id="forms-labelOverInputCode"/>
            <div className="mb-5 w-1/5 relative inline-block w-half text-gray-700">
                <select
                    className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                    placeholder="Category"
                    onChange={(e)=>setCategory(e.target.value)}
                    value={category}
                >
                    {categories.map((cat: { name: string | null | undefined })=>{
                        return(<option >{cat.name}</option>)
                    })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" fill-rule="evenodd"></path>
                    </svg>
                </div>
            </div>
            <input
                defaultValue={price} onChange={(e)=>setPrice(parseInt(e.target.value))}
                className="mb-5 w-1/5 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                   type="number" placeholder="Price" id="forms-labelOverInputCode"/>
            <input
                defaultValue={developerEmail} onChange={(e)=>setDeveloperMail(e.target.value)}
                className="mb-5 w-1/5 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text" placeholder="Email Developer" id="forms-labelOverInputCode"/>
            <button onClick={handleSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
            </button>
        </div>
    )
}
export default Create