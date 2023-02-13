import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components/homePage";
import Signup from "./components/signup";
import Header from "./components/Header";
import AddModal from "./components/addModal";
import ModalList from "./components/modalList";
import ManageModal from "./components/manageModal";
import ViewModel from "./components/viewModel";
import AuthContextProvider from "./Context/userAuthContext";
import UserAuth from "./UserAuth";

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthContextProvider>
      <Header />
        <Routes>
          <Route element={<Login />} path="/login" /> 
          <Route element={<HomePage />} path="/" /> 
          <Route element={<Signup />} path="/signup" /> 
          <Route element={<UserAuth><AddModal /></UserAuth>} path="/addmodal" /> 
          <Route element={<ModalList />} path="/listmodal" /> 
          <Route element={<UserAuth><ManageModal /></UserAuth>} path="/manage" /> 
          <Route element={<ViewModel />} path="/viewer/:id" /> 
        </Routes>      
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
