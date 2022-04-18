import React from 'react'
import { Link } from 'react-router-dom'


export const Navigation=()=>{
    return(
        <nav className="bg-gray-800">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to={"/"}>
                                <img
                                    className="h-10 w-50"
                                    src="data:image/webp;base64,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"
                                    alt="Workflow"
                                />
                            </Link>
                        </div>
                            <Link className={"text-white pl-5"} to="/">Home</Link>
                            <Link className={"text-white pl-5"} to="/create">Create</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}