const TokenKey = 'Admin-Token';
const UserIdKey = 'userId'
export const getToken = () => {
    return sessionStorage.getItem(TokenKey)
}

export const getUserId = () => {
    return sessionStorage.getItem(UserIdKey)
}