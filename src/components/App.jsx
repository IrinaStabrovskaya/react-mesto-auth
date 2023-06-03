import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import PopupEditProfile from "./PopupWithForm/PopupEditProfile";
import PopupAddCard from "./PopupWithForm/PopupAddCard";
import PopupUpdateAvatar from "./PopupWithForm/PopupUpdateAvatar";
import PopupConfirm from "./PopupWithForm/PopupConfirm";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import { api } from "./../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login";
import  Register  from "./Register";
import ProtectedRoute  from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (cardData) => {
    setIsImagePopupOpen(true);
    setSelectedCard(cardData);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card.cardId, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.cardId ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card.cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card.cardId));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    return api
      .setInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    return api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddNewCard = (data) => {
    setIsLoading(true);
    return api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    api
      .getInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialsCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>    
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/sign-in" replace /> : <Navigate to="/main" replace /> } />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/main" element={<ProtectedRoute element={Main}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        isLoggedIn={isLoggedIn}
        />} 
        /> 
        <Route path="*" element={<Register />} />       
      </Routes>
      <Footer />
      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <PopupAddCard
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddNewCard={handleAddNewCard}
        isLoading={isLoading}
      />
      <PopupUpdateAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <PopupConfirm />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip 
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
