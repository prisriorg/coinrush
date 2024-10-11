import AddGame from "./AddGame";
import AddTask from "./AddTask";
import AddVideo from "./AddVideo";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Logout from "./Logout";
import ManageGame from "./ManageGame";
import ManageTasks from "./ManageTasks";
import ManageVideo from "./ManageVideo";
import Plans from "./Plans";
import Requests from "./Request";
import UserList from "./UsersList";
import Verification from "./Verification";
import WithdrawList from "./WithdrawList";

const navData = [
  { name: "Login", link: "login", page: <Login/> },
  { name: "Verification", link: "verification", page: <Verification/> },
  { name: "Page", link: "page", page: <></> },
  { name: "Dashboard", link: "dashboard", page: <Dashboard/> },
  { name: "Users", link: "users-list", page: <UserList/> },
  { name: "Add Task", link: "add-task", page: <AddTask/> },
  { name: "Manage Task", link: "manage-task", page: <ManageTasks/> },
  { name: "Add Videos", link: "add-vidoes", page: <AddVideo/> },
  { name: "Manage videos", link: "manage-videos", page: <ManageVideo/> },
  { name: "Add Games", link: "add-games", page: <AddGame/> },
  { name: "Manage Games", link: "manage-games", page: <ManageGame/> },
  { name: "Withdraw", link: "withdraw", page: <WithdrawList/> },
  { name: "Requests", link: "requests", page: <Requests/> },
  { name: "Plans", link: "plans", page: <Plans/> },
  { name: "Logout", link: "logout", page: <Logout/> },
];
export default navData;
