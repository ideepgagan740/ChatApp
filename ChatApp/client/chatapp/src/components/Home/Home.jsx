import React, { useEffect,useState } from "react";
import { Outlet, Link } from "react-router-dom";
import BackendService from "../../service/service";
// import SignIn from "../SignIn/SignIn";
// import SignUp from "../SignUp/SignUp";
const Home = () => {
  const [login, setLogin] = useState(BackendService.loginSuccess.value);
  useEffect(()=>{
    console.log("lOGIN",BackendService)
  })
  return (
    <>
      <div className="">
        <div className="">
          ChatApp
        </div>
        <div>
    </div>
        <div className="">
          {login ?(<></>):(
          <div className="">
            <ul className="">
              <li className="p-2">
                <Link to="/SignIn">
                  <button className="m-2 h-10">SignIn</button>
                </Link>
              </li>
              <li className="p-2">
                <Link to="/SignUp">
                  <button className="m-2 h-10">SignUp</button>
                </Link>
              </li>
            </ul>
          </div>)}
        </div>
        <div className="">
            <Outlet />
          </div>
      </div>
    </>
  );
};

export default Home;
