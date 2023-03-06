import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainNavbar from "./Components/TopHead/MainNavbar";
import PlayersList from "./Components/RightSideBar/Players/PlayersList";
import LeftSideMenu from "./Components/LeftSideBar/LeftSideMenu";
import AddNewInventory from "./Components/RightSideBar/Inventory/AddNew/AddNewInventory";
import AddNewShotgun from "./Components/RightSideBar/Inventory/AddNew/AddNewShotgun";
import AddNewSmg from "./Components/RightSideBar/Inventory/AddNew/AddNewSmg";
import AddNewPistol from "./Components/RightSideBar/Inventory/AddNew/AddNewPistol";
import AddNewMelee from "./Components/RightSideBar/Inventory/AddNew/AddNewMelee";
import AddNewGrenade from "./Components/RightSideBar/Inventory/AddNew/AddNewGrenade";
import AddNewCharacter from "./Components/RightSideBar/Inventory/AddNew/AddNewCharacter";
import AddNewProperty from "./Components/RightSideBar/Inventory/AddNew/AddNewProperty";
import AddNewNftArt from "./Components/RightSideBar/Inventory/AddNew/AddNewNftArt";
import InventoryList from "./Components/RightSideBar/Inventory/InventoryList";
import IndividualPlayerView from "./Components/RightSideBar/InvidualPlayerView/IndividualPlayerView";
import WeaponLoadout from "./Components/RightSideBar/WeaponLoadout/WeaponLoadout";
import PurchaseWeaponAccesry from "./Components/RightSideBar/PurchaseWeapon/PurchaseWeaponAccesry";
import Wallet from "./Components/RightSideBar/Wallet/Wallet";
import AddNewCategory from "./Components/RightSideBar/Category/AddNewCategory/AddNewCategory";
import AssaultItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/AssaultItemDetail";
import ShotgunItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/ShotgunItemDetail";
import SmgItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/SmgItemDetail";
import PistolItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/PistolItemDetail";
import MeleeItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/MeleeItemDetail";
import GrenadeItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/GrenadeItemDetail";
import CharacterItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/CharacterItemDetail";
import PropertyItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/PropertyItemDetail";
import NftArtItemDetail from "./Components/RightSideBar/Category/AddNewCategory/CategoriesList/NftArtItemDetail";

