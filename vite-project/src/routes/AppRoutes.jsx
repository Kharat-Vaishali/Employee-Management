import { Routes, Route } from "react-router-dom";
import EmployeeContainer from "../components/smart/EmployeeContainer";
import EmployeeFormContainer from "../components/smart/EmployeeFormContainer";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<EmployeeContainer />} />
    <Route path="/add" element={<EmployeeFormContainer />} />
    <Route path="/edit/:id" element={<EmployeeFormContainer />} />
  </Routes>
);

export default AppRoutes;