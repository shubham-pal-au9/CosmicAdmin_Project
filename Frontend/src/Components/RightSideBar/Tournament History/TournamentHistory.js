import React from "react";
import ApiService from "../../../services/ApiService";
import { useEffect, useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { CSVLink } from "react-csv";
import "./tournamentHistory.css";

function TournamentHistory() {
  const [state, setState] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const [autoSuggest, setAutoSuggest] = useState();
  const [searchChange, setChangeSearch] = useState();

  const [downloadExcelData, setDownloadExcelData] = useState();
  const [fromDate, setFromDate] = useState();

  const [isFilterDate, setFilterDate] = useState();
  const [filterDateStatus, setFilterDateStatus] = useState(false);

  const [toDate, setToDate] = useState();
  const [dateRenderData, setDateRenderData] = useState();

  const [dateStatus, setDateStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);

  const playersPerPage = 6;

  const pagesVisited = pageNumber * playersPerPage;

  const items = autoSuggest;

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log("Chhhh:", string);
    setChangeSearch(string);
  };

  const handleOnHover = (result) => {
    console.log("Hover");
    // the item hovered
    console.log(result);
  };

  const computeDateFilterOverSearch = () => {
    console.log("Check_Here:", dateStatus, searchStatus);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log("Selected");
    console.log("SelectedItem:", item.name);
    setSearch(item.name);
    setSearchStatus(true);
    computeDateFilterOverSearch();
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const [search, setSearch] = useState();

  useEffect(() => {
    const sendPlayersFilter = {};

    if (searchChange == "" || search == "") {
      sendPlayersFilter.searchValue = "";
      setSearch();
      setSearchStatus(false);
    } else {
      sendPlayersFilter.searchValue = search;
    }

    //sendPlayersFilter.page = pageNumber;
    //console.log("pageNumber:", pageNumber);
    ApiService.getTournamentDetails(sendPlayersFilter)
      .then(function (response) {
        //handle success

        if (response.data) {
          const responsePlayerList = response.data;
          const tournamentName = [];
          const type = [];
          const status = [];
          const score = [];
          const killed = [];
          const diamonds = [];
          for (
            let playerId = 0;
            playerId < responsePlayerList.length;
            playerId++
          ) {
            const objtournamentName = {};
            const objType = {};
            const objStatus = {};
            const objScore = {};
            const objKilled = {};
            const objDiamond = {};
            console.log("ValueTofind:", responsePlayerList[playerId].user_name);

            objtournamentName.name =
              responsePlayerList[playerId].tournament_name;
            objType.name = responsePlayerList[playerId].tournament_type;
            objStatus.name = responsePlayerList[playerId].tournament_status;
            objScore.name = responsePlayerList[playerId].tournament_score;
            objKilled.name = responsePlayerList[playerId].killed;
            objDiamond.name = responsePlayerList[playerId].diamonds;

            tournamentName.push(objtournamentName);
            type.push(objType);
            status.push(objStatus);
            score.push(objScore);
            killed.push(objKilled);
            diamonds.push(objDiamond);
          }
          const playerListAutoComplete = [
            ...tournamentName,
            ...type,
            ...status,
            ...score,
            ...killed,
            ...diamonds,
          ];
          console.log("DataCheck12345675555DataCheck:", playerListAutoComplete);
          setAutoSuggest(playerListAutoComplete);
        }

        console.log("Data11:", response.data);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    // For Export excel data

    ApiService.getTournamentDetails()
      .then(function (response) {
        const excelData = response.data;
        for (let excelIndex = 0; excelIndex < excelData.length; excelIndex++) {
          const BldDate = moment(excelData[excelIndex].data_time).format(
            "DD-MM-YYYY"
          );
          const BldTime = moment(excelData[excelIndex].data_time).format(
            "h:mm a"
          );
          excelData[excelIndex].Formatted_Date = BldDate;
          excelData[excelIndex].Formatted_Time = BldTime;
        }
        setDownloadExcelData(excelData);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [search, pageNumber, searchChange]);

  const apiCall = () => {
    const sendPlayersFilter = {};
    if (searchChange == "" || search == "") {
      sendPlayersFilter.searchValue = "";
      setSearch();
    } else {
      sendPlayersFilter.searchValue = search;
    }

    ApiService.getTournamentDetails(sendPlayersFilter)
      .then(function (response) {
        //handle success

        if (response.data) {
          const responsePlayerList = response.data;
          const tournamentName = [];
          const type = [];
          const status = [];
          const score = [];
          const killed = [];
          const diamonds = [];
          for (
            let playerId = 0;
            playerId < responsePlayerList.length;
            playerId++
          ) {
            const objtournamentName = {};
            const objType = {};
            const objStatus = {};
            const objScore = {};
            const objKilled = {};
            const objDiamond = {};
            console.log("ValueTofind:", responsePlayerList[playerId].user_name);

            objtournamentName.name =
              responsePlayerList[playerId].tournament_name;
            objType.name = responsePlayerList[playerId].tournament_type;
            objStatus.name = responsePlayerList[playerId].tournament_status;
            objScore.name = responsePlayerList[playerId].tournament_score;
            objKilled.name = responsePlayerList[playerId].killed;
            objDiamond.name = responsePlayerList[playerId].diamonds;

            tournamentName.push(objtournamentName);
            type.push(objType);
            status.push(objStatus);
            score.push(objScore);
            killed.push(objKilled);
            diamonds.push(objDiamond);
          }
          const playerListAutoComplete = [
            ...tournamentName,
            ...type,
            ...status,
            ...score,
            ...killed,
            ...diamonds,
          ];
          console.log("DataCheck12345675555DataCheck:", playerListAutoComplete);
          setAutoSuggest(playerListAutoComplete);
        }

        console.log("Data11:", response.data);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    // For Export excel data

    ApiService.getTournamentDetails()
      .then(function (response) {
        const excelData = response.data;
        for (let excelIndex = 0; excelIndex < excelData.length; excelIndex++) {
          const BldDate = moment(excelData[excelIndex].data_time).format(
            "DD-MM-YYYY"
          );
          const BldTime = moment(excelData[excelIndex].data_time).format(
            "h:mm a"
          );
          excelData[excelIndex].Formatted_Date = BldDate;
          excelData[excelIndex].Formatted_Time = BldTime;
        }
        setDownloadExcelData(excelData);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  /* const handleTextSearch = (event) => {
    console.log("Serach:", event.target.value);
    setSearch(event.target.value);
    localStorage.setItem("storeTournamentSearch", event.target.value);
  }; */

  const onChangeFromDate = (e) => {
    var newDate = new Date(e.target.value);
    const fromDateNew = moment(newDate).format("YYYY-MM-DD");
    setFromDate(fromDateNew);
    var startDate = new Date(fromDateNew);
    var endDate = new Date(toDate);
    var resultProductData = state.filter((a) => {
      var date = new Date(a.data_time);
      return date >= startDate && date <= endDate;
    });

    if (resultProductData.length > 0) {
      setFilterDate(resultProductData);
      setFilterDateStatus(true);

      setDateStatus(true);
      computeDateFilterOverSearch();
    }
    if (resultProductData.length == 0) {
      setDateStatus(false);
      setFilterDateStatus(false);
      apiCall();
    }
  };

  const onChangeToDate = (e) => {
    var newDate = new Date(e.target.value);
    var endDateInsert = newDate.setDate(newDate.getDate() + 1);
    const endDateNew = moment(endDateInsert).format("YYYY-MM-DD");
    setToDate(endDateNew);
    var startDate = new Date(fromDate);
    var endDate = new Date(endDateNew);
    var resultProductData = state.filter((a) => {
      var date = new Date(a.data_time);
      return date >= startDate && date <= endDate;
    });

    if (resultProductData.length > 0) {
      setFilterDate(resultProductData);
      setFilterDateStatus(true);

      setDateStatus(true);
      computeDateFilterOverSearch();
    }
    if (resultProductData.length == 0) {
      setDateStatus(false);
      setFilterDateStatus(false);
      apiCall();
    }
  };

  const formatResult = (item) => {
    console.log("CheckItem:", item);
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  let headers = [
    { label: "S.No.", key: "id" },
    { label: "Tournament Name", key: "tournament_name" },
    { label: "Type", key: "tournament_type" },
    { label: "Status", key: "tournament_status" },
    { label: "Score", key: "tournament_score" },
    { label: "Killed", key: "killed" },
    { label: "Diamonds", key: "diamonds" },
    { label: "Date", key: "Formatted_Date" },
    { label: "Time", key: "Formatted_Time" },
  ];

  const displayTournament = (state) => {
    return (
      <main className="col-lg-10" id="main">
        <section className="spacng">
          <div className="row">
            <div className="col-md-12">
              <div className="plyr-srch searchBackgroud">
                <h2 className="plyr_lst_hd">Tournament History</h2>
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

                <div className="dropdown">
                  <a
                    class="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Date Filter
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="date_arrageMain">
                      <span className="dateTextStyle">From</span>
                      <div>
                        <input
                          type="date"
                          //value={fromDate}
                          onChange={(e) => onChangeFromDate(e)}
                        />
                      </div>
                      <span className="dateTextStyle">To</span>
                      <div>
                        <input
                          type="date"
                          //value={toDate}
                          onChange={(e) => onChangeToDate(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {downloadExcelData && downloadExcelData.length > 0 && (
                  <span className="alignExcelDownloadTour">
                    <CSVLink
                      filename={"Tournament_History.csv"}
                      className="btn btn-primary"
                      data={downloadExcelData}
                      headers={headers}
                    >
                      {/* Export Bld Purchase History */}
                      <i className="fa fa-file-export" aria-hidden="true"></i>
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
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Tournament Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Score</th>
                      <th scope="col">Killed</th>
                      <th scope="col">Diamonds</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterDateStatus == true
                      ? isFilterDate && isFilterDate.length < 7
                        ? isFilterDate?.map((tour, index) => (
                            <tr>
                              <th scope="row">{tour.id}</th>
                              <td>{tour.tournament_name}</td>
                              <td>{tour.tournament_type}</td>
                              <td
                                className={
                                  tour.tournament_status === "Win"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {tour.tournament_status}
                              </td>
                              <td>{tour.tournament_score}</td>
                              <td>{tour.killed}</td>
                              <td>{tour.diamonds}</td>
                              <td>
                                {moment(tour.data_time).format("DD-MM-YYYY")}
                              </td>
                              <td>{moment(tour.data_time).format("h:mm a")}</td>
                            </tr>
                          ))
                        : isFilterDate
                            ?.slice(pagesVisited, pagesVisited + playersPerPage)
                            .map((tour, index) => (
                              <tr>
                                <th scope="row">{tour.id}</th>
                                <td>{tour.tournament_name}</td>
                                <td>{tour.tournament_type}</td>
                                <td
                                  className={
                                    tour.tournament_status === "Win"
                                      ? "text-success"
                                      : "text-danger"
                                  }
                                >
                                  {tour.tournament_status}
                                </td>
                                <td>{tour.tournament_score}</td>
                                <td>{tour.killed}</td>
                                <td>{tour.diamonds}</td>
                                <td>
                                  {moment(tour.data_time).format("DD-MM-YYYY")}
                                </td>
                                <td>
                                  {moment(tour.data_time).format("h:mm a")}
                                </td>
                              </tr>
                            ))
                      : state && state.length < 7
                      ? state?.map((tour, index) => (
                          <tr>
                            <th scope="row">{tour.id}</th>
                            <td>{tour.tournament_name}</td>
                            <td>{tour.tournament_type}</td>
                            <td
                              className={
                                tour.tournament_status === "Win"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {tour.tournament_status}
                            </td>
                            <td>{tour.tournament_score}</td>
                            <td>{tour.killed}</td>
                            <td>{tour.diamonds}</td>
                            <td>
                              {moment(tour.data_time).format("DD-MM-YYYY")}
                            </td>
                            <td>{moment(tour.data_time).format("h:mm a")}</td>
                          </tr>
                        ))
                      : state
                          ?.slice(pagesVisited, pagesVisited + playersPerPage)
                          .map((tour, index) => (
                            <tr>
                              <th scope="row">{tour.id}</th>
                              <td>{tour.tournament_name}</td>
                              <td>{tour.tournament_type}</td>
                              <td
                                className={
                                  tour.tournament_status === "Win"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {tour.tournament_status}
                              </td>
                              <td>{tour.tournament_score}</td>
                              <td>{tour.killed}</td>
                              <td>{tour.diamonds}</td>
                              <td>
                                {moment(tour.data_time).format("DD-MM-YYYY")}
                              </td>
                              <td>{moment(tour.data_time).format("h:mm a")}</td>
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
    console.log("PageChnage:", selected);
    setPageNumber(selected);
  };

  return (
    <>
      {displayTournament(state)}
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

export default TournamentHistory;
