const MyCard = ({title, children}) => {
  return (
    <div className="card border-default mt-3">
      <div className="card-header">
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default MyCard;
