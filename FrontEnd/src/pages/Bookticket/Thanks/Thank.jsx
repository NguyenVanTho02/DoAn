
import  {  useState,useEffect } from 'react';
import Header from "../../../layouts/MainLayout/Header/Header";
import Footer from "../../../layouts/MainLayout/Footer";
import axios from "axios";
import { toast } from "react-toastify";
const Thanks = () => {
    const [id, setId] = useState("-1");
    const [orderid,setorderid]=useState("0");
    const [status,setstatus]=useState("0");
    const [tb,settb]=useState("0");
    useEffect(() => {
      // Lấy URLSearchParams từ URL
      const urlParams = new URLSearchParams(window.location?.search);
     
      if(urlParams!=null){
        const status=urlParams?.get('vnp_TransactionStatus'); 
        const idFromURL =urlParams?.get('vnp_TxnRef');
        console.log(status)
        if(status==="00"){
        
          settb("ĐÃ THÁNH TOÁN THÀNH CÔNG")
        
        }else if(status==="01"){
          settb("CHƯA HOÀN TẤT")
        }
        else if(status==="02"){
          settb("BỊ LỖI")
        }
       
        else if(status==="04"){
          settb("CHƯA THÀNH CÔNG Ở VNPAY")
        }else if(status==="07"){
          settb("BỊ NGHI NGỜ GIAN LẬN TỪ VNPAY")
        }
        
       

        setorderid(idFromURL)
      }
  }, []); // Chỉ chạy một lần sau khi component được render
   
  return (
    <>
     
      <Header/>

      <div className="container-detail w-full flex justify-center mt-40 mb-40">
            <div className='w-2/3 bg-gray-200 h-96 justify-center flex items-center'>
            <div className="jumbotron" >
            <h2 className="text-center text-2xl" >ĐƠN HÀNG CỦA BẠN {tb}</h2>
          <h3 className="text-center text-2xl">CẢM ƠN BẠN ĐÃ ĐẶT VÉ TỪ CHÚNG TÔI,</h3>
          
          <p className="text-center text-2xl">Mã đơn hàng của bạn là:{orderid} </p>
          <p className="text-center text-2xl">Bạn sẽ nhận được email xác nhận đơn hàng với thông tin chi tiết về đơn hàng và QR để theo dõi quá trình của bạn.</p>
           
        </div>
            </div>
      </div>
      <Footer/>
    </>
  );
};

export default Thanks;
