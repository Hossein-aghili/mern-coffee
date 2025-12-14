import { createBrowserRouter } from "react-router-dom";
import Layout from "./../Layout/index";
import Home from "../Pages/Home";
import Categories from "./../Pages/Categories/index";
import GetAllCategory from "./../Pages/Categories/GetAll/index";
import CreateCategory from "./../Pages/Categories/Create/index";
import UpdateCategory from "./../Pages/Categories/Update/index";
import Products from "./../Pages/Products/index";
import GetAllProduct from "./../Pages/Products/GetAll/index";
import CreateProduct from "./../Pages/Products/Create/index";
import UpdateProduct from "./../Pages/Products/Update/index";
import Blogs from "./../Pages/Blog/index";
import GetAllBlog from "./../Pages/Blog/GetAll/index";
import CreateBlog from "./../Pages/Blog/Create/index";
import UpdateBlog from "./../Pages/Blog/Update/index";
import Sliders from "./../Pages/Slider/index";
import GetAllSlider from "./../Pages/Slider/GetAll/index";
import CreateSlider from "./../Pages/Slider/Create/index";
import UpdateSlider from "./../Pages/Slider/Update/index";
import Users from "../Pages/Users";
import GetAllUser from "./../Pages/Users/GetAll/index";
import UpdateUser from "./../Pages/Users/Update/index";

const router = createBrowserRouter([
  // {
  //     path:'/login',
  //     // loader:checkLogin
  //     element:<Login/>
  // }
  {
    path: "/",
    // loader:chackAuth
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/category",
        element: <Categories />,
        children: [
          {
            index: true,
            element: <GetAllCategory />,
          },
          {
            path: "/create",
            element: <CreateCategory />,
          },
          {
            path: "/update/:id",
            element: <UpdateCategory />,
          },
        ],
      },
      {
        path: "/products",
        element: <Products />,
        children: [
          {
            index: true,
            element: <GetAllProduct />,
          },
          {
            path: "/create",
            element: <CreateProduct />,
          },
          {
            path: "/update/:id",
            element: <UpdateProduct />,
          },
        ],
      },
      {
        path: "/blogs",
        element: <Blogs />,
        children: [
          {
            index: true,
            element: <GetAllBlog />,
          },
          {
            path: "/create",
            element: <CreateBlog />,
          },
          {
            path: "/update/:id",
            element: <UpdateBlog />,
          },
        ],
      },
      {
        path: "/sliders",
        element: <Sliders />,
        children: [
          {
            index: true,
            element: <GetAllSlider />,
          },
          {
            path: "/create",
            element: <CreateSlider />,
          },
          {
            path: "/update/:id",
            element: <UpdateSlider />,
          },
        ],
      },
      {
        path: "/users",
        element: <Users />,
        children: [
          {
            index: true,
            element: <GetAllUser />,
          },
          {
            path: "/update/:id",
            element: <UpdateUser />,
          },
        ],
      },
    ],
  },
]);

export default router;
