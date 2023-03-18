import "./Users.css";
import User from "./User";
import { useNavigate } from "react-router-dom";
// Users temaplate component
export default function Users(props) {
  // useNavigate hook for button navigatio + for catching id
  let navigate = useNavigate();
  return (
    <>
      <div className="users-container">
        {props.userList.map((data, index) => (
          <User
            key={index}
            imgUrl={data.imageUrl}
            prefix={data.prefix}
            name={data.name}
            lastName={data.lastName}
            title={data.title}
            onClick={() => navigate(`/my-app-swift/${data.id}`)}
          />
        ))}
      </div>
    </>
  );
}
