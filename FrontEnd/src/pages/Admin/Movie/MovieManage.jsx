import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Select, Table, Input } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const { Search } = Input;
import qs from "qs";
import MovieAddNew from "./MovieAddNew";
import { useEffect, useState } from "react";
import { movieSevice } from "../../../services/MovieService";
import { Genre } from "../../../constrants/genre";
import { toast } from "react-toastify";
import MovieEdit from "./MovieEdit";
const MovieManage = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "movieID",
      width: 100,
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "movieName",
      width: 100,
      fixed: "left",
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      width: 100,
    },
    {
      title: "Mô tả",
      dataIndex: "summary",
      width: 300,
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "releaseDate",
      width: 200,
    },
    {
      title: "Thời lượng phim",
      dataIndex: "duration",
      width: 150,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      width: 100,
    },
    {
      title: "Sắp chiếu",
      dataIndex: "commingSoon",
      width: 120,
      key: "commingSoon",
      render: (commingSoon) => <span>{commingSoon ? "Yes" : "No"}</span>,
    },
    {
      title: "Đang chiếu",
      dataIndex: "showNow",
      width: 120,
      key: "showNow",
      render: (showNow) => <span>{showNow ? "Yes" : "No"}</span>,
    },
    {
      title: "Phim hot",
      dataIndex: "hot",
      width: 120,
      key: "hot",
      render: (hot) => <span>{hot ? "Yes" : "No"}</span>,
    },
    {
      title: "Diễn viên",
      dataIndex: "actors",
      width: 200,
    },
    {
      title: "Đạo diễn",
      dataIndex: "directors",
      width: 100,
    },
    {
      title: "Poster",
      dataIndex: "poster",
      width: 200,
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      width: 200,
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      width: 100,
    },
    {
      title: "Thể loại",
      dataIndex: "genreID",
      width: 100,
      render: (genreID) => <span>{Genre[genreID]}</span>,
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
                onDeleteMovie(record);
              }}
            ></DeleteIcon>
          </div>
        );
      },
    },
  ];
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [edittingMovie, setEdittingMovie] = useState();
  const [nameSearch, setNameSearch] = useState("");
  const getRandomuserParams = (params) => ({
    page: params.pagination?.current,
    pageSize: params.pagination?.pageSize,
    filter: nameSearch,
  });
  const handleEditMovie = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditMovie = () => {
    setIsEditModalOpen(false);
    fetchData();
  };
  const handleNewMovie = () => {
    setIsAddNewModalOpen(true);
  };
  const handleCloseModalAddNew = () => {
    setIsAddNewModalOpen(false);
    fetchData();
  };
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 15,
    },
  });
  const fetchData = () => {
    setLoading(true);
    const param = qs.stringify(getRandomuserParams(tableParams));
    movieSevice.getListMovie(param).then((result) => {
      setData(result.data.items);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result.data.totalCount,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const onDeleteMovie = (record) => {
    movieSevice
      .deleteMovie(record.movieID)
      .then((result) => {
        if (result.data.status == 200) {
          toast.success("Xóa thành công");
          fetchData();
        }
      })
      .catch(() => {
        toast.error("Xóa không thành công");
      });
  };
  const handleLoadListMovie = () => {
    fetchData();
  };
  const onEdit = (record) => {
    handleEditMovie();
    setEdittingMovie(record);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    setNameSearch(value);
    fetchData();
  };
  return (
    <>
      <Card className="h-full w-full !rounded-none !overflow-visible">
        <CardHeader floated={false} shadow={false} className="rounded-none p-3">
          <div className="mb-4 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách phim
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin tất cả các phim
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="outlined"
                size="sm"
                onClick={handleLoadListMovie}
              >
                Tải lại danh sách phim
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleNewMovie}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm phim
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* <Select
              defaultValue="lucy"
              style={{
                width: 288,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            /> */}
            <div className="w-full md:w-72">
              <Search
                placeholder="Tìm kiếm phim"
                onSearch={onSearch}
                style={{
                  width: 288,
                }}
              />
            </div>
          </div>
        </CardHeader>
        <div className="xl:max-w-[1228px] md:max-w-[600px]">
          <Table
            columns={columns}
            rowKey={(record) => record.movieID}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            style={{ padding: 24 }}
            scroll={{
              x: 1180,
              y: 360,
            }}
          />
        </div>
      </Card>
      {isAddNewModalOpen && (
        <MovieAddNew
          isOpen={isAddNewModalOpen}
          onClose={handleCloseModalAddNew}
        ></MovieAddNew>
      )}
      {isEditModalOpen && (
        <MovieEdit
          isOpen={isEditModalOpen}
          onClose={handleCloseEditMovie}
          record={edittingMovie}
        ></MovieEdit>
      )}
    </>
  );
};
export default MovieManage;
