import axios from "axios";
import { BASE_API_URL, getAuthHeader } from "./con-utils";

export const placeOrder = ({ authToken, products, userId }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .post(BASE_API_URL + `order/${userId}`, { products }, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const getOrders = ({ authToken, userId }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .get(BASE_API_URL + `order/user/${userId}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const getAllOrders = ({ authToken }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .get(BASE_API_URL + `order`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const updateOrderStatus = ({ authToken, orderId, status }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .put(BASE_API_URL + `order/${orderId}/${status}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};
