import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Table, Input } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const { Search } = Input;
import qs from "qs";
import TheaterAddNew from "./TheaterAddNew";
import { theaterService } from "../../../services/TheaterService";
import TheaterEdit from "./TheaterEdit";
import { toast } from "react-toastify";

const TheaterManage = () => {
  const [isAddNewModalOpen, setAddNewModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [infoTheater, setInfoTheater] = useState();
  const [inputSearch, setInputSearch] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns = [
    {
      title: "ID Phòng",
      dataIndex: "theaterID",
      width: 120,
      fixed: "left",
    },
    {
      title: "Tên phòng chiếu",
      dataIndex: "theaterName",
      width: 200,
      fixed: "left",
      sorter: (a, b) => a.cinemaName - b.cinemaName,
    },
    {
      title: "Mã rạp",
      dataIndex: "cinemaID",
      width: 120,
    },
    {
      title: "Tên rạp",
      dataIndex: "cinemaName",
      width: 200,
    },
    {
      title: "Số lượng ghế",
      dataIndex: "qtySeat",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 150,
      render: (text, record) => {
        return (
          <div className="action">
            <EditIcon
              className="btn-edit"
              style={{ marginRight: "10px" }}
              onClick={() => {
                onEditTheater(record);
              }}
            ></EditIcon>
            <DeleteIcon
              className="btn-delete"
              onClick={() => {
                onDeleteTheater(record);
              }}
            ></DeleteIcon>
          </div>
        );
      },
    },
  ];

  const handleNewMovie = () => {
    setAddNewModalOpen(true);
  };
  const handleCloseModal = () => {
    setAddNewModalOpen(false);
    setIsModalEditOpen(false);
  };

  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    filter: inputSearch,
  });

  const fetchData = () => {
    setLoading(true);
    const param = qs.stringify(getRandomuserParams(tableParams));
    theaterService.getListSTheater(param).then((result) => {
      setData(result.data.items);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result.data.totalCount,
        },
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, [
    JSON.stringify(tableParams),
    isAddNewModalOpen,
    isModalEditOpen,
    inputSearch,
  ]);
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

  const onDeleteTheater = (record) => {
    confirm(
      `Bạn có chắc chắn muốn xoá phòng chiếu ${record.theaterName} không?`
    ) === true &&
      theaterService
        .removeTheater(record.theaterID)
        .then(() => {
          fetchData();
          toast.success(`Xoá phòng chiều ${record.theaterName} thành công`);
        })
        .catch(() => {
          toast.error("Xoá không thành công");
        });
  };

  const onEditTheater = (record) => {
    setIsModalEditOpen(true);
    setInfoTheater(record);
  };

  const onSearch = (value) => {
    setInputSearch(value);
  };

  const handleReload = () => {
    setInputSearch("");
    fetchData();
  };

  return (
    <>
      <Card className="h-full w-full !rounded-none !overflow-visible">
        <CardHeader floated={false} shadow={false} className="rounded-none p-3">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách tất cả các phòng chiếu
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin tất cả các phòng chiếu
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm" onClick={handleReload}>
                Xem tất cả
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleNewMovie}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm phòng
                chiếu mới
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Search
                placeholder="Tìm kiếm theo tên rạp"
                onSearch={onSearch}
                style={{
                  width: 288,
                }}
              />
            </div>
          </div>
        </CardHeader>
        <Table
          columns={columns}
          rowKey={(record) => record.theaterID}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          style={{ padding: 24 }}
          scroll={{
            y: 360,
          }}
        />
      </Card>
      {isAddNewModalOpen && (
        <TheaterAddNew
          isOpen={isAddNewModalOpen}
          onClose={handleCloseModal}
        ></TheaterAddNew>
      )}

      {isModalEditOpen && (
        <TheaterEdit
          record={infoTheater}
          isOpen={isModalEditOpen}
          onClose={handleCloseModal}
          setIsModalEditOpen={setIsModalEditOpen}
        ></TheaterEdit>
      )}
    </>
  );
};
export default TheaterManage;
