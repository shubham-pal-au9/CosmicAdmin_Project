import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import "./bldTokenStore.css";
import ReactPaginate from "react-paginate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { CSVLink } from "react-csv";

function BldToken(props) {
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

    console.log("CheckData55:", string, results);
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

  const [pageNumber, setPageNumber] = useState(0);

  const playersPerPage = 6;

  const pagesVisited = pageNumber * playersPerPage;

  //pagesVisited, pagesVisited + playersPerPage
  console.log("Pages77:", pagesVisited, pageNumber, playersPerPage);

  useEffect(() => {
    const sendBldTokenFilter = {};
    if (searchChange == "" || search == "") {
      sendBldTokenFilter.searchValue = "";
      setSearch();
    } else {
      sendBldTokenFilter.searchValue = search;
    }

    ApiService.getBldTokenStore(sendBldTokenFilter)
      .then(function (response) {
        //handle success

        if (response.data) {
          const responseBldToken = response.data;
          const itemType = [];
          const numberOfToken = [];
          const price = [];
          for (
            let bldTokenId = 0;
            bldTokenId < responseBldToken.length;
            bldTokenId++
          ) {
            const objitem_type = {};
            const objno_of_token = {};
            const objPrice = {};
            //console.log("ValueTofind:", responseBldToken[bldTokenId].item_type);

            objitem_type.name = responseBldToken[bldTokenId].item_type;
            objno_of_token.name = responseBldToken[bldTokenId].no_of_token;
            objPrice.name = responseBldToken[bldTokenId].price;

            itemType.push(objitem_type);
            numberOfToken.push(objno_of_token);
            price.push(objPrice);
          }
          const bldTokenListAutoComplete = [
            ...itemType,
            ...numberOfToken,
            ...price,
          ];
          console.log("DataCheck1234567:", bldTokenListAutoComplete);
          setAutoSuggest(bldTokenListAutoComplete);
        }
        console.log("CheckBldTokenStore:", response.data);
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

    ApiService.getBldTokenStore()
      .then(function (response) {
        const excelData = response.data;
        console.log("CheckData77:", excelData);
        setDownloadExcelData(excelData);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [search, props.setRedirect, searchChange]);

  const deleteBldTokenStore = (ID) => {
    const isactiveUserID = {};
    isactiveUserID.id = ID;
    ApiService.deleteBldTokenStore(isactiveUserID)
      .then(function (response) {
        //handle success
        console.log("Checkresponse55:", response);

        const sendBldTokenFilter = {};
        if (searchChange == "" || search == "") {
          sendBldTokenFilter.searchValue = "";
        } else {
          sendBldTokenFilter.searchValue = search;
        }

        ApiService.getBldTokenStore(sendBldTokenFilter).then(function (
          response
        ) {
          //handle success

          if (response.data) {
            const responseBldToken = response.data;
            const itemType = [];
            const numberOfToken = [];
            const price = [];
            for (
              let bldTokenId = 0;
              bldTokenId < responseBldToken.length;
              bldTokenId++
            ) {
              const objUsername = {};
              const objDiamond = {};
              const objCoin = {};
              //console.log("ValueTofind:", responseBldToken[bldTokenId].item_type);

              objUsername.name = responseBldToken[bldTokenId].item_type;
              objDiamond.name = responseBldToken[bldTokenId].no_of_token;
              objCoin.name = responseBldToken[bldTokenId].price;

              itemType.push(objUsername);
              numberOfToken.push(objDiamond);
              price.push(objCoin);
            }
            const bldTokenListAutoComplete = [
              ...itemType,
              ...numberOfToken,
              ...price,
            ];

            setAutoSuggest(bldTokenListAutoComplete);
          }
          console.log("CheckBldTokenStore:", response.data);
          setState(response.data);
        });
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

  let headers = [
    { label: "S.No.", key: "S_No" },
    { label: "Item Type", key: "item_type" },
    { label: "Number of Token", key: "no_of_token" },
    { label: "Price", key: "price" },
  ];

  const displayPlayers = (state) => {
    console.log("CheckState:", state);
    return (
      <main className="col-lg-10 playerListStyle" id="main">
        <section className="spacng">
          <div className="row">
            <div className="col-md-12">
              <div className="plyr-srch">
                <h2 className="plyr_lst_hd">BLD Token Store</h2>
                {downloadExcelData && downloadExcelData.length > 0 && (
                  <span className="alignExcelDownloadBldToken">
                    <CSVLink
                      filename={"Bld_Token_Store.csv"}
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
                <table className="table table-bordered table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Item Type</th>
                      <th scope="col">Number of Token</th>
                      <th scope="col">Price</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state && state.length < 7
                      ? state?.map((bldToken, index) => (
                          <tr>
                            <th scope="row">{bldToken.S_No}</th>
                            {/* <td>{player.full_name}</td> */}
                            <td>{bldToken.item_type}</td>
                            <td>{bldToken.no_of_token}</td>

                            <td>{bldToken.price}</td>

                            <td className="ver">
                              <div className="extr_btns">
                                <span>
                                  <span>
                                    <button
                                      className="btn btn-danger playerListStyle"
                                      onClick={() =>
                                        deleteBldTokenStore(bldToken.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </span>
                                  <Link
                                    to={"/addUpdateBldTokenStore"}
                                    state={{
                                      recentBldTokenId: bldToken.id,
                                      recentBldToken_no_of_token:
                                        bldToken.no_of_token,
                                      recentBldToken_price: bldToken.price,
                                      isBldTokenStore: "updateBldToken",
                                    }}
                                  >
                                    <button
                                      className="btn btn-success playerListStyle"
                                      /* onClick={() =>
                                      setPlayerStatus(bldToken.id, 0)
                                    } */
                                    >
                                      Update
                                    </button>
                                  </Link>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      : state
                          ?.slice(pagesVisited, pagesVisited + playersPerPage)
                          .map((bldToken, index) => (
                            <tr>
                              <th scope="row">{bldToken.S_No}</th>
                              {/* <td>{player.full_name}</td> */}
                              <td>{bldToken.item_type}</td>
                              <td>{bldToken.no_of_token}</td>

                              <td>{bldToken.price}</td>

                              <td className="ver">
                                <div className="extr_btns">
                                  <span>
                                    <span>
                                      <button
                                        className="btn btn-danger playerListStyle"
                                        onClick={() =>
                                          deleteBldTokenStore(bldToken.id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </span>
                                    <Link
                                      to={"/addUpdateBldTokenStore"}
                                      state={{
                                        recentBldTokenId: bldToken.id,
                                        recentBldToken_no_of_token:
                                          bldToken.no_of_token,
                                        recentBldToken_price: bldToken.price,
                                        isBldTokenStore: "updateBldToken",
                                      }}
                                    >
                                      <button
                                        className="btn btn-success playerListStyle"
                                        /* onClick={() =>
                                      setPlayerStatus(bldToken.id, 0)
                                    } */
                                      >
                                        Update
                                      </button>
                                    </Link>
                                  </span>
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

export default BldToken;
