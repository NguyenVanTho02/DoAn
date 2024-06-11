import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { Select, Table } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import SeatAddNew from "./SeatAddNew";
import { cinemaService } from "../../../services/CinemaService";
import { cityService } from "../../../services/CityService";
import { theaterService } from "../../../services/TheaterService";
import { seatService } from "../../../services/SeatService";
import SeatEdit from "./SeatEdit";

const SeatManage = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "seatID",
      width: 150,
    },
    {
      title: "Tên Ghế",
      dataIndex: "seatName",
      width: 150,
    },
    {
      title: "Id phòng chiếu",
      dataIndex: "theaterID",
      width: 150,
    },
    {
      title: "Kiểu ghế",
      dataIndex: "seatType",
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
                onEditSeat(record);
              }}
            ></EditIcon>
            <DeleteIcon
              className="btn-delete"
              onClick={() => {
                // onDeleteShow(record);
              }}
            ></DeleteIcon>
          </div>
        );
      },
    },
  ];
  const [isAddNewModalOpen, setAddNewModalOpen] = useState(false);
  const [data, setData] = useState();
  const [cites, setCities] = useState();
  const [cinemas, setCinemas] = useState();
  const [theaters, setTheaters] = useState();
  const [valueCity, setValueCity] = useState(0);
  const [valueCinema, setValueCinema] = useState(0);
  const [valueTheater, setValueTheater] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [edittingSeat, setEdittingSeat] = useState();

  const handleNewMovie = () => {
    setAddNewModalOpen(true);
  };
  const handleCloseModal = () => {
    setAddNewModalOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const getDataCity = () => {
    cityService.getListCity().then((result) => {
      setCities(result.data);
    });
  };
  const getCinemaByCity = (values) => {
    cinemaService.getCinemaByCity(values).then((result) => {
      setCinemas(result.data.data);
    });
  };
  const getTheaterByCinema = (values) => {
    theaterService.getTheaterByCinema(values).then((result) => {
      setTheaters(result.data);
    });
  };
  useEffect(() => {
    getDataCity();
  }, []);
  useEffect(() => {
    getCinemaByCity(valueCity);
  }, [valueCity]);

  useEffect(() => {
    getTheaterByCinema(valueCinema);
  }, [valueCinema]);
  const onSelectCity = (value) => {
    setValueCity(value);
  };

  const onSelectCinema = (value) => {
    setValueCinema(value);
  };

  const onSelectTheater = (value) => {
    setValueTheater(value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const fetchData = () => {
    setLoading(true);
    seatService.getListSeatByTheater(valueTheater).then((result) => {
      setData(result.data.data);
      setLoading(false);
    });
  };
  const handleSearchListSeat = () => {
    fetchData();
  };
  const handleEditSeat = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditSeat = () => {
    setIsEditModalOpen(false);
    fetchData();
  };
  const onEditSeat = (record) => {
    handleEditSeat();
    setEdittingSeat(record);
  };
  return (
    <>
      <Card className="h-full w-full !rounded-none !overflow-visible">
        <CardHeader floated={false} shadow={false} className="rounded-none p-3">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách ghế theo phòng chiếu
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem thông tin tất cả các ghế của phòng chiếu
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
              showSearch
              placeholder="Chọn Tỉnh/Thành phố"
              onSelect={onSelectCity}
              filterOption={filterOption}
              style={{
                width: 200,
              }}
              options={cites?.map((city) => ({
                value: city.cityID,
                label: city.cityName,
              }))}
            />
            <Select
              showSearch
              placeholder="Chọn rạp chiếu phim"
              onChange={onSelectCinema}
              filterOption={filterOption}
              style={{
                width: 200,
              }}
              options={cinemas?.map((item) => ({
                value: item.cinemaID,
                label: item.cinemaName,
              }))}
            />
            <Select
              showSearch
              placeholder="Chọn phòng chiếu"
              onChange={onSelectTheater}
              filterOption={filterOption}
              style={{
                width: 200,
              }}
              options={theaters?.map((item) => ({
                value: item.theaterID,
                label: item.theaterName,
              }))}
            />

            <div className="w-full md:w-72">
              <Button
                variant="outlined"
                size="sm"
                onClick={handleSearchListSeat}
              >
                Tìm kiếm
              </Button>
            </div>
          </div>
        </CardHeader>
        <Table
          columns={columns}
          rowKey={(record) => record.seatID}
          dataSource={data}
          // pagination={tableParams.pagination}
          loading={loading}
          style={{ padding: 24 }}
          scroll={{
            y: 360,
          }}
        />
      </Card>
      {isAddNewModalOpen && (
        <SeatAddNew
          isOpen={isAddNewModalOpen}
          onClose={handleCloseModal}
        ></SeatAddNew>
      )}
      {isEditModalOpen && (
        <SeatEdit
          isOpen={isEditModalOpen}
          record={edittingSeat}
          onClose={handleCloseEditSeat}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </>
  );
};
export default SeatManage;
