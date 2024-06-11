import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Table, Input } from "antd";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ticketService } from "../../../services/TicketService";
import { toast } from "react-toastify";
import qs from "qs";
import TicketDetail from "./TicketDetail";
const { Search } = Input;
const TicketManage = () => {
  const [ticketCodeSearch, setTicketCodeSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [recordTicket, setRecordTicket] = useState();
  const [data, setData] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filter: "",
  });
  const columns = [
    {
      title: "Mã vé",
      dataIndex: "ticketCode",
      width: 200,
      fixed: "left",
    },
    {
      title: "Mã người đặt",
      dataIndex: "userID",
      width: 300,
      fixed: "left",
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: "Tên Phim",
      dataIndex: "movieName",
      width: 300,
    },
    {
      title: "Suất chiếu",
      dataIndex: "showDate",
      width: 100,
      render: (text, record) => {
        // Lấy ngày từ chuỗi showDate
        const showDate = new Date(record.showDate);
        // Format ngày theo dd/MM/yyyy
        const formattedDate = showDate.toLocaleDateString("en-GB");
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "startTime",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 150,
      render: (text, record) => {
        return (
          <div className="action">
            <RemoveRedEyeIcon
              className="btn-edit"
              style={{ marginRight: "10px" }}
              onClick={() => {
                onViewDetail(record);
              }}
            ></RemoveRedEyeIcon>
          </div>
        );
      },
    },
  ];
  const getRandomuserParams = (params) => ({
    page: params.pagination?.current,
    pageSize: params.pagination?.pageSize,
    filter: ticketCodeSearch,
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    const param = qs.stringify(getRandomuserParams(tableParams));
    try {
      const result = await ticketService.getTicketInfo(param);
      setData(result.data.items);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result.data.totalCount,
        },
      });
    } catch (error) {
      toast.error("Lỗi khi load data");
    }
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const onSearch = (value) => {
    setTicketCodeSearch(value);
    fetchData();
  };
  const handleLoadTickets = () => {
    fetchData();
  };
  const handleCloseDetailTicket = () => {
    setIsDetailModalOpen(false);
    fetchData();
  };
  const handleViewDetail = () => {
    setIsDetailModalOpen(true);
  };
  const onViewDetail = (record) => {
    handleViewDetail();
    setRecordTicket(record);
  };
  return (
    <>
      <Card className="h-full w-full !rounded-none !overflow-visible">
        <CardHeader floated={false} shadow={false} className="rounded-none p-3">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách vé đã đặt
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin của các vé
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm" onClick={handleLoadTickets}>
                Tải lại danh sách vé
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Search
              placeholder="Tìm kiếm"
              onSearch={onSearch}
              style={{
                width: 288,
              }}
            />
            <div className="w-full md:w-72"></div>
          </div>
        </CardHeader>
        <Table
          columns={columns}
          rowKey={(record) => record.cinemaID}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          style={{ padding: 24 }}
        />
      </Card>
      {isDetailModalOpen && (
        <TicketDetail
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailTicket}
          record={recordTicket}
        ></TicketDetail>
      )}
    </>
  );
};

export default TicketManage;
