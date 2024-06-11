import React from "react";
import Header from "../../layouts/MainLayout/Header/Header";
import Footer from "../../layouts/MainLayout/Footer";
import { ListMovieCommingSoon, ListMovieShowNow } from "../../components";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const Movies = () => {
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
    <div className="mt-[100px]">
      <Header />
      <Tabs
        value="dangchieu"
        className="flex justify-center flex-col items-center opacity-100 transition-all font-sans max-w-[1120px] mx-auto"
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
      <Footer />
    </div>
  );
};

export default Movies;
