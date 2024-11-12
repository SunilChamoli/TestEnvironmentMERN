import React from 'react';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import Camera from './Camera'
import Quiz from './Quiz';
import Loading from './Loading';
 
const Body = () => {
    
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
        ,
        {
            path: "/quiz",
            element: <Quiz/>
        },{
            path: "/test-environment",
            element: <Camera/>
        },{
            path: "/loading",
            element: <Loading/>
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body