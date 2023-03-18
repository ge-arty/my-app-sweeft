import React, { useCallback, useState, useEffect } from "react";
import "./UserDetail.css";
import UserDetailPersonal from "./UserDetailPersonal";
import User from "./User";
import UserService from "../services/UserService";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function UserDetail() {
  const navigate = useNavigate();
  // Catching clicked user ID
  const { id: urlId } = useParams();
  // Setting it as id variable
  const [id, setId] = useState(urlId);

  const [userData, setUserData] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [page, setPage] = useState(1);
  const [newPage, setNewPage] = useState(0);
  const [userHistory, setUserHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  // Loading Friend List
  const loadFriendList = useCallback(
    (page) => {
      setLoading(true);
      setTimeout(() => {
        UserService.getFriendList(id, page)
          .then((res) => {
            setNewPage(page + 1);
            const newList = friendList.concat(res);
            setFriendList(newList);
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
    [friendList]
  );
  // Scroll event same as in App component
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        loadFriendList(id, page);
      }
    }
  };

  // Friend List loading func
  const loadUserInfo = useCallback(async (id) => {
    try {
      const user = await UserService.getUser(id);
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    loadUserInfo(id);
    loadFriendList(page);
  }, [id]);

  // Reseting  everything to rerender friendlist
  const handleClick = function (id) {
    setId(id);
    navigate(`/my-app-swift/${id}`);
    const userExists = userHistory.some((user) => user.id === userData.id);
    if (!userExists) {
      setUserHistory([...userHistory, userData]);
      setFriendList([]);
      setPage(1);
      setNewPage(0);
    }
  };

  return (
    <div className="user-detail-container">
      {userData ? (
        <UserDetailPersonal
          imgUrl={userData.imageUrl + "?v" + userData.id}
          prefix={userData.prefix}
          name={userData.name}
          lastName={userData.lastName}
          email={userData.email}
          ip={userData.ip}
          jobArea={userData.jobArea}
          jobType={userData.jobType}
          company={userData.company.name}
          city={userData.address.city}
          country={userData.address.country}
          state={userData.address.state}
          streetAddress={userData.address.streetAddress}
          zipCode={userData.address.zipCode}
        />
      ) : (
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
      )}
      <div className="user-story-container">
        {userHistory.map((user, index) => {
          return (
            <Link
              style={{ textDecoration: "underline ", color: "#0000EE" }}
              key={index}
              onClick={() => handleClick(user.id)}
              to={`/my-app-swift/${user.id}`}
            >
              {user.prefix}
              {user.name}
              {user.lastName}
            </Link>
          );
        })}
      </div>
      <h3 className="friends-title">FRIENDS:</h3>
      <div className="friends-container">
        {friendList.map((friend, index) => {
          if (friend.id !== id)
            return (
              <User
                key={index}
                id={friend.id}
                imgUrl={friend.imageUrl}
                prefix={friend.prefix}
                name={friend.name}
                lastName={friend.lastName}
                title={friend.title}
                onClick={() => handleClick(friend.id, friend.name)}
              />
            );
        })}
      </div>
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
      {noData ? <div>no data anymore ...</div> : ""}
    </div>
  );
}
