export const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// Auth
export const AUTH_REG_API_URL = `${BASE_API_URL}/auth/register`
export const AUTH_LOGIN_API_URL = `${BASE_API_URL}/auth/login`
// Products
export const PRODUCTS_API_URL = `${BASE_API_URL}/product`
// FAVORITE
export const FAVORITE_API_URL = `${BASE_API_URL}/favorite`
// Application
export const APPLICATION_API_URL = `${BASE_API_URL}/application`
export const APPLICATION_DEALERSHIP_API_URL = `${APPLICATION_API_URL}/dealership`
// Profile
export const PROFILE_API_URL = `${BASE_API_URL}/profile`
export const PROFILE_AVATAR_API_URL = `${PROFILE_API_URL}/avatar`
export const PROFILE_PASS_API_URL = `${PROFILE_API_URL}/password`
