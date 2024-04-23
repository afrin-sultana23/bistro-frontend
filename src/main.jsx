import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import Router from "./Pages/Routes/Router.jsx";
import {HelmetProvider} from 'react-helmet-async';
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={Router} />
            </QueryClientProvider>
        </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
