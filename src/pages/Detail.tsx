import React from "react"
import { useAppSelector } from "../app/hooks";
import { Navigation } from "../components/Navigation";
import {selectedProduct, selectProducts } from "../features/product/productSlice";

const Detail =()=>{
    const product = useAppSelector(selectedProduct);

    return(
        <div>
            <div>
                <div className="container px-5 py-24 mx-auto" >
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce"
                             className="lg:w-1/2 w-full object-contain h-96 w-48 object-center rounded"
                             src={product.avatar} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest"
                                    >{product.category}</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"
                                    >{product.name}</h1>
                                <p className="leading-relaxed">{product.description}</p>
                                <div className="flex">
                                    <span className="title-font font-medium text-4xl text-gray-900">{`$${product.price}`}</span>
                                </div>
                                <h2 className="text-sm title-font text-gray-500 tracking-widest"
                                >{`${product.developerEmail}`}</h2>

                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detail