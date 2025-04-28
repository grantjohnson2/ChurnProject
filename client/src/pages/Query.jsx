import React, { useState } from 'react';
import axios from 'axios';

const Query = () => {
    // Column selection states
    const [allColumns, setAllColumns] = useState(true);
    const [idColumn, setIdColumn] = useState(false);
    const [surnameColumn, setSurnameColumn] = useState(false);
    const [geographyColumn, setGeographyColumn] = useState(false);
    const [genderColumn, setGenderColumn] = useState(false);
    const [ageColumn, setAgeColumn] = useState(false);
    const [creditScoreColumn, setCreditScoreColumn] = useState(false);
    const [tenureColumn, setTenureColumn] = useState(false);
    const [balanceColumn, setBalanceColumn] = useState(false);
    const [numOfProductsColumn, setNumOfProductsColumn] = useState(false);
    const [hasCrCardColumn, setHasCrCardColumn] = useState(false);
    const [isActiveMemberColumn, setIsActiveMemberColumn] = useState(false);
    const [estimatedSalaryColumn, setEstimatedSalaryColumn] = useState(false);
    const [exitedColumn, setExitedColumn] = useState(false);

    // Customer ID filter states
    const [useCustomerId, setUseCustomerId] = useState(false);
    const [filteredCustomerId, setFilteredCustomerId] = useState(0);
    const [operationCustomerId, setOperationCustomerId] = useState("=");
    const [useCustomerIdOrderBy, setUseCustomerIdOrderBy] = useState(false);
    const [directionCustomerIdOrderBy, setDirectionCustomerIdOrderBy] = useState("ASC");

    // Geography filter states
    const [useGeography, setUseGeography] = useState(false);
    const [filteredGeography, setFilteredGeography] = useState("");

    // Gender filter states
    const [useGender, setUseGender] = useState(false);
    const [filteredGender, setFilteredGender] = useState("Male");

    // Age filter states
    const [useAge, setUseAge] = useState(false);
    const [filteredAge, setFilteredAge] = useState(0);
    const [operationAge, setOperationAge] = useState("=");
    const [useAgeOrderBy, setUseAgeOrderBy] = useState(false);
    const [directionAgeOrderBy, setDirectionAgeOrderBy] = useState("ASC");

    // Balance filter states
    const [useBalance, setUseBalance] = useState(false);
    const [filteredBalance, setFilteredBalance] = useState(0);
    const [operationBalance, setOperationBalance] = useState("=");
    const [useBalanceOrderBy, setUseBalanceOrderBy] = useState(false);
    const [directionBalanceOrderBy, setDirectionBalanceOrderBy] = useState("ASC");

    // Salary filter states
    const [useSalary, setUseSalary] = useState(false);
    const [filteredSalary, setFilteredSalary] = useState(0);
    const [operationSalary, setOperationSalary] = useState("=");
    const [useSalaryOrderBy, setUseSalaryOrderBy] = useState(false);
    const [directionSalaryOrderBy, setDirectionSalaryOrderBy] = useState("ASC");

    // Limit states
    const [useLimit, setUseLimit] = useState(false);
    const [filteredLimit, setFilteredLimit] = useState(100);

    // Results state
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle toggling all columns or specific columns
    const handleAllColumnsChange = (e) => {
        const checked = e.target.checked;
        setAllColumns(checked);
        
        // If all columns is checked, disable individual column selections
        if (checked) {
            setIdColumn(false);
            setSurnameColumn(false);
            setGeographyColumn(false);
            setGenderColumn(false);
            setAgeColumn(false);
            setCreditScoreColumn(false);
            setTenureColumn(false);
            setBalanceColumn(false);
            setNumOfProductsColumn(false);
            setHasCrCardColumn(false);
            setIsActiveMemberColumn(false);
            setEstimatedSalaryColumn(false);
            setExitedColumn(false);
        }
    };

    const handleIndividualColumnChange = (setter) => {
        // If any individual column is selected, disable "all columns"
        setAllColumns(false);
        setter(prev => !prev);
    };

    const handleQuery = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Ensure at least one column is selected if allColumns is false
            if (!allColumns && 
                !idColumn && !surnameColumn && !geographyColumn && !genderColumn && 
                !ageColumn && !creditScoreColumn && !tenureColumn && !balanceColumn && 
                !numOfProductsColumn && !hasCrCardColumn && !isActiveMemberColumn && 
                !estimatedSalaryColumn && !exitedColumn) {
                setError("Please select at least one column to display");
                setLoading(false);
                return;
            }
            
            const params = {
                allColumns: allColumns ? 1 : 0,
                idColumn: idColumn ? 1 : 0,
                surnameColumn: surnameColumn ? 1 : 0,
                geographyColumn: geographyColumn ? 1 : 0,
                genderColumn: genderColumn ? 1 : 0,
                ageColumn: ageColumn ? 1 : 0,
                creditScoreColumn: creditScoreColumn ? 1 : 0,
                tenureColumn: tenureColumn ? 1 : 0,
                balanceColumn: balanceColumn ? 1 : 0,
                numOfProductsColumn: numOfProductsColumn ? 1 : 0,
                hasCrCardColumn: hasCrCardColumn ? 1 : 0,
                isActiveMemberColumn: isActiveMemberColumn ? 1 : 0,
                estimatedSalaryColumn: estimatedSalaryColumn ? 1 : 0,
                exitedColumn: exitedColumn ? 1 : 0,
                
                useCustomerId: useCustomerId ? 1 : 0,
                filteredCustomerId,
                operationCustomerId,
                useCustomerIdOrderBy: useCustomerIdOrderBy ? 1 : 0,
                directionCustomerIdOrderBy,
                
                useGeography: useGeography ? 1 : 0,
                filteredGeography,
                
                useGender: useGender ? 1 : 0,
                filteredGender,
                
                useAge: useAge ? 1 : 0,
                filteredAge,
                operationAge,
                useAgeOrderBy: useAgeOrderBy ? 1 : 0,
                directionAgeOrderBy,
                
                useBalance: useBalance ? 1 : 0,
                filteredBalance,
                operationBalance,
                useBalanceOrderBy: useBalanceOrderBy ? 1 : 0,
                directionBalanceOrderBy,
                
                useSalary: useSalary ? 1 : 0,
                filteredSalary,
                operationSalary,
                useSalaryOrderBy: useSalaryOrderBy ? 1 : 0,
                directionSalaryOrderBy,
                
                useLimit: useLimit ? 1 : 0,
                filteredLimit
            };
            
            const res = await axios.get(`http://localhost:8801/query`, { params });
            setResults(res.data);
        } catch (err) {
            console.error("Error fetching custom query results:", err);
            setError("Failed to execute query: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // Helper function to render operation select dropdown
    const renderOperationDropdown = (value, setter) => (
        <select value={value} onChange={(e) => setter(e.target.value)}>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="<=">&lt;=</option>
            <option value=">=">&gt;=</option>
            <option value="!=">!=</option>
        </select>
    );

    // Helper function to render order direction dropdown
    const renderDirectionDropdown = (value, setter) => (
        <select value={value} onChange={(e) => setter(e.target.value)}>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
        </select>
    );

    // Generate table headers based on selected columns
    const getTableHeaders = () => {
        const headers = [];
        if (allColumns) {
            return ["ID", "Surname", "Geography", "Gender", "Age", "Credit Score", "Tenure", 
                    "Balance", "Products", "Credit Card", "Active Member", "Salary", "Exited"];
        }
        
        if (idColumn) headers.push("ID");
        if (surnameColumn) headers.push("Surname");
        if (geographyColumn) headers.push("Geography");
        if (genderColumn) headers.push("Gender");
        if (ageColumn) headers.push("Age");
        if (creditScoreColumn) headers.push("Credit Score");
        if (tenureColumn) headers.push("Tenure");
        if (balanceColumn) headers.push("Balance");
        if (numOfProductsColumn) headers.push("Products");
        if (hasCrCardColumn) headers.push("Credit Card");
        if (isActiveMemberColumn) headers.push("Active Member");
        if (estimatedSalaryColumn) headers.push("Salary");
        if (exitedColumn) headers.push("Exited");
        
        return headers;
    };

    // Map results to appropriate fields based on selected columns
    const renderTableRow = (item, index) => {
        const cells = [];
        if (allColumns || idColumn) cells.push(<td key={`id-${index}`}>{item.CustomerId}</td>);
        if (allColumns || surnameColumn) cells.push(<td key={`surname-${index}`}>{item.Surname}</td>);
        if (allColumns || geographyColumn) cells.push(<td key={`geography-${index}`}>{item.Geography}</td>);
        if (allColumns || genderColumn) cells.push(<td key={`gender-${index}`}>{item.Gender}</td>);
        if (allColumns || ageColumn) cells.push(<td key={`age-${index}`}>{item.Age}</td>);
        if (allColumns || creditScoreColumn) cells.push(<td key={`credit-${index}`}>{item.CreditScore}</td>);
        if (allColumns || tenureColumn) cells.push(<td key={`tenure-${index}`}>{item.Tenure}</td>);
        if (allColumns || balanceColumn) cells.push(<td key={`balance-${index}`}>{item.Balance}</td>);
        if (allColumns || numOfProductsColumn) cells.push(<td key={`products-${index}`}>{item.NumOfProducts}</td>);
        if (allColumns || hasCrCardColumn) cells.push(<td key={`crcard-${index}`}>{item.HasCrCard}</td>);
        if (allColumns || isActiveMemberColumn) cells.push(<td key={`active-${index}`}>{item.IsActiveMember}</td>);
        if (allColumns || estimatedSalaryColumn) cells.push(<td key={`salary-${index}`}>{item.EstimatedSalary}</td>);
        if (allColumns || exitedColumn) cells.push(<td key={`exited-${index}`}>{item.Exited}</td>);
        
        return <tr key={index}>{cells}</tr>;
    };

    return (
        <div className="custom-query-container">
            <h1>Custom Customer Query Builder</h1>
            
            <div className="query-builder">
                <div className="section columns-section">
                    <h2>Select Columns to Display</h2>
                    <div className="checkbox-group">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={allColumns} 
                                onChange={handleAllColumnsChange} 
                            /> 
                            All Columns
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={idColumn} 
                                onChange={() => handleIndividualColumnChange(setIdColumn)} 
                                disabled={allColumns} 
                            /> 
                            Customer ID
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={surnameColumn} 
                                onChange={() => handleIndividualColumnChange(setSurnameColumn)} 
                                disabled={allColumns} 
                            /> 
                            Surname
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={geographyColumn} 
                                onChange={() => handleIndividualColumnChange(setGeographyColumn)} 
                                disabled={allColumns} 
                            /> 
                            Geography
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={genderColumn} 
                                onChange={() => handleIndividualColumnChange(setGenderColumn)} 
                                disabled={allColumns} 
                            /> 
                            Gender
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={ageColumn} 
                                onChange={() => handleIndividualColumnChange(setAgeColumn)} 
                                disabled={allColumns} 
                            /> 
                            Age
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={creditScoreColumn} 
                                onChange={() => handleIndividualColumnChange(setCreditScoreColumn)} 
                                disabled={allColumns} 
                            /> 
                            Credit Score
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={tenureColumn} 
                                onChange={() => handleIndividualColumnChange(setTenureColumn)} 
                                disabled={allColumns} 
                            /> 
                            Tenure
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={balanceColumn} 
                                onChange={() => handleIndividualColumnChange(setBalanceColumn)} 
                                disabled={allColumns} 
                            /> 
                            Balance
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={numOfProductsColumn} 
                                onChange={() => handleIndividualColumnChange(setNumOfProductsColumn)} 
                                disabled={allColumns} 
                            /> 
                            Number of Products
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={hasCrCardColumn} 
                                onChange={() => handleIndividualColumnChange(setHasCrCardColumn)} 
                                disabled={allColumns} 
                            /> 
                            Has Credit Card
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={isActiveMemberColumn} 
                                onChange={() => handleIndividualColumnChange(setIsActiveMemberColumn)} 
                                disabled={allColumns} 
                            /> 
                            Is Active Member
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={estimatedSalaryColumn} 
                                onChange={() => handleIndividualColumnChange(setEstimatedSalaryColumn)} 
                                disabled={allColumns} 
                            /> 
                            Estimated Salary
                        </label>
                        
                        <label>
                            <input 
                                type="checkbox" 
                                checked={exitedColumn} 
                                onChange={() => handleIndividualColumnChange(setExitedColumn)} 
                                disabled={allColumns} 
                            /> 
                            Exited
                        </label>
                    </div>
                </div>
                
                <div className="section filters-section">
                    <h2>Filters</h2>
                    
                    <div className="filter-group">
                        <h3>Customer ID</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={useCustomerId} 
                                onChange={(e) => setUseCustomerId(e.target.checked)} 
                            /> 
                            Enable Filter
                        </label>
                        {useCustomerId && (
                            <div className="filter-inputs">
                                {renderOperationDropdown(operationCustomerId, setOperationCustomerId)}
                                <input 
                                    type="number" 
                                    value={filteredCustomerId} 
                                    onChange={(e) => setFilteredCustomerId(Number(e.target.value))} 
                                />
                            </div>
                        )}
                        
                        <div className="order-by">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={useCustomerIdOrderBy} 
                                    onChange={(e) => setUseCustomerIdOrderBy(e.target.checked)} 
                                /> 
                                Order by Customer ID
                            </label>
                            {useCustomerIdOrderBy && (
                                renderDirectionDropdown(directionCustomerIdOrderBy, setDirectionCustomerIdOrderBy)
                            )}
                        </div>
                    </div>
                    
                    <div className="filter-group">
                        <h3>Geography</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={useGeography} 
                                onChange={(e) => setUseGeography(e.target.checked)} 
                            /> 
                            Enable Filter
                        </label>
                        {useGeography && (
                            <div className="filter-inputs">
                                <select 
                                    value={filteredGeography} 
                                    onChange={(e) => setFilteredGeography(e.target.value)}
                                >
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Spain">Spain</option>
                                    {/* Add more geography options as needed */}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="filter-group">
                        <h3>Gender</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={useGender} 
                                onChange={(e) => setUseGender(e.target.checked)} 
                            /> 
                            Enable Filter
                        </label>
                        {useGender && (
                            <div className="filter-inputs">
                                <select 
                                    value={filteredGender} 
                                    onChange={(e) => setFilteredGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="filter-group">
                        <h3>Age</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={useAge} 
                                onChange={(e) => setUseAge(e.target.checked)} 
                            /> 
                            Enable Filter
                        </label>
                        {useAge && (
                            <div className="filter-inputs">
                                {renderOperationDropdown(operationAge, setOperationAge)}
                                <input 
                                    type="number" 
                                    value={filteredAge} 
                                    onChange={(e) => setFilteredAge(Number(e.target.value))} 
                                />
                            </div>
                        )}
                        
                        <div className="order-by">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={useAgeOrderBy} 
                                    onChange={(e) => setUseAgeOrderBy(e.target.checked)} 
                                /> 
                                Order by Age
                            </label>
                            {useAgeOrderBy && (
                                renderDirectionDropdown(directionAgeOrderBy, setDirectionAgeOrderBy)
                            )}
                        </div>
                    </div>
                    
                    <div className="filter-group">
                        <h3>Balance</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={useBalance} 
                                onChange={(e) => setUseBalance(e.target.checked)} 
                            /> 
                            Enable Filter
                        </label>
                        {useBalance && (
                            <div className="filter-inputs">
                                {renderOperationDropdown(operationBalance, setOperationBalance)}
                                <input 
                                    type="number" 
                                    value={filteredBalance} 
                                    onChange={(e) => setFilteredBalance(Number(e.target.value))} 
                                />
                            </div>
                        )}
                        
                        <div className="order-by">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={useBalanceOrderBy} 
                                    onChange={(e) => setUseBalanceOrderBy(e.target.checked)} 
                                /> 
                                Order by Balance
                            </label>
                            {useBalanceOrderBy && (
                                renderDirectionDropdown(directionBalanceOrderBy, setDirectionBalanceOrderBy)
                            )}
                        </div>
                    </div>
                    
                    <div className="filter-group">
                        <h3>Estimated Salary</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={useSalary} 
                                onChange={(e) => setUseSalary(e.target.checked)} 
                            /> 
                            Enable Filter
                        </label>
                        {useSalary && (
                            <div className="filter-inputs">
                                {renderOperationDropdown(operationSalary, setOperationSalary)}
                                <input 
                                    type="number" 
                                    value={filteredSalary} 
                                    onChange={(e) => setFilteredSalary(Number(e.target.value))} 
                                />
                            </div>
                        )}
                        
                        <div className="order-by">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={useSalaryOrderBy} 
                                    onChange={(e) => setUseSalaryOrderBy(e.target.checked)} 
                                /> 
                                Order by Salary
                            </label>
                            {useSalaryOrderBy && (
                                renderDirectionDropdown(directionSalaryOrderBy, setDirectionSalaryOrderBy)
                            )}
                        </div>
                    </div>
                    
                    <div className="filter-group">
                        <h3>Limit Results</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={useLimit} 
                                onChange={(e) => setUseLimit(e.target.checked)} 
                            /> 
                            Enable Limit
                        </label>
                        {useLimit && (
                            <div className="filter-inputs">
                                <input 
                                    type="number" 
                                    value={filteredLimit} 
                                    onChange={(e) => setFilteredLimit(Number(e.target.value))} 
                                    min="1"
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="run-query-section">
                    <button 
                        onClick={handleQuery} 
                        disabled={loading}
                        className="run-query-btn"
                    >
                        {loading ? "Running Query..." : "Run Query"}
                    </button>
                    
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
            
            <div className="results-section">
                <h2>Query Results</h2>
                {results.length > 0 ? (
                    <div className="results-table-wrapper">
                        <table className="results-table">
                            <thead>
                                <tr>
                                    {getTableHeaders().map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((item, index) => renderTableRow(item, index))}
                            </tbody>
                        </table>
                        <div className="results-count">
                            Showing {results.length} {results.length === 1 ? "result" : "results"}
                        </div>
                    </div>
                ) : (
                    <div className="no-results">
                        {loading ? "Loading results..." : "No results to display. Run a query to see data."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Query;