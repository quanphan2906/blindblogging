export const PORT = "http://localhost:5000";

const endpoints = {
    REGISTER_USER: () => `${PORT}/api/users/register`,
    LOGIN_USER: () => `${PORT}/api/users/login`,
    GET_PROFILES: () => `${PORT}/api/users/profiles`,
    GET_PROFILE_ID: (id) => `${PORT}/api/users/profile/${id}`,
    PUT_PROFILE: () => `${PORT}/api/users/profile`,
    GET_POSTS: () => `${PORT}/api/posts/`,
    CREATE_POST: () => `${PORT}/api/posts/create`,
    GET_POST_ID: (id) => `${PORT}/api/posts/${id}`,
    PUT_POST_ID: (id) => `${PORT}/api/posts/${id}`,
    GET_COMMENTS: (postId) => `${PORT}/api/comments/${postId}`,
    GET_IMAGE: (fileUrl) => `${PORT}/api/${fileUrl}`,
};

export default endpoints;
