import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Customers from "./pages/Customers";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css"
import Query from "./pages/Query";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customers/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/query" element={<Query/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
