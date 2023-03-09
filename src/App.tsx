import "./App.css";
import "./styles/nav.css";
import { Route, Routes, Link } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";
import { HomePage } from "./pages/HomePage";
import { EmployeePage } from "./pages/EmployeePage";
import { Counter } from "./components/Reducer";
import { EmployeeForm } from "./components/Employee/EmployeeForm";
import { SignInForm } from "./components/SignIn/SignInForm";
import { SignUpForm } from "./components/SignUp/SignUp";
function App() {
  return (
    <>
      <div>
        <div className="wrap">
          <nav>
            <ul>
              <li>
                <i>⛅COFFEE COFFEE🌻</i>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product">Product</Link>
              </li>
              <li>
                <Link to="/employees">Employee</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/employees" element={<EmployeePage />} />

          <Route path="/employees/edit/:idParam" element={<EmployeeForm />} />
          <Route path="/employees/create" element={<EmployeeForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          {/* <Route path='/create/products' element={<EmployeeForm/>}/> */}
          {/* <Route path='/edit/products' element={<EmployeeForm/>}/> */}
        </Routes>
        {/* <Counter/> */}
      </div>
    </>
  );
}

export default App;
