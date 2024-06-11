import ModalTrailer from "../../components/ModalTrailer/ModalTrailer";
import { ListMovieCommingSoon, ListMovieShowNow } from "../../components";
import Footer from "../../layouts/MainLayout/Footer";
import Header from "../../layouts/MainLayout/Header/Header";
import Carousel from "./Carousel/Carousel";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
const HomePage = () => {
  const data = [
    {
      label: "Đang Chiếu",
      value: "dangchieu",
      desc: <ListMovieShowNow />,
    },
    {
      label: "Sắp Chiếu",
      value: "sapchieu",
      desc: <ListMovieCommingSoon />,
    },
  ];

  return (
    <>
      <Header></Header>
      <div>
        <div className="h-[72px]"></div>
        <Carousel></Carousel>

        <Tabs
          value="dangchieu"
          className="flex justify-center flex-col items-center mt-8 opacity-100 transition-all font-sans"
        >
          <TabsHeader
            className="bg-[#1976d2]"
            indicatorProps={{
              className: "bg-[#1976d2] shadow-none !text-gray-900",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                className="w-[240px] h-10 text-xl text-white"
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>

          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>

        <ModalTrailer></ModalTrailer>
        <Footer></Footer>
      </div>
    </>
  );
};

export default HomePage;
