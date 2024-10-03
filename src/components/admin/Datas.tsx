import AddTask from "./AddTask";
import AddVideo from "./AddVideo";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Logout from "./Logout";
import ManageTasks from "./ManageTasks";
import Plans from "./Plans";
import Requests from "./Request";
import UserList from "./UsersList";

const navData = [
  { name: "Login", link: "login", page: <Login/> },
  { name: "Logout", link: "pagel", page: <></> },
  { name: "Page", link: "page", page: <></> },
  { name: "Dashboard", link: "dashboard", page: <Dashboard/> },
  { name: "Users", link: "users-list", page: <UserList/> },
  { name: "Add Task", link: "add-task", page: <AddTask/> },
  { name: "Manage Task", link: "manage-task", page: <ManageTasks/> },
  { name: "Add Videos", link: "add-vidoes", page: <AddVideo/> },
  { name: "Manage videos", link: "manage-videos", page: <ManageTasks/> },
  { name: "Add Games", link: "add-games", page: <AddTask/> },
  { name: "Manage Games", link: "manage-games", page: <ManageTasks/> },
  { name: "Requests", link: "requests", page: <Requests/> },
  { name: "Plans", link: "plans", page: <Plans/> },
  { name: "Logout", link: "logout", page: <Logout/> },
];
export default navData;
