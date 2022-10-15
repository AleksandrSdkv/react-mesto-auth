// import confirmNo from '../image/img-confirm-NO.png';
import confirmYes from '../image/img-confirm-OK.png';
function InfoTooltip(props) {

    const { isClose } = props;
    return (
        <div className='popup popup_type_confirm popup_opened'>
            <div className="popup__container popup__container_type_confirm">

                {/* <img className="popup__tooltip" alt='Неудачно' src={confirmNo} />
                <button className="popup__button-close popup__close" type="button" ></button>
                <h2 className="popup__title">Что-то пошло не так!Попробуйте ещё раз.</h2> */}

                <img className="popup__tooltip" alt='Удачно' src={confirmYes} />
                <button onClick={isClose} className="popup__button-close popup__close" type="button" ></button>
                <h2 className="popup__title">Вы успешно зарегистрировались!</h2>

            </div>
        </ div >
    )
}
export default InfoTooltip;