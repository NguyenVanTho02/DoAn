import "./cinemaManage.scss";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Select, Table, Input } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import qs from "qs";
import { useEffect, useState } from "react";
import CinemaAddNew from "./CinemaAddNew";
import CinemaEdit from "./CinemaEdit";
import { cinemaService } from "../../../services/CinemaService";
import { cityService } from "../../../services/CityService";
import { toast } from "react-toastify";
const { Search } = Input;

const CinemaManage = () => {
  const [isAddNewModalOpen, setAddNewModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [infoCinema, setInfoCinema] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [cites, setCities] = useState();
  const [citySearch, setCitySearch] = useState(0);
  const [nameSearch, setNameSearch] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filter: "",
    city: 0,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "cinemaID",
      width: 100,
      fixed: "left",
    },
    {
      title: "Tên rạp",
      dataIndex: "cinemaName",
      width: 300,
      fixed: "left",
      sorter: (a, b) => a.cinemaName - b.cinemaName,
    },
    {
      title: "Địa chỉ",
      dataIndex: "cinemaAddress",
      width: 500,
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "cityName",
      width: 300,
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
                onEdit(record);
              }}
            ></EditIcon>
            <DeleteIcon
              className="btn-delete"
              onClick={() => {
                onDeleteCinema(record);
              }}
            ></DeleteIcon>
          </div>
        );
      },
    },
  ];

  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    filter: nameSearch,
    city: citySearch,
  });

  const fetchDataCity = () => {
    cityService.getListCity().then((result) => {
      setCities(result.data);
    });
  };

  useEffect(() => {
    fetchDataCity();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const param = qs.stringify(getRandomuserParams(tableParams));
    cinemaService.getListCinema(param).then((result) => {
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
    citySearch,
    nameSearch,
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

  const handleNewCinema = () => {
    setAddNewModalOpen(true);
  };
  const handleCloseModal = () => {
    setAddNewModalOpen(false);
    setIsModalEditOpen(false);
  };

  const onEdit = (record) => {
    setIsModalEditOpen(true);
    setInfoCinema(record);
  };

  const onDeleteCinema = (record) => {
    confirm(`Bạn có chắc chắn muốn xóa rạp ${record.cinemaName} không!`) ===
      true &&
      cinemaService
        .removeCinema(record.cinemaID)
        .then(() => {
          fetchData();
          toast.success(`Xóa rạp ${record.cinemaName} thành công`);
        })
        .catch(() => {
          toast.error("Xóa không thành công");
        });
  };

  const handleChange = (value) => {
    setCitySearch(value);
  };

  const onSearch = (value) => {
    setNameSearch(value);
  };

  const handleReload = () => {
    setCitySearch(0);
    setNameSearch("");
    fetchData();
  };

  return (
    <>
      <Card className="h-full w-full !rounded-none !overflow-visible">
        <CardHeader floated={false} shadow={false} className="rounded-none p-3">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách rạp chiếu
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin của các rạp chiếu
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm" onClick={handleReload}>
                Xem tất cả
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleNewCinema}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm rạp
                chiếu mới
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Select
              placeholder="Lọc theo Tỉnh/Thành phố"
              showSearch
              style={{
                width: 288,
              }}
              onChange={handleChange}
              options={cites?.map((city) => ({
                value: city.cityID,
                label: city.cityName,
              }))}
            />
            <div className="w-full md:w-72">
              <Search
                placeholder="Tìm kiếm theo tên"
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
          rowKey={(record) => record.cinemaID}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          style={{ padding: 24 }}
        />
      </Card>

      {isModalEditOpen && (
        <CinemaEdit
          record={infoCinema}
          isOpen={isModalEditOpen}
          onClose={handleCloseModal}
          setIsModalEditOpen={setIsModalEditOpen}
        ></CinemaEdit>
      )}

      {isAddNewModalOpen && (
        <CinemaAddNew
          isOpen={isAddNewModalOpen}
          onClose={handleCloseModal}
        ></CinemaAddNew>
      )}
    </>
  );
};
export default CinemaManage;
