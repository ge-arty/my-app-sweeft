export default function UserDetailPersonal(props) {
  // UserDetail template component
  return (
    <div className="user-detail-box">
      <img src={props.imgUrl} alt="user-icon" />
      <div className="user-info-box">
        <h3 className="box-title">Title</h3>
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
          <span>{props.prefix}</span>
          <span style={{ marginLeft: "5px" }}>{props.name}</span>
          <span style={{ marginLeft: "5px" }}>{props.lastName}</span>
        </p>

        <ul>
          <li>
            <span className="underline">Email:</span>
            {props.email}
          </li>
          <li>
            <span className="underline">Ip Address:</span>
            {props.ip}
          </li>
          <li>
            <span className="underline">Ip Address:</span>
            {props.ip}
          </li>
          <li>
            <span className="underline">Job Area:</span>
            {props.jobArea}
          </li>
          <li>
            <span className="underline">Job Type:</span>
            {props.jobType}
          </li>
        </ul>
      </div>
      <div className="user-address-box">
        <h3 className="box-title">Address</h3>
        <strong style={{ fontWeight: "bold" }}>{props.company}</strong>
        <ul>
          <li>
            <span className="underline">City:</span>
            {props.city}
          </li>
          <li>
            <span className="underline">Country:</span>
            {props.country}
          </li>
          <li>
            <span className="underline">State:</span>
            {props.state}
          </li>
          <li>
            <span className="underline">Street Address:</span>
            {props.streetAddress}
          </li>
          <li>
            <span className="underline">ZIP:</span>
            {props.zipCode}
          </li>
        </ul>
      </div>
    </div>
  );
}
