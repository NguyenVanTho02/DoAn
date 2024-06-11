import React, { useEffect, useState } from "react";
import qs from "qs";
const { Search } = Input;
import { UserPlusIcon } from "@heroicons/react/24/solid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Select, Table, Input } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { postService } from "../../../services/PostService";
import PostAddNew from "./PostAddNew";
import DetailPost from "./DetailPost";
import { toast } from "react-toastify";

const PostManage = () => {
  const [isAddNewModalOpen, setAddNewModalOpen] = useState(false);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [detailPost, setDetailPost] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filter: "",
  });

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "Hình ảnh đại diện",
      dataIndex: "imagePoster",
      width: 200,
    },
    {
      title: "Nội dung",
      width: 300,
      render: (text, record) => {
        return (
          <div className="action ">
            <RemoveRedEyeIcon
              className="btn-edit ml-[20px]"
              style={{ marginRight: "10px" }}
              onClick={() => {
                viewDetailPost(record);
              }}
            ></RemoveRedEyeIcon>
          </div>
        );
      },
    },
    {
      title: "Người tạo",
      dataIndex: "userName",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "12%",
      render: (text, record) => {
        return (
          <div className="action">
            <EditIcon
              className="btn-edit"
              style={{ marginRight: "10px" }}
              // onClick={() => {
              //   onEditShow(record);
              // }}
            ></EditIcon>
            <DeleteIcon
              className="btn-delete"
              onClick={() => {
                onDeletePost(record);
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
    filter: inputSearch,
  });

  const fetchData = () => {
    setLoading(true);
    const param = qs.stringify(getRandomuserParams(tableParams));
    postService.getListPost(param).then((result) => {
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
    isDetailModal,
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
  const handleChange = (value) => {};

  const handleNewPost = () => {
    setAddNewModalOpen(true);
  };
  const handleCloseModal = () => {
    setAddNewModalOpen(false);
    setIsDetailModal(false);
  };

  const viewDetailPost = (record) => {
    setIsDetailModal(true);
    setDetailPost(record);
  };

  const onDeletePost = (record) => {
    confirm(`Bạn có chắc chắn muốn bài viết không!`) === true &&
      postService
        .removePost(record.postID)
        .then(() => {
          fetchData();
          toast.success("Xóa thành công", { autoClose: 1000 });
        })
        .catch(() => {
          toast.error("Xóa không thành công", { autoClose: 1000 });
        });
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
                Danh sách bài viết
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin tất cả bài viết
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm" onClick={handleReload}>
                Xem tất cả
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleNewPost}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm bài
                viết
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Search
                placeholder="Tìm kiếm bài viết"
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
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          style={{ padding: 24 }}
          scroll={{
            y: 500,
          }}
        />
      </Card>
      {isAddNewModalOpen && (
        <PostAddNew isOpen={isAddNewModalOpen} onClose={handleCloseModal} />
      )}

      {isDetailModal && (
        <DetailPost
          isOpen={isDetailModal}
          onClose={handleCloseModal}
          record={detailPost}
        />
      )}
    </>
  );
};

export default PostManage;
