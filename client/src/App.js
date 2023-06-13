import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/admin/Home";
import Student from "./components/admin/Student";
import Class from "./components/admin/Class";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/student/:id" element={<Student />} />
            <Route path="/student/:id/class/:_class" element={<Class />} />
        </Routes>
    );
}

export default App;
