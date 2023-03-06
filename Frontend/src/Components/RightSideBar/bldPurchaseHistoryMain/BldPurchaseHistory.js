import React from "react";
import ApiService from "../../../services/ApiService";
import { useEffect, useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { CSVLink } from "react-csv";
import "./bldPurchaseHistory.css";

function BldPurchaseHistory() {
  const [state, setState] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const [autoSuggest, setAutoSuggest] = useState();
  const [searchChange, setChangeSearch] = useState();

  const [downloadExcelData, setDownloadExcelData] = useState();

  const [isFilterDate, setFilterDate] = useState();
  const [filterDateStatus, setFilterDateStatus] = useState(false);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const [tempToken, setTempToken] = useState();

  const playersPerPage = 6;

  const pagesVisited = pageNumber * playersPerPage;

  const items = autoSuggest;
  console.log("CheckAutosugggest55:", items);

  const apiCall = () => {
    const sendPlayersFilter = {};

    console.log("CheckSearch55:", searchChange, search);
    if (searchChange == "" || search == "") {
      sendPlayersFilter.searchValue = "";
      setSearch();
    } else {
      sendPlayersFilter.searchValue = search;
    }

    ApiService.getBldPurchaseHistory(sendPlayersFilter)
      .then(function (response) {
        //localStorage.setItem("tempToken", response.data[1].token);

        //handle success
        if (response.data) {
          const responseBldPurHistory = response.data;
          const userId = [];
          const userName = [];
          const email = [];
          const stripeIntentID = [];
          const bld_token = [];
          const amount = [];
          for (
            let playerId = 0;
            playerId < responseBldPurHistory.length;
            playerId++
          ) {
            const objUserId = {};
            const objUserName = {};
            const objEmail = {};
            const objstripeIntentID = {};
            const objbldToken = {};
            const objAmount = {};
            console.log(
              "ValueTofind:",
              responseBldPurHistory[playerId].user_name
            );

            objUserId.name = responseBldPurHistory[playerId].user_id;
            objUserName.name = responseBldPurHistory[playerId].user_name;
            objEmail.name = responseBldPurHistory[playerId].email;
            objstripeIntentID.name =
              responseBldPurHistory[playerId].payment_intent_id;
            objbldToken.name = responseBldPurHistory[playerId].bld_token;
            objAmount.name = responseBldPurHistory[playerId].amount;

            userId.push(objUserId);
            userName.push(objUserName);
            email.push(objEmail);
            stripeIntentID.push(objstripeIntentID);
            bld_token.push(objbldToken);
            amount.push(objAmount);
          }
          const playerListAutoComplete = [
            ...userId,
            ...userName,
            ...email,
            ...stripeIntentID,
            ...bld_token,
            ...amount,
          ];
          setAutoSuggest(playerListAutoComplete);
        }

        console.log("Data7755:", response.data);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    // For Export excel data

    ApiService.getBldPurchaseHistory()
      .then(function (response) {
        const excelData = response.data;
        //localStorage.setItem("tempToken", response.data[1].token);
        for (let excelIndex = 0; excelIndex < excelData.length; excelIndex++) {
          const BldDate = moment(excelData[excelIndex].created_at).format(
            "MM-DD-YYYY"
          );
          const BldTime = moment(excelData[excelIndex].created_at).format(
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

  const handleOnSelect = (item) => {
    // the item selected
    //localStorage.setItem("tempToken", tempToken);
    setSearch(item.name);
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const [search, setSearch] = useState();

  useEffect(() => {
    const sendPlayersFilter = {};

    console.log("CheckSearch55:", searchChange, search);
    if (searchChange == "" || search == "") {
      sendPlayersFilter.searchValue = "";
      setSearch();
    } else {
      sendPlayersFilter.searchValue = search;
    }

    //sendPlayersFilter.page = pageNumber;
    //console.log("pageNumber:", pageNumber);
    ApiService.getBldPurchaseHistory(sendPlayersFilter)
      .then(function (response) {
        console.log("Token1155:", response.data[1].token);
        //localStorage.setItem("tempToken", response.data[1].token);
        setTempToken(response.data[1].token);
        //handle success

        if (response.data) {
          const responseBldPurHistory = response.data;
          const userId = [];
          const userName = [];
          const email = [];
          const stripeIntentID = [];
          const bld_token = [];
          const amount = [];
          for (
            let playerId = 0;
            playerId < responseBldPurHistory.length;
            playerId++
          ) {
            const objUserId = {};
            const objUserName = {};
            const objEmail = {};
            const objstripeIntentID = {};
            const objbldToken = {};
            const objAmount = {};
            console.log(
              "ValueTofind:",
              responseBldPurHistory[playerId].user_name
            );

            objUserId.name = responseBldPurHistory[playerId].user_id;
            objUserName.name = responseBldPurHistory[playerId].user_name;
            objEmail.name = responseBldPurHistory[playerId].email;
            objstripeIntentID.name =
              responseBldPurHistory[playerId].payment_intent_id;
            objbldToken.name = responseBldPurHistory[playerId].bld_token;
            objAmount.name = responseBldPurHistory[playerId].amount;

            userId.push(objUserId);
            userName.push(objUserName);
            email.push(objEmail);
            stripeIntentID.push(objstripeIntentID);
            bld_token.push(objbldToken);
            amount.push(objAmount);
          }
          const playerListAutoComplete = [
            ...userId,
            ...userName,
            ...email,
            ...stripeIntentID,
            ...bld_token,
            ...amount,
          ];
          setAutoSuggest(playerListAutoComplete);
        }

        console.log("Data7755:", response.data);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    // For Export excel data

    ApiService.getBldPurchaseHistory()
      .then(function (response) {
        const excelData = response.data;
        //localStorage.setItem("tempToken", response.data[1].token);
        for (let excelIndex = 0; excelIndex < excelData.length; excelIndex++) {
          const BldDate = moment(excelData[excelIndex].created_at).format(
            "MM-DD-YYYY"
          );
          const BldTime = moment(excelData[excelIndex].created_at).format(
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

  /* const handleTextSearch = (event) => {
    console.log("Serach:", event.target.value);
    setSearch(event.target.value);
    localStorage.setItem("bldPurchaseHistory", event.target.value);
  }; */

  const onChangeFromDate = (e) => {
    var newDate = new Date(e.target.value);
    const fromDateNew = moment(newDate).format("YYYY-MM-DD");
    setFromDate(fromDateNew);

    console.log("Chedk5566:", fromDateNew, toDate);
    var startDate = new Date(fromDateNew);
    var endDate = new Date(toDate);

    var resultProductData = state.filter((a) => {
      var date = new Date(a.created_at);
      return date >= startDate && date <= endDate;
    });
    console.log(resultProductData);

    console.log("testFrom:", resultProductData);
    //setDateRenderData(resultProductData.length);
    if (resultProductData.length > 0) {
      setFilterDate(resultProductData);
      setFilterDateStatus(true);
    }
    if (resultProductData.length == 0) {
      setFilterDateStatus(false);
      apiCall();
    }
  };

  const onChangeToDate = (e) => {
    var newDate = new Date(e.target.value);
    var endDateInsert = newDate.setDate(newDate.getDate() + 1);
    const endDateNew = moment(endDateInsert).format("YYYY-MM-DD");
    setToDate(endDateNew);
    console.log("DataTo77:", endDateNew);
    var startDate = new Date(fromDate);
    var endDate = new Date(endDateNew);
    var resultProductData = state.filter((a) => {
      var date = new Date(a.created_at);
      return date >= startDate && date <= endDate;
    });
    console.log("resultToDate:", resultProductData);
    //setDateRenderData(resultProductData.length);
    if (resultProductData.length > 0) {
      setFilterDate(resultProductData);
      setFilterDateStatus(true);
    }
    if (resultProductData.length == 0) {
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
    { label: "S.No.", key: "S_No" },
    { label: "Player Id", key: "user_id" },
    { label: "Player Name", key: "user_name" },
    { label: "Email", key: "email" },
    { label: "Stripe Payment Id", key: "payment_intent_id" },
    { label: "Bld Token", key: "bld_token" },
    { label: "Amount", key: "amount" },
    { label: "Date", key: "Formatted_Date" },
    { label: "Time", key: "Formatted_Time" },
  ];

  const displayTournament = (state) => {
    return (
      <main className="col-lg-10" id="main">
        <section className="spacng">
          <div className="row">
            <div className="col-md-12">
              <div className="plyr-srch">
                <h2 className="plyr_lst_hd">Bld Purchase History</h2>
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
                  <span className="alignExcelDownload">
                    <CSVLink
                      filename={"Bld_Purchase_History.csv"}
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
                      <th scope="col">Player ID</th>
                      <th scope="col">Player Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Stripe Payment Id</th>
                      <th scope="col">Bld Token</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterDateStatus == true
                      ? isFilterDate && isFilterDate.length < 7
                        ? isFilterDate?.map((bld, index) => (
                            <tr>
                              <th scope="row">{bld.id}</th>
                              <td>{bld.user_id}</td>
                              <td>{bld.user_name}</td>
                              <td>{bld.email}</td>
                              <td>{bld.payment_intent_id}</td>
                              <td>{bld.bld_token}</td>
                              <td>${bld.amount}</td>
                              <td>
                                {moment(bld.created_at).format("MM-DD-YYYY")}
                              </td>
                              <td>{moment(bld.created_at).format("h:mm a")}</td>
                            </tr>
                          ))
                        : isFilterDate
                            ?.slice(pagesVisited, pagesVisited + playersPerPage)
                            .map((bld, index) => (
                              <tr>
                                <th scope="row">{bld.id}</th>
                                <td>{bld.user_id}</td>
                                <td>{bld.user_name}</td>
                                <td>{bld.email}</td>
                                <td>{bld.payment_intent_id}</td>
                                <td>{bld.bld_token}</td>
                                <td>${bld.amount}</td>
                                <td>
                                  {moment(bld.created_at).format("MM-DD-YYYY")}
                                </td>
                                <td>
                                  {moment(bld.created_at).format("h:mm a")}
                                </td>
                              </tr>
                            ))
                      : state && state.length < 7
                      ? state?.map((bld, index) => (
                          <tr>
                            <th scope="row">{bld.id}</th>
                            <td>{bld.user_id}</td>
                            <td>{bld.user_name}</td>
                            <td>{bld.email}</td>
                            <td>{bld.payment_intent_id}</td>
                            <td>{bld.bld_token}</td>
                            <td>${bld.amount}</td>
                            <td>
                              {moment(bld.created_at).format("MM-DD-YYYY")}
                            </td>
                            <td>{moment(bld.created_at).format("h:mm a")}</td>
                          </tr>
                        ))
                      : state
                          ?.slice(pagesVisited, pagesVisited + playersPerPage)
                          .map((bld, index) => (
                            <tr>
                              <th scope="row">{bld.id}</th>
                              <td>{bld.user_id}</td>
                              <td>{bld.user_name}</td>
                              <td>{bld.email}</td>
                              <td>{bld.payment_intent_id}</td>
                              <td>{bld.bld_token}</td>
                              <td>${bld.amount}</td>
                              <td>
                                {moment(bld.created_at).format("MM-DD-YYYY")}
                              </td>
                              <td>{moment(bld.created_at).format("h:mm a")}</td>
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

export default BldPurchaseHistory;
