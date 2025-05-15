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
// Dealership
export const DEALRESHIP_API_URL = `${BASE_API_URL}/dealership`

// URL IMAGE
export const deafultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSgg4wujbDMjXW-j-Oly3oPsMJXrfuHeVbg&s'
export const defaultAvatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&s'

// Domain image url
export const DOMAIN_IMAGE_URL_ONE = process.env.NEXT_PUBLIC_ACCESS_GET_IMAGE_DOMAIN_ONE || 'encrypted-tbn0.gstatic.com'
export const DOMAIN_IMAGE_URL_TWO = process.env.NEXT_PUBLIC_ACCESS_GET_IMAGE_DOMAIN_TWO || 'cdn.example.com'
export const DOMAIN_IMAGE_URL_THREE = process.env.NEXT_PUBLIC_ACCESS_GET_IMAGE_DOMAIN_THREE || 'images.unsplash.com'
