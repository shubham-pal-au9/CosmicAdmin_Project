import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../Constants";
import ApiService from "../../../services/ApiService";
import "./playerList.css";
import ReactPaginate from "react-paginate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { CSVLink } from "react-csv";

function PlayersList(props) {
  const [autoSuggest, setAutoSuggest] = useState();
  const [searchChange, setChangeSearch] = useState();
  const [state, setState] = useState();
  const [search, setSearch] = useState(
    localStorage.getItem("storePlayerSearch")
  );

  const [downloadExcelData, setDownloadExcelData] = useState();

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
      setSearch();
    } else {
      sendPlayersFilter.searchValue = search;
    }

    setStatusLeftTab(location.state.status);
    ApiService.getPlayerList(sendPlayersFilter)
      .then(function (response) {
        //handle success

        if (response.data) {
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
          const playerListAutoComplete = [
            ...username,
            ...bloodDiamond,
            ...coin,
          ];
          console.log("DataCheck1234567:", playerListAutoComplete);
          setAutoSuggest(playerListAutoComplete);
        }
        console.log("CheckPlayerListData:", response.data);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log("CheckRes1:", response.response.status);
        if (response.response.status === 500) {
          props.setRedirect(response.response.status);
          localStorage.clear();
          //localStorage.setItem("sustainState", null);
          navigate("/");
        }
        console.log(response);
      });

    // For Export excel data

    ApiService.getPlayerList()
      .then(function (response) {
        const excelData = response.data;
        console.log("excelData77:", excelData);
        setDownloadExcelData(excelData);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [search, location.state.status, props.setRedirect, searchChange]);

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

  /*  const handleTextSearch = (event) => {
    setSearch(event.target.value);
    localStorage.setItem("storePlayerSearch", event.target.value);
  }; */

  const formatResult = (item) => {
    console.log("CheckItem:", item);
    return (
      <>
        {/* <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span> */}
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  let headers = [
    { label: "S.No.", key: "S_No" },
    { label: "User Name", key: "user_name" },
    { label: "Blood Diamond", key: "diamond" },
    { label: "Coin", key: "coin" },
  ];

  const displayPlayers = (state) => {
    console.log("CheckState:", state);
    return (
      <main className="col-lg-10 playerListStyle" id="main">
        <section className="spacng">
          <div className="row">
            <div className="col-md-12">
              <div className="plyr-srch">
                {statusleftTab === "bloodDiamondHistory" ? (
                  <h2 className="plyr_lst_hd">Blood Diamond History</h2>
                ) : (
                  <h2 className="plyr_lst_hd">Players View</h2>
                )}
                {/* <form className="srch form-inline search-form">
                  <i className="fa fa-search"></i>
                  <input
                    className="form-control "
                    value={search}
                    type="search"
                    placeholder="Search..."
                    onChange={(e) => handleTextSearch(e)}
                  />
                </form> */}
                {statusleftTab === "bloodDiamondHistory"
                  ? downloadExcelData &&
                    downloadExcelData.length > 0 && (
                      <span className="alignExcelDownloadBldDiamondHistory">
                        <CSVLink
                          filename={"Bld_Diamond_History.csv"}
                          className="btn btn-primary"
                          data={downloadExcelData}
                          headers={headers}
                        >
                          {/* Export Bld Purchase History */}
                          <i
                            className="fa fa-file-export"
                            aria-hidden="true"
                          ></i>
                        </CSVLink>
                      </span>
                    )
                  : downloadExcelData &&
                    downloadExcelData.length > 0 && (
                      <span className="alignExcelDownloadPlayerList">
                        <CSVLink
                          filename={"Players_List.csv"}
                          className="btn btn-primary"
                          data={downloadExcelData}
                          headers={headers}
                        >
                          {/* Export Bld Purchase History */}
                          <i
                            className="fa fa-file-export"
                            aria-hidden="true"
                          ></i>
                        </CSVLink>
                      </span>
                    )}

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
                      backgroundColor: "black",
                      hoverBackgroundColor: "gray",
                      color: "white",
                      fontFamily: "Revamped",
                    }}
                  />
                </div>
              </div>
              <div className="view_table">
                <table className="table table-bordered table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      {/* <th scope="col">Image</th> */}
                      {/* <th scope="col">Name</th> */}
                      <th scope="col">Username</th>
                      <th scope="col">Blood Dimond</th>
                      {/*  {statusleftTab === "playerlist" && ( */}
                      <th scope="col">Coin</th>
                      {/* )} */}
                      {statusleftTab === "bloodDiamondHistory" ? (
                        <th scope="col">Blood Diamond History</th>
                      ) : (
                        <th scope="col">Status</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {state && state.length < 7
                      ? state?.map((player, index) => (
                          <tr>
                            <th scope="row">{player.S_No}</th>
                            {/* <td>{player.full_name}</td> */}
                            <td>{player.user_name}</td>
                            <td>{player.diamond}</td>
                            {/* {statusleftTab === "playerlist" && ( */}
                            <td>{player.coin}</td>
                            {/* )} */}
                            <td className="ver">
                              <div className="extr_btns">
                                {statusleftTab === "bloodDiamondHistory" ? (
                                  <Link
                                    to={"/wallet"}
                                    state={{
                                      test: "testData",
                                      recentPlayerId: player.user_id,
                                    }}
                                  >
                                    <button className="btn btn-primary">
                                      <img src="./img/view.svg" alt="view" />
                                    </button>
                                  </Link>
                                ) : (
                                  <Link
                                    to={"/individualplayerview"}
                                    state={{
                                      test: "testData",
                                      recentPlayerId: player.user_id,
                                      playerName: player.user_name,
                                    }}
                                  >
                                    <button className="btn btn-primary">
                                      <img src="./img/view.svg" alt="view" />
                                    </button>
                                  </Link>
                                )}

                                {statusleftTab === "playerlist" && (
                                  <span>
                                    <span>
                                      <button
                                        className="btn btn-danger playerListStyle"
                                        onClick={() =>
                                          setPlayerStatus(player.user_id, 1)
                                        }
                                      >
                                        Block
                                      </button>
                                    </span>
                                    <span>
                                      <button
                                        className="btn btn-success playerListStyle"
                                        onClick={() =>
                                          setPlayerStatus(player.user_id, 0)
                                        }
                                      >
                                        Unblock
                                      </button>
                                    </span>
                                  </span>
                                )}
                                {statusleftTab === "playerlist" && (
                                  <Link
                                    to={"/friendlists"}
                                    state={{
                                      recentPlayerId: player.user_id,
                                      playerName: player.user_name,
                                    }}
                                  >
                                    <button className="btn btn-primary">
                                      <img
                                        src="./img/friend_list.svg"
                                        alt="view"
                                      />
                                    </button>
                                  </Link>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      : state
                          ?.slice(pagesVisited, pagesVisited + playersPerPage)
                          .map((player, index) => (
                            <tr>
                              <th scope="row">{player.S_No}</th>
                              {/* <td>{player.full_name}</td> */}
                              <td>{player.user_name}</td>
                              <td>{player.diamond}</td>
                              {/* {statusleftTab === "playerlist" && ( */}
                              <td>{player.coin}</td>
                              {/* )} */}
                              <td className="ver">
                                <div className="extr_btns">
                                  {statusleftTab === "bloodDiamondHistory" ? (
                                    <Link
                                      to={"/wallet"}
                                      state={{
                                        test: "testData",
                                        recentPlayerId: player.user_id,
                                      }}
                                    >
                                      <button className="btn btn-primary">
                                        <img src="./img/view.svg" alt="view" />
                                      </button>
                                    </Link>
                                  ) : (
                                    <Link
                                      to={"/individualplayerview"}
                                      state={{
                                        test: "testData",
                                        recentPlayerId: player.user_id,
                                        playerName: player.user_name,
                                      }}
                                    >
                                      <button className="btn btn-primary">
                                        <img src="./img/view.svg" alt="view" />
                                      </button>
                                    </Link>
                                  )}

                                  {statusleftTab === "playerlist" && (
                                    <span>
                                      <span>
                                        <button
                                          className="btn btn-danger playerListStyle"
                                          onClick={() =>
                                            setPlayerStatus(player.user_id, 1)
                                          }
                                        >
                                          Block
                                        </button>
                                      </span>
                                      <span>
                                        <button
                                          className="btn btn-success playerListStyle"
                                          onClick={() =>
                                            setPlayerStatus(player.user_id, 0)
                                          }
                                        >
                                          Unblock
                                        </button>
                                      </span>
                                    </span>
                                  )}
                                  {statusleftTab === "playerlist" && (
                                    <Link
                                      to={"/friendlists"}
                                      state={{
                                        recentPlayerId: player.user_id,
                                        playerName: player.user_name,
                                      }}
                                    >
                                      <button className="btn btn-primary">
                                        <img
                                          src="./img/friend_list.svg"
                                          alt="view"
                                        />
                                      </button>
                                    </Link>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                  </tbody>
                </table>
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
    </>
  );
}

export default PlayersList;
