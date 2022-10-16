import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    const { loggedIn, userData, loggedOut } = props
    const location = useLocation();


    return (
        //Если пользователь авторизован выводит этот блок
        <>
            {loggedIn &&
                <>
                    <header className="header">
                        <div className="header__nav_logo">
                            <div className="header__logo"></div>

                        </div>
                        <div className="header__nav">
                            <p className="header__nav-email">{userData.email}</p>
                            <button onClick={loggedOut} className="header__link_type_out" type="submit">Выйти</button>
                        </div>
                    </header >
                </>
            }
            {/* Если пользователь не авторизован выводит этот блок */}
            {
                !loggedIn && location.pathname === '/sign-in' &&
                <header className="header_type_sign">
                    <div className="header__logo"></div>
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                </header >
            }

            {!loggedIn && location.pathname === '/sign-up' &&
                <header className="header_type_sign">
                    <div className="header__logo"></div>
                    <Link to="/sign-in" className="header__link">Войти</Link>
                </header >
            }

        </>
    )
}
export default Header;