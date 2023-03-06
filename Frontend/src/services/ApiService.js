import axios from "axios";
import { BASE_URL } from "../Constants";

const ApiService = {
  login: function (sendCredentials) {
    console.log("DataCredentials:", sendCredentials);
    return axios({
      method: "post",
      url: `${BASE_URL}/api/logincredentials/login`,
      data: sendCredentials,
      //headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getTotalUser: function () {
    return axios({
      method: "get",
      url: `${BASE_URL}/api/getusercount/getTotalUsers`,
      headers: {
        authorization: localStorage.getItem("tempToken"),
      },
    });
  },
  getBldPurchaseHistory: function (incomeSearchObj) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/bldPurchase/history`,
      data: incomeSearchObj,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  getPlayerList: function (sendPlayerObj) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/list/getPlayersList`,
      data: sendPlayerObj,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  getBldTokenStore: function (sendBldTokenSearch) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/bldTokenStore/getBldToken`,
      data: sendBldTokenSearch,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  updatePlayerStatus: function (isactiveUserID) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/updatestatus/playerisactive`,
      data: isactiveUserID,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  weaponloadout: function (weapondetails) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/loadouts/weaponloadout`,
      data: weapondetails,
      headers: {
        authorization: localStorage.getItem("tempToken"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
  editweaponloadout: function (weapondetails) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/loadouts/editWeapons`,
      data: weapondetails,
      headers: {
        authorization: localStorage.getItem("tempToken"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
  characterloadout: function (characterdetails) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/loadoutsCharacter/characterNew`,
      data: characterdetails,
      headers: {
        authorization: localStorage.getItem("tempToken"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
  editcharacterloadout: function (characterdetails) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/loadoutsCharacter/editCharacters`,
      data: characterdetails,
      headers: {
        authorization: localStorage.getItem("tempToken"),
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getTotalCharacter: function () {
    return axios({
      method: "get",
      url: `${BASE_URL}/api/loadoutsCharacter/getplayerCharcters`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  deleteCharacter: function (characterObj) {
    return axios({
      method: "post",
      data: characterObj,
      url: `${BASE_URL}/api/loadoutsCharacter/deleteCharacter`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  deleteEnableDisableCharacter: function (characterObj) {
    return axios({
      method: "post",
      data: characterObj,
      url: `${BASE_URL}/api/updatestatus/characterstatus`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  deleteWeapons: function (wepondIdObj) {
    return axios({
      method: "post",
      data: wepondIdObj,
      url: `${BASE_URL}/api/loadouts/deleteWeapons`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  deleteEnableDisableWeapons: function (wepondIdObj) {
    return axios({
      method: "post",
      data: wepondIdObj,
      url: `${BASE_URL}/api/updatestatus/weaponstatus`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  getTotalWeapons: function () {
    return axios({
      method: "get",
      url: `${BASE_URL}/api/loadouts/getplayerWeapons`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  getPlayerIndiWeapons: function (sendPlayerID) {
    return axios({
      method: "post",
      data: sendPlayerID,
      url: `${BASE_URL}/api/players/loadouts`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  getPlayerWalletDetails: function (sendPlayerIdForWallet) {
    return axios({
      method: "post",
      data: sendPlayerIdForWallet,
      url: `${BASE_URL}/api/wallet/players`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  getTournamentDetails: function (sendPlayerIdForWallet) {
    return axios({
      method: "post",
      data: sendPlayerIdForWallet,
      url: `${BASE_URL}/api/tournament/gettournaments`,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  forgetPassword: function (sendEmail) {
    return axios({
      method: "post",
      data: sendEmail,
      url: `${BASE_URL}/api/password/forgetpassword`,
    });
  },
  resetPassword: function (sendAdminDetails) {
    return axios({
      method: "post",
      data: sendAdminDetails,
      url: `${BASE_URL}/api/password/verifypassword`,
    });
  },
  getFriendLists: function (sendPlayerObj) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/getFriend//friendLists`,
      data: sendPlayerObj,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  deleteBldTokenStore: function (bldTokenIdObj) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/bldTokenStore/bldTokenDelete`,
      data: bldTokenIdObj,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  updateBldTokenStore: function (bldTokenStoreObj) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/bldTokenStore/updateBldToken`,
      data: bldTokenStoreObj,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
  addBldTokenStore: function (bldTokenStoreObj) {
    return axios({
      method: "post",
      url: `${BASE_URL}/api/bldTokenStore/bldTokenInsert`,
      data: bldTokenStoreObj,
      headers: { authorization: localStorage.getItem("tempToken") },
    });
  },
};

export default ApiService;
