import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import "./reset.css";
import "./App.css";
import Users from "./components/Users";
import UserService from "./services/UserService";
import UserDetail from "./components/UserDetail";

function App() {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  // Loading UserList function
  const loadUserList = useCallback(
    (page) => {
      setLoading(true);
      setTimeout(() => {
        UserService.getUsersList(page)
          .then((res) => {
            const newPage = page + 1;
            const newList = userList.concat(res);
            setUserList(newList);
            setPage(newPage);
            if (res.length === 0) setNoData(true);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 500);
    },
    [userList]
  );
  // Scroll Event if scroll is down ,it triggers load function
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        loadUserList(page);
      }
    }
  };

  // useEffect hook for UserList render
  useEffect(() => {
    loadUserList(page);
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route
          exact
          path="/my-app-swift"
          element={<Users userList={userList} />}
        />
        <Route
          path={`/my-app-swift/:id`}
          element={<UserDetail userList={userList} />}
        />
      </Routes>
      {loading ? (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
      {noData ? <div className="no-data-text">no data anymore ...</div> : ""}
    </div>
  );
}

export default App;
