import { Routes, Route } from "react-router-dom"
import React, { Suspense } from "react";


const Login = React.lazy(() => import('./components/authentication/Login'))
const Register = React.lazy(() => import('./components/authentication/Register'))
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'))



function App() {


  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>} >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
