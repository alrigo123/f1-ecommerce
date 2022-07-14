const functions = {}

functions.getTwoLetters = (user) => {
    return user.toUpperCase().substring(0, 2) 
}

module.exports = functions