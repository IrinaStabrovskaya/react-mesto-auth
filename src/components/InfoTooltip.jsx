import Popup from "./Popup";

const InfoTooltip = (props) => {
    
    <Popup
        name={props.name}
      isOpen={props.isOpen}
      onClose={props.onClose}
            >
        <img className="infoTooltip__image" src="../images/registerOk.png" alt="изображение удачной регистрации" />
        <p className="infoTooltip__text">Вы успешно зарегистрировались!</p>

    </Popup>
}
export default InfoTooltip;