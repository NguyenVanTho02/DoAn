import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Select, Table, Input } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const { Search } = Input;
import qs from "qs";
import ShowAddNew from "./ShowAddNew";
import { showService } from "../../../services/ShowService";
import { movieSevice } from "../../../services/MovieService";
import {
  getDayFromDateTime,
  getTimeFromDateTime,
} from "../../../constrants/formatDatetime";
import { toast } from "react-toastify";
import ShowEdit from "./ShowEdit";

const ShowManage = () => {
  const [data, setData] = useState();
  const [listMovie, setListMovie] = useState([]);
  const [movieSearch, setMovieSearch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAddNewModalOpen, setAddNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [infoShow, setInfoShow] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    movieID: 0,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "showID",
      width: 100,
      fixed: "left",
    },
    {
      title: "Ngày chiếu",
      dataIndex: "showDate",
      width: 150,
    },
    {
      title: "Tên phim",
      dataIndex: "movieName",
      width: 280,
    },
    {
      title: "ID phòng chiếu",
      dataIndex: "theaterID",
      width: 180,
      sorter: (a, b) => a.theaterID - b.theaterID,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      width: 150,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 120,
      render: (text, record) => {
        return (
          <div className="action">
            <EditIcon
              className="btn-edit"
              style={{ marginRight: "10px" }}
              onClick={() => {
                onEditShow(record);
              }}
            ></EditIcon>
            <DeleteIcon
              className="btn-delete"
              onClick={() => {
                onDeleteShow(record);
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
    movieID: movieSearch,
  });

  const handleNewMovie = () => {
    setAddNewModalOpen(true);
  };
  const handleCloseModal = () => {
    setAddNewModalOpen(false);
    setIsEditModalOpen(false);
  };

  // Format lại data trả về để hiển thị dữ liệu
  const changeData = (data) => {
    var newData = data.map((item) => ({
      ...item,
      showDate: getDayFromDateTime(item.showDate),
    }));
    return newData;
  };

  const fetchData = () => {
    setLoading(true);
    const param = qs.stringify(getRandomuserParams(tableParams));
    showService.getListShow(param).then((result) => {
      setData(changeData(result.data.items));
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
    isEditModalOpen,
    movieSearch,
  ]);

  const fetchDataMovie = () => {
    movieSevice.getListMovie().then((result) => {
      setListMovie(result.data.items);
    });
  };

  useEffect(() => {
    fetchDataMovie();
  }, []);

  const handleSearchByMovie = (value) => {
    setMovieSearch(value);
  };

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

  const onDeleteShow = (record) => {
    confirm(`Bạn có chắc chắn muốn xóa lịch chiếu không!`) === true &&
      showService
        .removeShow(record.showID)
        .then(() => {
          fetchData();
          toast.success("Xóa thành công");
        })
        .catch(() => {
          toast.error("Xóa không thành công");
        });
  };

  const onEditShow = (record) => {
    setIsEditModalOpen(true);
    setInfoShow(record);
  };

  const handleReload = () => {
    setMovieSearch(0);
    fetchData();
  };

  return (
    <>
      <Card className="h-full w-full !rounded-none !overflow-visible">
        <CardHeader floated={false} shadow={false} className="rounded-none p-3">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách lịch chiếu
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin tất cả các lịch chiếu
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
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Select
              placeholder="Tìm kiếm theo phim"
              showSearch
              style={{
                width: 288,
              }}
              onChange={handleSearchByMovie}
              options={listMovie?.map((movie) => ({
                value: movie.movieID,
                label: movie.movieName,
              }))}
            />
            <div className="w-full md:w-72">
              {/* <Select
                placeholder="Tìm kiếm theo rạp"
                showSearch
                style={{
                  width: 288,
                }}
                onChange={handleChange}
                options={cites?.map((city) => ({
                  value: city.cityID,
                  label: city.cityName,
                }))}
              /> */}
            </div>
          </div>
        </CardHeader>
        <Table
          columns={columns}
          rowKey={(record) => record.showID}
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
        <ShowAddNew
          isOpen={isAddNewModalOpen}
          onClose={handleCloseModal}
        ></ShowAddNew>
      )}

      {isEditModalOpen && (
        <ShowEdit
          isOpen={isEditModalOpen}
          record={infoShow}
          onClose={handleCloseModal}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </>
  );
};
export default ShowManage;
