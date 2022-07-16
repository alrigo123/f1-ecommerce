const functions = {}

functions.getTwoLetters = (user) => {
    const str = user || '';
    return str.toUpperCase().substring(0, 2)
}

functions.nickUser = (session_user) => {

    if (session_user === undefined) {
        nick_user = null;
    } else {
        nick_user = functions.getTwoLetters(session_user);
    }
    return nick_user;
}

module.exports = functions