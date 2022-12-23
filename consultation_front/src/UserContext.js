import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    token: "",
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
  });

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
  
    return remainingDuration;
  };

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    // const storedExpirationDate = localStorage.getItem("expirationTime");
    // const storedAdmin = localStorage.getItem("admin");
  
    // const remainingTime = calculateRemainingTime(storedExpirationDate);
  
    // if (remainingTime <= 0) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("expirationTime");
    //   // localStorage.removeItem("admin");
    //   return null;
    // }
  
    return {
      token: storedToken,
      //infinite
      duration: 3600000,
      // admin: storedAdmin,
    };
  };
  
let logoutTimer;
export const UserProvider = ({ children }) => {
    const tokenData = retrieveStoredToken();

  let initialToken;
  // let initialAdmin;
  if (tokenData) {
    initialToken = tokenData.token;
    // initialAdmin = tokenData.admin;
  }

  // const [token, setToken] = useState(localStorage.getItem("token"));
  // const [admin, setAdmin] = useState(localStorage.getItem("admin"));

  const [token, setToken] = useState(initialToken);
  // const [admin, setAdmin] = useState(initialAdmin);
  const loginState = !!token;

  const logoutHandler = () => {
    console.log("Logout is called");
    setToken(null);
    // setAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    // localStorage.removeItem("admin");
    localStorage.removeItem("user");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token) => {
    // console.log("Login is called");
    setToken(token);
    // setAdmin(admin);
    localStorage.setItem("token", token);
    // localStorage.setItem("expirationTime", expirationTime);
    // localStorage.setItem("admin", admin);
    // const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, 3600000);
  };

  useEffect(() => {
    if (tokenData) {
    //   console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: loginState,
    // isAdmin: admin,
    login: loginHandler,
    logout: logoutHandler,
  };
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
