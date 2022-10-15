class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;

    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getUserData() {
        return fetch(`${this._url}/users/me`, { headers: this._headers })
            .then(this._getResponseData)
    }
    getUserCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers })
            .then(this._getResponseData)
    }
    setUserData(data) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._getResponseData)
    }
    setAvatarData(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._getResponseData)
    }
    pushNewCard(data) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._getResponseData)

    }

    deleteCard(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}`, {
            headers: this._headers,
            method: 'DELETE',
        }).then(this._getResponseData)
    }

    changeLikeCardStatus(cardID, isLiked) {
        if (isLiked) {
            return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}/likes`, {
                    headers: this._headers,
                    method: 'PUT',
                })
                .then(this._getResponseData)
        } else {
            return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}/likes`, {
                    headers: this._headers,
                    method: 'DELETE',
                })
                .then(this._getResponseData)
        }
    }
}
const apiConfig = {
    url: "https://mesto.nomoreparties.co/v1/cohort-48",
    headers: {
        authorization: '25ce2e8c-2a55-4b07-a594-407cca6a6dd7',
        "content-type": "application/json"
    }
};
export const api = new Api(apiConfig);