import { useEffect, useState } from "react";
import AuthService from "../../api/auth/AuthService";
import { UserType } from "../../types/user";
import "./navbar.scss";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<UserType>({
    user_id: 0,
    name: "",
    mail: "",
    role: "",
    accessToken: "",
  });
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user: UserType = await AuthService.getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);
  return (
    <div className="navbar">
      <div className="logo">
        <img src="helloc.png" width="32px" height="32px" alt="" />
        <span>Hello C</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <span>{currentUser.name}</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
