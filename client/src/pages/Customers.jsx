import React, { useEffect } from 'react'
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";


const Customers = () => {
    const[customers, setCustomers] = useState([])

    useEffect(()=>{
        const fetchAllCustomers = async ()=>{
            try {
                const res = await axios.get("http://localhost:8801/customers")
                setCustomers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllCustomers()
    },[])

const handleDelete = async(CustomerId)=>{
    try {
        await axios.delete("http://localhost:8801/customers/"+CustomerId)
        window.location.reload()
    } catch(err) {
        console.log(err)
    }
}

  return (
    <div>
        <h1>Bank Customers</h1>
        <div className="customers">
            {customers.map(customer=>(
                <div className="customer" key={customer.CustomerId}>
                    <h2>{"ID: " + customer.CustomerId}</h2>
                    <p>{"Surname: " + customer.Surname}</p>
                    <p>{"Credit Score: " + customer.CreditScore}</p>
                    <button className="delete" onClick={()=>handleDelete(customer.CustomerId)}>Delete</button>
                    <button className="update"><Link to={`/update/${customer.CustomerId}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <div className="button-container">
            <button className="add-button"><Link to={"/add"}>Add New Customer</Link></button>
            <button className="add-button"><Link to={"/query"}>Custom Query</Link></button>
        </div>
        
    </div>
  )
}

export default Customers