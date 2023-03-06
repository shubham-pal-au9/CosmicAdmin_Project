import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../Constants";
import ApiService from "../../../services/ApiService";
import "../Players/playerList.css";
import ReactPaginate from "react-paginate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function FriendList(props) {
  const [autoSuggest, setAutoSuggest] = useState();
  const [searchChange, setChangeSearch] = useState();
  const [state, setState] = useState();
  const [search, setSearch] = useState(
    localStorage.getItem("storePlayerSearch")
  );

  const items = autoSuggest;

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.

    setChangeSearch(string);
  };

  const handleOnHover = (result) => {
    console.log("Hover");
    // the item hovered
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log("Selected");
    setSearch(item.name);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  let location = useLocation();
  const navigate = useNavigate();
  const [statusleftTab, setStatusLeftTab] = useState();

  const [pageNumber, setPageNumber] = useState(0);

  const playersPerPage = 6;

  const pagesVisited = pageNumber * playersPerPage;

  useEffect(() => {
    const sendPlayersFilter = {};
    if (searchChange == "" || search == "") {
      sendPlayersFilter.searchValue = "";
    } else {
      sendPlayersFilter.searchValue = search;
    }

    setStatusLeftTab(location.state.recentPlayerId);

    var playerID = {};
    playerID.user_id = location.state.recentPlayerId;

    ApiService.getFriendLists(playerID).then(function (response) {
      const respFriendList = [];
      if (
        response.data.friend_list &&
        response.data.friend_list.accepted_request
      ) {
        respFriendList.push(...response.data.friend_list.accepted_request);
      }
      if (
        response.data.friend_list &&
        response.data.friend_list.pending_request
      ) {
        respFriendList.push(...response.data.friend_list.pending_request);
      }

      function sortDataBy(respFriendList, byKey) {
        let sortedData;

        if (byKey == "S_No") {
          sortedData = respFriendList.sort(function (a, b) {
            return a.S_No - b.S_No;
          });
        }
        return sortedData;
      }

      const storeFriends = sortDataBy(respFriendList, "S_No");
      //handle success

      /* if (response.data) {
        const responsePlayerList = response.data;
        const username = [];
        const bloodDiamond = [];
        const coin = [];
        for (
          let playerId = 0;
          playerId < responsePlayerList.length;
          playerId++
        ) {
          const objUsername = {};
          const objDiamond = {};
          const objCoin = {};
          console.log("ValueTofind:", responsePlayerList[playerId].user_name);
          objUsername.name = responsePlayerList[playerId].user_name;
          objDiamond.name = responsePlayerList[playerId].diamond;
          objCoin.name = responsePlayerList[playerId].coin;
          username.push(objUsername);
          bloodDiamond.push(objDiamond);
          coin.push(objCoin);
        }
        const playerListAutoComplete = [...username, ...bloodDiamond, ...coin];
        console.log("DataCheck1234567:", playerListAutoComplete);
        setAutoSuggest(playerListAutoComplete);
      } */
      console.log("CheckPlayerListData:", response.data);
      setState(storeFriends);
    });
    /* .catch(function (response) {
        console.log("CheckRes1:", response.response.status);
        if (response.response.status === 500) {
          props.setRedirect(response.response.status);
          localStorage.clear();
          navigate("/");
        }
        console.log(response);
      }); */
  }, [search, location.state.recentPlayerId, props.setRedirect, searchChange]);

  const setPlayerStatus = (userid, isactive) => {
    const isactiveUserID = {};
    isactiveUserID.isActive = isactive;
    isactiveUserID.userId = userid;
    ApiService.updatePlayerStatus(isactiveUserID)
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const formatResult = (item) => {
    console.log("CheckItem:", item);
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  const displayPlayers = (state) => {
    return (
      <main className="col-lg-10 playerListStyle" id="main">
        <section className="spacng">
          <div className="row">
            <div className="col-md-12">
              <div className="plyr-srch">
                <h2 className="plyr_lst_hd">Friend Lists</h2>
                {state && state.length > 0 && (
                  <div style={{ width: 350 }}>
                    <ReactSearchAutocomplete
                      className="form-control"
                      items={items}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={handleOnSelect}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      placeholder="Search..."
                      styling={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "2px 10px",
                        marginLeft: "162px",
                        position: "relative",
                        backgroundColor: "rgba(20%, 100%, 20%, 0)",
                        hoverBackgroundColor: "gray",
                        color: "white",
                        fontFamily: "Revamped",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="view_table">
                {state && state.length > 0 ? (
                  <table className="table table-bordered table-hover ">
                    <thead>
                      <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Player Name</th>
                        <th scope="col">Player Email</th>
                        <th scope="col">Friend Name</th>
                        <th scope="col">Friend Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {console.log("CheckPagenumber55:", pageNumber)}
                      {state
                        ?.slice(pagesVisited, pagesVisited + playersPerPage)
                        .map((player, index) => (
                          <tr>
                            <th scope="row">{player.S_No}</th>
                            <td>{player.sender_name}</td>
                            <td>{player.sender_email}</td>
                            <td>{player.receiver_name}</td>
                            <td>{player.receiver_email}</td>
                            <td>
                              {player.is_accepted == 1 ? "Accepted" : "Pending"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no_friend">
                    There is no friend for this player
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  };

  const pageCount = Math.ceil(state?.length / playersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {displayPlayers(state)}
      {state && state.length > 0 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      )}
    </>
  );
}

export default FriendList;
