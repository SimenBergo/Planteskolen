import axios from 'axios';
//creating routes for public, gardeners and managers to the back end with axios
const all = axios.create({
    baseURL:  'https://planteskolen.herokuapp.com/all',
});
const gardener = axios.create({
    baseURL: 'https://planteskolen.herokuapp.com/gardener',
});
const manager = axios.create({
    baseURL: 'https://planteskolen.herokuapp.com/manager',
});

//sending request to back end with payload, headers for the protected routes, and id where needed
export const insertUser = payload => all.post(`/user`, payload);
export const login = payload => all.post(`/login`, payload);
export const forgotPassword = payload => all.post(`/forgotpassword`,payload);
export const resetPassword = payload => all.get(`/reset`, payload);
export const updatePasswordViaEmail = payload => all.patch(`/updatePasswordViaEmail`, payload);
export const getAllPlants = () => all.get(`/plants`);
export const getPlantById = id => all.get(`/plant/${id}`);
export const updatePlantById = (id, payload) => all.patch(`/plant/${id}`, payload);

export const updateUserById = (headers, id, payload) => gardener.patch(`/user/${id}`, payload, headers);
export const getUserById = (headers, id) => gardener.get(`/user/${id}`, headers);

export const getAllUsers = headers => manager.get(`/users`, headers);
export const deleteUserById = (headers, id) => manager.delete(`/user/${id}`, headers);
export const insertPlant = (headers, payload) => manager.post(`/plant`, payload, headers);
export const deletePlantById = (headers, id) => manager.delete(`/plant/${id}`, headers);

const apis = {
    insertUser,
    insertPlant,
    getAllUsers,
    getAllPlants,
    updateUserById,
    updatePlantById,
    deleteUserById,
    deletePlantById,
    getUserById,
    getPlantById,
    login,
    forgotPassword,
    resetPassword,
    updatePasswordViaEmail,
};

export default apis;