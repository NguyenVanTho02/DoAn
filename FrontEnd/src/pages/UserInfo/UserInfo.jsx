import "./userInfo.scss";
import { useEffect, useState } from "react";
import Header from "../../layouts/MainLayout/Header/Header";
import { Form, Input, Tabs, Button, DatePicker, Table } from "antd";
import { applicationUserService } from "../../services/ApplicationUserService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChangePassword from "../ChangePassword";
import dayjs from "dayjs";
import QRCode from "react-qr-code";
import { HOST } from "../../constrants/config";
const Info = () => {
  const [form] = Form.useForm();
  const [infoUser, setInfoUser] = useState();
  const [date, setDate] = useState();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState();
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const userName = currentUser && currentUser.userName;

  const getInfoUser = (value) => {
    applicationUserService.getUserByUserName(value).then((result) => {
      setInfoUser(result.data);
    });
  };

  useEffect(() => {
    getInfoUser(userName);
  }, [userName]);

  useEffect(() => {
    form.setFieldsValue({
      phoneNumber: infoUser?.phoneNumber,
      // birthday: infoUser?.birthday,
    });
  }, [infoUser]);

  const handleUpdateUser = async () => {
    form.validateFields().then((values) => {
      const userData = {
        id: infoUser?.id,
        userName: infoUser?.userName,
        email: infoUser?.email,
        phoneNumber: values.phoneNumber,
        birthday: date,
      };
      applicationUserService
        .updateInfoUser(userData)
        .then(() => {
          toast.success("Cập nhật thành công");
        })
        .catch(() => {
          toast.error("Lỗi! Cập nhật thất bại");
        });
    });
  };
  const selectBirthday = (date, dateString) => {
    setDate(dateString);
  };
  const handleCloseChangePassword = () => {
    setIsChangePasswordModalOpen(false);
  };
  const handleOnChangePassword = () => {
    setIsChangePasswordModalOpen(true);
  };
  return (
    <>
      <div className="w-[50%]">
        <Form
          form={form}
          layout="vertical"
          labelCol={{
            span: 6,
          }}
        >
          <Form.Item label="Tên đăng nhập" name="userName">
            <Input name="userName" placeholder={infoUser?.userName} disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input name="email" placeholder={infoUser?.email} disabled />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại",
              },
            ]}
          >
            <Input name="phoneNumber" placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Hãy nhập ngày sinh",
              },
            ]}
          >
            <DatePicker
              onChange={selectBirthday}
              style={{
                width: 200,
              }}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "left" }}>
            <a
              onClick={handleOnChangePassword}
              style={{
                height: "35px",
                width: "120px",
                color: "#337ab7",
                fontSize: "16px",
              }}
            >
              Đổi mật khẩu
            </a>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              onClick={handleUpdateUser}
              style={{
                backgroundColor: "red",
                height: "35px",
                width: "120px",
                color: "#fff",
                fontSize: "16px",
              }}
              htmlType="submit"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
      {isChangePasswordModalOpen && (
        <ChangePassword
          isOpen={isChangePasswordModalOpen}
          onClose={handleCloseChangePassword}
        ></ChangePassword>
      )}
    </>
  );
};
const BookingHistory = () => {
  // const columns = [
  //   {
  //     title: "Tên Phim",
  //     dataIndex: "movieName",
  //     width: 40,
  //   },
  //   {
  //     title: "Thời lượng phim",
  //     dataIndex: "duration",
  //     width: 40,
  //   },
  //   {
  //     title: "Ngày đặt",
  //     dataIndex: "paymentDate",
  //     width: 50,
  //     render: (text, record) => {
  //       const date = new Date(record.paymentDate);
  //       const dateString = `${date.toLocaleDateString()}, ${date.toLocaleTimeString(
  //         "en-US",
  //         { hour: "2-digit", minute: "2-digit" }
  //       )}`;
  //       return <span>{dateString}</span>;
  //     },
  //   },
  //   {
  //     title: "Tên rạp",
  //     dataIndex: "cinemaName",
  //     width: 40,
  //   },
  //   {
  //     title: "Phòng chiếu",
  //     dataIndex: "theaterName",
  //     width: 40,
  //   },
  //   {
  //     title: "Mã thanh toán",
  //     dataIndex: "paymentID",
  //     width: 40,
  //   },
  //   {
  //     title: "Tên ghế",
  //     dataIndex: "seatName",
  //     width: 40,
  //   },
  //   {
  //     title: "Tổng tiền(vnđ)",
  //     dataIndex: "amount",
  //     width: 40,
  //     render: (text, record) => (
  //       <span>
  //         {new Intl.NumberFormat("it-IT", { style: "decimal" }).format(
  //           record.amount
  //         )}
  //       </span>
  //     ),
  //   },
  // ];

  const { currentUser } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const userVm = {
      email: currentUser.userEmail,
    };
    try {
      const result = await applicationUserService.getBookingHistory(userVm);
      setData(result.data.data.reverse());
      setLoading(false);
    } catch (error) {
      toast.error("Lỗi! không lấy được lịch sử đặt vé");
    }
  };
  useEffect(() => {
    if (currentUser?.userEmail) {
      fetchData();
    }
  }, []);
  const downloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log("pngUrl", pngUrl);
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "viblo-tranchien.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  console.log("data", data);
  return (
    <>
      {/* <Table
        columns={columns}
        rowKey={(record) => record.paymentID}
        dataSource={data}
        // pagination={tableParams.pagination}
        loading={loading}
        style={{ padding: 24 }}
        scroll={{
          y: 360,
        }}
      /> */}
      {data?.map((item) => (
        <div
          key={item.paymentID}
          className="main-box border mb-4 border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
            <div className="data">
              <p className="font-semibold text-base leading-7 text-black">
                Mã đơn hàng:{" "}
                <span className="text-indigo-600 font-medium">
                  #{item.paymentID}
                </span>
              </p>
              <p className="font-semibold text-base leading-7 text-black mt-4">
                Ngày đặt vé:{" "}
                <span className="text-black font-medium">
                  {dayjs(item.paymentDate).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </p>
              <p className="font-semibold text-base leading-7 text-black mt-4">
                Rạp chiếu:{" "}
                <span className="text-black font-medium">
                  {item.cinemaName}
                </span>
              </p>
            </div>
            <button
              onClick={downloadQR}
              className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white max-lg:mt-5"
            >
              <div>
                <QRCode
                  value={item.ticketCode}
                  size={128}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                  includeMargin={true}
                  renderAs="svg"
                />
              </div>
            </button>
          </div>
          <div className="w-full px-3 min-[400px]:px-6">
            <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
              <div className="img-box max-lg:w-full">
                <img
                  src={`${HOST + item.poster}`}
                  alt="Premium Watch image"
                  className="aspect-square w-full lg:max-w-[140px] lg:h-[140px] object-full rounded-lg"
                />
              </div>
              <div className="flex flex-row items-center w-full ">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                  <div className="flex items-center">
                    <div className="">
                      <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                        {item.movieName}
                      </h2>
                      <span className="font-normal text-sm leading-8 text-gray-500 mr-3 bg-gray-200 px-2 py-1 rounded-full">
                        {item.duration} phút
                      </span>{" "}
                      <span className="font-normal text-sm leading-8 text-white bg-red-500 px-2 py-1 rounded-full">
                        T{item.age}
                      </span>
                      <div className="flex items-center ">
                        <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                          Ghế:{" "}
                          <span className="text-gray-500">{item.seatName}</span>
                        </p>
                        <p className="font-medium text-base leading-7 text-black">
                          Số vé:{" "}
                          <span className="text-gray-500">
                            {item.numberOfTicket}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                      <div className="flex gap-3 lg:block">
                        <p className="font-medium text-sm leading-7 text-black">
                          Phòng chiếu
                        </p>
                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                          {item.theaterName}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                      <div className="flex gap-3 lg:block">
                        <p className="font-medium text-sm leading-7 text-black">
                          Giờ chiếu
                        </p>
                        <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-red-600">
                          {item?.startTime.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                      <div className="flex gap-3 lg:block">
                        <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                          Ngày chiếu
                        </p>
                        <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                          {dayjs(item.showDate).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
              <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                Thanh toán bằng ví điện tử VNPAY{" "}
                <span className="text-gray-500"></span>
              </p>
            </div>
            <p className="font-semibold text-lg text-black py-6">
              Tổng tiền:{" "}
              <span className="text-indigo-600">{item.amount} VNĐ</span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
const items = [
  {
    key: "1",
    label: "Thông tin tài khoản",
    children: <Info></Info>,
  },
  {
    key: "2",
    label: "Lịch sử đặt vé",
    children: <BookingHistory></BookingHistory>,
  },
];
const UserInfo = () => {
  const onChange = (key) => {};

  return (
    <>
      <Header></Header>
      <div className="h-[68px]"></div>
      <div className="px-48 py-24">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default UserInfo;
