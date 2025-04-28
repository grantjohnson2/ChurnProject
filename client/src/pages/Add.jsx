import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"


const Add = () => {
    const [customer, setCustomer] = useState({
        CustomerId: null,
        Surname: "",
        Geography: "",
        Gender: "",
        Age: null,
        CreditScore: null,
        Tenure: null,
        Balance: null,
        NumOfProducts: null,
        HasCrCard: null,
        IsActiveMember: null,
        EstimatedSalary: null, 
        Exited: null,
    })

const navigate = useNavigate()

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

        await axios.post("http://localhost:8801/customers", formattedCustomer);

        navigate("/")
    } catch(err) {
        console.log(err)
    }

}

    console.log(customer)

  return (
    <div className='form'>
        <h1>Add New Customer</h1>
        <input type="number" placeholder='CustomerId' onChange={handleChange} name="CustomerId"/>
        <input type="text" placeholder='Surname' onChange={handleChange} name="Surname"/>
        <input type="text" placeholder='Geography' onChange={handleChange} name="Geography"/>
        <input type="text" placeholder='Gender' onChange={handleChange} name="Gender"/>
        <input type="number" placeholder='Age' onChange={handleChange} name="Age"/>
        <input type="number" placeholder='CreditScore' onChange={handleChange} name="CreditScore"/>
        <input type="number" placeholder='Tenure' onChange={handleChange} name="Tenure"/>
        <input type="number" placeholder='Balance' onChange={handleChange} name="Balance"/>
        <input type="number" placeholder='NumOfProducts' onChange={handleChange} name="NumOfProducts"/>
        <input type="number" placeholder='HasCrCard' onChange={handleChange} name="HasCrCard"/>
        <input type="number" placeholder='IsActiveMember' onChange={handleChange} name="IsActiveMember"/>
        <input type="number" placeholder='EstimatedSalary' onChange={handleChange} name="EstimatedSalary"/>
        <input type="number" placeholder='Exited' onChange={handleChange} name="Exited"/>
        <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add