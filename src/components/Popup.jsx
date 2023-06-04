const Popup = (props) => {
  return (
    <div
      className={`pop-up pop-up_type_${props.name} ${
        props.isOpen ? `pop-up_opened` : " "
      }`}
    >
      <div
        className={`pop-up__container pop-up__container_type_${props.nameContainer}`}
      >
        <button
          className="pop-up__close-btn btn-hover"
          type="button"
          onClick={props.onClose}
        ></button>
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
