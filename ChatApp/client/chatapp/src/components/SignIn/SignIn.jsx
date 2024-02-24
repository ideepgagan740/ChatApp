import React, { useEffect, useState } from "react";
import BackendService from "../../service/service";
import ChatPage from "../ChatBox/chatbox";
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log("Signing in with:", email, password);
    let formData = {
      email: email,
      password: password,
    };
    checkLogin(formData)
  }

  const checkLogin=async(formData)=>{
    let response = await BackendService.signIn(formData);
    console.log(response);
    if (response.data.code === 200) {
      let username=response.data.data[0].user_email
      let password=response.data.data[0].user_pass
      BackendService.userLogged.name = response.data.data[0].first_name;
      BackendService.userLogged.userId = response.data.data[0]._id;
      const credentials = JSON.stringify({ username, password });
      localStorage.setItem("credentials", credentials);
      setLoginSuccess(true);
      BackendService.loginSuccess.value=true
      console.log("Gagan",BackendService.loginSuccess.value)
      navigate('/signin');  
    }
  }
  useEffect(()=>{
    const storedCredentials = localStorage.getItem('credentials');
    if(storedCredentials){

      const credentials = JSON.parse(storedCredentials);
      if(credentials && credentials.username && credentials.password ){
        
        let formData = {
          email: credentials.username,
          password: credentials.password,
        };
        checkLogin(formData)
      }
    }
  },[])

  return !loginSuccess ? (
    <>
      <div className="container m-auto flex items-center justify-center font-bold">
        <form onSubmit={handleSignIn}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className=" bg-indigo-600" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </>
  ) : (
    <ChatPage />
  );
};

export default SignIn;
