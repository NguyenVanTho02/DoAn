import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  BookTicket,
  DetailPage,
  MovieManage,
  CinemaManage,
  ShowManage,
  TheaterManage,
  UserManage,
  ConfirmEmail,
  ShowtimesByTheater,
  Movies,
  News,
  Cinema,
  PriceTicket,
  HomeAdmin,
  PostManage,
  DetailPost,
} from "../pages/index";
import pathRoute from "../util/pathRoute";
import LayoutAuthentication from "../layouts/LayoutAuthentication";
import LayoutAdmin from "../layouts/AdminLayout/LayoutAdmin";
import SeatManage from "../pages/Admin/Seat/SeatManage";
import Thanks from "../pages/Bookticket/Thanks/Thank";
import UserInfo from "../pages/UserInfo/UserInfo";
import TicketManage from "../pages/Admin/Ticket/TicketManage";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
const router = createBrowserRouter([
  {
    path: pathRoute.HOME,
    element: <HomePage />,
  },
  {
    path: pathRoute.DETAIL,
    element: <DetailPage />,
  },
  {
    path: pathRoute.SIGNIN,
    element: <LayoutAuthentication />,
  },
  {
    path: pathRoute.ADMIN,
    element: <LayoutAdmin />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "movie-manage",
        element: <MovieManage />,
      },
      {
        path: "ticket-manage",
        element: <TicketManage />,
      },
      {
        path: "cinema-manage",
        element: <CinemaManage />,
      },
      {
        path: "post-manage",
        element: <PostManage />,
      },
      {
        path: "show-manage",
        element: <ShowManage />,
      },
      {
        path: "theater-manage",
        element: <TheaterManage />,
      },
      {
        path: "seat-manage",
        element: <SeatManage />,
      },
      {
        path: "user-manage",
        element: <UserManage />,
      },
    ],
  },
  {
    path: pathRoute.BOOKTICKETS,
    element: <BookTicket />,
  },
  {
    path: pathRoute.USERINFO,
    element: <UserInfo />,
  },
  {
    path: pathRoute.CONFIRMEMAIL,
    element: <ConfirmEmail />,
  },
  {
    path: pathRoute.SHOWTIMESBYTHEATER,
    element: <ShowtimesByTheater />,
  },
  {
    path: pathRoute.MOVIES,
    element: <Movies />,
  },
  {
    path: pathRoute.NEWS,
    element: <News />,
  },
  {
    path: pathRoute.DETAILPOST,
    element: <DetailPost />,
  },
  {
    path: pathRoute.CINEMA,
    element: <Cinema />,
  },
  {
    path: pathRoute.PRICETICKET,
    element: <PriceTicket />,
  },
  {
    path: pathRoute.Thanks,
    element: <Thanks />,
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
