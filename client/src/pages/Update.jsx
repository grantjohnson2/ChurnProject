import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"


const Update = () => {
    const [customer, setCustomer] = useState({
        CustomerId: 0,
        Surname: "",
        Geography: "",
        Gender: "",
        Age: 0,
        CreditScore: 0,
        Tenure: 0,
        Balance: 0,
        NumOfProducts: 0,
        HasCrCard: 0,
        IsActiveMember: 0,
        EstimatedSalary: 0, 
        Exited: 0,
    })

const navigate = useNavigate()
const location = useLocation()
const customerId = location.pathname.split("/")[2]

useEffect(() => {
    const fetchCustomer = async () => {
        try {
            const res = await axios.get(`http://localhost:8801/customers/${customerId}`);
            setCustomer(res.data);
        } catch (err) {
            console.error("Error fetching customer:", err);
        }
    };
    fetchCustomer();
}, [customerId]);

const handleChange = (e) => {
    setCustomer(prev=>({...prev, [e.target.name]: e.target.value }))
}

const handleClick = async e =>{
    e.preventDefault()
    try {
        const formattedCustomer = {
            ...customer,
            CustomerId: Number(customer.CustomerId),
            Age: Number(customer.Age),
            CreditScore: Number(customer.CreditScore),
            Tenure: Number(customer.Tenure),
            Balance: Number(customer.Balance),
            NumOfProducts: Number(customer.NumOfProducts),
            HasCrCard: Number(customer.HasCrCard),
            IsActiveMember: Number(customer.IsActiveMember),
            EstimatedSalary: Number(customer.EstimatedSalary),
            Exited: Number(customer.Exited),
        };

        console.log("Sending update request with data:", formattedCustomer);

        await axios.put("http://localhost:8801/customers/"+customerId, formattedCustomer);
        
        navigate("/")
    } catch(err) {
        console.log(err)
    }

}

if (!customer) return <p>Loading customer data...</p>;

    console.log("this is the customer")
    console.log(customer)


  return (
    <div className="form">
        <h1>Update Customer</h1>
        <input type="number" name="CustomerId" value={customer.CustomerId} onChange={handleChange} readOnly />
        <input type="text" name="Surname" value={customer.Surname || ""} onChange={handleChange} />
        <input type="text" name="Geography" value={customer.Geography || ""} onChange={handleChange} />
        <input type="text" name="Gender" value={customer.Gender || ""} onChange={handleChange} />
        <input type="number" name="Age" value={customer.Age || 0} onChange={handleChange} />
        <input type="number" name="CreditScore" value={customer.CreditScore || 0} onChange={handleChange} />
        <input type="number" name="Tenure" value={customer.Tenure || 0} onChange={handleChange} />
        <input type="number" name="Balance" value={customer.Balance || 0} onChange={handleChange} />
        <input type="number" name="NumOfProducts" value={customer.NumOfProducts || 0} onChange={handleChange} />
        <input type="number" name="HasCrCard" value={customer.HasCrCard || 0} onChange={handleChange} />
        <input type="number" name="IsActiveMember" value={customer.IsActiveMember || 0} onChange={handleChange} />
        <input type="number" name="EstimatedSalary" value={customer.EstimatedSalary || 0} onChange={handleChange} />
        <input type="number" name="Exited" value={customer.Exited || 0} onChange={handleChange} />
        <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update