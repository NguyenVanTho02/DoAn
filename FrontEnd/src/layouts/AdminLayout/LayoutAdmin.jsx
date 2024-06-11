import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import TopBar from "./TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LayoutAdmin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')===null){
            toast.error("Bạn vui lòng đăng nhập");
            navigate("/sign-in");
            return;
          }
    }, []);
  
    return (
        <>
        <TopBar></TopBar>
        <div className="flex">
            <NavBar></NavBar>
            <div className="w-full">
            <Outlet></Outlet>                  
            </div>
        </div>
    </>
    );
};

export default LayoutAdmin;