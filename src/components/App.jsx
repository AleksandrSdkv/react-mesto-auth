import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletedCardPopup from './DeletedCardPopup';
import ImagePopup from './ImagePopup';
// import InfoTooltip from './InfoTooltip';
import { api } from '../utils/Api';
import * as AuthApi from '../utils/AuthApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState('');
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState('');
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState('');
    // const [isEditConfirmPopupOpen, setIsEditConfirmPopupOpen] = useState('');
    const [isCardPopupOpen, setisCardPopupOpen] = useState('');
    const [isDeletedCardPopupOpen, setIsDeletedCardPopupOpen] = useState('');
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = useState({ name: '', link: '' });
    const [cards, setCards] = useState([]);
    const [deleteCard, setDeleteCard] = useState();

    useEffect(() => {
        const initialPromises = Promise.all([
            api.getUserData(),
            api.getUserCards(),
        ]);

        initialPromises
            .then(([data, item]) => {
                setCurrentUser(data);
                setCards(item)

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCardClick(card) {
        setisCardPopupOpen('popup_opened');
        setSelectedCard(card);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen('popup_opened');
    };

    function handleDeletedCardClick() {
        setIsDeletedCardPopupOpen('popup_opened');
    };
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen('popup_opened');
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen('popup_opened');
    };
    function closeAllPopups() {
        setisCardPopupOpen('');
        setSelectedCard({ name: '', link: '' })
        setIsEditProfilePopupOpen('');
        setIsAddPlacePopupOpen('');
        setIsEditAvatarPopupOpen('');
        setIsDeletedCardPopupOpen('');
    };
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(err);
        });
    }


    function handleUpdateUser(dataState) {
        api.setUserData(dataState)
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => closeAllPopups());
    }
    function handleUpdateAvatar(userAvatar) {
        api.setAvatarData(userAvatar)
            .then((userAvatarServer) => {
                setCurrentUser(userAvatarServer)

            })
            .catch((err) => { console.log(err) }).finally(() => closeAllPopups());
    };
    function handleAddPlaceSubmit(card) {
        api.pushNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => closeAllPopups())
    }

    function handleDeleteCardId(deleteCard) {
        setDeleteCard(deleteCard);
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((deletedCard) => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch((err) => { console.log(err) }).finally(() => closeAllPopups());
    }

    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ email: '' });



    const handleLogin = (password, email) => {
        return AuthApi.login(password, email).then((data) => {
            if (!data.token) throw new Error('Нет jwt');
            localStorage.setItem('jwt', data.token);

            setLoggedIn(true)

            history.push('/');
        });
    }

    const history = useHistory();

    function checkToken() {
        const token = localStorage.getItem('jwt');
        if (!token) return;

        return AuthApi.checkTokenValid(token)
            .then((data) => {

                setLoggedIn(true);
                setUserData({
                    email: data.data.email
                })
                console.log(data)
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                // openInfoTooltipPopup(false)
            })

    };
    useEffect(() => {
        checkToken();
    }, [])

    const handleRegister = (password, email) => {
        AuthApi.register(password, email);
        history.push('/sign-in');
    }

    return (
        <>

            <Switch>

                <Route path="/sign-up">
                    <Register onRegister={handleRegister} />
                </Route>
                <Route path="/sign-in">
                    {/* <InfoTooltip
                        onClose={closeAllPopups}
                    /> */}
                    <Login onLogin={handleLogin} />
                </Route>
                <Route path="/">


                    <CurrentUserContext.Provider value={currentUser}>
                        <Header
                            userEmail={userData}
                            nameLink='Выйти'
                            classLink="_type_out"
                            link='sign-in'

                        />


                        <ProtectedRoute

                            loggedIn={loggedIn}
                            path="/"
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onTrashClick={handleDeletedCardClick}
                            onCardDelete={handleDeleteCardId}
                        />
                        <Footer />
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit}
                        />
                        <DeletedCardPopup
                            isOpen={isDeletedCardPopupOpen}
                            onClose={closeAllPopups}
                            onDeletePlace={handleCardDelete}

                            deleteCard={deleteCard}
                        />
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar} />
                        <ImagePopup
                            onClose={closeAllPopups}
                            card={selectedCard}
                            isOpen={isCardPopupOpen === 'popup_opened'}
                        />

                    </CurrentUserContext.Provider>
                </Route>

            </Switch>
        </>
    );
}

export default App;