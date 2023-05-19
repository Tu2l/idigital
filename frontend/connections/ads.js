import axios from "axios";
import { BASE_API_URL, getAuthHeader } from "./con-utils";

export const getAd = ({ authToken, aid }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .get(BASE_API_URL + `ad/${aid}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const getAdsByUser = ({ authToken, userId, page = -1 }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .get(BASE_API_URL + `ad/user/${userId}/${page}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const getAds = ({ authToken }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .get(BASE_API_URL + `ad`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const postAd = ({ authToken, ad }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .post(BASE_API_URL + "ad", ad, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const updateAd = ({ authToken, ad, adId }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .put(BASE_API_URL + `/${adId}`, ad, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const getAdsBy = ({ authToken, order, sort, page = -1 }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .get(BASE_API_URL + `ad/sort/${sort}/${order}/${page}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const getAdsByStatus = ({ authToken, status, page = -1 }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .get(BASE_API_URL + `ad/status/${status}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const acceptAd = ({ authToken, adId }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .post(BASE_API_URL + `ad/accept/${adId}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};

export const rejectAd = ({ authToken, adId }, callback) => {
  const headers = getAuthHeader(authToken);
  axios
    .post(BASE_API_URL + `ad/reject/${adId}`, headers)
    .then((res) => callback?.success(res))
    .catch((err) => callback?.error(err));
};
