import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Select, Table, Input } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const { Search } = Input;
import qs from "qs";
import { useEffect, useState } from "react";
import { applicationUserService } from "../../../services/ApplicationUserService";
import ModalUserEdit from "./ModalUserEdit";

const UserManage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [infoUser, setInfoUser] = useState();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
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
      title: "Username",
      dataIndex: "userName",
      width: "15%",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: "17%",
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
              onClick={() => {
                onEditUser(record);
              }}
            ></EditIcon>
            <DeleteIcon
              className="btn-delete"
              onClick={() => {
                onDeleteUser(record);
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
    applicationUserService.getListUser(param).then((result) => {
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
  }, [JSON.stringify(tableParams), isModalEditOpen, inputSearch]);

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

  const handleCloseModal = () => {
    setIsModalEditOpen(false);
  };

  const onEditUser = (record) => {
    setIsModalEditOpen(true);
    setInfoUser(record);
  };

  const onDeleteUser = () => {
    alert("Không thể xóa người dùng!");
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
                Danh sách người dùng
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin người dùng
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm" onClick={handleReload}>
                Xem tất cả
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Search
                placeholder="Tìm kiếm người dùng"
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
            y: 360,
          }}
        />
      </Card>

      {isModalEditOpen && (
        <ModalUserEdit
          record={infoUser}
          isOpen={isModalEditOpen}
          onClose={handleCloseModal}
          setIsModalEditOpen={setIsModalEditOpen}
        />
      )}
    </>
  );
};
export default UserManage;
