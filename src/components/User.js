export default function User(props) {
  // User template
  return (
    <div onClick={props.onClick} className="user-container">
      <img src={props.imgUrl} alt="user-pic" />
      <div className="user-text-info">
        <span>{props.prefix}</span>
        <span>{props.name}</span>
        <span>{props.lastName}</span>
      </div>
      <p>{props.title}</p>
    </div>
  );
}
