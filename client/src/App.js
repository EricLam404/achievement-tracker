import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Student from "./components/Student";
import Class from "./components/Class";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/student/:id" element={<Student />} />
            <Route path="/student/:id/class/:class" element={<Class />} />
        </Routes>
    );
}

export default App;
