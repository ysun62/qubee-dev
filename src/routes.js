import Index from "views/Index";
import Files from "views/Files";
import Folders from "views/Folders";
import Profile from "views/examples/Profile";
import Maps from "views/examples/Maps";
import Register from "views/examples/Register";
import Login from "views/examples/Login";
import Tables from "views/examples/Tables";
import Icons from "views/examples/Icons";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/files",
    name: "All Files",
    icon: "ni ni-folder-17 text-primary",
    component: Files,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/folder",
    name: "Folders",
    icon: "ni ni-folder-17 text-primary",
    component: Folders,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    invisible: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    invisible: false,
  },
];
export default routes;
