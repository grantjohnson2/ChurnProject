import express from "express"
import mysql from "mysql"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello this is the backend")
})

app.get("/customers", (req, res)=>{
    const q = "SELECT * FROM customers ORDER BY CustomerID ASC LIMIT 10"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/customers", (req, res)=>{
    const q = "INSERT INTO customers (`CustomerId`, `Surname`, `Geography`, `Gender`, `Age`, `CreditScore`, `Tenure`, `Balance`, `NumOfProducts`, `HasCrCard`, `IsActiveMember`, `EstimatedSalary`, `Exited`) VALUES (?)"
    const values = [
        req.body.CustomerId,
        req.body.Surname,
        req.body.Geography,
        req.body.Gender,
        req.body.Age,
        req.body.CreditScore,
        req.body.Tenure,
        req.body.Balance,
        req.body.NumOfProducts,
        req.body.HasCrCard,
        req.body.IsActiveMember,
        req.body.EstimatedSalary,
        req.body.Exited,
    ];

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("new customer added")
    })
})

app.delete("/customers/:id", (req, res)=>{
    const customerid = req.params.id
    const q = "DELETE FROM customers WHERE CustomerId = ?"
    
    db.query(q, [customerid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("customer deleted")
    })
})

app.put("/customers/:id", (req, res)=>{
    const customerid = req.params.id
    const q = "UPDATE customers SET `CustomerId` = ?, `Surname` = ?, `Geography` = ?, `Gender` = ?, `Age` = ?, `CreditScore` = ?, `Tenure` = ?, `Balance` = ?, `NumOfProducts` = ?, `HasCrCard` = ?, `IsActiveMember` = ?, `EstimatedSalary` = ?, `Exited` = ? WHERE CustomerId = ?"
    
    const values = [
        req.body.CustomerId,
        req.body.Surname,
        req.body.Geography,
        req.body.Gender,
        req.body.Age,
        req.body.CreditScore,
        req.body.Tenure,
        req.body.Balance,
        req.body.NumOfProducts,
        req.body.HasCrCard,
        req.body.IsActiveMember,
        req.body.EstimatedSalary,
        req.body.Exited,
        customerid
    ]

    db.query(q, values, (err,data)=>{
        if(err) return res.json(err)
        return res.json("customer updated")
    })
})

app.get("/customers/:id", (req, res)=>{
    const customerid = req.params.id
    const q = "SELECT * FROM customers WHERE CustomerId = ?"

    db.query(q, [customerid], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data[0])
    })

})  

app.get('/query', async (req, res) => {
      // Create an array of parameters in the exact order of the stored procedure
      const params = [
        // Column selection parameters
        parseInt(req.query.allColumns || '0'),
        parseInt(req.query.idColumn || '0'),
        parseInt(req.query.surnameColumn || '0'),
        parseInt(req.query.geographyColumn || '0'),
        parseInt(req.query.genderColumn || '0'),
        parseInt(req.query.ageColumn || '0'),
        parseInt(req.query.creditScoreColumn || '0'),
        parseInt(req.query.tenureColumn || '0'),
        parseInt(req.query.balanceColumn || '0'),
        parseInt(req.query.numOfProductsColumn || '0'),
        parseInt(req.query.hasCrCardColumn || '0'),
        parseInt(req.query.isActiveMemberColumn || '0'),
        parseInt(req.query.estimatedSalaryColumn || '0'),
        parseInt(req.query.exitedColumn || '0'),
        
        // Customer ID filter parameters
        parseInt(req.query.useCustomerId || '0'),
        parseInt(req.query.filteredCustomerId || '0'),
        req.query.operationCustomerId || '=',
        parseInt(req.query.useCustomerIdOrderBy || '0'),
        req.query.directionCustomerIdOrderBy || 'ASC',
        
        // Geography filter parameters
        parseInt(req.query.useGeography || '0'),
        req.query.filteredGeography || '',
        
        // Gender filter parameters
        parseInt(req.query.useGender || '0'),
        req.query.filteredGender || 'Male',
        
        // Age filter parameters
        parseInt(req.query.useAge || '0'),
        parseInt(req.query.filteredAge || '0'),
        req.query.operationAge || '=',
        parseInt(req.query.useAgeOrderBy || '0'),
        req.query.directionAgeOrderBy || 'ASC',
        
        // Balance filter parameters
        parseInt(req.query.useBalance || '0'),
        parseInt(req.query.filteredBalance || '0'),
        req.query.operationBalance || '=',
        parseInt(req.query.useBalanceOrderBy || '0'),
        req.query.directionBalanceOrderBy || 'ASC',
        
        // Salary filter parameters
        parseInt(req.query.useSalary || '0'),
        parseInt(req.query.filteredSalary || '0'),
        req.query.operationSalary || '=',
        parseInt(req.query.useSalaryOrderBy || '0'),
        req.query.directionSalaryOrderBy || 'ASC',
        
        // Limit parameters
        parseInt(req.query.useLimit || '0'),
        parseInt(req.query.filteredLimit || '100')
      ];
  
      // Use parameterized query to safely pass parameters
      const sql = 'CALL CustomQuery(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      
      db.query(sql, params, (err, results) => {
        if (err) {
          console.error("Error executing custom query:", err);
          return res.status(500).json({ message: "Failed to execute custom query", error: err.message });
        }
        // Return an empty array if no results
        return res.json(results[0] || []);
      });
  });

app.listen(8801, ()=>{
    console.log("Connected to backend!")
})