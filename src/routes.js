import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import DashboardPage from "views/Dashboard/Dashboard.js";
import Reporting from "views/Reporting/Reporting.js";
import Statistics from "views/Statistics/Statistics.js";
import Authentication from "views/Login/Login.js";
import Auth from "components/Auth/Auth.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    display: true,
  },
  {
    path: "/reporting",
    name: "Reporting",
    icon: "content_paste",
    component: Reporting,
    layout: "/admin",
    display: true,
  },
  {
    path: "/table",
    name: "Statistics",
    icon: BubbleChart,
    component: Statistics,
    layout: "/admin",
    display: true,
  },
  {
    path: "/login",
    name: "Authentication",
    icon: Person,
    component: Authentication,
    layout: "/admin",
    display: false,
  },
  {
    path: "/auth",
    name: "Auth",
    icon: Person,
    component: Auth,
    layout: "/admin",
    display: false,
  }
];

export default dashboardRoutes;
