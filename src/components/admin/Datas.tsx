import AddTask from "./AddTask";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ManageTasks from "./ManageTasks";
import Plans from "./Plans";
import UserList from "./UsersList";

const navData = [
  { name: "Login", link: "login", page: <Login/> },
  { name: "Lo", link: "pagel", page: <></> },
  { name: "Page", link: "page", page: <></> },
  { name: "Dashboard", link: "dashboard", page: <Dashboard/> },
  { name: "Users", link: "users-list", page: <UserList/> },
  { name: "Add Task", link: "add-task", page: <AddTask/> },
  { name: "Manage Task", link: "manage-task", page: <ManageTasks/> },
  
  { name: "Add Videos", link: "add-vidoes", page: <AddTask/> },
  { name: "Manage videos", link: "manage-videos", page: <ManageTasks/> },
  
  { name: "Add Games", link: "add-games", page: <AddTask/> },
  { name: "Manage Games", link: "manage-games", page: <ManageTasks/> },
  

  { name: "Plans", link: "plans", page: <Plans/> },
];
export default navData;
