import axios from "axios";
import { BASE_API_URL } from "./con-utils";

export const getAds = ({ authToken, userId, page = 1 }, callback) => {
  const headers = getAuthHeader(authToken).headers;
  axios
    .get(BASE_API_URL + `/ad/user/${userId}/${page}`, headers)
    .then((res) => callback?.success(res))
    .then((err) => success?.error(err));
};

export const postAd = ({ authToken, ad }, callback) => {
  const headers = getAuthHeader(authToken).headers;
  axios
    .post(BASE_API_URL + "/ad", ad, headers)
    .then((res) => callback?.success(res))
    .then((err) => success?.error(err));
};

export const updateAd = ({ authToken, ad, adId }, callback) => {
  const headers = getAuthHeader(authToken).headers;
  axios
    .put(BASE_API_URL + `/${adId}`, ad, headers)
    .then((res) => callback?.success(res))
    .then((err) => success?.error(err));
};