import EditCategory from "./Components/RightSideBar/Category/EditCategory/EditCategory";
import ItemDetail from "./Components/RightSideBar/Inventory/ItemDetail";
import AssaultWeapons from "./Components/RightSideBar/Inventory/AssaultWeapons";
import ShotGunWeapons from "./Components/RightSideBar/Inventory/ShotGunWeapons";
import SmgWeapons from "./Components/RightSideBar/Inventory/SmgWeapons";
import PistolWeapons from "./Components/RightSideBar/Inventory/PistolWeapons";
import MeleeWeapons from "./Components/RightSideBar/Inventory/MeleeWeapons";
import GrenadesWeapons from "./Components/RightSideBar/Inventory/GrenadesWeapons";
import Character from "./Components/RightSideBar/Inventory/Character";
import Property from "./Components/RightSideBar/Inventory/Property";
import NftArt from "./Components/RightSideBar/Inventory/NftArt";
import ForgetPassword from "./Components/Pages/ForgetPassword";
import LoginPage from "./Components/Pages/LoginPage";
import VerifyResetPassword from "./Components/Pages/VerifyResetPassword";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import MainDashboard from "./Components/DashBoard/MainDashboard";
import TournamentHistory from "./Components/RightSideBar/Tournament History/TournamentHistory";
import { useEffect, useState } from "react";
import FriendList from "./Components/RightSideBar/FriendLists/friendLists";
import BldToken from "./Components/RightSideBar/BldTokenStore/BldToken";
import AddBldTokenStore from "./Components/RightSideBar/BldTokenStore/AddBldTokenStore";
import EditWeapons from "./Components/RightSideBar/Inventory/AddNew/EditWeapons";
import EditCharacter from "./Components/RightSideBar/Inventory/AddNew/EditCharacter";
import BldPurchaseHistory from "./Components/RightSideBar/bldPurchaseHistoryMain/BldPurchaseHistory";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("sustainState"));

  const [mainsearch, setMainSearch] = useState();
  const [leftSideBarHide, setLeftSideBarHide] = useState(false);

  const [pathLocation, setPathLocation] = useState();

  const hideSideBar = localStorage.getItem("isAuthenticate");

  localStorage.setItem("sustainState", auth);
  console.log("check77:", pathLocation);
  return (
    <>
      <HashRouter>
        <div id="inventory" className="main-wrapper bg-cos">
          <div className="dashboard list">
            <MainNavbar
              setMainSearch={setMainSearch}
              checkAuth={auth}
              leftSideBarHide={leftSideBarHide}
            />
            <div className="container-fluid">
              <div className="row">
                {leftSideBarHide === false && <LeftSideMenu checkAuth={auth} />}

                <Routes>
                  <Route
                    index
                    path="/"
                    element={
                      <LoginPage setLeftSideBarHide={setLeftSideBarHide} />
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <MainDashboard
                        isAuthenticate={setAuth}
                        setLeftSideBarHide={setLeftSideBarHide}
                        setPathLocation={setPathLocation}
                        pathLocation={pathLocation}
                      />
                    }
                  />
                  <Route
                    path="/playerdetails"
                    element={
                      <PlayersList
                        mainsearch={mainsearch}
                        //setRedirect={setRedirect}
                      />
                    }
                  />
                  <Route
                    path="/bldtokenstore"
                    element={
                      <BldToken
                        mainsearch={mainsearch}
                        //setRedirect={setRedirect}
                      />
                    }
                  />
                  <Route
                    path="/bldpurchasehistory"
                    element={<BldPurchaseHistory mainsearch={mainsearch} />}
                  />
                  <Route
                    path="/friendlists"
                    element={<FriendList mainsearch={mainsearch} />}
                  />
                  <Route
                    path="/addnewinventory"
                    element={<AddNewInventory />}
                  />
                  <Route path="/editWeapons" element={<EditWeapons />} />
                  <Route path="/editCharacter" element={<EditCharacter />} />
                  <Route
                    path="/addUpdateBldTokenStore"
                    element={<AddBldTokenStore />}
                  />
                  <Route path="/addnewshotgun" element={<AddNewShotgun />} />
                  <Route path="/addnewsmg" element={<AddNewSmg />} />
                  <Route path="/addnewpistol" element={<AddNewPistol />} />
                  <Route path="/addnewmelee" element={<AddNewMelee />} />
                  <Route path="/addnewgrenade" element={<AddNewGrenade />} />
                  <Route
                    path="/addnewcharacter"
                    element={<AddNewCharacter />}
                  />
                  <Route path="/addnewproperty" element={<AddNewProperty />} />
                  <Route path="/addnewnftart" element={<AddNewNftArt />} />
                  <Route path="/inventorylist" element={<InventoryList />} />
                  <Route
                    path="/individualplayerview"
                    element={<IndividualPlayerView />}
                  />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/weaponloadout" element={<WeaponLoadout />} />
                  <Route
                    path="/purchaseweaponaccesry"
                    element={<PurchaseWeaponAccesry />}
                  />
                  <Route path="/addnewcategory" element={<AddNewCategory />} />
                  <Route
                    path="/assaultitemdetail"
                    element={<AssaultItemDetail />}
                  />
                  <Route
                    path="/shotgunitemdetail"
                    element={<ShotgunItemDetail />}
                  />
                  <Route path="/smgitemdetail" element={<SmgItemDetail />} />
                  <Route
                    path="/pistolitemdetail"
                    element={<PistolItemDetail />}
                  />
                  <Route
                    path="/meleeitemdetail"
                    element={<MeleeItemDetail />}
                  />
                  <Route
                    path="/grenadeitemdetail"
                    element={<GrenadeItemDetail />}
                  />
                  <Route
                    path="/characteritemdetail"
                    element={<CharacterItemDetail />}
                  />
                  <Route
                    path="/characteritemdetail"
                    element={<CharacterItemDetail />}
                  />
                  <Route
                    path="/propertyitemdetail"
                    element={<PropertyItemDetail />}
                  />
                  <Route
                    path="/nftartitemdetail"
                    element={<NftArtItemDetail />}
                  />
                  <Route path="/editcategory" element={<EditCategory />} />
                  <Route path="/itemdetail" element={<ItemDetail />} />
                  <Route path="/assaultweapons" element={<AssaultWeapons />} />
                  <Route path="/shotgunweapons" element={<ShotGunWeapons />} />
                  <Route path="/smgweapons" element={<SmgWeapons />} />
                  <Route path="/pistolweapons" element={<PistolWeapons />} />
                  <Route path="/meleeweapons" element={<MeleeWeapons />} />
                  <Route
                    path="/grenadesweapons"
                    element={<GrenadesWeapons />}
                  />
                  <Route path="/character" element={<Character />} />
                  <Route path="/property" element={<Property />} />
                  <Route path="/nftart" element={<NftArt />} />
                  <Route
                    path="/tournamenthistory"
                    element={<TournamentHistory />}
                  />
                  <Route
                    path="/forgetpassword"
                    element={
                      <ForgetPassword setLeftSideBarHide={setLeftSideBarHide} />
                    }
                  />
                  <Route
                    path="/verifyresetassword"
                    element={
                      <VerifyResetPassword
                        setLeftSideBarHide={setLeftSideBarHide}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
