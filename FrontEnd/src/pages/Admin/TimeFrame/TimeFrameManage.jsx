import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Select, Table, Input } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const { Search } = Input;
import qs from "qs";
import { useEffect, useState } from "react";
import TimeFrameAddNew from "./TimeFrameAddNew";
import { timeFrameService } from "../../../services/TimeFrameService";
const columns = [
  {
    title: "ID",
    dataIndex: "timeFrameID",
    sorter: true,
    width: "20%",
  },
  {
    title: "StartTime",
    dataIndex: "startTime",
    width: "20%",
  },
  {
    title: "EndTime",
    dataIndex: "endTime",
    width: "20%",
  },
  {
    title: "Sửa",
    dataIndex: "sua",
    render: () => (
      <a>
        <EditIcon></EditIcon>
      </a>
    ),
    width: "20%",
  },
  {
    title: "Xóa",
    dataIndex: "xoa",
    render: () => (
      <a>
        <DeleteIcon></DeleteIcon>
      </a>
    ),
    width: "20%",
  },
];
const getRandomuserParams = (params) => ({
  current: params.pagination?.current,
  pageSize: params.pagination?.pageSize,
});
const TimeFrameManage = () => {
  const [isAddNewModalOpen, setAddNewModalOpen] = useState(false);
  const handleNewMovie = () => {
    setAddNewModalOpen(true);
  };
  const handleCloseModal = () => {
    setAddNewModalOpen(false);
    fetchData();
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    const param = qs.stringify(getRandomuserParams(tableParams));
      timeFrameService.getListTimeFrame(param)
      .then(( result ) => {
        setData(result.data.items);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total:result.data.totalCount,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters) => {
    setTableParams({
      pagination,
      filters,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <>
      <Card className="h-full w-full !rounded-none !overflow-visible">
        <CardHeader floated={false} shadow={false} className="rounded-none p-3">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách TimeFrame
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin tất cả các TimeFrame
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
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
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
            <div className="w-full md:w-72">
              <Search
                placeholder="input search text"
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
          rowKey={(record) => record.timeFrameID}
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
        <TimeFrameAddNew
          isOpen={isAddNewModalOpen}
          onClose={handleCloseModal}
        ></TimeFrameAddNew>
      )}
    </>
  );
};
export default TimeFrameManage;
