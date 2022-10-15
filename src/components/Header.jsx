import { Link } from 'react-router-dom';
function Header(props) {
    const { nameLink, link, classLink, userEmail } = props


    return (
        <header className="header">
            <a href="#" className="header__logo"></a>
            <div className="header__nav">
                <p className="header__nav-email">{userEmail.email}</p>
                <Link to={link} className={`header__link${classLink}`}>{nameLink}</Link></div>
        </header>)
}
export default Header;