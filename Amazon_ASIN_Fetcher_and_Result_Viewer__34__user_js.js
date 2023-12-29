// ==UserScript==
// @name         Amazon ASIN Fetcher and Result Viewer
// @namespace    http://yourwebsite.com
// @version      1.0
// @description  Fetch ASIN from Amazon.com URL and display results from Seller Central using GM.xmlHttpRequest.
// @author       Your Name
// @match         *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function(){
    'use strict';
 function extractASINFromURL() {
        const match = window.location.pathname.match(/\/dp\/([A-Z0-9]+)/);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }
    // Check if the URL starts with www.amazon.com/
    if (window.location.href.startsWith("https://www.amazon.com/")) {
        const extractedASIN = extractASINFromURL();
        if (extractedASIN) {
            console.log("ASIN extracted from URL:", extractedASIN);
            startss(extractedASIN)
        } else {
            console.log('asin')
        }}
    var globalData=null;
    var anothergolbal =null;
    var feesdata=null
    function global(data){
        globalData=data
    }
    function newglobal(data){
        anothergolbal=data
    }
    function another(data){
        feesdata=data
    }
    // Function to fetch data from Seller Central

    function addCustomButton() {
        const button = document.createElement('button');
        button.innerText = 'Open Amazon Scraper';
        button.style.position = 'fixed';
        button.style.top = '50%';
        button.style.right = '0';
        button.style.zIndex = '9999';
        document.body.appendChild(button);

        // Add click event listener to the button
        button.addEventListener('click', () => {
            // Open the popup when the button is clicked
            openPopup();
        });
    }

    // Function to open the popup
    function openPopup(displyafess) {
        // Create the popup container
        const popupContainer = document.createElement('div');
        popupContainer.id = 'amazon-popup';
        popupContainer.style.position = 'fixed';
        popupContainer.style.top = '18%';
        popupContainer.style.left = '35%';
        popupContainer.style.height = '70vh';
        popupContainer.style.width = '500px';
        popupContainer.style.overflow = 'scroll';
        popupContainer.style.background = 'white';
        popupContainer.style.padding = '20px';
        popupContainer.style.border = '1px solid #ccc';
        popupContainer.style.zIndex = '9999';
        // Create an input field for the user to enter the search key
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter ASIN, UPC, or title';
        inputField.style.width = '100%';
        popupContainer.appendChild(inputField);
        // Create a button to trigger the search
        const searchButton = document.createElement('button');
        searchButton.innerText = 'Search';
        searchButton.style.marginTop = '10px';
        searchButton.style.width = '100%';
        popupContainer.appendChild(searchButton);
        // Create a container for displaying search results
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';
        resultsContainer.style.overflowY = 'auto'; // Enable vertical scrolling
        popupContainer.appendChild(resultsContainer);

        // Create a white circle button for minimizing/maximizing the container
        const toggleButton = document.createElement('button');
        toggleButton.innerText = '▼'; // You can replace this with a white circle icon
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '20px';
        toggleButton.style.right = '20px';
        toggleButton.style.background = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '35%';
        toggleButton.style.width = '40px';
        toggleButton.style.height = '40px';
        toggleButton.style.fontSize = '20px';
        toggleButton.style.zIndex = '9999';
        toggleButton.addEventListener('click', () => {
            // Toggle the visibility of the popupContainer
            if (popupContainer.style.display === 'none') {
                popupContainer.style.display = 'block';
                toggleButton.innerText = '▼'; // Show the minimize icon
            } else {
                popupContainer.style.display = 'none';
                toggleButton.innerText = '▲'; // Show the maximize icon


            }
        });

        // Append the toggle button to the document body
        document.body.appendChild(toggleButton);


          let isDragging = false;

    // Offset values to adjust the container position while dragging
    let offsetX = 0;
    let offsetY = 0;

    // Flag to track if the click is intended for input interaction
    let isInputInteraction = false;

    // Function to handle the mouse down event on the container
    function onMouseDown(event) {
        isInputInteraction = false;

        // Check if the click is inside an input field or textarea
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            isInputInteraction = true;
        } else {
            isDragging = true;

            // Calculate the offset between the mouse position and the container's position
            offsetX = event.clientX - popupContainer.getBoundingClientRect().left;
            offsetY = event.clientY - popupContainer.getBoundingClientRect().top;

            // Add a class to change the cursor to indicate dragging
            popupContainer.classList.add('dragging');

            // Prevent text selection during drag
            event.preventDefault();
        }
    }

    // Function to handle the mouse move event
    function onMouseMove(event) {
        if (isDragging) {
            // Calculate the new container position based on mouse position and offset
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;

            // Set the new container position
            popupContainer.style.left = newX + 'px';
            popupContainer.style.top = newY + 'px';
        }
    }

    // Function to handle the mouse up event
    function onMouseUp() {
        if (isDragging) {
            // Reset the dragging flag and remove the dragging class
            isDragging = false;
            popupContainer.classList.remove('dragging');
        }
    }

    // Add event listeners for mouse events on the container
    popupContainer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    // Add event listeners for mouse events on the container
    popupContainer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
          function stopPropagation(event) {
        event.stopPropagation();
    }

    // Add event listeners for input fields and text areas to stop event propagation
    const inputFields = popupContainer.querySelectorAll('input, textarea');
    inputFields.forEach((input) => {
        input.addEventListener('mousedown', stopPropagation);
    });

    // Append the container to the body

        // Append the popup container to the document body
        document.body.appendChild(popupContainer);
        // Function to close the popup container
        function closePopup() {
            document.body.removeChild(popupContainer);
        }
        // Create a close button for the popup container
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.width = '100%';
        closeButton.addEventListener('click', closePopup);
        // Append the close button to the popup container
        popupContainer.appendChild(closeButton);

        searchButton.addEventListener('click', async () => {
            const searchKey = inputField.value.trim();
            if (searchKey) {
        // Construct the URL based on the user's input and headers
        const loadingMessage = 'Loading data...'; // You can display this in an element on your page
        const baseUrl = 'https://sellercentral.amazon.com/rcpublic/productmatch';
        const countryCode = 'US';
        const locale = 'en-US';
        const productMatchURL = `${baseUrl}?searchKey=${encodeURIComponent(searchKey)}&countryCode=${countryCode}&locale=${locale}`;

        // Set the headers for the GM_xmlhttpRequest
        const headers = {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            // "Cookie": "session-id=147-7175670-0319506; coveo_visitorId=e40ac9ea-fc1c-4db0-dbbe-eed151df1236; ...", // Add your cookies here
            "Pragma": "no-cache",
            "Referer": "https://sellercentral.amazon.com/hz/fba/profitabilitycalculator/index?lang=en_US",
            "Sec-Ch-Ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"Windows\"",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        };
        // Make the request to fetch product data
        GM_xmlhttpRequest({
            method: 'GET',
            url: productMatchURL,
            headers: headers,
            responseType: "json", // Set the response type to JSON
            onload: function(response) {
                // Parse the JSON response
                const data = response.response;

                if (data.data.otherProducts.products.length === 1) {
                    // If there's only one product, pass its ASIN directly
                    const selectedAsin = data.data.otherProducts.products[0].asin;
                    startss(selectedAsin);
                } else {
                    // If there are multiple products, display the selection list
                    displaySearchResults(data.data.otherProducts.products, resultsContainer);
                }
            },
            onerror: function(error) {
                console.error('Error:', error);
            },
        });
    } else {
        alert('Please enter a valid search key.');
    }
});
    }
    let Salesdata;


    function extractCategoryAndRank(data) {
        // Use the provided mapping data to find the category ID based on categoryName
        const categoryName= data.data.otherProducts.products[0].salesRankContextName;
        const salesRankNumber=data.data.otherProducts.products[0].salesRank;

        const categoryMapping = {
            'Toys & Games': 'VG95cyAmIEdhbWVz',
            'Beauty & Personal Care': 'QmVhdXR5ICYgUGVyc29uYWwgQ2FyZQ==',
            'Home & Kitchen': 'SG9tZSAmIEtpdGNoZW4=',
            'Kitchen & Dining': 'S2l0Y2hlbiAmIERpbmluZw==',
            'Tools & Home Improvement': 'VG9vbHMgJiBIb21lIEltcHJvdmVtZW50',
            'Health & Household': 'SGVhbHRoICYgSG91c2Vob2xk',
            'Grocery & Gourmet Food': 'R3JvY2VyeSAmIEdvdXJtZXQgRm9vZA==',
            'Arts, Crafts & Sewing': 'QXJ0cywgQ3JhZnRzICYgU2V3aW5n',
            'Clothing, Shoes & Jewelry': 'Q2xvdGhpbmcsIFNob2VzICYgSmV3ZWxyeQ==',
            'Patio, Lawn & Garden': 'UGF0aW8sIExhd24gJiBHYXJkZW4=',
            'Office Products': 'T2ZmaWNlIFByb2R1Y3Rz',
            'Industrial & Scientific': 'SW5kdXN0cmlhbCAmIFNjaWVudGlmaWM=',
            'Sports & Outdoors': 'U3BvcnRzICYgT3V0ZG9vcnM=',
            'Electronics': 'RWxlY3Ryb25pY3M=',
            'Automotive': 'QXV0b21vdGl2ZQ==',
            'Pet Supplies': 'UGV0IFN1cHBsaWVz',
            'Musical Instruments': 'TXVzaWNhbCBJbnN0cnVtZW50cw==',
            'Baby': 'QmFieQ==',
            'Audio & Video Connectors & Adapters': 'QXVkaW8gJiBWaWRlbyBDb25uZWN0b3JzICYgQWRhcHRlcnM=',
            'Video Games': 'VmlkZW8gR2FtZXM=',
            'Cell Phones & Accessories': 'Q2VsbCBQaG9uZXMgJiBBY2Nlc3Nvcmllcw==',
        };
        if(categoryMapping===null &&categoryMapping===undefined ){
        return false
        }
        // Get the category ID from the mapping
        const categoryID = categoryMapping[categoryName];

        if (categoryID) {
            // Make the request to fbatoolkit.com
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://www.fbatoolkit.com/estimate_ajax?category=${categoryID}&rank=${salesRankNumber}`,
                responseType: 'json',
                onload: function (response) {
                    if (response.status === 200 && response.response) {
                        const result = response.response;
                        Salesdata=result
                        console.log(Salesdata,'SalesdataSalesdata')
                        // Process and log the result as needed
                    } else {
                        console.error('Failed to fetch data from fbatoolkit.com');
                    }
                },
                onerror: function (error) {
                    console.error('Error occurred during the request:', error);
                },
            });
        } else {
            console.error('Category not found in the mapping data');
        }
    }
    let result
    // Function to make an HTTP GET request with custom headers using GM_xmlhttpRequest
    function sendGetRequestWithHeaders(asin){
        const headers = {
            ":authority": "sellercentral.amazon.com",
            ":method": "GET",
            ":path": "/productsearch/v2/search?q=B00BUFY6OU&page=1",
            ":scheme": "https",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            // "Cookie": "session-id=147-7175670-0319506; coveo_visitorId=e40ac9ea-fc1c-4db0-dbbe-eed151df1236; _mkto_trk=id:365-EFI-026&token:_mch-amazon.com-1694563789449-88978; ubid-main=132-7328074-6791449; AMCV_4A8581745834114C0A495E2B%40AdobeOrg=-2121179033%7CMCIDTS%7C19614%7CMCMID%7C08932826623336785312482042192219661212%7CMCAAMLH-1695169174%7C12%7CMCAAMB-1695169174%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1694571574s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C5.3.0; mbox=session#0821b38ce4ff4ccbb707a6fe6a57ed26#1694566352|PC#0821b38ce4ff4ccbb707a6fe6a57ed26.41_0#1757809292; s_nr=1694564527082-New; s_lv=1694564527082; i18n-prefs=USD; av-profile=cGlkPWFtem4xLmFjdG9yLnPolicies;",
            "Pragma": "no-cache",
            "Sec-Ch-Ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"Windows\"",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-User": "?1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
        };
        GM_xmlhttpRequest({
            method: "GET", // or "POST" if appropriate
            url: `https://sellercentral.amazon.com/productsearch/v2/search?q=${asin}`,
            responseType: "text",
            onload: function (response) {

                if (response.status === 200) {
                    const htmlData = response.responseText; // HTML data

                    result = JSON.parse(htmlData);
                    // You can process jsonData here as needed
                    console.log(result,'resultresultresult')
                } else {
                    console.error("HTTP error! Status:", response.status);
                }
            },
            onerror: function (error) {
                result="please login"
                console.error("Request failed:", error);
            },
        });

    }




    class HttpService {
        get(url, callback) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: response => {

                    callback(response.responseText);
                }
            });
        }

        post(url, data, callback) {
            GM_xmlhttpRequest({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(data),

                onload: response => {
                    callback(response.responseText);

                }
            });
        }
    }

    // Function to check if the page is a login page
    var isHazmat;

    function isLoginPage(result) {
        if (typeof result === 'object') {
            return false;
        }

        return (result && result.indexOf('<title dir="ltr">Amazon Sign In</title>') !== -1) ||
            (result && result.indexOf('<title dir="ltr">Amazon Anmelden</title>') !== -1) ||
            (result && result.indexOf('<title dir="ltr">Iniciar sesiÃ³n en Amazon</title>') !== -1) ||
            (result && result.indexOf('<title dir="ltr">Connexion Amazon</title>') !== -1) ||
            (result && result.indexOf('<title dir="ltr">Amazon Accedi</title>') !== -1) ||
            (result && /ap_password/.exec(result));
    }

    // Constants
    const RESPONSE_LOGIN = 'Login Page';
    const RESPONSE_HAZMAT = 'Hazmat';
    const RESPONSE_NOT_HAZMAT = 'Not Hazmat';
    const POST_URL = `https://upsellecommerce.com`; // Replace with your specific POST URL

    // Function to check if a product is Hazmat or not
    function isHazMat(asin, callback) {
        const URL = 'https://sellercentral.amazon.com/hz/m/sourcing/inbound/eligibility?ref_=ag_src-elig_cont_src-mdp&asin=' + asin;
        const http = new HttpService();

        http.get(URL, result => {

            const parser = new DOMParser();
            const doc = parser.parseFromString(result, "text/html");


            if (isLoginPage(result)) {
                callback(RESPONSE_LOGIN);

            } else {
                const hazmatResult = /Hazmat/.exec(result) ? RESPONSE_HAZMAT : RESPONSE_NOT_HAZMAT

                isHazmat=hazmatResult
                http.post(POST_URL, {
                    asin: asin,
                    type: 'hazmat',
                    marketplace: 'com', // Update this to your specific domain if needed
                    result: hazmatResult === RESPONSE_HAZMAT ? 1 : 0,
                }, () => {
                    callback(hazmatResult);

                });
            }
        });
    }

    // Usage

 let Amazondata;
let fbasellerdata;

// Function to make an HTTP GET request with custom headers using GM_xmlhttpRequest
function sendGetRequestWithHeaders2(url, headers, successCallback, errorCallback) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        responseType: "text",
        headers: headers,
        onload: function (response) {
            if (response.status === 200) {
                const htmlData = response.responseText;
                successCallback(htmlData);
            } else {
                errorCallback(`HTTP error! Status: ${response.status}`);
            }
        },
        onerror: function (error) {
            errorCallback(`Request failed: ${error}`);
        },
    });
}

// Function to fetch Amazon data by ASIN
function Amzondata(asin) {
    const url = `https://sellercentral.amazon.com/abis/ajax/reconciledDetailsV2?asin=${asin}&marketplaceId=1`;
    const headers = {
        // Add your custom headers here
    };
    sendGetRequestWithHeaders2(url, headers,
        function (htmlData) {
            const result = JSON.parse(htmlData);
            console.log('Amazon Data:', result);
            Amazondata = result;
        console.log(Amazondata,'AmazondataAmazondata')
        },
        function (error) {
            Amazondata = "Please login";
            console.error(error);
        }
    );
}


// Function to fetch data from Seller Central
//// Define a function to fetch data from a single page

// Define a function to fetch data from a single page


    let Mysellerdata=[]

// Start fetching data from the first page

// Call the fetchDataFromSellerCentral3 function



     function extractSellerInfo(htmlBlock) {
        var tempElement = document.createElement('div');
        tempElement.innerHTML = htmlBlock;


        var sellerLinkElement = tempElement.querySelector('.a-size-small.a-link-normal');
        var sellerHref = sellerLinkElement ? sellerLinkElement.getAttribute('href') : '';
        var sellerIdMatch = /seller=([^&]+)/.exec(sellerHref);
        var sellerId = sellerIdMatch ? sellerIdMatch[1] : '';
        var sellerName = sellerLinkElement ? sellerLinkElement.textContent.trim() : '';
        var isAmazonFulfilled = sellerHref.includes('isAmazonFulfilled=1') ? 'FBA' : 'FBM';
        var sellerRatingElement = tempElement.querySelector('.a-icon.a-icon-star-mini.a-star-mini-5.aod-seller-rating-count-class');
         console.log(sellerRatingElement,'sellerRatingElementsellerRatingElement')
        var sellerRatingText = sellerRatingElement ? sellerRatingElement.nextElementSibling.textContent.trim() : '';
        var ratingInfo = extractRatingInfo(sellerRatingText);
        var sellerURL = 'https://www.amazon.com' + sellerHref;

        var sellerData = {
            sellerName: sellerName,
            sellerId: sellerId,
            isAmazonFulfilled: isAmazonFulfilled,
            ratingNumber: ratingInfo.ratingNumber,
            positivePercentage: ratingInfo.positivePercentage,
            positiveOverText: ratingInfo.textAfterPositiveOver.trim(),
            sellerURL: sellerURL,
        };
        return sellerData;
         console.log(sellerData,'sellerDatasellerDatasellerData')
    }

    // Function to extract rating number, positive percentage, and text after "positive over"
    function extractRatingInfo(ratingText) {
        console.log(ratingText,'ratingTextratingText')
        var parts = ratingText.split(' ');
            const ratingNumberMatch = /\b(\d+)\s+ratings\b/.exec(ratingText);
    const ratingNumber = ratingNumberMatch ? parseInt(ratingNumberMatch[1]) : null;
        var percentagePart = parts.find(part => part.endsWith('%'));
        var positivePercentage = percentagePart ? parseInt(percentagePart) : null;
        var overIndex = parts.indexOf('over');
        var textAfterPositiveOver = overIndex !== -1 ? parts.slice(overIndex + 1).join(' ') : '';

        return {
            ratingNumber: ratingNumber,
            positivePercentage: positivePercentage,
            textAfterPositiveOver: textAfterPositiveOver,
        };
    }

    // Function to fetch seller data based on option count
    // Function to fetch seller data based on option count
// Function to fetch seller data based on option count
async function sellerDataFetch(optionCount,asin) {
  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(optionCount / itemsPerPage); // Calculate the total number of pages

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    const productMatchURL = `https://www.amazon.com/gp/product/ajax/ref=dp_aod_NEW_mbc?asin=${asin}&&m=&qid=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=&pc=dp&experienceId=aodAjaxMain&pageno=${pageNumber}`;
    console.log(pageNumber, 'pageNumberpageNumber');

    const response = await fetch(productMatchURL, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0", // You can set a user agent here
      },
    });
    if (response.ok) {
      const data = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // Find and extract seller information
      const htmlBlocks = doc.querySelectorAll('.aod-information-block');
      const sellerInfoArray = Array.from(htmlBlocks).map(htmlBlock => extractSellerInfo(htmlBlock.innerHTML));
      Mysellerdata.push(...sellerInfoArray);

        console.log(Mysellerdata,'sellerInfoArraysellerInfoArray')
    } else {
      console.error(`HTTP error! Status: ${response.status}`);
    }
  }
}

  function fetchDataFromSellerCentral3(asin) {
  const productMatchURL = `https://www.amazon.com/gp/product/ajax/ref=dp_aod_NEW_mbc?asin=${asin}&&m=&qid=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=&pc=dp&experienceId=aodAjaxMain`;
  // Clear the existing data
  Mysellerdata = [];
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: productMatchURL,
      headers: {
        "User-Agent": "Mozilla/5.0", // You can set a user agent here
      },
      onload: response => {
        if (response.status === 200) {
          const data = response.responseText;
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");

          // Fetch the offerCountElement by its ID
          const offerCountElement = doc.getElementById('aod-filter-offer-count-string');
          if (offerCountElement) {
            const offerCountText = offerCountElement.textContent.trim();
            console.log(offerCountText, 'offerCountText');
            const math = offerCountText.match(/\d+/g);
            console.log(math, 'mathmathmathmath');
            if (math && math[0] !== null && math[0] !== undefined) {
              sellerDataFetch(math[0], asin);
            } else {
              // Handle the case where math or math[0] is null or undefined
              // Set the page to 1
              sellerDataFetch(1, asin);
            }
          } else {
            console.error("Offer Count element not found in the fetched HTML.");
          }

          resolve(); // Resolve without passing any data
        } else {
          reject(new Error(`HTTP error! Status: ${response.status}`));
        }
      },
      onerror: error => {
        reject(new Error(`Request failed: ${error}`));
      },
    });
  });
}

   let melatbleMathc;
function getMeltable(asin) {


  const productMatchURL = `https://app.oaroulette.com/asingadget/?check&asin=${asin}&type`;

  GM_xmlhttpRequest({
    method: "GET",
    url: productMatchURL,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Ch-Ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    },
    onload: response => {
      if (response.status === 200) {
        const datadata = response.responseText;
        // Process and use the data here (e.g., store it in the global variable)
        const parsedData = JSON.parse(datadata);
        const matchValue = parsedData.match;
        console.log(matchValue, 'matchValuematchValue');
        melatbleMathc = matchValue;
        // Fetch the offerCountElement by its ID
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    },
    onerror: error => {
      console.error(`Request failed: ${error}`);
    },
  });
}

    let Ratings;
    // Define a function to fetch Amazon review info
function fetchAmazonReviewInfo(asin) {
  const url = `https://www.amazon.com/product-reviews/${asin}/ref=cm_cr_arp_d_viewopt_fmt?reviewerType=avp_only_reviews&formatType=all_formats`;

  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0',
      // Add other headers as needed
    },
    onload: function (response) {
      if (response.status === 200) {
        // Extract and process the review data here
        const data = response.responseText;
 const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
         Ratings=doc

      } else {
        console.error('Request failed with status', response.status);
      }
    },
    onerror: function (error) {
      console.error('Request failed:', error);
    },
  });
}
    let singlevalueRating
function fetchAmazonReviewSingleInfo(asin) {
  const url = `https://www.amazon.com/product-reviews/${asin}/ref=cm_cr_arp_d_viewopt_fmt?reviewerType=all_reviews&formatType=current_format&pageNumber=1`;

  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0',
      // Add other headers as needed
    },
    onload: function (response) {
      if (response.status === 200) {
        // Extract and process the review data here
        const data = response.responseText;
 const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");


 const ratingsingleElement = doc.querySelector(".a-row.a-spacing-base.a-size-base")
          const textVlaueSingle=ratingsingleElement.textContent
                const regex = /(\d+) total ratings/;
const singleratin = textVlaueSingle.match(regex);

if (singleratin && singleratin.length > 1) {
    singlevalueRating = singleratin[1];
} else {
    // Handle the case where singleratin is null, undefined, or doesn't have at least two elements.
    // You can set a default value or show an error message.
}






      } else {
        console.error('Request failed with status', response.status);
      }
    },
    onerror: function (error) {
      console.error('Request failed:', error);
    },
  });
}
// Call the function with the desired ASIN

    // Call the function to make the GET request
    function displayProductInfo(productData,feesdata) {
  // Assuming you have an array of arrays like Mysellerdata
        console.log(Mysellerdata,'MysellerdataMysellerdata')


    const productInfoContainer = document.createElement('div');
    productInfoContainer.id = 'productInfoContainer'; // You can set an ID to target it later if needed
    productInfoContainer.style.position = 'fixed';
    productInfoContainer.style.top = '18%';
    productInfoContainer.style.left = '30%';
    productInfoContainer.style.background = 'white';
    productInfoContainer.style.padding = '4px';
    productInfoContainer.style.border = '1px solid #ccc';
    productInfoContainer.style.zIndex = '9999';


    productInfoContainer.style.overflowY = 'scroll'; // Enable vertical scrolling

// Get the button element by its ID



    // Create the toggle button for productInfoContainer
    const toggleProductInfoButton = document.createElement('button');
    toggleProductInfoButton.innerText = '▼'; // You can replace this with a white circle icon
    toggleProductInfoButton.style.position = 'fixed';
    toggleProductInfoButton.style.bottom = '20px';
    toggleProductInfoButton.style.right = '20px';
    toggleProductInfoButton.style.background = 'white';
    toggleProductInfoButton.style.border = 'none';
    toggleProductInfoButton.style.borderRadius = '50%';
    toggleProductInfoButton.style.width = '40px';
    toggleProductInfoButton.style.height = '40px';
    toggleProductInfoButton.style.fontSize = '20px';
    toggleProductInfoButton.style.zIndex = '9999';




    // Flag to track the visibility state of the productInfoContainer
    let isProductInfoVisible = true;

    // Function to toggle the visibility of the productInfoContainer
    function toggleProductInfoVisibility() {
        if (isProductInfoVisible) {
            productInfoContainer.style.display = 'none';
            toggleProductInfoButton.innerText = '▲'; // Show the maximize icon
            isProductInfoVisible = false;
        } else {
            productInfoContainer.style.display = 'block';
            toggleProductInfoButton.innerText = '▼'; // Show the minimize icon
            isProductInfoVisible = true;
        }
    }

    // Add a click event listener to the toggle button
    toggleProductInfoButton.addEventListener('click', toggleProductInfoVisibility);

    // Append the toggle button to the body
    document.body.appendChild(toggleProductInfoButton);

  // Flag to track if the container is being dragged
    let isDragging = false;

    // Offset values to adjust the container position while dragging
    let offsetX = 0;
    let offsetY = 0;

    // Flag to track if the click is intended for input interaction
    let isInputInteraction = false;

    // Function to handle the mouse down event on the container
    function onMouseDown(event) {
        isInputInteraction = false;

        // Check if the click is inside an input field or textarea
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            isInputInteraction = true;
        } else {
            isDragging = true;

            // Calculate the offset between the mouse position and the container's position
            offsetX = event.clientX - productInfoContainer.getBoundingClientRect().left;
            offsetY = event.clientY - productInfoContainer.getBoundingClientRect().top;

            // Add a class to change the cursor to indicate dragging
            productInfoContainer.classList.add('dragging');

            // Prevent text selection during drag
            event.preventDefault();
        }
    }

    // Function to handle the mouse move event
    function onMouseMove(event) {
        if (isDragging) {
            // Calculate the new container position based on mouse position and offset
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;

            // Set the new container position
            productInfoContainer.style.left = newX + 'px';
            productInfoContainer.style.top = newY + 'px';
        }
    }

    // Function to handle the mouse up event
    function onMouseUp() {
        if (isDragging) {
            // Reset the dragging flag and remove the dragging class
            isDragging = false;
            productInfoContainer.classList.remove('dragging');
        }
    }

    // Add event listeners for mouse events on the container
    productInfoContainer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    // Add event listeners for mouse events on the container
    productInfoContainer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
          function stopPropagation(event) {
        event.stopPropagation();
    }

    // Add event listeners for input fields and text areas to stop event propagation
    const inputFields = productInfoContainer.querySelectorAll('input, textarea');
    inputFields.forEach((input) => {
        input.addEventListener('mousedown', stopPropagation);
    });


        // Select all elements with id="aod-offer-shipsFrom"

// Iterate through each element and extract the anchor tag within it

        // Append the container to the body
    document.body.appendChild(productInfoContainer);


        // Append the link to the document's head

        // Create an embedded style element for CSS styles
        const style = document.createElement('style');
        style.innerHTML = `

  body {
        padding: 0px !important;
    }

    body {
         font-size: 14px !important;
    line-height: 13px !important;
    }

    .row1 {
        display: flex !important;
        justify-content: space-between !important;
    }

  h5 {
    padding: 0px !important;
    font-weight: 700 !important;
    font-size: 8px !important;
    line-height: 13px !important;
    margin: 0px !important;
}

    .column2 h5 {
        padding: 0px 2px !important;
    }

   .containeryyy {
    margin: 7px !important;
    width: 511px !important;
    background: white!important;
}

    .rowwgrid {
    display: flex;
    gap: 18px;
    justify-content: center;
}

    .inforcontainer {
        display: flex;
        gap:3px;
    }

   .inforcontainer h5 {
    color: grey;
    padding: 0px;
    margin: 0px !important;
}

   input {
    width: 50px;
    height: 0.9rem;
    display: table;
    margin: 4.5px;
    position: relative;
        border: 1px solid;
}

    .inforcontainergrid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .ggg h5 {
    margin-top: 6px !important;
}
ul>li, ol>li {
    margin-bottom: 0px !important;
    font-size:10px;
    list-style: none;
}

    .newinput input {
    /* margin-top: 7px; */
    height: 14px !important;
    position: relative !important;
    right: 1px !important;

    /* top: -1px; */
}
   .gridDisplya {
    display: flex !important;
    gap: 5p !importantx;
    justify-content: center !important;
}
div#amazon-popup {
    width: 502px !important;
}
    .class1 {
    height: 16px !important;
}
div#unqiyee h5 {
    line-height: 17px !important;
}
.close-button {
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      cursor: pointer !important;
    }
    ul#Sellers {
    padding: 0px;
    display: flex !important;
    margin: 0px !important;
}
     .flexjs h5 {
    margin-top: 3px !important;
}


h5#product {
    margin: 0 3px 0 0 !important;
}
button, input[type=button], input[type=reset], input[type=submit] {
    cursor: pointer;
    font-size: 7px;
}
h4 {
    font-size: 7px !important;
    line-height: 11px !important;
    margin-bottom: 0px !important;
}
  `;

        // Set the HTML content based on the product data

        productInfoContainer.innerHTML = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="containeryyy">
        <div class="row1">
            <div class="" style="display:flex">
                <h5 style="color: green;"  id='product'> Product Title</h5>
                <h5>SR</h5>
                <h5 style="color: green;"  id='salesrank'> Product Title</h5>

  <img id="image"  style="width:40px;height:26px"></img>
            </div>

            <div class="column2" style="display: flex;justify-content: space-between;">
                <i class="fa-solid fa-biohazard"></i>
            </div>
        </div>
        <hr>
        <!-- row2 -->
        <div class="rowwgrid">
            <div class="" style="width: 70px;">
                <img id='singleimg' width="70px" height="70px" src="https://source.unsplash.com/user/c_v_r/1900x800        ">
                <div class="" style="display: flex;">
                    <h5>
                        NetProfit:
                    </h5>
                    <h5   id='netprofit'>
                        $5:
                    </h5>
                </div>
                <div class="" style="display: flex;">
                    <h5>
                        NetMargin:
                    </h5>
                    <h5  id='netMargin' >
                        $5:
                    </h5>
                </div>
                <div class="" style="display: flex;">
                    <h5>
                        NetRoi:
                    </h5>
                    <h5  id='rateroi'>
                        $5:
                    </h5>
                </div>
                <div class="" style="display: flex;">
                    <h5>
                        Sales:
                    </h5>
                    <h5  id='perdaySales' style="color:red">
                        $5:
                    </h5>
                </div>
            </div>
            <!-- grid2 -->
            <div class="inforcontainer">
                <div class="">
                    <h5 style="color: green;">ASIN:</h5>
                    <h5 style="color: green;">Category:</h5>
                    <h5 style="color: green;">UPC:</h5>
                    <h5 style="color: green;">EAN:</h5>
                    <h5 style="color: green;">Model:</h5>
                    <h5 style="color: green;">QTY:</h5>
                    <h5 style="color: green;">FBAFulfillmentFees:</h5>
                    <h5 style="color: black;">Amazon Fees:</h5>
                    <h5 style="color: green;">Referral Fee:</h5>
                </div>
                <div class="">
                <div class="" style="display:flex">
                    <h5 id='asin'>6545678u8</h5>
                <a id="amurl" style="color: red;" href="">
                <img id="shareimg" src="" style="width:15px">
                </a>
                </img>
                </div>
                    <h5 id="categoryname">6545678u8</h5>
                    <h5 id="upc">6545678u8</h5>
                    <h5 id="ean">EAN</h5>
                    <h5 id="Model">Model</h5>
                    <h5 id="packageQuantity">QTY</h5>
                    <h5 id="FBAfulfillmentfees">3.75</h5>
                    <h5  id="totalAmazonfees" style="color:red">$9.44</h5>
                    <h5 id="ReferralFee">$9.44</h5>
                </div>
            </div>
            <!-- grid3 -->
            <div class="inforcontainer">
                <div class="">
                    <h5 style="color: blue;">Lowest New:</h5>
                    <h5 style="color: blue;">Buybox:</h5>

                    <h5 style="color: blue;">Brand Name:</h5>
                    <h5 style="color: blue;">is_prime_eligible:</h5>
                    <h5 style="color: blue;">Sellers:</h5>
                    <h5 style="color: black;">calculate Price By Margin:</h5>
                    <h5 style="color: black;">calculate Price By ROI:</h5>
                    <h5 style="color: black;">Desired Output:</h5>
                    <h5 style="color: black;">Seller data:</h5>
                    <div class="showornot">
                    <h5 style="color:black">Meltable </h5>
                    <h5 style="color:red"> Total Reviews</h5>
                    <h5 style="color:red">Total Ratings</h5>
                    <h5 style="color:red">Percent of total </h5>


                    </div>

                </div>
                <div class="">
                    <h5 id="lowestPrice">6545678u8</h5>
                    <h5 id="buybox">6545678u8</h5>
                    <h5 id="brandname">Model</h5>
                    <h5 id="is_prime_eligible">QTY</h5>
                    <ul id="Sellers"   href="">
                    </ul>
                    <h5 id="calculatePriceByMarginvalue" style="color:red">22</h5>
                    <h5 style="color:red"  id="roivalue">2</h5>
                    <h5 style="color:red" id="desiredProfitvalue">88</h5>
                    <button style="color: grey;"  id="sellerdata">Click Here</button>
                    <div class="showornot">

                    <h5 style="color:red"  id="Meltable">sellerName</h5>
                    <h5 style="color:red"  id="ratings">sellerId</h5>
                        <h5 style="color:red" id="Reviews">Reviews</h5>
                    <h5 style="color:red" id="Percentrating">Percent of total </h5>


                    </div>

                </div>
            </div>
        </div>
        <hr>

        <!-- grid2 -->
        <div class="gridDisplya">

            <div class="inforcontainergrid ggg" style="display:flex">
                <div class="">
                    <h5 style="color: black;">TotalCOG:</h5>
                    <h5 style="color: black;">COGS:</h5>
                    <h5 style="color: black;">Amazon Units:</h5>
                    <h5 style="color: black;">Units:</h5>
                    <h5 style="color: black;">Price:</h5>
                    <h5 style="color: black;margin-top:5px">calculate Price By Margin:</h5>
                    <h5 style="color: black;">calculate Price By ROI:</h5>
                    <h5 style="color: black;">Desired profit:</h5>

                </div>
                <div class="hiderlex">
                    <h5 style="color: grey;" id="costPerunit">8765</h5>
                    <h5 style="color: grey;" id="resultOutput"></h5>
                    <input style="color: grey;" id="AmazonUnits"></input>
                    <input style="color: grey;" id="units"></input>
                    <input style="color: grey;" id="price"></input>
                    <input style="color: grey;"id="calculatePriceByMargin"></input>
                    <input style="color: grey;" id="calculatePriceByROI"></input>
                    <input style="color: grey;"  id="desiredProfit"></input>


                </div>
            </div>

            <!-- col2 -->
            <div class="inforcontainergrid" style="display:flex">
                <div class="flexjs">
                    <h5 style="color: black;position:relative;top:-3px">Expenses:</h5>
                    <h5 style="color: black;position:relative;top:-7px">Ship To Amazon:</h5>

                    <h5 style="color: green;">Weight:</h5>
                    <h5 style="color: green;">Prep:</h5>
                    <h5 style="color: green;">ShipToPrep:</h5>
                    <h5>
                        AmazonPrice:
                    </h5>
                </div>
                <div class="">
                <div class="dudh" id="djncb" style="">
                <h5 style="color: red;" id="Miscellaneous">999</h5>
                    <h5 style="color: red;" id="shiptoamaazon">999</h5>
                </div>

                    <input style="color: grey;" id="shipamazon"></input>
                    <input style="color: grey;" id="Prep"></input>
                    <input style="color: grey;" id="shipping"></input>
                                        <input placeholder="Amazon price" id="itemprice">

                </div>
            </div>

            <!-- //col3 -->

            <div class="inforcontainergrid" id="unqiyee"  style="display:flex">
                <div class="">
                    <h5 style="color: black;">Fullfillmentcost:</h5>
                    <h5 style="color: green;">Inventory placement:</h5>
                    <h5 style="color: green;">Opaquebagging:</h5>
                    <h5 style="color: green;">Tape:</h5>
                    <h5 style="color: green;">Bubblewrap:</h5>
                    <h5 style="color: green;">Label:</h5>
                    <h5 style="color: green;">Bagging:</h5>
                    <h5 style="color: green;">storage perunit (JantoSep):</h5>
                    <h5 style="color: green;">storage perunit(OcttoDec):</h5>



                </div>
                <div class="newinput">
                    <h5 style="color: grey;" id="Fulfillment">999</h5>
                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="Inventory"></input>
                        <h5 style="color: blueviolet;" id="Inventorys">$6</h5>
                    </div>

                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="Opaque"></input>
                        <h5 style="color: blueviolet;" id="Opaques">$6</h5>
                    </div>
                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="Tape"></input>
                        <h5 style="color: blueviolet;" id="Tapes">$6</h5>
                    </div>
                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="Bubble"></input>
                        <h5 style="color: blueviolet;" id="Bubbles">$6</h5>
                    </div>
                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="Label"></input>
                        <h5 style="color: blueviolet;" id="Labels">$6</h5>
                    </div>
                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="Bagging"></input>

                        <h5 style="color: blueviolet;" id="Baggings">$6</h5>
                    </div>


                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="costperunitbox"></input>

                        <h5 style="color: blueviolet;" id="costperunit">$6</h5>
                    </div>
                    <div class="class1" style="display: flex;">
                        <input style="color: grey;" type="checkbox" id="costperunitsbox"></input>
                        <h5 style="color: blueviolet;" id="costperunits">$6</h5>
                    </div>
                </div>
            </div>
        </div>

    </div>

</body>
</html>

  `;
        productInfoContainer.appendChild(style);

        const Buttonseller = productInfoContainer.querySelector('#sellerdata');


// Create a popup element
const popupElement = document.createElement('div');
popupElement.id = 'popupContainer';
popupElement.style.position = 'fixed';
popupElement.style.height = '500px';
popupElement.style.overflow = 'scroll';


popupElement.style.top = '50%';
popupElement.style.left = '20%';
popupElement.style.transform = 'translate(-50%, -50%)';
popupElement.style.background = 'white';
popupElement.style.padding = '20px';
popupElement.style.border = '1px solid #ccc';
popupElement.style.zIndex = '999';
popupElement.style.display = 'none'; // Initially hide the popup
const h5Tags = popupElement.querySelectorAll('h5');

// Set the font size for each h5 tag
h5Tags.forEach(h5 => {
  h5.style.fontSize = '6px'; // Change the font size to your desired value (e.g., '16px')
});
// Add content to the popup element
               const style2 = document.createElement('style');
style2.innerHtml=`
body{
background:red;
}
`

popupElement.innerHTML = `
  <p>Seller Data</p>
  <div class="" style="display:flex;gap: 8px;">
  <p >Fba</p>
  <p style="color:green" id="fba"></p>
   <p >Fbm</p>
  <p style="color:green" id="fbm"></p>
  </div>
  <table border="1">
        <tr>
          <th>positiveOverText</th>
          <th>sellerId</th>
          <th>sellerName</th>
          <th>ratingNumber</th>
          <th>Postive Percentage</th>
        </tr>
        <tr>
          <td id="positiveOverText"></td>
          <td id="sellerId"></td>
          <td id="sellerName"></td>
          <td id="ratingNumber"></td>
          <td id="PostivePercentage"></td>
        </tr>

      </table>
<button id="closePopupButton">Close</button>
`;

// Append the popup element to the body
document.body.appendChild(popupElement);
         popupElement.appendChild(style2);

// Add an event listener to the Buttonseller to show the popup
Buttonseller.addEventListener('click', () => {
  // Show the popup
  popupElement.style.display = 'block';
    console.log('shgihsjkjhbjksjhbn')
});


  const positiveOverText = popupElement.querySelector('#positiveOverText');
  const sellerId = popupElement.querySelector('#sellerId');
  const sellerName = popupElement.querySelector('#sellerName');
  const ratingNumber = popupElement.querySelector('#ratingNumber');
const fba = popupElement.querySelector('#fba');
  const fbm = popupElement.querySelector('#fbm');
  const PostivePercentage = popupElement.querySelector('#PostivePercentage');





      Mysellerdata.forEach(data => {
  positiveOverText.innerHTML += `<h5 style="font-size:6px">${data.positiveOverText}</h5>`;
});

          Mysellerdata.forEach(data => {
  sellerId.innerHTML += `<h5 style="font-size:6px">${data.sellerId}</h5>`;
});


        Mysellerdata.forEach(data => {
  sellerName.innerHTML += `<h5 style="font-size:6px">${data.sellerName}</h5>`;
});

        Mysellerdata.forEach(data => {
  PostivePercentage.innerHTML += `<h5 style="font-size:6px">${data.positivePercentage}</h5>`;
});



            Mysellerdata.forEach(data => {
  ratingNumber.innerHTML += `<h5>${data.ratingNumber}</h5>`;
});


let fbaCount = 0;
let fbmCount = 0;

Mysellerdata.forEach(data => {
  if (data.isAmazonFulfilled === 'FBA') {
    fbaCount++;
  } else if (data.isAmazonFulfilled === 'FBM') {
    fbmCount++;
  }
});

console.log(fbaCount, 'fbaCount');
console.log(fbmCount, 'fbmCount');

if (fbaCount) {
  fba.innerText = fbaCount;
} else {
  fba.innerText = '0';
}

if (fbmCount) {
  fbm.innerText = fbmCount;
} else {
  fbm.innerText = '0';
}



// Add an event listener to the close button to hide the popup
const closePopupButton = popupElement.querySelector('#closePopupButton');
closePopupButton.addEventListener('click', () => {
  // Hide the popup
  popupElement.style.display = 'none';
});



        const priceAmount = productData.price.amount;
        const shipping = productData.shipping.amount;
        const Referafes=feesdata.data.programFeeResultMap.MFN.otherFeeInfoMap.ReferralFee.total.amount
        const costperunitjan=feesdata.data.programFeeResultMap.Core.perUnitNonPeakStorageFee.total.amount
        const costperunitoct=feesdata.data.programFeeResultMap.Core.perUnitPeakStorageFee.total.amount
        const referralFeeRates = (Referafes /priceAmount) * 100;
        console.log(referralFeeRates)

        // Select the input element
        const priceInput = productInfoContainer.querySelector('#itemprice');
        const ReferralFees = productInfoContainer.querySelector('#ReferralFee');
        const FixedClosingFees = productInfoContainer.querySelector('#FixedClosingFee');
        const costperunisept = productInfoContainer.querySelector('#costperunit');
        const costperunitocts = productInfoContainer.querySelector('#costperunits');
        const Miscellaneous = productInfoContainer.querySelector('#Miscellaneous');
        const costPerunit = productInfoContainer.querySelector('#costPerunit');
        const totalAmazonfees = productInfoContainer.querySelector('#totalAmazonfees');
        const product = productInfoContainer.querySelector('#product');
        const asin = productInfoContainer.querySelector('#asin');
        const netprofit = productInfoContainer.querySelector('#netprofit');
        const netMargin = productInfoContainer.querySelector('#netMargin');
        const rateroi = productInfoContainer.querySelector('#rateroi');

        const upc = productInfoContainer.querySelector('#upc');
        const ean = productInfoContainer.querySelector('#ean');
        const amurl = productInfoContainer.querySelector('#amurl');
        const Sellers = productInfoContainer.querySelector('#Sellers');
        const image = productInfoContainer.querySelector('#image');
        const Meltable = productInfoContainer.querySelector('#Meltable');

Meltable.innerText=melatbleMathc

        const brandname = productInfoContainer.querySelector('#brandname');
        const buybox = productInfoContainer.querySelector('#buybox');
        const salesrank = productInfoContainer.querySelector('#salesrank');
        const is_prime_eligible = productInfoContainer.querySelector('#is_prime_eligible');
        const packageQuantity = productInfoContainer.querySelector('#packageQuantity');
        const lowestPrice = productInfoContainer.querySelector('#lowestPrice');
        const calculatePriceByMargin = productInfoContainer.querySelector('#calculatePriceByMargin');
        const calculatePriceByROI = productInfoContainer.querySelector('#calculatePriceByROI');
        const calculatePriceByMarginvalue = productInfoContainer.querySelector('#calculatePriceByMarginvalue');

        const desiredProfitvalue = productInfoContainer.querySelector('#desiredProfitvalue');
        const roivalue = productInfoContainer.querySelector('#roivalue');
        const desiredProfit = productInfoContainer.querySelector('#desiredProfit'); // Add a container to display the result
        const singleimg = productInfoContainer.querySelector('#singleimg'); // Add a container to display the result
        const newrating = productInfoContainer.querySelector('#ratings'); // Add a container to display the result
        const Reviews = productInfoContainer.querySelector('#Reviews');

        const Percentrating = productInfoContainer.querySelector('#Percentrating'); // Add a container to display the result
        // Add a container to display the result
          const ratingElement =Ratings&& Ratings.querySelector(".a-size-base.a-color-secondary");
          const newreviews = Ratings.querySelector(".a-size-medium.a-color-base");
let newRATING = newreviews.textContent;
Reviews.innerText = newRATING;

// Make sure ratingElement exists and contains content
if (ratingElement) {
    const ratingText = ratingElement.textContent;
    newrating.innerText = ratingText;
    const allratings = ratingText.match(/[\d,]+/g);
    let num = allratings ? allratings[0] : null; // Check if allratings is defined

    // Check if singlevalueRating and num are defined
    if (typeof singlevalueRating !== 'undefined' && num !== null) {
        // Assuming singlevalueRating and num are strings with commas
        const cleanedSinglevalueRating = singlevalueRating.replace(/,/g, ''); // Remove commas
        const cleanedNum = num.replace(/,/g, ''); // Remove commas

        // Convert the cleaned values to numbers
        const singleRating = parseFloat(cleanedSinglevalueRating);
        const number = parseFloat(cleanedNum);

        let final = (singleRating / number) * 100;
        let formattedFinal = final.toFixed(2) + '%';
        Percentrating.innerText = formattedFinal;
        // Use singleRating and number as needed
    } else {
        // Handle the case where singlevalueRating or num is not defined
        // You can set default values or show an error message.
    }
} else {
    console.error('Rating element not found.');
}



// Check if both values are valid numbers




        const Opaques = productInfoContainer.querySelector('#Opaques');
        const Tapes = productInfoContainer.querySelector('#Tapes');
        const Bubbles = productInfoContainer.querySelector('#Bubbles');
        const Labels = productInfoContainer.querySelector('#Labels');
        const Baggings = productInfoContainer.querySelector('#Baggings');
        const Inventorys = productInfoContainer.querySelector('#Inventorys');
        const breakEvenvalue = productInfoContainer.querySelector('#breakEvenvalue'); // Add a container to display the result

        const FBAfulfillmentfees = productInfoContainer.querySelector('#FBAfulfillmentfees');
        const Inventory = productInfoContainer.querySelector('#Inventory');
        const Opaque = productInfoContainer.querySelector('#Opaque');
        const Tape = productInfoContainer.querySelector('#Tape');
        const Bubble = productInfoContainer.querySelector('#Bubble');
        const Label = productInfoContainer.querySelector('#Label');
        const Bagging = productInfoContainer.querySelector('#Bagging');
        const Fulfillment = productInfoContainer.querySelector('#Fulfillment');
        const costperunitbox = productInfoContainer.querySelector('#costperunitbox');
        const costperunitsbox = productInfoContainer.querySelector('#costperunitsbox');
        const Model = productInfoContainer.querySelector('#Model');
        const shipamazon = productInfoContainer.querySelector('#shipamazon'); // Add a container to display the result
        const prepshipping = productInfoContainer.querySelector('#shipping'); // Add a container to display the result
        const Prep = productInfoContainer.querySelector('#Prep'); // Add a container to display the result
        const shiptoamaazon = productInfoContainer.querySelector('#shiptoamaazon'); // Add a container to display the result
        const categoryname = productInfoContainer.querySelector('#categoryname'); // Add a container to display the result

        const category=productData.otherProducts.products[0].salesRankContextName
        GM.xmlHttpRequest({
    method: "GET",
    url: productData.otherProducts.products[0].imageUrl,
    responseType: "arraybuffer", // Use arraybuffer to handle binary data
    onload: function (response) {
        if (response.status === 200) {
            const productImage = document.createElement('img');
            const binaryData = new Uint8Array(response.response);
            const base64Image = btoa(String.fromCharCode.apply(null, binaryData));
            const base64Url = 'data:image/jpeg;base64,' + base64Image; // Adjust the MIME type as needed
            singleimg.src = base64Url;
            // Append the image to the  container (e.g., singleimg)
        } else {
            console.error(`Failed to fetch image for ${product.title}`);
        }
    },
    onerror: function (error) {
        console.error(`Error fetching image for ${product.title}: ${error}`);
    },
});
        let margin=0
        function UpdatPriceByMargin(){
            const unitsValue = parseFloat(calculatePriceByMargin.value) || 0;
            margin=unitsValue
        }
        calculatePriceByMargin.addEventListener('input',UpdatPriceByMargin)
        let calculateByROI=0
        function calycPriceByroi(){
            const unitsValue = parseFloat(calculatePriceByROI.value) || 0;
            calculateByROI=unitsValue
        }
        calculatePriceByROI.addEventListener('input',calycPriceByroi)
        let calculateBydesiredProfit=0
        function calycdesiredProfit(){
            const unitsValue = parseFloat(desiredProfit.value) || 0;
            calculateBydesiredProfit=unitsValue
        }
        desiredProfit.addEventListener('input',calycdesiredProfit)
        // Add a container to display the result
        let kvalue = 0; // Default value
        if (isHazmat === 'Hazmat') {
            let url= 'https://upsellecommerce.com/wp-content/uploads/2023/09/non-ionizing-radiation-warning-hazard-symbol-vector-39842153.webp';
            GM.xmlHttpRequest({
    method: "GET",
    url: url,
    responseType: "arraybuffer", // Use arraybuffer to handle binary data
    onload: function (response) {
        if (response.status === 200) {
            const productImage = document.createElement('img');
            const binaryData = new Uint8Array(response.response);
            const base64Image = btoa(String.fromCharCode.apply(null, binaryData));
            const base64Url = 'data:image/jpeg;base64,' + base64Image; // Adjust the MIME type as needed
            image.src = base64Url;
            // Add a click event listener to the image to handle selection
            // Append the image to the container (e.g., singleimg)
        } else {
            console.error(`Failed to fetch image for ${product.title}`);
        }
    },
    onerror: function (error) {
        console.error(`Error fetching image for ${product.title}: ${error}`);
    },
   });
           // Replace with the source of your first image
            image.style.display = 'block'; // Show the image
        } else {
            // Remove the src attribute
            image.removeAttribute('src');
            image.style.display = 'none'; // Hide the image
        }
                let url= "https://static-00.iconduck.com/assets.00/share-icon-512x478-pbc2yd90.png";
            GM.xmlHttpRequest({
    method: "GET",
    url: url,
    responseType: "arraybuffer", // Use arraybuffer to handle binary data
    onload: function (response) {
        if (response.status === 200) {
            const shareimg = productInfoContainer.querySelector('#shareimg')
            const binaryData = new Uint8Array(response.response);
            const base64Image = btoa(String.fromCharCode.apply(null, binaryData));
            const base64Url = 'data:image/jpeg;base64,' + base64Image; // Adjust the MIME type as needed

            shareimg.src = base64Url;

            // Add a click event listener to the image to handle selection


            // Append the image to the container (e.g., singleimg)
        } else {
            console.error(`Failed to fetch image for ${product.title}`);
        }
    },
    onerror: function (error) {
        console.error(`Error fetching image for ${product.title}: ${error}`);
    },
   });


        asin.innerText=productData.asin
        costperunisept.innerText=`$${costperunitjan.toFixed(2)}`
        costperunitocts.innerText=`$${costperunitoct.toFixed(2)}`

        priceInput.value = `${priceAmount+shipping}`;
        let ref=(priceAmount*referralFeeRates)/100
        ReferralFees.innerText=`${ref}`
       console.log('Referafes',ref)



        function updateReferralFee() {
            const inputValue = parseFloat(priceInput.value);
            if (!isNaN(inputValue)) {
                const ref = (inputValue * referralFeeRates) / 100;
                ReferralFees.innerText = `${ref.toFixed(2)}`;
                AmazonFee();
                console.log('Referafes', ref);
            }
        }
        // Add an event listener to priceInput for input changes

        priceInput.addEventListener('input', updateReferralFee);

        // Initial calculation
        updateReferralFee();


        costperunitbox.addEventListener('change', function () {
            if (this.checked) {
                costperunitsbox.disabled = true;
            } else {
                costperunitsbox.disabled = false;
            }
        });

        // Add an event listener to costperunitsbox
        costperunitsbox.addEventListener('change', function () {
            if (this.checked) {
                costperunitbox.disabled = true;
            } else {
                costperunitbox.disabled = false;
            }
        });

        // Define the initial FulfillmentFee and other fees values
        const FulfillmentFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.FulfillmentFee.total.amount;

        const OpaqueFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.OpaqueBaggingFee.total.amount;
        const TapingFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.TapingFee.total.amount;
        const BubblewrapFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.BubblewrapFee.total.amount;
        const LabelingFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.LabelingFee.total.amount;
        const PolybaggingFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.PolybaggingFee.total.amount;
        const FBAInboundConvenienceFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.FBAInboundConvenienceFee.total.amount;
        if(Amazondata){
        const Amazonvalue=Amazondata.detailPageListingResponse
          const brandValue = Amazonvalue["brand#1.value"]
        const packqutValue = Amazonvalue["item_package_quantity#1.value"]
        const lowestPrcienew = Amazonvalue["lowest_price#new"]
        const pack2value = Amazonvalue["number_of_items#1.value"]

          if(Amazonvalue.model!==null && Amazonvalue.model!==undefined){
               Model.innerText=Amazonvalue.model.value
          }else{
               Model.innerText='No data available'
          }

        if(brandValue){
            brandname.innerText= brandValue.value
        }else{
            brandname.innerText='No data available yet'
        }

        buybox.innerText=Amazonvalue.buybox_amount.value

            if (Amazonvalue.sales_rank && Amazonvalue.sales_rank.value) {
                salesrank.innerText = Amazonvalue.sales_rank.value;
            } else {
                // Handle the case when sales_rank is not available
                salesrank.innerText = "Sales Rank Not Available";
            }

        if(Amazonvalue.is_prime_eligible.value=false){
            is_prime_eligible.innerText='NO'
        }else{
            is_prime_eligible.innerText='Yes'
        }
        if(packqutValue){
            packageQuantity.innerText=packqutValue.value||0
        }else if(pack2value){
            packageQuantity.innerText=pack2value.value||0
        }
        else if(packqutValue==null && packqutValue==undefined){
            packageQuantity.innerText='NOt available'
        }
        else{
            packageQuantity.innerText='NOt available'
        }

        lowestPrice.innerText=lowestPrcienew.value

        }else{
        console.log('No amazon data')
        }

        if(result!==undefined ){
            const newDta=result.products[0]
            console.log(newDta,'newDtanewDta')

            const upcvalue=newDta.upc ||'No data available'
            const eanvalue=newDta.ean ||'No data available'
            const amvalue=newDta.detailPageURL

            const offercounts=newDta.offerCounts
            const conditionGatingStatuses=newDta.conditionGatingStatuses
            const qualificationMessages=newDta.qualificationMessages
            const excludedKeys = ["club", "collectible", "refurbished"];

            for(let key in offercounts){
                if (offercounts.hasOwnProperty(key)&&!excludedKeys.includes(key)){
                    const liElement = document.createElement('li');
                    liElement.innerHTML = `<strong>${key}:</strong> ${offercounts[key]}`;
                    Sellers.appendChild(liElement);
                }
            }
            const conditionElement = productInfoContainer.querySelector('#condition');
            const qualificationMessagesElement = productInfoContainer.querySelector('#Messages');
            if (qualificationMessagesElement) {
                let messagesHtml = '';
                // Iterate through the qualification messages
                for (const message of qualificationMessages) {
                    const qualificationMessage = message.qualificationMessage;
                    const conditionList = message.conditionList;

                    // Check if there is a qualification message
                    if (qualificationMessage) {
                        messagesHtml += `<p>${qualificationMessage}`;

                        // Check if there is a condition list
                        if (conditionList) {
                            messagesHtml += `(Condition List: ${conditionList})`;
                        }

                        messagesHtml += `</p>`;
                    }
                }

                // Update the content of the "qualification-messages" element
                qualificationMessagesElement.innerHTML = messagesHtml;
            }

            upc.textContent=upcvalue
            ean.textContent=eanvalue
            amurl.href=amvalue


        }else{
            const qualificationMessagesElement = productInfoContainer.querySelector('#Messages');

            let val='Please Login'

            upc.textContent=val
            ean.textContent=val
            amurl.href=val
            qualificationMessagesElement.textContent=val
            Sellers.textContent=val
        }
        Inventorys.textContent=FBAInboundConvenienceFee
        Opaques.textContent = `$${OpaqueFee.toFixed(2)}`;
        Tapes.textContent = `$${TapingFee.toFixed(2)}`;
        Bubbles.textContent = `$${BubblewrapFee.toFixed(2)}`;
        Labels.textContent = `$${LabelingFee.toFixed(2)}`;
        Baggings.textContent = `$${PolybaggingFee}`;
        product.innerText=productData.otherProducts.products[0].title

        // Function to update the Fulfillment cost and FBA Fulfillment fees based on checkbox selections
        function updateCosts() {
            let totalCost = FulfillmentFee;
            let FBAFulfillmentFees = 0;

            if (Opaque.checked) {
                totalCost += OpaqueFee;
            }
            if (Inventory.checked) {
                totalCost += FBAInboundConvenienceFee;
            }

            if (Tape.checked) {
                totalCost += TapingFee;
            }

            if (Bubble.checked) {
                totalCost += BubblewrapFee;
            }

            if (Label.checked) {
                totalCost += LabelingFee;
            }

            if (Bagging.checked) {
                totalCost += PolybaggingFee;
            }
            if (costperunitbox.checked) {
                totalCost += costperunitjan;
            }

            if (costperunitsbox.checked) {
                totalCost += costperunitoct;
            }
            // Set the updated values in the respective elements
            FBAfulfillmentfees.textContent = `$${FulfillmentFee.toFixed(2)}`;
            Opaque.textContent = `$${OpaqueFee.toFixed(2)}`;
            Inventory.textContent = FBAInboundConvenienceFee;
            Opaque.textContent = `$${OpaqueFee.toFixed(2)}`;
            Tape.textContent = `$${TapingFee.toFixed(2)}`;
            Bubble.textContent = `$${BubblewrapFee.toFixed(2)}`;
            Label.textContent = `$${LabelingFee.toFixed(2)}`;
            Bagging.textContent = `$${PolybaggingFee}`;
            costperunitbox.textContent= `$${costperunitjan}`;
            costperunitsbox.textContent= `$${costperunitoct}`;

            Fulfillment.textContent = `$${totalCost.toFixed(2)}`;
            let fba=FBAfulfillmentfees.textContent
            let value=fba.replace('$','')
            let x=totalCost-value
            console.log('xxxxxxxxx',x)
            AmazonFee(x)
        }
        // Add event listeners to the checkboxes to update the costs when they change
        Opaque.addEventListener('change', updateCosts);
        Tape.addEventListener('change', updateCosts);
        Bubble.addEventListener('change', updateCosts);
        Label.addEventListener('change', updateCosts);
        Inventory.addEventListener('change', updateCosts);
        Bagging.addEventListener('change', updateCosts);
        costperunitbox.addEventListener('change', updateCosts);
        costperunitsbox.addEventListener('change', updateCosts);
        // Initialize the costs on page load
        updateCosts();
        const price = productInfoContainer.querySelector('#price');
        const units = productInfoContainer.querySelector('#units');
        const AmazonUnits = productInfoContainer.querySelector('#AmazonUnits');
        const resultOutput = productInfoContainer.querySelector('#resultOutput'); // Add a container to display the result

        // Function to calculate and update the result


        function updateResult() {

            const priceValue = parseFloat(price.value) || 0;
            const unitsValue = parseFloat(units.value) || 1;
            const AmazonUnitsValue = parseFloat(AmazonUnits.value) || 1;
            const result = (priceValue / unitsValue) * AmazonUnitsValue;

            // Update the result and other functions as needed
            TotalCog(result);
            resultOutput.textContent = `${result.toFixed(2)}`;
            text();
            calcynetproft();
        }

        // Add event listeners to input fields for user input using 'change' event
        price.addEventListener('input', updateResult);
        units.addEventListener('input', updateResult);
        AmazonUnits.addEventListener('input', updateResult);


        // Initialize the result when the page loads
        updateResult();


        const categruvalue=productData.otherProducts.products[0].salesRankContextName
        categoryname.textContent=categruvalue


        function ship(){
            const calcship = parseFloat(shipamazon.value) || 0; // Convert to a number or set to 0 if not a number
            const wightvalue =Math.round( calcship * 0.6*100 )/100;
            shiptoamaazon.innerText=parseFloat(wightvalue) || 0;

            const prepshippingValue = parseFloat(prepshipping.value) || 0;
            const prepValue = parseFloat(Prep.value) || 0;
            const weightValue = parseFloat(wightvalue) || 0;

            if (!isNaN(prepshippingValue) && !isNaN(prepValue) && !isNaN(weightValue)) {
                const misexpense = prepshippingValue + prepValue + weightValue;
                Totalmisexpense(misexpense)
                Miscellaneous.textContent=`${misexpense}`
                text()
                calcynetproft()
                AmazonFee()


            } else {
                console.error('One or more input values is not a valid number.');
            }
        }

        function text() {
            // Get the text content from the HTML elements
            const resultText = resultOutput.textContent;

            const miscellaneousText = Miscellaneous.textContent;

            // Parse the text content to numbers and ensure they are valid numbers
            const resultValue = parseFloat(resultText) || 0;
            const miscellaneousValue = parseFloat(miscellaneousText) || 0;

            // Calculate the total by adding the values together
            const totalcog = resultValue + miscellaneousValue;

            costPerunit.textContent=`$${totalcog}`
    // Round the total to a specified number of decimal places (e.g., 2 decimal places)
         calcynetproft()

        }
        shipamazon.addEventListener('input',ship)
        prepshipping.addEventListener('input',ship)
        Prep.addEventListener('input',ship)



        function TotalCog(result) {

            return result;
        }
        function Totalmisexpense(misexpense) {
            return misexpense;
        }
        function AmazonFee(value){
            const FulfillmentFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.FulfillmentFee.total.amount;
            console.log('FulfillmentFeesssssssssssss',FulfillmentFee)
            const ReferralFeess = ReferralFees.innerText;

            const feesfillments = value;

            // Parse the text content to numbers and ensure they are valid numbers

            const resultValue = parseFloat(ReferralFeess) || 0;
            const miscellaneousValue = parseFloat(feesfillments) || 0;

            // Calculate the total by adding the values together
            const totalcog = resultValue + miscellaneousValue+FulfillmentFee;
            console.log(miscellaneousValue,FulfillmentFee,'FulfillmentFeeFulfillmentFeeFulfillmentFee')
            const roundedTotal = Math.round(totalcog * 100) / 100;
            totalAmazonfees.textContent=`$${roundedTotal}`
    // Round the total to a specified number of decimal places (e.g., 2 decimal places)
            calcynetproft()
            const calcyMarginBypriceMargin=(resultValue + miscellaneousValue+roundedTotal)/(1-margin/100)
            const calcyMarginByprice = Math.round(calcyMarginBypriceMargin * 100) / 100;
            calculatePriceByMarginvalue.innerText=calcyMarginByprice
            const Roicalculate=(resultValue + miscellaneousValue+roundedTotal)/(1-calculateByROI/100)
            roivalue.innerText=Math.round(Roicalculate*100)/100
            const desireprofitcalculate=(resultValue + miscellaneousValue+roundedTotal)/(1-calculateBydesiredProfit/100)
            desiredProfitvalue.innerText=Math.round(desireprofitcalculate*100)/100
        }
        calculatePriceByMargin.addEventListener('input',AmazonFee)
        calculatePriceByROI.addEventListener('input',AmazonFee)

        desiredProfit.addEventListener('input',AmazonFee)

        ship()


       function calcynetproft() {
    // Get and parse input values
    const data1 = totalAmazonfees.textContent;
    const resultValue1 = parseFloat(data1.replace("$", "")) || 0;

    const data2 = costPerunit.textContent;
    const resultValue2 = parseFloat(data2.replace("$", "")) || 0;

    const data3 = priceInput.value;
    const resultValue3 = parseFloat(data3) || 0;

    // Check if any of the input values are not valid numbers
    if (isNaN(resultValue1) || isNaN(resultValue2) || isNaN(resultValue3)) {
        // Handle the situation where any of the input values is not a valid number
        // You can display an error message or take appropriate action here.
        return;
    }

    // Perform the calculations
    const output = resultValue3 - resultValue2 - resultValue1;
if (output < 0) {
    netprofit.style.color = 'red';
    netprofit.innerText =Math.round(output*100)/100 ;
} else {
    netprofit.style.color = 'green'; // Change the color to green or your desired color
    netprofit.innerText = Math.round(output*100)/100 ;;
}




    const netMarginsss = parseFloat(output / resultValue3) || 0;
    if (netMarginsss === Infinity || netMarginsss === -Infinity) {
        netMargin.textContent = "0%";
        netMargin.style.color = "black";
    } else {
        const x = Math.round(netMarginsss * 100) / 100;
        netMargin.textContent = `${x*100}%`;
        if (x < 0) {
            netMargin.style.color = "red";
        } else {
            netMargin.style.color = "green";
        }

        const FulfillmentFee = feesdata.data.programFeeResultMap.Core.otherFeeInfoMap.FulfillmentFee.total.amount;
        console.log('inputValue', kvalue);
    }

    const Roi = parseFloat(output / resultValue2) || 0;
    if (Roi === Infinity || Roi === -Infinity) {
        rateroi.innerText = 0;
    } else {
        let x = Math.round(`${Roi}` * 100) / 100;
        rateroi.textContent = `${x}%`;

        if (x < 0) {
            rateroi.style.color = "red";
        } else {
            rateroi.style.color = "green";
        }
    }
}


        priceInput.addEventListener('input', calcynetproft);


const categoryMapping = {
    'Toys & Games': 'VG95cyAmIEdhbWVz',
    'Beauty & Personal Care': 'QmVhdXR5ICYgUGVyc29uYWwgQ2FyZQ==',
    'Home & Kitchen': 'SG9tZSAmIEtpdGNoZW4=',
    'Kitchen & Dining': 'S2l0Y2hlbiAmIERpbmluZw==',
    'Tools & Home Improvement': 'VG9vbHMgJiBIb21lIEltcHJvdmVtZW50',
    'Health & Household': 'SGVhbHRoICYgSG91c2Vob2xk',
    'Grocery & Gourmet Food': 'R3JvY2VyeSAmIEdvdXJtZXQgRm9vZA==',
    'Arts, Crafts & Sewing': 'QXJ0cywgQ3JhZnRzICYgU2V3aW5n',
    'Clothing, Shoes & Jewelry': 'Q2xvdGhpbmcsIFNob2VzICYgSmV3ZWxyeQ==',
    'Patio, Lawn & Garden': 'UGF0aW8sIExhd24gJiBHYXJkZW4=',
    'Office Products': 'T2ZmaWNlIFByb2R1Y3Rz',
    'Industrial & Scientific': 'SW5kdXN0cmlhbCAmIFNjaWVudGlmaWM=',
    'Sports & Outdoors': 'U3BvcnRzICYgT3V0ZG9vcnM=',
    'Electronics': 'RWxlY3Ryb25pY3M=',
    'Automotive': 'QXV0b21vdGl2ZQ==',
    'Pet Supplies': 'UGV0IFN1cHBsaWVz',
    'Musical Instruments': 'TXVzaWNhbCBJbnN0cnVtZW50cw==',
    'Baby': 'QmFieQ==',
    'Audio & Video Connectors & Adapters': 'QXVkaW8gJiBWaWRlbyBDb25uZWN0b3JzICYgQWRhcHRlcnM=',
    'Video Games': 'VmlkZW8gR2FtZXM=',
    'Cell Phones & Accessories': 'Q2VsbCBQaG9uZXMgJiBBY2Nlc3Nvcmllcw==',
};

const salesData = {
  "amazon.com": {
    "Toys & Games": [{
        "rank": 3,
        "sales": 85
    }, {
        "rank": 4,
        "sales": 84.72
    }, {
        "rank": 5,
        "sales": 84.72
    }, {
        "rank": 9,
        "sales": 84.72
    }, {
        "rank": 10,
        "sales": 84.72
    }, {
        "rank": 11,
        "sales": 84.72
    }, {
        "rank": 20,
        "sales": 84.72
    }, {
        "rank": 22.666666666666664,
        "sales": 84.72
    }, {
        "rank": 25.333333333333332,
        "sales": 84.72
    }, {
        "rank": 28,
        "sales": 84.72
    }, {
        "rank": 44,
        "sales": 84.72
    }, {
        "rank": 49.33333333333333,
        "sales": 84.72
    }, {
        "rank": 54.666666666666664,
        "sales": 84.72
    }, {
        "rank": 60,
        "sales": 84.72
    }, {
        "rank": 96,
        "sales": 84.72
    }, {
        "rank": 108,
        "sales": 84.72
    }, {
        "rank": 120,
        "sales": 84.72
    }, {
        "rank": 208,
        "sales": 77.87
    }, {
        "rank": 233.33333333333331,
        "sales": 75.25
    }, {
        "rank": 258.66666666666663,
        "sales": 72.62
    }, {
        "rank": 448,
        "sales": 67.71
    }, {
        "rank": 502.66666666666663,
        "sales": 67.71
    }, {
        "rank": 557.3333333333333,
        "sales": 67.71
    }, {
        "rank": 968,
        "sales": 56.81
    }, {
        "rank": 1086.6666666666667,
        "sales": 52.58
    }, {
        "rank": 1205.3333333333335,
        "sales": 48.35
    }, {
        "rank": 2094,
        "sales": 35.03
    }, {
        "rank": 2350.666666666667,
        "sales": 32.99
    }, {
        "rank": 2607.3333333333335,
        "sales": 30.95
    }, {
        "rank": 4527,
        "sales": 22.7
    }, {
        "rank": 5081.333333333334,
        "sales": 21
    }, {
        "rank": 5635.666666666667,
        "sales": 19.31
    }, {
        "rank": 9786,
        "sales": 13.1
    }, {
        "rank": 10984.666666666668,
        "sales": 11.95
    }, {
        "rank": 12183.333333333334,
        "sales": 10.8
    }, {
        "rank": 21156,
        "sales": 6.92
    }, {
        "rank": 23747.333333333336,
        "sales": 6.27
    }, {
        "rank": 26338.666666666668,
        "sales": 5.62
    }, {
        "rank": 45738,
        "sales": 3.44
    }, {
        "rank": 51340.66666666667,
        "sales": 3.08
    }, {
        "rank": 56943.333333333336,
        "sales": 2.72
    }, {
        "rank": 98882,
        "sales": 1.52
    }, {
        "rank": 110994,
        "sales": 1.33
    }, {
        "rank": 123106,
        "sales": 1.13
    }, {
        "rank": 213773,
        "sales": 0.52
    }, {
        "rank": 239958,
        "sales": 0.43
    }, {
        "rank": 266143,
        "sales": 0.34
    }, {
        "rank": 462156,
        "sales": 0.1
    }, {
        "rank": 518765.3333333334,
        "sales": 0.07
    }, {
        "rank": 575374.6666666667,
        "sales": 0.05
    }, {
        "rank": 999138,
        "sales": 0
    }, {
        "rank": 1121522.6666666667,
        "sales": 0
    }, {
        "rank": 1243907.3333333335,
        "sales": 0
    }, {
        "rank": 2160043,
        "sales": 0
    }, {
        "rank": 2424626.666666667,
        "sales": 0
    }, {
        "rank": 2689210.3333333335,
        "sales": 0
    }, {
        "rank": 16400072,
        "sales": 0
    }, {
        "rank": 20882164.666666668,
        "sales": 0
    }, {
        "rank": 25364257.333333336,
        "sales": 0
    }],
    "Clothing, Shoes & Jewelry": [{
        "rank": 1,
        "sales": 10
    }, {
        "rank": 1.3333333333333333,
        "sales": 9.38
    }, {
        "rank": 1.6666666666666665,
        "sales": 8.48
    }, {
        "rank": 3,
        "sales": 6.77
    }, {
        "rank": 3.333333333333333,
        "sales": 6.5
    }, {
        "rank": 3.6666666666666665,
        "sales": 6.23
    }, {
        "rank": 4,
        "sales": 5.96
    }, {
        "rank": 7,
        "sales": 5.15
    }, {
        "rank": 8,
        "sales": 5.15
    }, {
        "rank": 9,
        "sales": 5.15
    }, {
        "rank": 17,
        "sales": 4.73
    }, {
        "rank": 19.333333333333336,
        "sales": 4.53
    }, {
        "rank": 21.666666666666668,
        "sales": 4.33
    }, {
        "rank": 40,
        "sales": 3.39
    }, {
        "rank": 45.33333333333333,
        "sales": 3.22
    }, {
        "rank": 50.666666666666664,
        "sales": 3.04
    }, {
        "rank": 56,
        "sales": 2.86
    }, {
        "rank": 92,
        "sales": 2.2
    }, {
        "rank": 104,
        "sales": 2.02
    }, {
        "rank": 116,
        "sales": 1.85
    }, {
        "rank": 210,
        "sales": 1.26
    }, {
        "rank": 237.33333333333331,
        "sales": 1.19
    }, {
        "rank": 264.66666666666663,
        "sales": 1.12
    }, {
        "rank": 481,
        "sales": 0.84
    }, {
        "rank": 544,
        "sales": 0.8
    }, {
        "rank": 607,
        "sales": 0.75
    }, {
        "rank": 1103,
        "sales": 0.57
    }, {
        "rank": 1247.3333333333335,
        "sales": 0.54
    }, {
        "rank": 1391.6666666666667,
        "sales": 0.52
    }, {
        "rank": 2529,
        "sales": 0.44
    }, {
        "rank": 2860,
        "sales": 0.43
    }, {
        "rank": 3191,
        "sales": 0.42
    }, {
        "rank": 5802,
        "sales": 0.41
    }, {
        "rank": 6562,
        "sales": 0.41
    }, {
        "rank": 7322,
        "sales": 0.41
    }, {
        "rank": 13312,
        "sales": 0.36
    }, {
        "rank": 15055.333333333332,
        "sales": 0.33
    }, {
        "rank": 16798.666666666664,
        "sales": 0.31
    }, {
        "rank": 30541,
        "sales": 0.23
    }, {
        "rank": 34540.666666666664,
        "sales": 0.22
    }, {
        "rank": 38540.33333333333,
        "sales": 0.21
    }, {
        "rank": 70070,
        "sales": 0.15
    }, {
        "rank": 79246.66666666666,
        "sales": 0.13
    }, {
        "rank": 88423.33333333333,
        "sales": 0.11
    }, {
        "rank": 97600,
        "sales": 0.1
    }, {
        "rank": 160761,
        "sales": 0.07
    }, {
        "rank": 181814.6666666667,
        "sales": 0.07
    }, {
        "rank": 202868.33333333334,
        "sales": 0.07
    }, {
        "rank": 368832,
        "sales": 0.06
    }, {
        "rank": 417135.3333333334,
        "sales": 0.06
    }, {
        "rank": 465438.6666666667,
        "sales": 0.05
    }, {
        "rank": 846207,
        "sales": 0.03
    }, {
        "rank": 957028.6666666667,
        "sales": 0.02
    }, {
        "rank": 1067850.3333333335,
        "sales": 0.01
    }, {
        "rank": 1941443,
        "sales": 0
    }, {
        "rank": 2195700,
        "sales": 0
    }, {
        "rank": 2449957,
        "sales": 0
    }, {
        "rank": 17680901,
        "sales": 0
    }, {
        "rank": 22673130,
        "sales": 0
    }, {
        "rank": 27665359,
        "sales": 0
    }],
    "Kitchen & Dining": [{
        "rank": 1,
        "sales": 80
    }, {
        "rank": 1.3333333333333333,
        "sales": 79.54
    }, {
        "rank": 1.6666666666666665,
        "sales": 79.54
    }, {
        "rank": 3,
        "sales": 79.54
    }, {
        "rank": 3.333333333333333,
        "sales": 79.54
    }, {
        "rank": 3.6666666666666665,
        "sales": 79.54
    }, {
        "rank": 4,
        "sales": 79.54
    }, {
        "rank": 7,
        "sales": 79.54
    }, {
        "rank": 8,
        "sales": 79.54
    }, {
        "rank": 9,
        "sales": 79.54
    }, {
        "rank": 16,
        "sales": 79.54
    }, {
        "rank": 18,
        "sales": 79.54
    }, {
        "rank": 20,
        "sales": 79.54
    }, {
        "rank": 36,
        "sales": 79.54
    }, {
        "rank": 40.66666666666667,
        "sales": 79.54
    }, {
        "rank": 45.333333333333336,
        "sales": 79.54
    }, {
        "rank": 82,
        "sales": 79.54
    }, {
        "rank": 92.66666666666666,
        "sales": 79.54
    }, {
        "rank": 103.33333333333333,
        "sales": 79.54
    }, {
        "rank": 114,
        "sales": 79.54
    }, {
        "rank": 186,
        "sales": 78.81
    }, {
        "rank": 210,
        "sales": 78.51
    }, {
        "rank": 234,
        "sales": 78.2
    }, {
        "rank": 418,
        "sales": 67.23
    }, {
        "rank": 471.33333333333337,
        "sales": 62.98
    }, {
        "rank": 524.6666666666667,
        "sales": 58.73
    }, {
        "rank": 939,
        "sales": 43.52
    }, {
        "rank": 1059.3333333333333,
        "sales": 41.34
    }, {
        "rank": 1179.6666666666665,
        "sales": 39.16
    }, {
        "rank": 2110,
        "sales": 29.71
    }, {
        "rank": 2380,
        "sales": 27.9
    }, {
        "rank": 2650,
        "sales": 26.08
    }, {
        "rank": 4740,
        "sales": 18.4
    }, {
        "rank": 5346.666666666666,
        "sales": 16.97
    }, {
        "rank": 5953.333333333333,
        "sales": 15.54
    }, {
        "rank": 6560,
        "sales": 14.1
    }, {
        "rank": 10650,
        "sales": 10.26
    }, {
        "rank": 12013.333333333332,
        "sales": 9.46
    }, {
        "rank": 13376.666666666666,
        "sales": 8.65
    }, {
        "rank": 14740,
        "sales": 7.85
    }, {
        "rank": 23930,
        "sales": 5.5
    }, {
        "rank": 26993.333333333336,
        "sales": 4.96
    }, {
        "rank": 30056.666666666668,
        "sales": 4.43
    }, {
        "rank": 53768,
        "sales": 2.51
    }, {
        "rank": 60650.66666666667,
        "sales": 2.23
    }, {
        "rank": 67533.33333333334,
        "sales": 1.95
    }, {
        "rank": 120812,
        "sales": 0.96
    }, {
        "rank": 136277.33333333334,
        "sales": 0.81
    }, {
        "rank": 151742.6666666667,
        "sales": 0.67
    }, {
        "rank": 271455,
        "sales": 0.23
    }, {
        "rank": 306204,
        "sales": 0.19
    }, {
        "rank": 340953,
        "sales": 0.14
    }, {
        "rank": 609938,
        "sales": 0.03
    }, {
        "rank": 688016.6666666667,
        "sales": 0.02
    }, {
        "rank": 766095.3333333334,
        "sales": 0.01
    }, {
        "rank": 1370483,
        "sales": 0
    }, {
        "rank": 1545919.3333333335,
        "sales": 0
    }, {
        "rank": 1721355.6666666667,
        "sales": 0
    }, {
        "rank": 11706919,
        "sales": 0
    }, {
        "rank": 14976961.333333334,
        "sales": 0
    }, {
        "rank": 18247003.666666668,
        "sales": 0
    }],
    "Sports & Outdoors": [{
        "rank": 1,
        "sales": 20
    }, {
        "rank": 1.3333333333333333,
        "sales": 19.86
    }, {
        "rank": 1.6666666666666665,
        "sales": 19.86
    }, {
        "rank": 3,
        "sales": 19.86
    }, {
        "rank": 3.333333333333333,
        "sales": 19.86
    }, {
        "rank": 3.6666666666666665,
        "sales": 19.86
    }, {
        "rank": 4,
        "sales": 19.86
    }, {
        "rank": 7,
        "sales": 19.86
    }, {
        "rank": 8,
        "sales": 19.86
    }, {
        "rank": 9,
        "sales": 19.86
    }, {
        "rank": 15,
        "sales": 19.86
    }, {
        "rank": 16.666666666666668,
        "sales": 19.86
    }, {
        "rank": 18.333333333333336,
        "sales": 19.86
    }, {
        "rank": 32,
        "sales": 19.86
    }, {
        "rank": 36,
        "sales": 19.86
    }, {
        "rank": 40,
        "sales": 19.86
    }, {
        "rank": 71,
        "sales": 19.86
    }, {
        "rank": 80,
        "sales": 19.86
    }, {
        "rank": 89,
        "sales": 19.86
    }, {
        "rank": 156,
        "sales": 19.86
    }, {
        "rank": 175.33333333333331,
        "sales": 19.86
    }, {
        "rank": 194.66666666666666,
        "sales": 19.86
    }, {
        "rank": 214,
        "sales": 19.86
    }, {
        "rank": 339,
        "sales": 19.36
    }, {
        "rank": 380.66666666666663,
        "sales": 19.17
    }, {
        "rank": 422.3333333333333,
        "sales": 18.97
    }, {
        "rank": 464,
        "sales": 18.78
    }, {
        "rank": 738,
        "sales": 18.34
    }, {
        "rank": 829.3333333333333,
        "sales": 18.24
    }, {
        "rank": 920.6666666666666,
        "sales": 18.15
    }, {
        "rank": 1012,
        "sales": 18.05
    }, {
        "rank": 1608,
        "sales": 15.27
    }, {
        "rank": 1806.6666666666665,
        "sales": 14.21
    }, {
        "rank": 2005.3333333333333,
        "sales": 13.15
    }, {
        "rank": 3501,
        "sales": 10.83
    }, {
        "rank": 3933.333333333333,
        "sales": 10.73
    }, {
        "rank": 4365.666666666666,
        "sales": 10.64
    }, {
        "rank": 7623,
        "sales": 8.48
    }, {
        "rank": 8564.666666666666,
        "sales": 7.7
    }, {
        "rank": 9506.333333333332,
        "sales": 6.92
    }, {
        "rank": 16601,
        "sales": 4.84
    }, {
        "rank": 18652,
        "sales": 4.63
    }, {
        "rank": 20703,
        "sales": 4.42
    }, {
        "rank": 36153,
        "sales": 3.23
    }, {
        "rank": 40619.33333333333,
        "sales": 2.92
    }, {
        "rank": 45085.666666666664,
        "sales": 2.61
    }, {
        "rank": 49552,
        "sales": 2.3
    }, {
        "rank": 78732,
        "sales": 1.54
    }, {
        "rank": 88458.66666666666,
        "sales": 1.36
    }, {
        "rank": 98185.33333333333,
        "sales": 1.19
    }, {
        "rank": 107912,
        "sales": 1.01
    }, {
        "rank": 171457,
        "sales": 0.57
    }, {
        "rank": 192638.6666666667,
        "sales": 0.47
    }, {
        "rank": 213820.33333333334,
        "sales": 0.37
    }, {
        "rank": 373385,
        "sales": 0.12
    }, {
        "rank": 419512.6666666666,
        "sales": 0.09
    }, {
        "rank": 465640.3333333333,
        "sales": 0.07
    }, {
        "rank": 511768,
        "sales": 0.05
    }, {
        "rank": 813128,
        "sales": 0.03
    }, {
        "rank": 913581.3333333333,
        "sales": 0.03
    }, {
        "rank": 1014034.6666666666,
        "sales": 0.03
    }, {
        "rank": 6312351,
        "sales": 0
    }, {
        "rank": 8044972,
        "sales": 0
    }, {
        "rank": 9777593,
        "sales": 0
    }],
    "Health & Household": [{
        "rank": 2,
        "sales": 136
    }, {
        "rank": 2.6666666666666665,
        "sales": 135.54
    }, {
        "rank": 3.333333333333333,
        "sales": 135.54
    }, {
        "rank": 6,
        "sales": 135.54
    }, {
        "rank": 6.666666666666666,
        "sales": 135.54
    }, {
        "rank": 7.333333333333333,
        "sales": 135.54
    }, {
        "rank": 8,
        "sales": 135.54
    }, {
        "rank": 13,
        "sales": 135.54
    }, {
        "rank": 14.666666666666668,
        "sales": 135.54
    }, {
        "rank": 16.333333333333336,
        "sales": 135.54
    }, {
        "rank": 27,
        "sales": 135.54
    }, {
        "rank": 30,
        "sales": 135.54
    }, {
        "rank": 33,
        "sales": 135.54
    }, {
        "rank": 54,
        "sales": 135.54
    }, {
        "rank": 60,
        "sales": 135.54
    }, {
        "rank": 66,
        "sales": 135.54
    }, {
        "rank": 111,
        "sales": 135.54
    }, {
        "rank": 124,
        "sales": 135.54
    }, {
        "rank": 137,
        "sales": 135.54
    }, {
        "rank": 230,
        "sales": 135.54
    }, {
        "rank": 256.6666666666667,
        "sales": 135.54
    }, {
        "rank": 283.33333333333337,
        "sales": 135.54
    }, {
        "rank": 475,
        "sales": 121.24
    }, {
        "rank": 530,
        "sales": 116.16
    }, {
        "rank": 585,
        "sales": 111.09
    }, {
        "rank": 980,
        "sales": 89.35
    }, {
        "rank": 1093.3333333333333,
        "sales": 84.1
    }, {
        "rank": 1206.6666666666665,
        "sales": 78.85
    }, {
        "rank": 2022,
        "sales": 61.45
    }, {
        "rank": 2256,
        "sales": 57.83
    }, {
        "rank": 2490,
        "sales": 54.21
    }, {
        "rank": 4174,
        "sales": 39.6
    }, {
        "rank": 4657.333333333333,
        "sales": 36.19
    }, {
        "rank": 5140.666666666666,
        "sales": 32.77
    }, {
        "rank": 8616,
        "sales": 22.03
    }, {
        "rank": 9613.333333333334,
        "sales": 19.88
    }, {
        "rank": 10610.666666666668,
        "sales": 17.73
    }, {
        "rank": 17786,
        "sales": 11.6
    }, {
        "rank": 19845.333333333336,
        "sales": 10.48
    }, {
        "rank": 21904.666666666668,
        "sales": 9.35
    }, {
        "rank": 36718,
        "sales": 5.78
    }, {
        "rank": 40969.33333333333,
        "sales": 5.07
    }, {
        "rank": 45220.666666666664,
        "sales": 4.35
    }, {
        "rank": 49472,
        "sales": 3.64
    }, {
        "rank": 75800,
        "sales": 2.39
    }, {
        "rank": 84576,
        "sales": 2.04
    }, {
        "rank": 93352,
        "sales": 1.69
    }, {
        "rank": 156481,
        "sales": 0.79
    }, {
        "rank": 174598.6666666667,
        "sales": 0.64
    }, {
        "rank": 192716.33333333334,
        "sales": 0.49
    }, {
        "rank": 323038,
        "sales": 0.16
    }, {
        "rank": 360439.3333333334,
        "sales": 0.11
    }, {
        "rank": 397840.6666666667,
        "sales": 0.06
    }, {
        "rank": 666875,
        "sales": 0
    }, {
        "rank": 744086,
        "sales": 0
    }, {
        "rank": 821297,
        "sales": 0
    }, {
        "rank": 4401720,
        "sales": 0
    }, {
        "rank": 5569457.333333333,
        "sales": 0
    }, {
        "rank": 6737194.666666666,
        "sales": 0
    }],
    "Beauty & Personal Care": [{
        "rank": 6,
        "sales": 220
    }, {
        "rank": 8,
        "sales": 219.55
    }, {
        "rank": 10,
        "sales": 219.55
    }, {
        "rank": 17,
        "sales": 219.55
    }, {
        "rank": 18.666666666666668,
        "sales": 219.55
    }, {
        "rank": 20.333333333333336,
        "sales": 219.55
    }, {
        "rank": 33,
        "sales": 219.55
    }, {
        "rank": 36.666666666666664,
        "sales": 219.55
    }, {
        "rank": 40.33333333333333,
        "sales": 219.55
    }, {
        "rank": 64,
        "sales": 219.55
    }, {
        "rank": 70.66666666666667,
        "sales": 219.55
    }, {
        "rank": 77.33333333333334,
        "sales": 219.55
    }, {
        "rank": 122,
        "sales": 156.06
    }, {
        "rank": 134.66666666666666,
        "sales": 136.91
    }, {
        "rank": 147.33333333333331,
        "sales": 117.76
    }, {
        "rank": 233,
        "sales": 97.26
    }, {
        "rank": 257.3333333333333,
        "sales": 93.63
    }, {
        "rank": 281.66666666666663,
        "sales": 90
    }, {
        "rank": 446,
        "sales": 88.31
    }, {
        "rank": 492.66666666666663,
        "sales": 88.31
    }, {
        "rank": 539.3333333333333,
        "sales": 88.31
    }, {
        "rank": 853,
        "sales": 71.08
    }, {
        "rank": 942,
        "sales": 65.85
    }, {
        "rank": 1031,
        "sales": 60.62
    }, {
        "rank": 1632,
        "sales": 49.51
    }, {
        "rank": 1802.6666666666665,
        "sales": 46.86
    }, {
        "rank": 1973.3333333333333,
        "sales": 44.21
    }, {
        "rank": 3121,
        "sales": 35.35
    }, {
        "rank": 3446.666666666667,
        "sales": 33.02
    }, {
        "rank": 3772.3333333333335,
        "sales": 30.68
    }, {
        "rank": 5967,
        "sales": 23.32
    }, {
        "rank": 6590,
        "sales": 21.4
    }, {
        "rank": 7213,
        "sales": 19.48
    }, {
        "rank": 11409,
        "sales": 13.56
    }, {
        "rank": 12600,
        "sales": 12.02
    }, {
        "rank": 13791,
        "sales": 10.49
    }, {
        "rank": 21813,
        "sales": 7.49
    }, {
        "rank": 24090,
        "sales": 6.79
    }, {
        "rank": 26367,
        "sales": 6.09
    }, {
        "rank": 41706,
        "sales": 4.11
    }, {
        "rank": 46060,
        "sales": 3.6
    }, {
        "rank": 50414,
        "sales": 3.09
    }, {
        "rank": 79743,
        "sales": 2.17
    }, {
        "rank": 88068,
        "sales": 1.96
    }, {
        "rank": 96393,
        "sales": 1.75
    }, {
        "rank": 152469,
        "sales": 1.01
    }, {
        "rank": 168386,
        "sales": 0.81
    }, {
        "rank": 184303,
        "sales": 0.61
    }, {
        "rank": 291521,
        "sales": 0.26
    }, {
        "rank": 321954.6666666667,
        "sales": 0.18
    }, {
        "rank": 352388.3333333334,
        "sales": 0.1
    }, {
        "rank": 557388,
        "sales": 0.05
    }, {
        "rank": 615576.6666666666,
        "sales": 0.05
    }, {
        "rank": 673765.3333333333,
        "sales": 0.05
    }, {
        "rank": 2924089,
        "sales": 0
    }, {
        "rank": 3654800.6666666665,
        "sales": 0
    }, {
        "rank": 4385512.333333333,
        "sales": 0
    }, {
        "rank": 5116224,
        "sales": 0
    }],
    "Home & Kitchen": [{
        "rank": 1,
        "sales": 87
    }, {
        "rank": 1.3333333333333333,
        "sales": 86.79
    }, {
        "rank": 1.6666666666666665,
        "sales": 86.79
    }, {
        "rank": 3,
        "sales": 86.79
    }, {
        "rank": 3.333333333333333,
        "sales": 86.79
    }, {
        "rank": 3.6666666666666665,
        "sales": 86.79
    }, {
        "rank": 4,
        "sales": 86.79
    }, {
        "rank": 7,
        "sales": 86.79
    }, {
        "rank": 8,
        "sales": 86.79
    }, {
        "rank": 9,
        "sales": 86.79
    }, {
        "rank": 16,
        "sales": 86.79
    }, {
        "rank": 18,
        "sales": 86.79
    }, {
        "rank": 20,
        "sales": 86.79
    }, {
        "rank": 37,
        "sales": 86.79
    }, {
        "rank": 42,
        "sales": 86.79
    }, {
        "rank": 47,
        "sales": 86.79
    }, {
        "rank": 85,
        "sales": 86.79
    }, {
        "rank": 96,
        "sales": 86.79
    }, {
        "rank": 107,
        "sales": 86.79
    }, {
        "rank": 191,
        "sales": 86.79
    }, {
        "rank": 215.33333333333331,
        "sales": 86.79
    }, {
        "rank": 239.66666666666666,
        "sales": 86.79
    }, {
        "rank": 430,
        "sales": 86.57
    }, {
        "rank": 485.33333333333337,
        "sales": 86.48
    }, {
        "rank": 540.6666666666667,
        "sales": 86.38
    }, {
        "rank": 971,
        "sales": 80.93
    }, {
        "rank": 1096,
        "sales": 78.74
    }, {
        "rank": 1221,
        "sales": 76.54
    }, {
        "rank": 2192,
        "sales": 60.98
    }, {
        "rank": 2474,
        "sales": 56.65
    }, {
        "rank": 2756,
        "sales": 52.33
    }, {
        "rank": 4946,
        "sales": 36.17
    }, {
        "rank": 5582,
        "sales": 33.72
    }, {
        "rank": 6218,
        "sales": 31.27
    }, {
        "rank": 11161,
        "sales": 21.38
    }, {
        "rank": 12596.666666666668,
        "sales": 19.69
    }, {
        "rank": 14032.333333333334,
        "sales": 17.99
    }, {
        "rank": 25188,
        "sales": 11.54
    }, {
        "rank": 28428,
        "sales": 10.52
    }, {
        "rank": 31668,
        "sales": 9.51
    }, {
        "rank": 56844,
        "sales": 5.89
    }, {
        "rank": 64156,
        "sales": 5.38
    }, {
        "rank": 71468,
        "sales": 4.88
    }, {
        "rank": 128286,
        "sales": 3.05
    }, {
        "rank": 144788,
        "sales": 2.79
    }, {
        "rank": 161290,
        "sales": 2.53
    }, {
        "rank": 289516,
        "sales": 1.49
    }, {
        "rank": 326757.3333333334,
        "sales": 1.32
    }, {
        "rank": 363998.6666666667,
        "sales": 1.15
    }, {
        "rank": 653377,
        "sales": 0.52
    }, {
        "rank": 737422.6666666667,
        "sales": 0.42
    }, {
        "rank": 821468.3333333334,
        "sales": 0.33
    }, {
        "rank": 1474535,
        "sales": 0.1
    }, {
        "rank": 1664208.6666666665,
        "sales": 0.09
    }, {
        "rank": 1853882.3333333333,
        "sales": 0.09
    }, {
        "rank": 2043556,
        "sales": 0.09
    }, {
        "rank": 12766187,
        "sales": 0
    }, {
        "rank": 16340397.333333334,
        "sales": 0
    }, {
        "rank": 19914607.666666668,
        "sales": 0
    }],
    "Tools & Home Improvement": [{
        "rank": 1,
        "sales": 79
    }, {
        "rank": 1.3333333333333333,
        "sales": 78.67
    }, {
        "rank": 1.6666666666666665,
        "sales": 78.67
    }, {
        "rank": 3,
        "sales": 78.67
    }, {
        "rank": 3.333333333333333,
        "sales": 78.67
    }, {
        "rank": 3.6666666666666665,
        "sales": 78.67
    }, {
        "rank": 4,
        "sales": 78.67
    }, {
        "rank": 7,
        "sales": 78.67
    }, {
        "rank": 8,
        "sales": 78.67
    }, {
        "rank": 9,
        "sales": 78.67
    }, {
        "rank": 16,
        "sales": 78.67
    }, {
        "rank": 18,
        "sales": 78.67
    }, {
        "rank": 20,
        "sales": 78.67
    }, {
        "rank": 35,
        "sales": 78.67
    }, {
        "rank": 39.33333333333333,
        "sales": 78.67
    }, {
        "rank": 43.666666666666664,
        "sales": 78.67
    }, {
        "rank": 48,
        "sales": 78.67
    }, {
        "rank": 78,
        "sales": 78.67
    }, {
        "rank": 88,
        "sales": 78.67
    }, {
        "rank": 98,
        "sales": 78.67
    }, {
        "rank": 173,
        "sales": 73.78
    }, {
        "rank": 194.66666666666669,
        "sales": 71.82
    }, {
        "rank": 216.33333333333334,
        "sales": 69.86
    }, {
        "rank": 384,
        "sales": 62.21
    }, {
        "rank": 432.66666666666663,
        "sales": 60.88
    }, {
        "rank": 481.3333333333333,
        "sales": 59.55
    }, {
        "rank": 852,
        "sales": 50.32
    }, {
        "rank": 959.3333333333333,
        "sales": 47.75
    }, {
        "rank": 1066.6666666666665,
        "sales": 45.18
    }, {
        "rank": 1890,
        "sales": 32.62
    }, {
        "rank": 2128.6666666666665,
        "sales": 29.81
    }, {
        "rank": 2367.333333333333,
        "sales": 27
    }, {
        "rank": 4194,
        "sales": 18.59
    }, {
        "rank": 4723.333333333334,
        "sales": 17.68
    }, {
        "rank": 5252.666666666667,
        "sales": 16.77
    }, {
        "rank": 9305,
        "sales": 12.23
    }, {
        "rank": 10479.333333333332,
        "sales": 11.19
    }, {
        "rank": 11653.666666666666,
        "sales": 10.16
    }, {
        "rank": 12828,
        "sales": 9.13
    }, {
        "rank": 20646,
        "sales": 6.44
    }, {
        "rank": 23252,
        "sales": 5.85
    }, {
        "rank": 25858,
        "sales": 5.26
    }, {
        "rank": 45808,
        "sales": 3.3
    }, {
        "rank": 51589.33333333333,
        "sales": 3.03
    }, {
        "rank": 57370.666666666664,
        "sales": 2.77
    }, {
        "rank": 63152,
        "sales": 2.5
    }, {
        "rank": 101635,
        "sales": 1.69
    }, {
        "rank": 114462.66666666666,
        "sales": 1.49
    }, {
        "rank": 127290.33333333333,
        "sales": 1.3
    }, {
        "rank": 225501,
        "sales": 0.62
    }, {
        "rank": 253962,
        "sales": 0.52
    }, {
        "rank": 282423,
        "sales": 0.42
    }, {
        "rank": 500325,
        "sales": 0.13
    }, {
        "rank": 563472,
        "sales": 0.1
    }, {
        "rank": 626619,
        "sales": 0.07
    }, {
        "rank": 1110086,
        "sales": 0
    }, {
        "rank": 1250192.6666666665,
        "sales": 0
    }, {
        "rank": 1390299.3333333333,
        "sales": 0
    }, {
        "rank": 1530406,
        "sales": 0
    }, {
        "rank": 9122975,
        "sales": 0
    }, {
        "rank": 11653831.333333334,
        "sales": 0
    }, {
        "rank": 14184687.666666668,
        "sales": 0
    }],
    "Automotive": [{
        "rank": 6,
        "sales": 76
    }, {
        "rank": 8,
        "sales": 76.4
    }, {
        "rank": 10,
        "sales": 76.4
    }, {
        "rank": 18,
        "sales": 76.4
    }, {
        "rank": 20,
        "sales": 76.4
    }, {
        "rank": 22,
        "sales": 76.4
    }, {
        "rank": 36,
        "sales": 76.4
    }, {
        "rank": 40,
        "sales": 76.4
    }, {
        "rank": 44,
        "sales": 76.4
    }, {
        "rank": 73,
        "sales": 75.55
    }, {
        "rank": 81.33333333333334,
        "sales": 75.26
    }, {
        "rank": 89.66666666666667,
        "sales": 74.96
    }, {
        "rank": 148,
        "sales": 64.04
    }, {
        "rank": 164.66666666666669,
        "sales": 60.43
    }, {
        "rank": 181.33333333333334,
        "sales": 56.83
    }, {
        "rank": 300,
        "sales": 48.9
    }, {
        "rank": 334,
        "sales": 47.64
    }, {
        "rank": 368,
        "sales": 46.37
    }, {
        "rank": 606,
        "sales": 37.83
    }, {
        "rank": 674,
        "sales": 35.41
    }, {
        "rank": 742,
        "sales": 32.98
    }, {
        "rank": 1222,
        "sales": 24.92
    }, {
        "rank": 1359.3333333333335,
        "sales": 23.09
    }, {
        "rank": 1496.6666666666667,
        "sales": 21.26
    }, {
        "rank": 2466,
        "sales": 15.78
    }, {
        "rank": 2743.333333333333,
        "sales": 14.61
    }, {
        "rank": 3020.6666666666665,
        "sales": 13.44
    }, {
        "rank": 3298,
        "sales": 12.27
    }, {
        "rank": 4976,
        "sales": 10.03
    }, {
        "rank": 5535.333333333334,
        "sales": 9.31
    }, {
        "rank": 6094.666666666667,
        "sales": 8.59
    }, {
        "rank": 10040,
        "sales": 6.53
    }, {
        "rank": 11168.666666666668,
        "sales": 6.1
    }, {
        "rank": 12297.333333333334,
        "sales": 5.67
    }, {
        "rank": 20259,
        "sales": 4.46
    }, {
        "rank": 22536.666666666664,
        "sales": 4.21
    }, {
        "rank": 24814.333333333332,
        "sales": 3.96
    }, {
        "rank": 27092,
        "sales": 3.72
    }, {
        "rank": 40878,
        "sales": 2.81
    }, {
        "rank": 45473.33333333333,
        "sales": 2.52
    }, {
        "rank": 50068.666666666664,
        "sales": 2.22
    }, {
        "rank": 54664,
        "sales": 1.92
    }, {
        "rank": 82483,
        "sales": 1.46
    }, {
        "rank": 91756,
        "sales": 1.31
    }, {
        "rank": 101029,
        "sales": 1.16
    }, {
        "rank": 166434,
        "sales": 0.84
    }, {
        "rank": 185144.6666666667,
        "sales": 0.78
    }, {
        "rank": 203855.33333333334,
        "sales": 0.73
    }, {
        "rank": 335830,
        "sales": 0.66
    }, {
        "rank": 373584.6666666666,
        "sales": 0.66
    }, {
        "rank": 411339.3333333333,
        "sales": 0.65
    }, {
        "rank": 449094,
        "sales": 0.65
    }, {
        "rank": 677636,
        "sales": 0.33
    }, {
        "rank": 753816.6666666667,
        "sales": 0.23
    }, {
        "rank": 829997.3333333334,
        "sales": 0.12
    }, {
        "rank": 1367331,
        "sales": 0
    }, {
        "rank": 1521048.6666666665,
        "sales": 0
    }, {
        "rank": 1674766.3333333333,
        "sales": 0
    }, {
        "rank": 1828484,
        "sales": 0
    }, {
        "rank": 8425144,
        "sales": 0
    }, {
        "rank": 10624030.666666666,
        "sales": 0
    }, {
        "rank": 12822917.333333332,
        "sales": 0
    }],
    "Grocery & Gourmet Food": [{
        "rank": 5,
        "sales": 108
    }, {
        "rank": 6.666666666666667,
        "sales": 108.27
    }, {
        "rank": 8.333333333333334,
        "sales": 108.27
    }, {
        "rank": 15,
        "sales": 108.27
    }, {
        "rank": 16.666666666666668,
        "sales": 108.27
    }, {
        "rank": 18.333333333333336,
        "sales": 108.27
    }, {
        "rank": 32,
        "sales": 108.27
    }, {
        "rank": 36,
        "sales": 108.27
    }, {
        "rank": 40,
        "sales": 108.27
    }, {
        "rank": 67,
        "sales": 108.27
    }, {
        "rank": 74.66666666666667,
        "sales": 108.27
    }, {
        "rank": 82.33333333333334,
        "sales": 108.27
    }, {
        "rank": 139,
        "sales": 108.27
    }, {
        "rank": 155.33333333333331,
        "sales": 108.27
    }, {
        "rank": 171.66666666666666,
        "sales": 108.27
    }, {
        "rank": 188,
        "sales": 108.27
    }, {
        "rank": 289,
        "sales": 86.92
    }, {
        "rank": 322.66666666666663,
        "sales": 79.27
    }, {
        "rank": 356.3333333333333,
        "sales": 71.62
    }, {
        "rank": 390,
        "sales": 63.97
    }, {
        "rank": 602,
        "sales": 58.72
    }, {
        "rank": 672.6666666666667,
        "sales": 58.22
    }, {
        "rank": 743.3333333333334,
        "sales": 57.72
    }, {
        "rank": 1254,
        "sales": 52.31
    }, {
        "rank": 1400.6666666666665,
        "sales": 50.63
    }, {
        "rank": 1547.3333333333333,
        "sales": 48.95
    }, {
        "rank": 1694,
        "sales": 47.27
    }, {
        "rank": 2609,
        "sales": 36.65
    }, {
        "rank": 2914,
        "sales": 33.1
    }, {
        "rank": 3219,
        "sales": 29.56
    }, {
        "rank": 5430,
        "sales": 19.99
    }, {
        "rank": 6065.333333333334,
        "sales": 18.42
    }, {
        "rank": 6700.666666666667,
        "sales": 16.85
    }, {
        "rank": 11302,
        "sales": 11.08
    }, {
        "rank": 12624,
        "sales": 9.84
    }, {
        "rank": 13946,
        "sales": 8.59
    }, {
        "rank": 23525,
        "sales": 5.23
    }, {
        "rank": 26277.333333333336,
        "sales": 4.68
    }, {
        "rank": 29029.666666666668,
        "sales": 4.12
    }, {
        "rank": 48969,
        "sales": 2.37
    }, {
        "rank": 54698,
        "sales": 2.03
    }, {
        "rank": 60427,
        "sales": 1.7
    }, {
        "rank": 101930,
        "sales": 0.78
    }, {
        "rank": 113854.66666666666,
        "sales": 0.63
    }, {
        "rank": 125779.33333333333,
        "sales": 0.47
    }, {
        "rank": 212169,
        "sales": 0.14
    }, {
        "rank": 236990.6666666667,
        "sales": 0.1
    }, {
        "rank": 261812.33333333334,
        "sales": 0.06
    }, {
        "rank": 441634,
        "sales": 0
    }, {
        "rank": 493300.6666666666,
        "sales": 0
    }, {
        "rank": 544967.3333333333,
        "sales": 0
    }, {
        "rank": 919269,
        "sales": 0
    }, {
        "rank": 1026814,
        "sales": 0
    }, {
        "rank": 1134359,
        "sales": 0
    }, {
        "rank": 1913476,
        "sales": 0
    }, {
        "rank": 2137333.3333333335,
        "sales": 0
    }, {
        "rank": 2361190.666666667,
        "sales": 0
    }, {
        "rank": 12949350,
        "sales": 0
    }, {
        "rank": 16404117.333333334,
        "sales": 0
    }, {
        "rank": 19858884.666666668,
        "sales": 0
    }],
    "Pet Supplies": [{
        "rank": 5,
        "sales": 65
    }, {
        "rank": 6.666666666666667,
        "sales": 64.71
    }, {
        "rank": 8.333333333333334,
        "sales": 64.71
    }, {
        "rank": 15,
        "sales": 64.71
    }, {
        "rank": 16.666666666666668,
        "sales": 64.71
    }, {
        "rank": 18.333333333333336,
        "sales": 64.71
    }, {
        "rank": 32,
        "sales": 64.71
    }, {
        "rank": 36,
        "sales": 64.71
    }, {
        "rank": 40,
        "sales": 64.71
    }, {
        "rank": 67,
        "sales": 64.71
    }, {
        "rank": 74.66666666666667,
        "sales": 64.71
    }, {
        "rank": 82.33333333333334,
        "sales": 64.71
    }, {
        "rank": 139,
        "sales": 64.71
    }, {
        "rank": 155.33333333333331,
        "sales": 64.71
    }, {
        "rank": 171.66666666666666,
        "sales": 64.71
    }, {
        "rank": 188,
        "sales": 64.71
    }, {
        "rank": 289,
        "sales": 64.71
    }, {
        "rank": 322.66666666666663,
        "sales": 64.71
    }, {
        "rank": 356.3333333333333,
        "sales": 64.71
    }, {
        "rank": 390,
        "sales": 64.71
    }, {
        "rank": 600,
        "sales": 51.52
    }, {
        "rank": 670,
        "sales": 46.78
    }, {
        "rank": 740,
        "sales": 42.04
    }, {
        "rank": 1247,
        "sales": 31.02
    }, {
        "rank": 1392.6666666666665,
        "sales": 29.54
    }, {
        "rank": 1538.3333333333333,
        "sales": 28.06
    }, {
        "rank": 1684,
        "sales": 26.58
    }, {
        "rank": 2594,
        "sales": 22.32
    }, {
        "rank": 2897.333333333333,
        "sales": 21.03
    }, {
        "rank": 3200.6666666666665,
        "sales": 19.74
    }, {
        "rank": 3504,
        "sales": 18.45
    }, {
        "rank": 5396,
        "sales": 14.2
    }, {
        "rank": 6026.666666666666,
        "sales": 12.88
    }, {
        "rank": 6657.333333333333,
        "sales": 11.57
    }, {
        "rank": 7288,
        "sales": 10.25
    }, {
        "rank": 11223,
        "sales": 7.32
    }, {
        "rank": 12534.666666666668,
        "sales": 6.49
    }, {
        "rank": 13846.333333333334,
        "sales": 5.65
    }, {
        "rank": 23343,
        "sales": 3.36
    }, {
        "rank": 26071.333333333336,
        "sales": 2.98
    }, {
        "rank": 28799.666666666668,
        "sales": 2.59
    }, {
        "rank": 48553,
        "sales": 1.42
    }, {
        "rank": 54228,
        "sales": 1.21
    }, {
        "rank": 59903,
        "sales": 0.99
    }, {
        "rank": 100990,
        "sales": 0.43
    }, {
        "rank": 112794,
        "sales": 0.35
    }, {
        "rank": 124598,
        "sales": 0.26
    }, {
        "rank": 210060,
        "sales": 0.08
    }, {
        "rank": 234612.6666666667,
        "sales": 0.06
    }, {
        "rank": 259165.33333333334,
        "sales": 0.03
    }, {
        "rank": 436926,
        "sales": 0
    }, {
        "rank": 487995.3333333334,
        "sales": 0
    }, {
        "rank": 539064.6666666667,
        "sales": 0
    }, {
        "rank": 908806,
        "sales": 0
    }, {
        "rank": 1015030,
        "sales": 0
    }, {
        "rank": 1121254,
        "sales": 0
    }, {
        "rank": 1890317,
        "sales": 0
    }, {
        "rank": 2111263.3333333335,
        "sales": 0
    }, {
        "rank": 2332209.666666667,
        "sales": 0
    }, {
        "rank": 12764390,
        "sales": 0
    }, {
        "rank": 16168134.666666666,
        "sales": 0
    }, {
        "rank": 19571879.333333332,
        "sales": 0
    }, {
        "rank": 22975624,
        "sales": 0
    }],
    "Arts, Crafts & Sewing": [{
        "rank": 6,
        "sales": 101
    }, {
        "rank": 8,
        "sales": 100.29
    }, {
        "rank": 10,
        "sales": 100
    }, {
        "rank": 18,
        "sales": 91.83
    }, {
        "rank": 20,
        "sales": 89.21
    }, {
        "rank": 22,
        "sales": 86.59
    }, {
        "rank": 38,
        "sales": 78.68
    }, {
        "rank": 42.66666666666667,
        "sales": 77.65
    }, {
        "rank": 47.333333333333336,
        "sales": 76.62
    }, {
        "rank": 79,
        "sales": 68.75
    }, {
        "rank": 88,
        "sales": 66.46
    }, {
        "rank": 97,
        "sales": 64.17
    }, {
        "rank": 162,
        "sales": 50.67
    }, {
        "rank": 180.66666666666669,
        "sales": 46.99
    }, {
        "rank": 199.33333333333334,
        "sales": 43.3
    }, {
        "rank": 333,
        "sales": 34.63
    }, {
        "rank": 371.33333333333337,
        "sales": 33.29
    }, {
        "rank": 409.6666666666667,
        "sales": 31.95
    }, {
        "rank": 685,
        "sales": 25.23
    }, {
        "rank": 764,
        "sales": 23.49
    }, {
        "rank": 843,
        "sales": 21.76
    }, {
        "rank": 1412,
        "sales": 15.64
    }, {
        "rank": 1575.3333333333335,
        "sales": 14.32
    }, {
        "rank": 1738.6666666666667,
        "sales": 12.99
    }, {
        "rank": 2913,
        "sales": 9.47
    }, {
        "rank": 3250,
        "sales": 8.86
    }, {
        "rank": 3587,
        "sales": 8.26
    }, {
        "rank": 6008,
        "sales": 6.2
    }, {
        "rank": 6702.666666666666,
        "sales": 5.76
    }, {
        "rank": 7397.333333333333,
        "sales": 5.32
    }, {
        "rank": 8092,
        "sales": 4.89
    }, {
        "rank": 12390,
        "sales": 3.76
    }, {
        "rank": 13822.666666666668,
        "sales": 3.41
    }, {
        "rank": 15255.333333333334,
        "sales": 3.07
    }, {
        "rank": 25551,
        "sales": 2.19
    }, {
        "rank": 28505.333333333336,
        "sales": 2.04
    }, {
        "rank": 31459.666666666668,
        "sales": 1.9
    }, {
        "rank": 52690,
        "sales": 1.23
    }, {
        "rank": 58782,
        "sales": 1.07
    }, {
        "rank": 64874,
        "sales": 0.9
    }, {
        "rank": 108654,
        "sales": 0.45
    }, {
        "rank": 121216.66666666666,
        "sales": 0.37
    }, {
        "rank": 133779.3333333333,
        "sales": 0.29
    }, {
        "rank": 224060,
        "sales": 0.1
    }, {
        "rank": 249966,
        "sales": 0.07
    }, {
        "rank": 275872,
        "sales": 0.04
    }, {
        "rank": 462047,
        "sales": 0
    }, {
        "rank": 515470,
        "sales": 0
    }, {
        "rank": 568893,
        "sales": 0
    }, {
        "rank": 952814,
        "sales": 0
    }, {
        "rank": 1062980,
        "sales": 0
    }, {
        "rank": 1173146,
        "sales": 0
    }, {
        "rank": 1964853,
        "sales": 0
    }, {
        "rank": 2192033.3333333335,
        "sales": 0
    }, {
        "rank": 2419213.666666667,
        "sales": 0
    }, {
        "rank": 12926729,
        "sales": 0
    }, {
        "rank": 16353507.333333334,
        "sales": 0
    }, {
        "rank": 19780285.666666668,
        "sales": 0
    }],
    "Patio, Lawn & Garden": [{
        "rank": 4,
        "sales": 109
    }, {
        "rank": 5.333333333333333,
        "sales": 109.47
    }, {
        "rank": 6.666666666666666,
        "sales": 109.47
    }, {
        "rank": 12,
        "sales": 109.47
    }, {
        "rank": 13.333333333333332,
        "sales": 109.47
    }, {
        "rank": 14.666666666666666,
        "sales": 109.47
    }, {
        "rank": 16,
        "sales": 109.47
    }, {
        "rank": 25,
        "sales": 109.47
    }, {
        "rank": 28,
        "sales": 109.47
    }, {
        "rank": 31,
        "sales": 109.47
    }, {
        "rank": 53,
        "sales": 109.47
    }, {
        "rank": 59.33333333333333,
        "sales": 109.47
    }, {
        "rank": 65.66666666666666,
        "sales": 109.47
    }, {
        "rank": 112,
        "sales": 98.99
    }, {
        "rank": 125.33333333333334,
        "sales": 95.12
    }, {
        "rank": 138.66666666666669,
        "sales": 91.24
    }, {
        "rank": 234,
        "sales": 81.34
    }, {
        "rank": 261.3333333333333,
        "sales": 79.8
    }, {
        "rank": 288.66666666666663,
        "sales": 78.26
    }, {
        "rank": 488,
        "sales": 64.09
    }, {
        "rank": 545.3333333333334,
        "sales": 59.79
    }, {
        "rank": 602.6666666666667,
        "sales": 55.49
    }, {
        "rank": 1020,
        "sales": 40.67
    }, {
        "rank": 1140,
        "sales": 37.66
    }, {
        "rank": 1260,
        "sales": 34.65
    }, {
        "rank": 2129,
        "sales": 26.28
    }, {
        "rank": 2378.6666666666665,
        "sales": 24.88
    }, {
        "rank": 2628.333333333333,
        "sales": 23.48
    }, {
        "rank": 4443,
        "sales": 16.88
    }, {
        "rank": 4964.666666666666,
        "sales": 15.25
    }, {
        "rank": 5486.333333333333,
        "sales": 13.62
    }, {
        "rank": 6008,
        "sales": 11.99
    }, {
        "rank": 9273,
        "sales": 9.05
    }, {
        "rank": 10361.333333333332,
        "sales": 8.27
    }, {
        "rank": 11449.666666666666,
        "sales": 7.5
    }, {
        "rank": 12538,
        "sales": 6.73
    }, {
        "rank": 19353,
        "sales": 5.01
    }, {
        "rank": 21624.666666666664,
        "sales": 4.53
    }, {
        "rank": 23896.333333333332,
        "sales": 4.04
    }, {
        "rank": 26168,
        "sales": 3.56
    }, {
        "rank": 40389,
        "sales": 2.52
    }, {
        "rank": 45129.33333333333,
        "sales": 2.23
    }, {
        "rank": 49869.666666666664,
        "sales": 1.94
    }, {
        "rank": 54610,
        "sales": 1.65
    }, {
        "rank": 84290,
        "sales": 1.04
    }, {
        "rank": 94183.33333333334,
        "sales": 0.88
    }, {
        "rank": 104076.66666666667,
        "sales": 0.71
    }, {
        "rank": 175911,
        "sales": 0.27
    }, {
        "rank": 196558,
        "sales": 0.21
    }, {
        "rank": 217205,
        "sales": 0.14
    }, {
        "rank": 367121,
        "sales": 0.02
    }, {
        "rank": 410210.6666666666,
        "sales": 0.02
    }, {
        "rank": 453300.3333333333,
        "sales": 0.01
    }, {
        "rank": 496390,
        "sales": 0
    }, {
        "rank": 766169,
        "sales": 0
    }, {
        "rank": 856095.3333333333,
        "sales": 0
    }, {
        "rank": 946021.6666666666,
        "sales": 0
    }, {
        "rank": 1035948,
        "sales": 0
    }, {
        "rank": 1598969,
        "sales": 0
    }, {
        "rank": 1786642.6666666665,
        "sales": 0
    }, {
        "rank": 1974316.3333333333,
        "sales": 0
    }, {
        "rank": 10906851,
        "sales": 0
    }, {
        "rank": 13821804.666666666,
        "sales": 0
    }, {
        "rank": 16736758.333333332,
        "sales": 0
    }],
    "Office Products": [{
        "rank": 1,
        "sales": 70
    }, {
        "rank": 1.3333333333333333,
        "sales": 70.32
    }, {
        "rank": 1.6666666666666665,
        "sales": 70.32
    }, {
        "rank": 3,
        "sales": 70.32
    }, {
        "rank": 3.333333333333333,
        "sales": 70.32
    }, {
        "rank": 3.6666666666666665,
        "sales": 70.32
    }, {
        "rank": 4,
        "sales": 70.32
    }, {
        "rank": 7,
        "sales": 70.32
    }, {
        "rank": 8,
        "sales": 70.32
    }, {
        "rank": 9,
        "sales": 70.32
    }, {
        "rank": 16,
        "sales": 70.32
    }, {
        "rank": 18,
        "sales": 70.32
    }, {
        "rank": 20,
        "sales": 70.32
    }, {
        "rank": 36,
        "sales": 70.32
    }, {
        "rank": 40.66666666666667,
        "sales": 70.32
    }, {
        "rank": 45.333333333333336,
        "sales": 70.32
    }, {
        "rank": 82,
        "sales": 70.32
    }, {
        "rank": 92.66666666666666,
        "sales": 70.32
    }, {
        "rank": 103.33333333333333,
        "sales": 70.32
    }, {
        "rank": 114,
        "sales": 70.32
    }, {
        "rank": 185,
        "sales": 70.32
    }, {
        "rank": 208.66666666666669,
        "sales": 70.32
    }, {
        "rank": 232.33333333333334,
        "sales": 70.32
    }, {
        "rank": 417,
        "sales": 63.05
    }, {
        "rank": 470.66666666666663,
        "sales": 60
    }, {
        "rank": 524.3333333333333,
        "sales": 56.95
    }, {
        "rank": 937,
        "sales": 44.67
    }, {
        "rank": 1056.6666666666667,
        "sales": 42.49
    }, {
        "rank": 1176.3333333333335,
        "sales": 40.31
    }, {
        "rank": 2105,
        "sales": 29.62
    }, {
        "rank": 2374.666666666667,
        "sales": 27.29
    }, {
        "rank": 2644.3333333333335,
        "sales": 24.97
    }, {
        "rank": 4729,
        "sales": 16.22
    }, {
        "rank": 5334,
        "sales": 14.84
    }, {
        "rank": 5939,
        "sales": 13.45
    }, {
        "rank": 10622,
        "sales": 8.43
    }, {
        "rank": 11981.333333333332,
        "sales": 7.69
    }, {
        "rank": 13340.666666666666,
        "sales": 6.94
    }, {
        "rank": 14700,
        "sales": 6.2
    }, {
        "rank": 23861,
        "sales": 4.09
    }, {
        "rank": 26914.666666666664,
        "sales": 3.63
    }, {
        "rank": 29968.333333333332,
        "sales": 3.16
    }, {
        "rank": 53601,
        "sales": 1.66
    }, {
        "rank": 60460.66666666667,
        "sales": 1.49
    }, {
        "rank": 67320.33333333334,
        "sales": 1.31
    }, {
        "rank": 120407,
        "sales": 0.62
    }, {
        "rank": 135816,
        "sales": 0.51
    }, {
        "rank": 151225,
        "sales": 0.39
    }, {
        "rank": 270477,
        "sales": 0.07
    }, {
        "rank": 305091.3333333334,
        "sales": 0.05
    }, {
        "rank": 339705.6666666667,
        "sales": 0.04
    }, {
        "rank": 607591,
        "sales": 0
    }, {
        "rank": 685348,
        "sales": 0
    }, {
        "rank": 763105,
        "sales": 0
    }, {
        "rank": 1364874,
        "sales": 0
    }, {
        "rank": 1539544.6666666665,
        "sales": 0
    }, {
        "rank": 1714215.3333333333,
        "sales": 0
    }, {
        "rank": 1888886,
        "sales": 0
    }, {
        "rank": 11650231,
        "sales": 0
    }, {
        "rank": 14904012.666666666,
        "sales": 0
    }, {
        "rank": 18157794.333333332,
        "sales": 0
    }, {
        "rank": 21411576,
        "sales": 0
    }],
    "Musical Instruments": [{
        "rank": 2,
        "sales": 56
    }, {
        "rank": 2.6666666666666665,
        "sales": 55.51
    }, {
        "rank": 3.333333333333333,
        "sales": 55.51
    }, {
        "rank": 6,
        "sales": 55.51
    }, {
        "rank": 6.666666666666666,
        "sales": 55.51
    }, {
        "rank": 7.333333333333333,
        "sales": 55.51
    }, {
        "rank": 8,
        "sales": 56
    }, {
        "rank": 12,
        "sales": 55.03
    }, {
        "rank": 13.333333333333332,
        "sales": 54.87
    }, {
        "rank": 14.666666666666666,
        "sales": 54.71
    }, {
        "rank": 16,
        "sales": 55
    }, {
        "rank": 24,
        "sales": 53.93
    }, {
        "rank": 26.666666666666664,
        "sales": 53.72
    }, {
        "rank": 29.333333333333332,
        "sales": 53.51
    }, {
        "rank": 32,
        "sales": 52.99
    }, {
        "rank": 47,
        "sales": 47.2
    }, {
        "rank": 52,
        "sales": 45.27
    }, {
        "rank": 57,
        "sales": 43.34
    }, {
        "rank": 93,
        "sales": 35.56
    }, {
        "rank": 103.33333333333334,
        "sales": 33.61
    }, {
        "rank": 113.66666666666667,
        "sales": 31.66
    }, {
        "rank": 184,
        "sales": 28.16
    }, {
        "rank": 204,
        "sales": 27.54
    }, {
        "rank": 224,
        "sales": 26.91
    }, {
        "rank": 365,
        "sales": 21.64
    }, {
        "rank": 405.33333333333337,
        "sales": 20.09
    }, {
        "rank": 445.6666666666667,
        "sales": 18.54
    }, {
        "rank": 725,
        "sales": 13.46
    }, {
        "rank": 804.6666666666667,
        "sales": 12.25
    }, {
        "rank": 884.3333333333334,
        "sales": 11.04
    }, {
        "rank": 1439,
        "sales": 8.31
    }, {
        "rank": 1597.3333333333335,
        "sales": 7.78
    }, {
        "rank": 1755.6666666666667,
        "sales": 7.25
    }, {
        "rank": 2857,
        "sales": 5.06
    }, {
        "rank": 3171.333333333333,
        "sales": 4.51
    }, {
        "rank": 3485.6666666666665,
        "sales": 3.95
    }, {
        "rank": 3800,
        "sales": 3.43
    }, {
        "rank": 5672,
        "sales": 2.77
    }, {
        "rank": 6296,
        "sales": 2.55
    }, {
        "rank": 6920,
        "sales": 2.33
    }, {
        "rank": 11259,
        "sales": 1.59
    }, {
        "rank": 12497.333333333332,
        "sales": 1.42
    }, {
        "rank": 13735.666666666666,
        "sales": 1.24
    }, {
        "rank": 14974,
        "sales": 1.07
    }, {
        "rank": 22350,
        "sales": 0.74
    }, {
        "rank": 24808.666666666664,
        "sales": 0.63
    }, {
        "rank": 27267.333333333332,
        "sales": 0.52
    }, {
        "rank": 29726,
        "sales": 0.42
    }, {
        "rank": 44367,
        "sales": 0.26
    }, {
        "rank": 49247.33333333333,
        "sales": 0.2
    }, {
        "rank": 54127.666666666664,
        "sales": 0.15
    }, {
        "rank": 59008,
        "sales": 0.1
    }, {
        "rank": 88072,
        "sales": 0.05
    }, {
        "rank": 97760,
        "sales": 0.03
    }, {
        "rank": 107448,
        "sales": 0.02
    }, {
        "rank": 174830,
        "sales": 0
    }, {
        "rank": 194061.3333333333,
        "sales": 0
    }, {
        "rank": 213292.66666666666,
        "sales": 0
    }, {
        "rank": 232524,
        "sales": 0
    }, {
        "rank": 347049,
        "sales": 0
    }, {
        "rank": 385224,
        "sales": 0
    }, {
        "rank": 423399,
        "sales": 0
    }, {
        "rank": 2036042,
        "sales": 0
    }, {
        "rank": 2560864.6666666665,
        "sales": 0
    }, {
        "rank": 3085687.333333333,
        "sales": 0
    }],
    "Baby": [{
        "rank": 3,
        "sales": 71
    }, {
        "rank": 4,
        "sales": 70.78
    }, {
        "rank": 5,
        "sales": 70.78
    }, {
        "rank": 9,
        "sales": 70.78
    }, {
        "rank": 10,
        "sales": 70.78
    }, {
        "rank": 11,
        "sales": 70.78
    }, {
        "rank": 18,
        "sales": 70.78
    }, {
        "rank": 20,
        "sales": 70.78
    }, {
        "rank": 22,
        "sales": 70.78
    }, {
        "rank": 36,
        "sales": 70.78
    }, {
        "rank": 40,
        "sales": 70.78
    }, {
        "rank": 44,
        "sales": 70.78
    }, {
        "rank": 73,
        "sales": 70.78
    }, {
        "rank": 81.33333333333334,
        "sales": 70.78
    }, {
        "rank": 89.66666666666667,
        "sales": 70.78
    }, {
        "rank": 147,
        "sales": 70.78
    }, {
        "rank": 163.33333333333331,
        "sales": 70.78
    }, {
        "rank": 179.66666666666666,
        "sales": 70.78
    }, {
        "rank": 196,
        "sales": 70.78
    }, {
        "rank": 295,
        "sales": 60.06
    }, {
        "rank": 328,
        "sales": 56.45
    }, {
        "rank": 361,
        "sales": 52.84
    }, {
        "rank": 592,
        "sales": 39.68
    }, {
        "rank": 658,
        "sales": 36.52
    }, {
        "rank": 724,
        "sales": 33.35
    }, {
        "rank": 1189,
        "sales": 25.74
    }, {
        "rank": 1322,
        "sales": 24.3
    }, {
        "rank": 1455,
        "sales": 22.87
    }, {
        "rank": 2388,
        "sales": 16.65
    }, {
        "rank": 2654.666666666667,
        "sales": 15.07
    }, {
        "rank": 2921.3333333333335,
        "sales": 13.48
    }, {
        "rank": 4795,
        "sales": 9.28
    }, {
        "rank": 5330.666666666666,
        "sales": 8.42
    }, {
        "rank": 5866.333333333333,
        "sales": 7.57
    }, {
        "rank": 6402,
        "sales": 6.71
    }, {
        "rank": 9630,
        "sales": 4.94
    }, {
        "rank": 10706,
        "sales": 4.35
    }, {
        "rank": 11782,
        "sales": 3.77
    }, {
        "rank": 19340,
        "sales": 2.25
    }, {
        "rank": 21500.666666666664,
        "sales": 1.94
    }, {
        "rank": 23661.333333333332,
        "sales": 1.63
    }, {
        "rank": 25822,
        "sales": 1.33
    }, {
        "rank": 38840,
        "sales": 0.85
    }, {
        "rank": 43179.33333333333,
        "sales": 0.7
    }, {
        "rank": 47518.666666666664,
        "sales": 0.54
    }, {
        "rank": 51858,
        "sales": 0.39
    }, {
        "rank": 78000,
        "sales": 0.21
    }, {
        "rank": 86714,
        "sales": 0.16
    }, {
        "rank": 95428,
        "sales": 0.1
    }, {
        "rank": 156644,
        "sales": 0.02
    }, {
        "rank": 174144.6666666667,
        "sales": 0.01
    }, {
        "rank": 191645.33333333334,
        "sales": 0.01
    }, {
        "rank": 314582,
        "sales": 0
    }, {
        "rank": 349727.3333333334,
        "sales": 0
    }, {
        "rank": 384872.6666666667,
        "sales": 0
    }, {
        "rank": 631762,
        "sales": 0
    }, {
        "rank": 702343.3333333333,
        "sales": 0
    }, {
        "rank": 772924.6666666666,
        "sales": 0
    }, {
        "rank": 843506,
        "sales": 0
    }, {
        "rank": 3837747,
        "sales": 0
    }, {
        "rank": 4835827.333333334,
        "sales": 0
    }, {
        "rank": 5833907.666666667,
        "sales": 0
    }],
    "Cell Phones & Accessories": [{
        "rank": 1,
        "sales": 38
    }, {
        "rank": 1.3333333333333333,
        "sales": 37.57
    }, {
        "rank": 1.6666666666666665,
        "sales": 37.57
    }, {
        "rank": 3,
        "sales": 37.57
    }, {
        "rank": 3.333333333333333,
        "sales": 37.57
    }, {
        "rank": 3.6666666666666665,
        "sales": 37.57
    }, {
        "rank": 4,
        "sales": 37.57
    }, {
        "rank": 7,
        "sales": 37.57
    }, {
        "rank": 8,
        "sales": 37.57
    }, {
        "rank": 9,
        "sales": 37.57
    }, {
        "rank": 15,
        "sales": 37.57
    }, {
        "rank": 16.666666666666668,
        "sales": 37.57
    }, {
        "rank": 18.333333333333336,
        "sales": 37.57
    }, {
        "rank": 32,
        "sales": 37.57
    }, {
        "rank": 36,
        "sales": 37.57
    }, {
        "rank": 40,
        "sales": 37.57
    }, {
        "rank": 70,
        "sales": 37.57
    }, {
        "rank": 78.66666666666666,
        "sales": 37.57
    }, {
        "rank": 87.33333333333333,
        "sales": 37.57
    }, {
        "rank": 96,
        "sales": 37.57
    }, {
        "rank": 153,
        "sales": 37.57
    }, {
        "rank": 172,
        "sales": 37.57
    }, {
        "rank": 191,
        "sales": 37.57
    }, {
        "rank": 333,
        "sales": 37.57
    }, {
        "rank": 374,
        "sales": 37.57
    }, {
        "rank": 415,
        "sales": 37.57
    }, {
        "rank": 723,
        "sales": 37.57
    }, {
        "rank": 812,
        "sales": 37.57
    }, {
        "rank": 901,
        "sales": 37.57
    }, {
        "rank": 1570,
        "sales": 33.85
    }, {
        "rank": 1763.3333333333335,
        "sales": 32.4
    }, {
        "rank": 1956.6666666666667,
        "sales": 30.95
    }, {
        "rank": 3409,
        "sales": 23.68
    }, {
        "rank": 3828.666666666667,
        "sales": 21.94
    }, {
        "rank": 4248.333333333334,
        "sales": 20.21
    }, {
        "rank": 7403,
        "sales": 13.61
    }, {
        "rank": 8314.666666666666,
        "sales": 12.36
    }, {
        "rank": 9226.333333333332,
        "sales": 11.11
    }, {
        "rank": 16078,
        "sales": 6.71
    }, {
        "rank": 18058,
        "sales": 5.94
    }, {
        "rank": 20038,
        "sales": 5.18
    }, {
        "rank": 34918,
        "sales": 2.92
    }, {
        "rank": 39218,
        "sales": 2.62
    }, {
        "rank": 43518,
        "sales": 2.32
    }, {
        "rank": 75833,
        "sales": 1.31
    }, {
        "rank": 85171.33333333334,
        "sales": 1.15
    }, {
        "rank": 94509.66666666667,
        "sales": 0.98
    }, {
        "rank": 164691,
        "sales": 0.44
    }, {
        "rank": 184972,
        "sales": 0.35
    }, {
        "rank": 205253,
        "sales": 0.27
    }, {
        "rank": 357670,
        "sales": 0.06
    }, {
        "rank": 401715.3333333334,
        "sales": 0.05
    }, {
        "rank": 445760.6666666667,
        "sales": 0.03
    }, {
        "rank": 776774,
        "sales": 0
    }, {
        "rank": 872430,
        "sales": 0
    }, {
        "rank": 968086,
        "sales": 0
    }, {
        "rank": 5979940,
        "sales": 0
    }, {
        "rank": 7618672.666666667,
        "sales": 0
    }, {
        "rank": 9257405.333333334,
        "sales": 0
    }],
    "Video Games": [{
        "rank": 1,
        "sales": 33
    }, {
        "rank": 1.3333333333333333,
        "sales": 33.29
    }, {
        "rank": 1.6666666666666665,
        "sales": 33.29
    }, {
        "rank": 3,
        "sales": 33.29
    }, {
        "rank": 3.333333333333333,
        "sales": 33.29
    }, {
        "rank": 3.6666666666666665,
        "sales": 33.29
    }, {
        "rank": 4,
        "sales": 33
    }, {
        "rank": 6,
        "sales": 33.29
    }, {
        "rank": 6.666666666666666,
        "sales": 33.29
    }, {
        "rank": 7.333333333333333,
        "sales": 33.29
    }, {
        "rank": 8,
        "sales": 33.29
    }, {
        "rank": 11,
        "sales": 33.29
    }, {
        "rank": 12,
        "sales": 33.29
    }, {
        "rank": 13,
        "sales": 33.29
    }, {
        "rank": 22,
        "sales": 33.29
    }, {
        "rank": 24.666666666666664,
        "sales": 33.29
    }, {
        "rank": 27.333333333333332,
        "sales": 33.29
    }, {
        "rank": 30,
        "sales": 33.29
    }, {
        "rank": 43,
        "sales": 33.29
    }, {
        "rank": 47.33333333333333,
        "sales": 33.29
    }, {
        "rank": 51.666666666666664,
        "sales": 33.29
    }, {
        "rank": 56,
        "sales": 33.29
    }, {
        "rank": 83,
        "sales": 33.29
    }, {
        "rank": 92,
        "sales": 33.29
    }, {
        "rank": 101,
        "sales": 33.29
    }, {
        "rank": 163,
        "sales": 32.41
    }, {
        "rank": 180.66666666666669,
        "sales": 32.13
    }, {
        "rank": 198.33333333333334,
        "sales": 31.84
    }, {
        "rank": 319,
        "sales": 26.05
    }, {
        "rank": 353.33333333333337,
        "sales": 24.27
    }, {
        "rank": 387.6666666666667,
        "sales": 22.5
    }, {
        "rank": 622,
        "sales": 16.42
    }, {
        "rank": 688.6666666666667,
        "sales": 14.88
    }, {
        "rank": 755.3333333333334,
        "sales": 13.34
    }, {
        "rank": 1213,
        "sales": 9.61
    }, {
        "rank": 1343.3333333333335,
        "sales": 8.77
    }, {
        "rank": 1473.6666666666667,
        "sales": 7.93
    }, {
        "rank": 2368,
        "sales": 5.28
    }, {
        "rank": 2622.666666666667,
        "sales": 4.62
    }, {
        "rank": 2877.3333333333335,
        "sales": 3.97
    }, {
        "rank": 4622,
        "sales": 2.61
    }, {
        "rank": 5118.666666666666,
        "sales": 2.32
    }, {
        "rank": 5615.333333333333,
        "sales": 2.03
    }, {
        "rank": 6112,
        "sales": 1.8
    }, {
        "rank": 9020,
        "sales": 1.22
    }, {
        "rank": 9989.333333333334,
        "sales": 1.03
    }, {
        "rank": 10958.666666666668,
        "sales": 0.84
    }, {
        "rank": 17604,
        "sales": 0.44
    }, {
        "rank": 19496,
        "sales": 0.36
    }, {
        "rank": 21388,
        "sales": 0.28
    }, {
        "rank": 34358,
        "sales": 0.11
    }, {
        "rank": 38050.666666666664,
        "sales": 0.08
    }, {
        "rank": 41743.33333333333,
        "sales": 0.04
    }, {
        "rank": 67058,
        "sales": 0.01
    }, {
        "rank": 74265.33333333333,
        "sales": 0.01
    }, {
        "rank": 81472.66666666666,
        "sales": 0
    }, {
        "rank": 130881,
        "sales": 0
    }, {
        "rank": 144948,
        "sales": 0
    }, {
        "rank": 159015,
        "sales": 0
    }, {
        "rank": 729964,
        "sales": 0
    }, {
        "rank": 915591.3333333334,
        "sales": 0
    }, {
        "rank": 1101218.6666666667,
        "sales": 0
    }],
    "Industrial & Scientific": [{
        "rank": 2,
        "sales": 78
    }, {
        "rank": 2.6666666666666665,
        "sales": 78.33
    }, {
        "rank": 3.333333333333333,
        "sales": 78.33
    }, {
        "rank": 6,
        "sales": 78.33
    }, {
        "rank": 6.666666666666666,
        "sales": 78.33
    }, {
        "rank": 7.333333333333333,
        "sales": 78.33
    }, {
        "rank": 8,
        "sales": 78.33
    }, {
        "rank": 13,
        "sales": 78.33
    }, {
        "rank": 14.666666666666668,
        "sales": 78.33
    }, {
        "rank": 16.333333333333336,
        "sales": 78.33
    }, {
        "rank": 29,
        "sales": 73.56
    }, {
        "rank": 32.666666666666664,
        "sales": 71.61
    }, {
        "rank": 36.33333333333333,
        "sales": 69.67
    }, {
        "rank": 62,
        "sales": 62.6
    }, {
        "rank": 69.33333333333333,
        "sales": 61.12
    }, {
        "rank": 76.66666666666666,
        "sales": 59.63
    }, {
        "rank": 131,
        "sales": 49.4
    }, {
        "rank": 146.66666666666666,
        "sales": 46.51
    }, {
        "rank": 162.33333333333331,
        "sales": 43.63
    }, {
        "rank": 280,
        "sales": 34.16
    }, {
        "rank": 314,
        "sales": 32.56
    }, {
        "rank": 348,
        "sales": 30.95
    }, {
        "rank": 600,
        "sales": 23.37
    }, {
        "rank": 672.6666666666667,
        "sales": 21.58
    }, {
        "rank": 745.3333333333334,
        "sales": 19.79
    }, {
        "rank": 1283,
        "sales": 14.35
    }, {
        "rank": 1438,
        "sales": 13.48
    }, {
        "rank": 1593,
        "sales": 12.62
    }, {
        "rank": 2744,
        "sales": 9.61
    }, {
        "rank": 3076,
        "sales": 9.06
    }, {
        "rank": 3408,
        "sales": 8.5
    }, {
        "rank": 5868,
        "sales": 5.99
    }, {
        "rank": 6577.333333333334,
        "sales": 5.41
    }, {
        "rank": 7286.666666666667,
        "sales": 4.83
    }, {
        "rank": 12548,
        "sales": 3.05
    }, {
        "rank": 14065.333333333332,
        "sales": 2.76
    }, {
        "rank": 15582.666666666666,
        "sales": 2.48
    }, {
        "rank": 26833,
        "sales": 1.6
    }, {
        "rank": 30077.333333333336,
        "sales": 1.46
    }, {
        "rank": 33321.66666666667,
        "sales": 1.32
    }, {
        "rank": 57378,
        "sales": 0.79
    }, {
        "rank": 64315.33333333333,
        "sales": 0.68
    }, {
        "rank": 71252.66666666666,
        "sales": 0.58
    }, {
        "rank": 122696,
        "sales": 0.25
    }, {
        "rank": 137531.33333333334,
        "sales": 0.2
    }, {
        "rank": 152366.6666666667,
        "sales": 0.14
    }, {
        "rank": 262371,
        "sales": 0.03
    }, {
        "rank": 294094,
        "sales": 0.02
    }, {
        "rank": 325817,
        "sales": 0.01
    }, {
        "rank": 561047,
        "sales": 0
    }, {
        "rank": 628882.6666666667,
        "sales": 0
    }, {
        "rank": 696718.3333333334,
        "sales": 0
    }, {
        "rank": 1199728,
        "sales": 0
    }, {
        "rank": 1344786,
        "sales": 0
    }, {
        "rank": 1489844,
        "sales": 0
    }, {
        "rank": 8810540,
        "sales": 0
    }, {
        "rank": 11202419.333333334,
        "sales": 0
    }, {
        "rank": 13594298.666666668,
        "sales": 0
    }],
    "Electronics": [{
        "rank": 1,
        "sales": 13
    }, {
        "rank": 1.3333333333333333,
        "sales": 12.89
    }, {
        "rank": 1.6666666666666665,
        "sales": 12.62
    }, {
        "rank": 3,
        "sales": 12.23
    }, {
        "rank": 3.333333333333333,
        "sales": 12.18
    }, {
        "rank": 3.6666666666666665,
        "sales": 12.14
    }, {
        "rank": 4,
        "sales": 12.09
    }, {
        "rank": 7,
        "sales": 11.96
    }, {
        "rank": 8,
        "sales": 11.96
    }, {
        "rank": 9,
        "sales": 11.96
    }, {
        "rank": 15,
        "sales": 11.96
    }, {
        "rank": 16.666666666666668,
        "sales": 11.96
    }, {
        "rank": 18.333333333333336,
        "sales": 11.96
    }, {
        "rank": 31,
        "sales": 11.96
    }, {
        "rank": 34.666666666666664,
        "sales": 11.96
    }, {
        "rank": 38.33333333333333,
        "sales": 11.96
    }, {
        "rank": 67,
        "sales": 11.96
    }, {
        "rank": 75.33333333333334,
        "sales": 11.96
    }, {
        "rank": 83.66666666666667,
        "sales": 11.96
    }, {
        "rank": 144,
        "sales": 11.96
    }, {
        "rank": 161.33333333333331,
        "sales": 11.96
    }, {
        "rank": 178.66666666666666,
        "sales": 11.96
    }, {
        "rank": 196,
        "sales": 11.96
    }, {
        "rank": 308,
        "sales": 11.96
    }, {
        "rank": 345.33333333333337,
        "sales": 11.96
    }, {
        "rank": 382.6666666666667,
        "sales": 11.96
    }, {
        "rank": 661,
        "sales": 11.96
    }, {
        "rank": 741.3333333333333,
        "sales": 11.96
    }, {
        "rank": 821.6666666666666,
        "sales": 11.96
    }, {
        "rank": 902,
        "sales": 11.96
    }, {
        "rank": 1419,
        "sales": 10.5
    }, {
        "rank": 1591.3333333333335,
        "sales": 9.94
    }, {
        "rank": 1763.6666666666667,
        "sales": 9.38
    }, {
        "rank": 3046,
        "sales": 7.65
    }, {
        "rank": 3416,
        "sales": 7.38
    }, {
        "rank": 3786,
        "sales": 7.11
    }, {
        "rank": 6539,
        "sales": 5.16
    }, {
        "rank": 7333.333333333334,
        "sales": 4.61
    }, {
        "rank": 8127.666666666667,
        "sales": 4.05
    }, {
        "rank": 14038,
        "sales": 2.41
    }, {
        "rank": 15743.333333333332,
        "sales": 2.17
    }, {
        "rank": 17448.666666666664,
        "sales": 1.93
    }, {
        "rank": 30137,
        "sales": 1.1
    }, {
        "rank": 33798,
        "sales": 0.95
    }, {
        "rank": 37459,
        "sales": 0.79
    }, {
        "rank": 64696,
        "sales": 0.33
    }, {
        "rank": 72554.66666666667,
        "sales": 0.26
    }, {
        "rank": 80413.33333333334,
        "sales": 0.18
    }, {
        "rank": 138882,
        "sales": 0.03
    }, {
        "rank": 155752,
        "sales": 0.02
    }, {
        "rank": 172622,
        "sales": 0.01
    }, {
        "rank": 298138,
        "sales": 0
    }, {
        "rank": 334353.3333333334,
        "sales": 0
    }, {
        "rank": 370568.6666666667,
        "sales": 0
    }, {
        "rank": 640013,
        "sales": 0
    }, {
        "rank": 717756,
        "sales": 0
    }, {
        "rank": 795499,
        "sales": 0
    }, {
        "rank": 4755960,
        "sales": 0
    }, {
        "rank": 6050199.333333333,
        "sales": 0
    }, {
        "rank": 7344438.666666666,
        "sales": 0
    }],
    "Camera & Photo": [{
        "rank": 1,
        "sales": 72
    }, {
        "rank": 1.3333333333333333,
        "sales": 71.3
    }, {
        "rank": 1.6666666666666665,
        "sales": 70.88
    }, {
        "rank": 3,
        "sales": 69.23
    }, {
        "rank": 3.333333333333333,
        "sales": 68.82
    }, {
        "rank": 3.6666666666666665,
        "sales": 68.4
    }, {
        "rank": 4,
        "sales": 68
    }, {
        "rank": 6,
        "sales": 67.58
    }, {
        "rank": 6.666666666666666,
        "sales": 67.45
    }, {
        "rank": 7.333333333333333,
        "sales": 67.38
    }, {
        "rank": 8,
        "sales": 67.38
    }, {
        "rank": 11,
        "sales": 67.38
    }, {
        "rank": 12,
        "sales": 67.38
    }, {
        "rank": 13,
        "sales": 67
    }, {
        "rank": 20,
        "sales": 67.38
    }, {
        "rank": 22,
        "sales": 67.38
    }, {
        "rank": 24,
        "sales": 67.38
    }, {
        "rank": 38,
        "sales": 60.23
    }, {
        "rank": 42,
        "sales": 58.03
    }, {
        "rank": 46,
        "sales": 55.83
    }, {
        "rank": 74,
        "sales": 44.95
    }, {
        "rank": 82,
        "sales": 42
    }, {
        "rank": 90,
        "sales": 39.05
    }, {
        "rank": 142,
        "sales": 28.09
    }, {
        "rank": 156.66666666666666,
        "sales": 25.15
    }, {
        "rank": 171.33333333333331,
        "sales": 22.2
    }, {
        "rank": 270,
        "sales": 15.72
    }, {
        "rank": 298,
        "sales": 14.11
    }, {
        "rank": 326,
        "sales": 12.51
    }, {
        "rank": 516,
        "sales": 8.66
    }, {
        "rank": 570,
        "sales": 7.72
    }, {
        "rank": 624,
        "sales": 6.77
    }, {
        "rank": 986,
        "sales": 5.1
    }, {
        "rank": 1088.6666666666667,
        "sales": 4.71
    }, {
        "rank": 1191.3333333333335,
        "sales": 4.33
    }, {
        "rank": 1883,
        "sales": 3.03
    }, {
        "rank": 2079.3333333333335,
        "sales": 2.68
    }, {
        "rank": 2275.666666666667,
        "sales": 2.34
    }, {
        "rank": 3596,
        "sales": 1.52
    }, {
        "rank": 3970.666666666667,
        "sales": 1.31
    }, {
        "rank": 4345.333333333334,
        "sales": 1.11
    }, {
        "rank": 6869,
        "sales": 0.62
    }, {
        "rank": 7585.333333333334,
        "sales": 0.5
    }, {
        "rank": 8301.666666666668,
        "sales": 0.37
    }, {
        "rank": 13122,
        "sales": 0.15
    }, {
        "rank": 14490,
        "sales": 0.1
    }, {
        "rank": 15858,
        "sales": 0.05
    }, {
        "rank": 25065,
        "sales": 0.01
    }, {
        "rank": 27678,
        "sales": 0.01
    }, {
        "rank": 30291,
        "sales": 0
    }, {
        "rank": 47879,
        "sales": 0
    }, {
        "rank": 52870.66666666667,
        "sales": 0
    }, {
        "rank": 57862.333333333336,
        "sales": 0
    }, {
        "rank": 91459,
        "sales": 0
    }, {
        "rank": 100994,
        "sales": 0
    }, {
        "rank": 110529,
        "sales": 0
    }, {
        "rank": 478468,
        "sales": 0
    }, {
        "rank": 597936,
        "sales": 0
    }, {
        "rank": 717404,
        "sales": 0
    }],
    "Computers & Accessories": [{
        "rank": 1,
        "sales": 44
    }, {
        "rank": 1.3333333333333333,
        "sales": 44
    }, {
        "rank": 1.6666666666666665,
        "sales": 44
    }, {
        "rank": 3,
        "sales": 44
    }, {
        "rank": 3.333333333333333,
        "sales": 44
    }, {
        "rank": 3.6666666666666665,
        "sales": 44
    }, {
        "rank": 4,
        "sales": 44
    }, {
        "rank": 6,
        "sales": 44
    }, {
        "rank": 6.666666666666666,
        "sales": 44
    }, {
        "rank": 7.333333333333333,
        "sales": 44
    }, {
        "rank": 8,
        "sales": 44
    }, {
        "rank": 12,
        "sales": 44
    }, {
        "rank": 13.333333333333332,
        "sales": 44
    }, {
        "rank": 14.666666666666666,
        "sales": 44
    }, {
        "rank": 16,
        "sales": 44
    }, {
        "rank": 24,
        "sales": 44
    }, {
        "rank": 26.666666666666664,
        "sales": 44
    }, {
        "rank": 29.333333333333332,
        "sales": 44
    }, {
        "rank": 32,
        "sales": 44
    }, {
        "rank": 49,
        "sales": 44
    }, {
        "rank": 54.66666666666667,
        "sales": 44
    }, {
        "rank": 60.333333333333336,
        "sales": 44
    }, {
        "rank": 100,
        "sales": 41.6
    }, {
        "rank": 111.33333333333334,
        "sales": 40.77
    }, {
        "rank": 122.66666666666667,
        "sales": 39.95
    }, {
        "rank": 201,
        "sales": 29.2
    }, {
        "rank": 223.33333333333331,
        "sales": 25.89
    }, {
        "rank": 245.66666666666666,
        "sales": 22.58
    }, {
        "rank": 405,
        "sales": 16.22
    }, {
        "rank": 450.66666666666663,
        "sales": 15.34
    }, {
        "rank": 496.3333333333333,
        "sales": 14.45
    }, {
        "rank": 816,
        "sales": 10.15
    }, {
        "rank": 907.3333333333333,
        "sales": 9.02
    }, {
        "rank": 998.6666666666666,
        "sales": 7.89
    }, {
        "rank": 1642,
        "sales": 4.73
    }, {
        "rank": 1826,
        "sales": 4.08
    }, {
        "rank": 2010,
        "sales": 3.42
    }, {
        "rank": 3306,
        "sales": 2.19
    }, {
        "rank": 3676.666666666667,
        "sales": 2.02
    }, {
        "rank": 4047.3333333333335,
        "sales": 1.84
    }, {
        "rank": 6658,
        "sales": 1.1
    }, {
        "rank": 7404.666666666666,
        "sales": 0.91
    }, {
        "rank": 8151.333333333333,
        "sales": 0.72
    }, {
        "rank": 13409,
        "sales": 0.3
    }, {
        "rank": 14912.666666666668,
        "sales": 0.23
    }, {
        "rank": 16416.333333333336,
        "sales": 0.15
    }, {
        "rank": 27005,
        "sales": 0.04
    }, {
        "rank": 30033.333333333336,
        "sales": 0.02
    }, {
        "rank": 33061.66666666667,
        "sales": 0.01
    }, {
        "rank": 54384,
        "sales": 0
    }, {
        "rank": 60482,
        "sales": 0
    }, {
        "rank": 66580,
        "sales": 0
    }, {
        "rank": 109520,
        "sales": 0
    }, {
        "rank": 121800.66666666666,
        "sales": 0
    }, {
        "rank": 134081.3333333333,
        "sales": 0
    }, {
        "rank": 220555,
        "sales": 0
    }, {
        "rank": 245286,
        "sales": 0
    }, {
        "rank": 270017,
        "sales": 0
    }, {
        "rank": 1351011,
        "sales": 0
    }, {
        "rank": 1703098.6666666667,
        "sales": 0
    }, {
        "rank": 2055186.3333333335,
        "sales": 0
    }],
    "Appliances": [{
        "rank": 1,
        "sales": 31
    }, {
        "rank": 1.3333333333333333,
        "sales": 29.93
    }, {
        "rank": 1.6666666666666665,
        "sales": 29.06
    }, {
        "rank": 3,
        "sales": 27.55
    }, {
        "rank": 3.333333333333333,
        "sales": 27.33
    }, {
        "rank": 3.6666666666666665,
        "sales": 27.12
    }, {
        "rank": 4,
        "sales": 27
    }, {
        "rank": 6,
        "sales": 26.9
    }, {
        "rank": 6.666666666666666,
        "sales": 26.9
    }, {
        "rank": 7.333333333333333,
        "sales": 26.9
    }, {
        "rank": 8,
        "sales": 26.9
    }, {
        "rank": 13,
        "sales": 25.32
    }, {
        "rank": 14.666666666666668,
        "sales": 24.67
    }, {
        "rank": 16.333333333333336,
        "sales": 24.01
    }, {
        "rank": 28,
        "sales": 20.65
    }, {
        "rank": 31.333333333333336,
        "sales": 19.8
    }, {
        "rank": 34.66666666666667,
        "sales": 18.95
    }, {
        "rank": 59,
        "sales": 14.4
    }, {
        "rank": 66,
        "sales": 13.23
    }, {
        "rank": 73,
        "sales": 12.06
    }, {
        "rank": 123,
        "sales": 8.62
    }, {
        "rank": 137.33333333333334,
        "sales": 7.99
    }, {
        "rank": 151.66666666666669,
        "sales": 7.36
    }, {
        "rank": 257,
        "sales": 5.04
    }, {
        "rank": 287.3333333333333,
        "sales": 4.55
    }, {
        "rank": 317.66666666666663,
        "sales": 4.06
    }, {
        "rank": 538,
        "sales": 2.52
    }, {
        "rank": 601.3333333333334,
        "sales": 2.23
    }, {
        "rank": 664.6666666666667,
        "sales": 1.94
    }, {
        "rank": 1126,
        "sales": 1.13
    }, {
        "rank": 1258.6666666666665,
        "sales": 0.99
    }, {
        "rank": 1391.3333333333333,
        "sales": 0.86
    }, {
        "rank": 1524,
        "sales": 0.73
    }, {
        "rank": 2354,
        "sales": 0.46
    }, {
        "rank": 2630.666666666667,
        "sales": 0.39
    }, {
        "rank": 2907.3333333333335,
        "sales": 0.32
    }, {
        "rank": 4920,
        "sales": 0.12
    }, {
        "rank": 5498.666666666666,
        "sales": 0.08
    }, {
        "rank": 6077.333333333333,
        "sales": 0.05
    }, {
        "rank": 6656,
        "sales": 0.02
    }, {
        "rank": 10285,
        "sales": 0
    }, {
        "rank": 11494.666666666668,
        "sales": 0
    }, {
        "rank": 12704.333333333334,
        "sales": 0
    }, {
        "rank": 21498,
        "sales": 0
    }, {
        "rank": 24026,
        "sales": 0
    }, {
        "rank": 26554,
        "sales": 0
    }, {
        "rank": 44936,
        "sales": 0
    }, {
        "rank": 50220.66666666667,
        "sales": 0
    }, {
        "rank": 55505.333333333336,
        "sales": 0
    }, {
        "rank": 93929,
        "sales": 0
    }, {
        "rank": 104975.33333333334,
        "sales": 0
    }, {
        "rank": 116021.66666666667,
        "sales": 0
    }, {
        "rank": 196336,
        "sales": 0
    }, {
        "rank": 219425.3333333333,
        "sales": 0
    }, {
        "rank": 242514.66666666666,
        "sales": 0
    }, {
        "rank": 410392,
        "sales": 0
    }, {
        "rank": 458654.6666666666,
        "sales": 0
    }, {
        "rank": 506917.3333333333,
        "sales": 0
    }, {
        "rank": 2812749,
        "sales": 0
    }, {
        "rank": 3565272,
        "sales": 0
    }, {
        "rank": 4317795,
        "sales": 0
    }],
    "CDs & Vinyl": [{
        "rank": 21,
        "sales": 10
    }, {
        "rank": 28,
        "sales": 10
    }, {
        "rank": 35,
        "sales": 10
    }, {
        "rank": 59,
        "sales": 10
    }, {
        "rank": 64.66666666666667,
        "sales": 10
    }, {
        "rank": 70.33333333333334,
        "sales": 10
    }, {
        "rank": 107,
        "sales": 10
    }, {
        "rank": 117.33333333333334,
        "sales": 10
    }, {
        "rank": 127.66666666666667,
        "sales": 10
    }, {
        "rank": 194,
        "sales": 10
    }, {
        "rank": 212.66666666666669,
        "sales": 10
    }, {
        "rank": 231.33333333333334,
        "sales": 10
    }, {
        "rank": 351,
        "sales": 10
    }, {
        "rank": 384.66666666666663,
        "sales": 10
    }, {
        "rank": 418.3333333333333,
        "sales": 9.97
    }, {
        "rank": 452,
        "sales": 9.82
    }, {
        "rank": 636,
        "sales": 9.05
    }, {
        "rank": 697.3333333333333,
        "sales": 8.8
    }, {
        "rank": 758.6666666666666,
        "sales": 8.47
    }, {
        "rank": 820,
        "sales": 7.98
    }, {
        "rank": 1152,
        "sales": 5.28
    }, {
        "rank": 1262.6666666666665,
        "sales": 4.38
    }, {
        "rank": 1373.3333333333333,
        "sales": 3.71
    }, {
        "rank": 1484,
        "sales": 3.69
    }, {
        "rank": 2086,
        "sales": 3.57
    }, {
        "rank": 2286.6666666666665,
        "sales": 3.53
    }, {
        "rank": 2487.333333333333,
        "sales": 3.45
    }, {
        "rank": 3779,
        "sales": 2.32
    }, {
        "rank": 4142.666666666667,
        "sales": 2
    }, {
        "rank": 4506.333333333334,
        "sales": 1.76
    }, {
        "rank": 6846,
        "sales": 1.59
    }, {
        "rank": 7504.666666666666,
        "sales": 1.55
    }, {
        "rank": 8163.333333333333,
        "sales": 1.51
    }, {
        "rank": 12402,
        "sales": 1.51
    }, {
        "rank": 13595.333333333332,
        "sales": 1.51
    }, {
        "rank": 14788.666666666666,
        "sales": 1.49
    }, {
        "rank": 15982,
        "sales": 1.43
    }, {
        "rank": 22467,
        "sales": 1.08
    }, {
        "rank": 24628.666666666664,
        "sales": 0.97
    }, {
        "rank": 26790.333333333332,
        "sales": 0.87
    }, {
        "rank": 28952,
        "sales": 0.84
    }, {
        "rank": 40700,
        "sales": 0.65
    }, {
        "rank": 44616,
        "sales": 0.59
    }, {
        "rank": 48532,
        "sales": 0.53
    }, {
        "rank": 73729,
        "sales": 0.36
    }, {
        "rank": 80822.66666666666,
        "sales": 0.31
    }, {
        "rank": 87916.33333333333,
        "sales": 0.26
    }, {
        "rank": 95010,
        "sales": 0.24
    }, {
        "rank": 133561,
        "sales": 0.11
    }, {
        "rank": 146411.33333333334,
        "sales": 0.06
    }, {
        "rank": 159261.6666666667,
        "sales": 0.03
    }, {
        "rank": 241947,
        "sales": 0.01
    }, {
        "rank": 265225.3333333333,
        "sales": 0
    }, {
        "rank": 288503.6666666666,
        "sales": 0
    }, {
        "rank": 438289,
        "sales": 0
    }, {
        "rank": 480458,
        "sales": 0
    }, {
        "rank": 522627,
        "sales": 0
    }, {
        "rank": 793965,
        "sales": 0
    }, {
        "rank": 870354.6666666667,
        "sales": 0
    }, {
        "rank": 946744.3333333334,
        "sales": 0
    }, {
        "rank": 3552613,
        "sales": 0
    }, {
        "rank": 4395772.666666666,
        "sales": 0
    }, {
        "rank": 5238932.333333333,
        "sales": 0
    }, {
        "rank": 6082092,
        "sales": 0
    }],
    "Movies & TV": [{
        "rank": 59,
        "sales": 36
    }, {
        "rank": 78.66666666666667,
        "sales": 34.08
    }, {
        "rank": 98.33333333333334,
        "sales": 32.57
    }, {
        "rank": 155,
        "sales": 32
    }, {
        "rank": 167.33333333333331,
        "sales": 32.16
    }, {
        "rank": 179.66666666666666,
        "sales": 31.93
    }, {
        "rank": 192,
        "sales": 31.7
    }, {
        "rank": 251,
        "sales": 30.58
    }, {
        "rank": 270.6666666666667,
        "sales": 29.88
    }, {
        "rank": 290.33333333333337,
        "sales": 29.17
    }, {
        "rank": 405,
        "sales": 25
    }, {
        "rank": 436.66666666666663,
        "sales": 24.27
    }, {
        "rank": 468.3333333333333,
        "sales": 23.49
    }, {
        "rank": 500,
        "sales": 22.72
    }, {
        "rank": 655,
        "sales": 18.92
    }, {
        "rank": 706.6666666666667,
        "sales": 18.35
    }, {
        "rank": 758.3333333333334,
        "sales": 17.8
    }, {
        "rank": 1061,
        "sales": 14.53
    }, {
        "rank": 1144.6666666666667,
        "sales": 13.99
    }, {
        "rank": 1228.3333333333335,
        "sales": 13.45
    }, {
        "rank": 1719,
        "sales": 10.31
    }, {
        "rank": 1854.6666666666665,
        "sales": 9.84
    }, {
        "rank": 1990.3333333333333,
        "sales": 9.36
    }, {
        "rank": 2784,
        "sales": 6.61
    }, {
        "rank": 3003.333333333333,
        "sales": 6.4
    }, {
        "rank": 3222.6666666666665,
        "sales": 6.19
    }, {
        "rank": 3442,
        "sales": 5.99
    }, {
        "rank": 4507,
        "sales": 5
    }, {
        "rank": 4862,
        "sales": 4.91
    }, {
        "rank": 5217,
        "sales": 4.81
    }, {
        "rank": 7296,
        "sales": 4.26
    }, {
        "rank": 7870.666666666666,
        "sales": 4.06
    }, {
        "rank": 8445.333333333332,
        "sales": 3.86
    }, {
        "rank": 11812,
        "sales": 2.68
    }, {
        "rank": 12742.666666666668,
        "sales": 2.54
    }, {
        "rank": 13673.333333333334,
        "sales": 2.4
    }, {
        "rank": 19125,
        "sales": 1.59
    }, {
        "rank": 20632,
        "sales": 1.51
    }, {
        "rank": 22139,
        "sales": 1.42
    }, {
        "rank": 30965,
        "sales": 0.93
    }, {
        "rank": 33404.666666666664,
        "sales": 0.87
    }, {
        "rank": 35844.33333333333,
        "sales": 0.8
    }, {
        "rank": 50134,
        "sales": 0.42
    }, {
        "rank": 54084,
        "sales": 0.38
    }, {
        "rank": 58034,
        "sales": 0.33
    }, {
        "rank": 81170,
        "sales": 0.08
    }, {
        "rank": 87565.33333333334,
        "sales": 0.07
    }, {
        "rank": 93960.66666666667,
        "sales": 0.07
    }, {
        "rank": 131419,
        "sales": 0.03
    }, {
        "rank": 141773.33333333334,
        "sales": 0.03
    }, {
        "rank": 152127.6666666667,
        "sales": 0.02
    }, {
        "rank": 212775,
        "sales": 0
    }, {
        "rank": 229539.3333333333,
        "sales": 0
    }, {
        "rank": 246303.66666666666,
        "sales": 0
    }, {
        "rank": 344495,
        "sales": 0
    }, {
        "rank": 371637.3333333334,
        "sales": 0
    }, {
        "rank": 398779.6666666667,
        "sales": 0
    }, {
        "rank": 1116789,
        "sales": 0
    }, {
        "rank": 1347078,
        "sales": 0
    }, {
        "rank": 1577367,
        "sales": 0
    }],
    "Electronics > Headphones > Earbud Headphones": [{
        "rank": 11,
        "sales": 37
    }, {
        "rank": 14.666666666666666,
        "sales": 31.11
    }, {
        "rank": 18.333333333333332,
        "sales": 29.06
    }, {
        "rank": 27,
        "sales": 28.68
    }, {
        "rank": 28.666666666666664,
        "sales": 28.47
    }, {
        "rank": 30.333333333333332,
        "sales": 28.26
    }, {
        "rank": 32,
        "sales": 28.05
    }, {
        "rank": 40,
        "sales": 26.66
    }, {
        "rank": 42.66666666666667,
        "sales": 26.06
    }, {
        "rank": 45.333333333333336,
        "sales": 25.46
    }, {
        "rank": 60,
        "sales": 22.62
    }, {
        "rank": 64,
        "sales": 21.97
    }, {
        "rank": 68,
        "sales": 21.33
    }, {
        "rank": 89,
        "sales": 18.39
    }, {
        "rank": 94.66666666666666,
        "sales": 17.73
    }, {
        "rank": 100.33333333333333,
        "sales": 17.08
    }, {
        "rank": 106,
        "sales": 16.42
    }, {
        "rank": 132,
        "sales": 14.2
    }, {
        "rank": 140.66666666666666,
        "sales": 13.62
    }, {
        "rank": 149.33333333333331,
        "sales": 13.04
    }, {
        "rank": 195,
        "sales": 10.35
    }, {
        "rank": 207.33333333333331,
        "sales": 9.72
    }, {
        "rank": 219.66666666666666,
        "sales": 9.1
    }, {
        "rank": 232,
        "sales": 8.47
    }, {
        "rank": 289,
        "sales": 6.6
    }, {
        "rank": 308,
        "sales": 6.22
    }, {
        "rank": 327,
        "sales": 5.84
    }, {
        "rank": 429,
        "sales": 4.44
    }, {
        "rank": 456.66666666666663,
        "sales": 4.23
    }, {
        "rank": 484.3333333333333,
        "sales": 4.02
    }, {
        "rank": 512,
        "sales": 3.81
    }, {
        "rank": 635,
        "sales": 3
    }, {
        "rank": 676,
        "sales": 2.75
    }, {
        "rank": 717,
        "sales": 2.5
    }, {
        "rank": 941,
        "sales": 1.64
    }, {
        "rank": 1002,
        "sales": 1.55
    }, {
        "rank": 1063,
        "sales": 1.46
    }, {
        "rank": 1394,
        "sales": 1.06
    }, {
        "rank": 1484,
        "sales": 0.98
    }, {
        "rank": 1574,
        "sales": 0.9
    }, {
        "rank": 2065,
        "sales": 0.57
    }, {
        "rank": 2198.6666666666665,
        "sales": 0.51
    }, {
        "rank": 2332.333333333333,
        "sales": 0.44
    }, {
        "rank": 3060,
        "sales": 0.23
    }, {
        "rank": 3258,
        "sales": 0.2
    }, {
        "rank": 3456,
        "sales": 0.18
    }, {
        "rank": 4535,
        "sales": 0.08
    }, {
        "rank": 4828.666666666666,
        "sales": 0.06
    }, {
        "rank": 5122.333333333333,
        "sales": 0.05
    }, {
        "rank": 5416,
        "sales": 0.03
    }, {
        "rank": 6721,
        "sales": 0
    }, {
        "rank": 7156,
        "sales": 0
    }, {
        "rank": 7591,
        "sales": 0
    }, {
        "rank": 9960,
        "sales": 0
    }, {
        "rank": 10604.666666666668,
        "sales": 0
    }, {
        "rank": 11249.333333333334,
        "sales": 0
    }, {
        "rank": 14759,
        "sales": 0
    }, {
        "rank": 15714,
        "sales": 0
    }, {
        "rank": 16669,
        "sales": 0
    }, {
        "rank": 37486,
        "sales": 0
    }, {
        "rank": 44106.66666666667,
        "sales": 0
    }, {
        "rank": 50727.333333333336,
        "sales": 0
    }],
    "Books": [{
        "rank": 92,
        "sales": 9
    }, {
        "rank": 122.66666666666667,
        "sales": 8.5
    }, {
        "rank": 153.33333333333334,
        "sales": 8.5
    }, {
        "rank": 260,
        "sales": 8.5
    }, {
        "rank": 285.3333333333333,
        "sales": 8.5
    }, {
        "rank": 310.66666666666663,
        "sales": 8.5
    }, {
        "rank": 474,
        "sales": 8.5
    }, {
        "rank": 520,
        "sales": 8.5
    }, {
        "rank": 566,
        "sales": 8.5
    }, {
        "rank": 864,
        "sales": 8.5
    }, {
        "rank": 948,
        "sales": 8.5
    }, {
        "rank": 1032,
        "sales": 8.5
    }, {
        "rank": 1577,
        "sales": 8.5
    }, {
        "rank": 1730.6666666666665,
        "sales": 8.5
    }, {
        "rank": 1884.3333333333333,
        "sales": 8.48
    }, {
        "rank": 2038,
        "sales": 8.33
    }, {
        "rank": 2877,
        "sales": 7.54
    }, {
        "rank": 3156.666666666667,
        "sales": 7.28
    }, {
        "rank": 3436.3333333333335,
        "sales": 7.02
    }, {
        "rank": 5248,
        "sales": 5.42
    }, {
        "rank": 5758.666666666666,
        "sales": 4.97
    }, {
        "rank": 6269.333333333333,
        "sales": 4.59
    }, {
        "rank": 6780,
        "sales": 4.53
    }, {
        "rank": 9574,
        "sales": 4.21
    }, {
        "rank": 10505.333333333332,
        "sales": 4.11
    }, {
        "rank": 11436.666666666666,
        "sales": 4.02
    }, {
        "rank": 12368,
        "sales": 4.01
    }, {
        "rank": 17465,
        "sales": 3.95
    }, {
        "rank": 19164,
        "sales": 3.94
    }, {
        "rank": 20863,
        "sales": 3.9
    }, {
        "rank": 31859,
        "sales": 3.08
    }, {
        "rank": 34958,
        "sales": 2.84
    }, {
        "rank": 38057,
        "sales": 2.62
    }, {
        "rank": 58117,
        "sales": 1.54
    }, {
        "rank": 63770.66666666667,
        "sales": 1.23
    }, {
        "rank": 69424.33333333334,
        "sales": 0.98
    }, {
        "rank": 106016,
        "sales": 0.85
    }, {
        "rank": 116328.66666666666,
        "sales": 0.81
    }, {
        "rank": 126641.33333333333,
        "sales": 0.77
    }, {
        "rank": 193393,
        "sales": 0.53
    }, {
        "rank": 212206,
        "sales": 0.47
    }, {
        "rank": 231019,
        "sales": 0.41
    }, {
        "rank": 352785,
        "sales": 0.3
    }, {
        "rank": 387102.6666666666,
        "sales": 0.27
    }, {
        "rank": 421420.3333333333,
        "sales": 0.24
    }, {
        "rank": 455738,
        "sales": 0.21
    }, {
        "rank": 643545,
        "sales": 0.08
    }, {
        "rank": 706147.3333333333,
        "sales": 0.04
    }, {
        "rank": 768749.6666666666,
        "sales": 0
    }, {
        "rank": 831352,
        "sales": 0
    }, {
        "rank": 1173946,
        "sales": 0
    }, {
        "rank": 1288144,
        "sales": 0
    }, {
        "rank": 1402342,
        "sales": 0
    }, {
        "rank": 2141496,
        "sales": 0
    }, {
        "rank": 2349814.6666666665,
        "sales": 0
    }, {
        "rank": 2558133.333333333,
        "sales": 0
    }, {
        "rank": 3906488,
        "sales": 0
    }, {
        "rank": 4286500,
        "sales": 0
    }, {
        "rank": 4666512,
        "sales": 0
    }, {
        "rank": 17840116,
        "sales": 0
    }, {
        "rank": 22104646.666666668,
        "sales": 0
    }, {
        "rank": 26369177.333333336,
        "sales": 0
    }],
    "Electronics > Accessories & Supplies > Audio & Video Accessories > Connectors & Adapters": [{
        "rank": 3,
        "sales": 31
    }, {
        "rank": 4,
        "sales": 30.57
    }, {
        "rank": 5,
        "sales": 31
    }, {
        "rank": 8,
        "sales": 31
    }, {
        "rank": 8.666666666666666,
        "sales": 30.43
    }, {
        "rank": 9.333333333333332,
        "sales": 30.28
    }, {
        "rank": 13,
        "sales": 30
    }, {
        "rank": 14,
        "sales": 29.3
    }, {
        "rank": 15,
        "sales": 29.11
    }, {
        "rank": 21,
        "sales": 27.94
    }, {
        "rank": 22.666666666666664,
        "sales": 27.55
    }, {
        "rank": 24.333333333333332,
        "sales": 27.07
    }, {
        "rank": 26,
        "sales": 26.59
    }, {
        "rank": 35,
        "sales": 24
    }, {
        "rank": 38,
        "sales": 23.18
    }, {
        "rank": 41,
        "sales": 22.37
    }, {
        "rank": 58,
        "sales": 17.83
    }, {
        "rank": 62.66666666666667,
        "sales": 16.97
    }, {
        "rank": 67.33333333333334,
        "sales": 16.38
    }, {
        "rank": 96,
        "sales": 12.79
    }, {
        "rank": 104,
        "sales": 12.22
    }, {
        "rank": 112,
        "sales": 11.91
    }, {
        "rank": 159,
        "sales": 10.09
    }, {
        "rank": 172,
        "sales": 9.65
    }, {
        "rank": 185,
        "sales": 9.23
    }, {
        "rank": 261,
        "sales": 6.76
    }, {
        "rank": 282,
        "sales": 6.4
    }, {
        "rank": 303,
        "sales": 6.17
    }, {
        "rank": 429,
        "sales": 4.77
    }, {
        "rank": 464,
        "sales": 4.56
    }, {
        "rank": 499,
        "sales": 4.42
    }, {
        "rank": 707,
        "sales": 3.63
    }, {
        "rank": 764.6666666666667,
        "sales": 3.42
    }, {
        "rank": 822.3333333333334,
        "sales": 3.23
    }, {
        "rank": 1165,
        "sales": 2.05
    }, {
        "rank": 1260,
        "sales": 1.91
    }, {
        "rank": 1355,
        "sales": 1.86
    }, {
        "rank": 1919,
        "sales": 1.56
    }, {
        "rank": 2075.3333333333335,
        "sales": 1.46
    }, {
        "rank": 2231.666666666667,
        "sales": 1.35
    }, {
        "rank": 3160,
        "sales": 0.74
    }, {
        "rank": 3417.333333333333,
        "sales": 0.65
    }, {
        "rank": 3674.6666666666665,
        "sales": 0.6
    }, {
        "rank": 3932,
        "sales": 0.54
    }, {
        "rank": 5204,
        "sales": 0.27
    }, {
        "rank": 5628,
        "sales": 0.23
    }, {
        "rank": 6052,
        "sales": 0.2
    }, {
        "rank": 8571,
        "sales": 0.08
    }, {
        "rank": 9269.333333333334,
        "sales": 0.06
    }, {
        "rank": 9967.666666666668,
        "sales": 0.06
    }, {
        "rank": 14115,
        "sales": 0
    }, {
        "rank": 15264.666666666668,
        "sales": 0
    }, {
        "rank": 16414.333333333336,
        "sales": 0
    }, {
        "rank": 23244,
        "sales": 0
    }, {
        "rank": 25137.333333333336,
        "sales": 0
    }, {
        "rank": 27030.666666666668,
        "sales": 0
    }, {
        "rank": 79058,
        "sales": 0
    }, {
        "rank": 95769.33333333333,
        "sales": 0
    }, {
        "rank": 112480.66666666666,
        "sales": 0
    }],
    "Amazon Launchpad": [{
        "rank": 1,
        "sales": 18
    }, {
        "rank": 1.3333333333333333,
        "sales": 17.76
    }, {
        "rank": 1.6666666666666665,
        "sales": 17.76
    }, {
        "rank": 3,
        "sales": 17.76
    }, {
        "rank": 3.333333333333333,
        "sales": 17.76
    }, {
        "rank": 3.6666666666666665,
        "sales": 17.76
    }, {
        "rank": 4,
        "sales": 18
    }, {
        "rank": 6,
        "sales": 17.76
    }, {
        "rank": 6.666666666666666,
        "sales": 17.76
    }, {
        "rank": 7.333333333333333,
        "sales": 17.76
    }, {
        "rank": 8,
        "sales": 17.76
    }, {
        "rank": 11,
        "sales": 17.76
    }, {
        "rank": 12,
        "sales": 17.76
    }, {
        "rank": 13,
        "sales": 17.76
    }, {
        "rank": 21,
        "sales": 17.76
    }, {
        "rank": 23.333333333333336,
        "sales": 17.76
    }, {
        "rank": 25.666666666666668,
        "sales": 17.76
    }, {
        "rank": 41,
        "sales": 17.76
    }, {
        "rank": 45.33333333333333,
        "sales": 17.76
    }, {
        "rank": 49.666666666666664,
        "sales": 17.76
    }, {
        "rank": 54,
        "sales": 17.76
    }, {
        "rank": 80,
        "sales": 17.76
    }, {
        "rank": 88.66666666666666,
        "sales": 17.76
    }, {
        "rank": 97.33333333333333,
        "sales": 17.76
    }, {
        "rank": 106,
        "sales": 17.72
    }, {
        "rank": 156,
        "sales": 16.98
    }, {
        "rank": 172.66666666666669,
        "sales": 16.73
    }, {
        "rank": 189.33333333333334,
        "sales": 16.49
    }, {
        "rank": 303,
        "sales": 13.2
    }, {
        "rank": 335.33333333333337,
        "sales": 12.21
    }, {
        "rank": 367.6666666666667,
        "sales": 11.23
    }, {
        "rank": 587,
        "sales": 7.82
    }, {
        "rank": 649.3333333333333,
        "sales": 6.95
    }, {
        "rank": 711.6666666666666,
        "sales": 6.07
    }, {
        "rank": 774,
        "sales": 5.41
    }, {
        "rank": 1137,
        "sales": 3.58
    }, {
        "rank": 1258,
        "sales": 2.97
    }, {
        "rank": 1379,
        "sales": 2.36
    }, {
        "rank": 2204,
        "sales": 1.58
    }, {
        "rank": 2438.6666666666665,
        "sales": 1.46
    }, {
        "rank": 2673.333333333333,
        "sales": 1.34
    }, {
        "rank": 4272,
        "sales": 1.26
    }, {
        "rank": 4726.666666666667,
        "sales": 1.26
    }, {
        "rank": 5181.333333333334,
        "sales": 1.26
    }, {
        "rank": 8281,
        "sales": 1.26
    }, {
        "rank": 9162.666666666666,
        "sales": 1.26
    }, {
        "rank": 10044.333333333332,
        "sales": 1.26
    }, {
        "rank": 16054,
        "sales": 1.26
    }, {
        "rank": 17763.333333333332,
        "sales": 1.26
    }, {
        "rank": 19472.666666666664,
        "sales": 1.26
    }, {
        "rank": 31123,
        "sales": 1.26
    }, {
        "rank": 34436.666666666664,
        "sales": 1.26
    }, {
        "rank": 37750.33333333333,
        "sales": 1.26
    }, {
        "rank": 60336,
        "sales": 1.26
    }, {
        "rank": 66760,
        "sales": 1.26
    }, {
        "rank": 73184,
        "sales": 1.26
    }, {
        "rank": 116970,
        "sales": 1.17
    }, {
        "rank": 129424,
        "sales": 1.15
    }, {
        "rank": 141878,
        "sales": 1.12
    }, {
        "rank": 639395,
        "sales": 0
    }, {
        "rank": 801082.6666666666,
        "sales": 0
    }, {
        "rank": 962770.3333333333,
        "sales": 0
    }],
    "Electronics > Accessories & Supplies > Audio & Video Accessories > Cables & Interconnects > Video Cables > HDMI Cables": [{
        "rank": 16,
        "sales": 66
    }, {
        "rank": 21.333333333333332,
        "sales": 65.76
    }, {
        "rank": 26.666666666666664,
        "sales": 65.76
    }, {
        "rank": 44,
        "sales": 49.29
    }, {
        "rank": 48,
        "sales": 45.17
    }, {
        "rank": 52,
        "sales": 42.59
    }, {
        "rank": 77,
        "sales": 29.71
    }, {
        "rank": 84,
        "sales": 26
    }, {
        "rank": 91,
        "sales": 24.86
    }, {
        "rank": 133,
        "sales": 17.4
    }, {
        "rank": 144.66666666666666,
        "sales": 15.33
    }, {
        "rank": 156.33333333333331,
        "sales": 14.28
    }, {
        "rank": 231,
        "sales": 9.13
    }, {
        "rank": 252,
        "sales": 7.69
    }, {
        "rank": 273,
        "sales": 7.21
    }, {
        "rank": 403,
        "sales": 5.67
    }, {
        "rank": 439.33333333333337,
        "sales": 5.24
    }, {
        "rank": 475.6666666666667,
        "sales": 4.92
    }, {
        "rank": 702,
        "sales": 3.09
    }, {
        "rank": 765.3333333333333,
        "sales": 2.58
    }, {
        "rank": 828.6666666666666,
        "sales": 2.38
    }, {
        "rank": 892,
        "sales": 2.25
    }, {
        "rank": 1222,
        "sales": 1.55
    }, {
        "rank": 1332,
        "sales": 1.32
    }, {
        "rank": 1442,
        "sales": 1.22
    }, {
        "rank": 2127,
        "sales": 0.76
    }, {
        "rank": 2318.6666666666665,
        "sales": 0.63
    }, {
        "rank": 2510.333333333333,
        "sales": 0.57
    }, {
        "rank": 3704,
        "sales": 0.29
    }, {
        "rank": 4038,
        "sales": 0.21
    }, {
        "rank": 4372,
        "sales": 0.18
    }, {
        "rank": 6449,
        "sales": 0.04
    }, {
        "rank": 7030,
        "sales": 0.01
    }, {
        "rank": 7611,
        "sales": 0
    }, {
        "rank": 11227,
        "sales": 0
    }, {
        "rank": 12238.666666666668,
        "sales": 0
    }, {
        "rank": 13250.333333333334,
        "sales": 0
    }, {
        "rank": 19548,
        "sales": 0
    }, {
        "rank": 21310,
        "sales": 0
    }, {
        "rank": 23072,
        "sales": 0
    }, {
        "rank": 34035,
        "sales": 0
    }, {
        "rank": 37102,
        "sales": 0
    }, {
        "rank": 40169,
        "sales": 0
    }, {
        "rank": 59258,
        "sales": 0
    }, {
        "rank": 64598.66666666667,
        "sales": 0
    }, {
        "rank": 69939.33333333334,
        "sales": 0
    }, {
        "rank": 103175,
        "sales": 0
    }, {
        "rank": 112473.33333333334,
        "sales": 0
    }, {
        "rank": 121771.66666666667,
        "sales": 0
    }, {
        "rank": 179637,
        "sales": 0
    }, {
        "rank": 195826,
        "sales": 0
    }, {
        "rank": 212015,
        "sales": 0
    }, {
        "rank": 312766,
        "sales": 0
    }, {
        "rank": 340953.3333333334,
        "sales": 0
    }, {
        "rank": 369140.6666666667,
        "sales": 0
    }, {
        "rank": 1247213,
        "sales": 0
    }, {
        "rank": 1530508,
        "sales": 0
    }, {
        "rank": 1813803,
        "sales": 0
    }],
    "Electronics > Headphones > Over-Ear Headphones": [{
        "rank": 2,
        "sales": 21
    }, {
        "rank": 2.6666666666666665,
        "sales": 21.25
    }, {
        "rank": 3.333333333333333,
        "sales": 21.25
    }, {
        "rank": 5,
        "sales": 21
    }, {
        "rank": 5.333333333333334,
        "sales": 21.2
    }, {
        "rank": 5.666666666666667,
        "sales": 21.16
    }, {
        "rank": 8,
        "sales": 20.83
    }, {
        "rank": 8.666666666666666,
        "sales": 20.74
    }, {
        "rank": 9.333333333333332,
        "sales": 20.6
    }, {
        "rank": 14,
        "sales": 19.39
    }, {
        "rank": 15.333333333333332,
        "sales": 19.01
    }, {
        "rank": 16.666666666666664,
        "sales": 18.54
    }, {
        "rank": 24,
        "sales": 15.94
    }, {
        "rank": 26,
        "sales": 15.5
    }, {
        "rank": 28,
        "sales": 15.31
    }, {
        "rank": 40,
        "sales": 14.17
    }, {
        "rank": 43.33333333333333,
        "sales": 13.82
    }, {
        "rank": 46.666666666666664,
        "sales": 13.45
    }, {
        "rank": 50,
        "sales": 13.08
    }, {
        "rank": 66,
        "sales": 11.3
    }, {
        "rank": 71.33333333333333,
        "sales": 11.01
    }, {
        "rank": 76.66666666666666,
        "sales": 10.79
    }, {
        "rank": 108,
        "sales": 9.48
    }, {
        "rank": 116.66666666666666,
        "sales": 9.08
    }, {
        "rank": 125.33333333333333,
        "sales": 8.66
    }, {
        "rank": 178,
        "sales": 6.07
    }, {
        "rank": 192.66666666666669,
        "sales": 5.58
    }, {
        "rank": 207.33333333333334,
        "sales": 5.25
    }, {
        "rank": 295,
        "sales": 3.25
    }, {
        "rank": 319.33333333333337,
        "sales": 2.95
    }, {
        "rank": 343.6666666666667,
        "sales": 2.81
    }, {
        "rank": 488,
        "sales": 1.96
    }, {
        "rank": 528,
        "sales": 1.78
    }, {
        "rank": 568,
        "sales": 1.63
    }, {
        "rank": 806,
        "sales": 0.73
    }, {
        "rank": 872,
        "sales": 0.61
    }, {
        "rank": 938,
        "sales": 0.57
    }, {
        "rank": 1331,
        "sales": 0.33
    }, {
        "rank": 1440,
        "sales": 0.29
    }, {
        "rank": 1549,
        "sales": 0.26
    }, {
        "rank": 2199,
        "sales": 0.07
    }, {
        "rank": 2379.3333333333335,
        "sales": 0.05
    }, {
        "rank": 2559.666666666667,
        "sales": 0.04
    }, {
        "rank": 3635,
        "sales": 0
    }, {
        "rank": 3933.333333333333,
        "sales": 0
    }, {
        "rank": 4231.666666666666,
        "sales": 0
    }, {
        "rank": 6007,
        "sales": 0
    }, {
        "rank": 6499.333333333334,
        "sales": 0
    }, {
        "rank": 6991.666666666667,
        "sales": 0
    }, {
        "rank": 9926,
        "sales": 0
    }, {
        "rank": 10740,
        "sales": 0
    }, {
        "rank": 11554,
        "sales": 0
    }, {
        "rank": 16403,
        "sales": 0
    }, {
        "rank": 17748,
        "sales": 0
    }, {
        "rank": 19093,
        "sales": 0
    }, {
        "rank": 56332,
        "sales": 0
    }, {
        "rank": 68296.66666666666,
        "sales": 0
    }, {
        "rank": 80261.33333333333,
        "sales": 0
    }, {
        "rank": 92226,
        "sales": 0
    }],
    "Computers & Accessories > Tablet Accessories > Bags, Cases & Sleeves > Cases": [{
        "rank": 13,
        "sales": 39
    }, {
        "rank": 17.333333333333332,
        "sales": 37.09
    }, {
        "rank": 21.666666666666664,
        "sales": 35.5
    }, {
        "rank": 34,
        "sales": 35.5
    }, {
        "rank": 36.666666666666664,
        "sales": 35.28
    }, {
        "rank": 39.33333333333333,
        "sales": 34.94
    }, {
        "rank": 56,
        "sales": 32.78
    }, {
        "rank": 60.66666666666667,
        "sales": 32
    }, {
        "rank": 65.33333333333334,
        "sales": 31.18
    }, {
        "rank": 92,
        "sales": 26
    }, {
        "rank": 99.33333333333334,
        "sales": 25.69
    }, {
        "rank": 106.66666666666667,
        "sales": 24.89
    }, {
        "rank": 149,
        "sales": 20.32
    }, {
        "rank": 160.66666666666669,
        "sales": 19.58
    }, {
        "rank": 172.33333333333334,
        "sales": 18.95
    }, {
        "rank": 243,
        "sales": 15.13
    }, {
        "rank": 262.6666666666667,
        "sales": 14.58
    }, {
        "rank": 282.33333333333337,
        "sales": 14.11
    }, {
        "rank": 397,
        "sales": 11.41
    }, {
        "rank": 428.66666666666663,
        "sales": 10.83
    }, {
        "rank": 460.3333333333333,
        "sales": 10.29
    }, {
        "rank": 492,
        "sales": 9.75
    }, {
        "rank": 648,
        "sales": 7.09
    }, {
        "rank": 700,
        "sales": 6.77
    }, {
        "rank": 752,
        "sales": 6.56
    }, {
        "rank": 1058,
        "sales": 5.32
    }, {
        "rank": 1142.6666666666667,
        "sales": 5.05
    }, {
        "rank": 1227.3333333333335,
        "sales": 4.8
    }, {
        "rank": 1726,
        "sales": 3.3
    }, {
        "rank": 1864,
        "sales": 3.14
    }, {
        "rank": 2002,
        "sales": 3.02
    }, {
        "rank": 2817,
        "sales": 2.33
    }, {
        "rank": 3042.666666666667,
        "sales": 2.2
    }, {
        "rank": 3268.3333333333335,
        "sales": 2.09
    }, {
        "rank": 4599,
        "sales": 1.42
    }, {
        "rank": 4967.333333333334,
        "sales": 1.32
    }, {
        "rank": 5335.666666666667,
        "sales": 1.24
    }, {
        "rank": 7508,
        "sales": 0.77
    }, {
        "rank": 8109.333333333334,
        "sales": 0.71
    }, {
        "rank": 8710.666666666668,
        "sales": 0.67
    }, {
        "rank": 12257,
        "sales": 0.42
    }, {
        "rank": 13238.666666666668,
        "sales": 0.38
    }, {
        "rank": 14220.333333333334,
        "sales": 0.34
    }, {
        "rank": 20010,
        "sales": 0.1
    }, {
        "rank": 21612.666666666664,
        "sales": 0.08
    }, {
        "rank": 23215.333333333332,
        "sales": 0.08
    }, {
        "rank": 24818,
        "sales": 0.07
    }, {
        "rank": 32666,
        "sales": 0.03
    }, {
        "rank": 35282,
        "sales": 0.03
    }, {
        "rank": 37898,
        "sales": 0.02
    }, {
        "rank": 53326,
        "sales": 0
    }, {
        "rank": 57596.66666666667,
        "sales": 0
    }, {
        "rank": 61867.333333333336,
        "sales": 0
    }, {
        "rank": 87053,
        "sales": 0
    }, {
        "rank": 94024.66666666666,
        "sales": 0
    }, {
        "rank": 100996.33333333333,
        "sales": 0
    }, {
        "rank": 107968,
        "sales": 0
    }, {
        "rank": 288836,
        "sales": 0
    }, {
        "rank": 349125.3333333334,
        "sales": 0
    }, {
        "rank": 409414.6666666667,
        "sales": 0
    }],
    "Electronics > Headphones > On-Ear Headphones": [{
        "rank": 2,
        "sales": 27
    }, {
        "rank": 2.6666666666666665,
        "sales": 27.26
    }, {
        "rank": 3.333333333333333,
        "sales": 26.82
    }, {
        "rank": 5,
        "sales": 25
    }, {
        "rank": 5.333333333333334,
        "sales": 24.16
    }, {
        "rank": 5.666666666666667,
        "sales": 23.69
    }, {
        "rank": 8,
        "sales": 21.27
    }, {
        "rank": 8.666666666666666,
        "sales": 20.93
    }, {
        "rank": 9.333333333333332,
        "sales": 20.58
    }, {
        "rank": 12,
        "sales": 19.01
    }, {
        "rank": 12.666666666666668,
        "sales": 18.53
    }, {
        "rank": 13.333333333333334,
        "sales": 18.05
    }, {
        "rank": 18,
        "sales": 15.87
    }, {
        "rank": 19.333333333333336,
        "sales": 15.69
    }, {
        "rank": 20.666666666666668,
        "sales": 15.51
    }, {
        "rank": 27,
        "sales": 14.14
    }, {
        "rank": 28.666666666666664,
        "sales": 13.63
    }, {
        "rank": 30.333333333333332,
        "sales": 13.12
    }, {
        "rank": 32,
        "sales": 12.6
    }, {
        "rank": 40,
        "sales": 10.74
    }, {
        "rank": 42.66666666666667,
        "sales": 10.45
    }, {
        "rank": 45.333333333333336,
        "sales": 10.16
    }, {
        "rank": 61,
        "sales": 8.58
    }, {
        "rank": 65.33333333333333,
        "sales": 8.2
    }, {
        "rank": 69.66666666666666,
        "sales": 7.83
    }, {
        "rank": 92,
        "sales": 6.19
    }, {
        "rank": 98,
        "sales": 5.89
    }, {
        "rank": 104,
        "sales": 5.59
    }, {
        "rank": 139,
        "sales": 4.33
    }, {
        "rank": 148.66666666666669,
        "sales": 4.22
    }, {
        "rank": 158.33333333333334,
        "sales": 4.11
    }, {
        "rank": 211,
        "sales": 3.47
    }, {
        "rank": 225.33333333333331,
        "sales": 3.27
    }, {
        "rank": 239.66666666666666,
        "sales": 3.07
    }, {
        "rank": 254,
        "sales": 2.86
    }, {
        "rank": 319,
        "sales": 2.1
    }, {
        "rank": 340.66666666666663,
        "sales": 1.92
    }, {
        "rank": 362.3333333333333,
        "sales": 1.74
    }, {
        "rank": 384,
        "sales": 1.55
    }, {
        "rank": 483,
        "sales": 0.98
    }, {
        "rank": 516,
        "sales": 0.92
    }, {
        "rank": 549,
        "sales": 0.85
    }, {
        "rank": 732,
        "sales": 0.54
    }, {
        "rank": 782,
        "sales": 0.49
    }, {
        "rank": 832,
        "sales": 0.43
    }, {
        "rank": 1108,
        "sales": 0.2
    }, {
        "rank": 1183.3333333333335,
        "sales": 0.16
    }, {
        "rank": 1258.6666666666667,
        "sales": 0.13
    }, {
        "rank": 1677,
        "sales": 0.01
    }, {
        "rank": 1791.3333333333335,
        "sales": 0.01
    }, {
        "rank": 1905.6666666666667,
        "sales": 0.01
    }, {
        "rank": 2540,
        "sales": 0
    }, {
        "rank": 2713.333333333333,
        "sales": 0
    }, {
        "rank": 2886.6666666666665,
        "sales": 0
    }, {
        "rank": 3060,
        "sales": 0
    }, {
        "rank": 3847,
        "sales": 0
    }, {
        "rank": 4109.333333333333,
        "sales": 0
    }, {
        "rank": 4371.666666666666,
        "sales": 0
    }, {
        "rank": 10364,
        "sales": 0
    }, {
        "rank": 12274,
        "sales": 0
    }, {
        "rank": 14184,
        "sales": 0
    }],
    "Electronics > Accessories & Supplies > Audio & Video Accessories > Cables & Interconnects > Audio Cables > RCA Cables": [{
        "rank": 5,
        "sales": 22
    }, {
        "rank": 6.666666666666667,
        "sales": 21.95
    }, {
        "rank": 8.333333333333334,
        "sales": 21.95
    }, {
        "rank": 13,
        "sales": 21.1
    }, {
        "rank": 14,
        "sales": 20.67
    }, {
        "rank": 15,
        "sales": 20.25
    }, {
        "rank": 19,
        "sales": 18.28
    }, {
        "rank": 20,
        "sales": 17.72
    }, {
        "rank": 21,
        "sales": 17.16
    }, {
        "rank": 28,
        "sales": 14.19
    }, {
        "rank": 30,
        "sales": 14.02
    }, {
        "rank": 32,
        "sales": 13.84
    }, {
        "rank": 43,
        "sales": 12.66
    }, {
        "rank": 46,
        "sales": 12.27
    }, {
        "rank": 49,
        "sales": 11.88
    }, {
        "rank": 64,
        "sales": 9.86
    }, {
        "rank": 68,
        "sales": 9.3
    }, {
        "rank": 72,
        "sales": 8.74
    }, {
        "rank": 96,
        "sales": 6.46
    }, {
        "rank": 102.66666666666666,
        "sales": 6.34
    }, {
        "rank": 109.33333333333333,
        "sales": 6.22
    }, {
        "rank": 116,
        "sales": 6.1
    }, {
        "rank": 145,
        "sales": 5.45
    }, {
        "rank": 154.66666666666669,
        "sales": 5.19
    }, {
        "rank": 164.33333333333334,
        "sales": 4.93
    }, {
        "rank": 217,
        "sales": 3.88
    }, {
        "rank": 231.33333333333331,
        "sales": 3.74
    }, {
        "rank": 245.66666666666666,
        "sales": 3.59
    }, {
        "rank": 326,
        "sales": 2.86
    }, {
        "rank": 348,
        "sales": 2.7
    }, {
        "rank": 370,
        "sales": 2.53
    }, {
        "rank": 491,
        "sales": 1.76
    }, {
        "rank": 524,
        "sales": 1.62
    }, {
        "rank": 557,
        "sales": 1.47
    }, {
        "rank": 738,
        "sales": 0.89
    }, {
        "rank": 787.3333333333333,
        "sales": 0.82
    }, {
        "rank": 836.6666666666666,
        "sales": 0.75
    }, {
        "rank": 886,
        "sales": 0.68
    }, {
        "rank": 1110,
        "sales": 0.47
    }, {
        "rank": 1184.6666666666665,
        "sales": 0.44
    }, {
        "rank": 1259.3333333333333,
        "sales": 0.41
    }, {
        "rank": 1334,
        "sales": 0.38
    }, {
        "rank": 1669,
        "sales": 0.26
    }, {
        "rank": 1780.6666666666665,
        "sales": 0.22
    }, {
        "rank": 1892.3333333333333,
        "sales": 0.19
    }, {
        "rank": 2004,
        "sales": 0.15
    }, {
        "rank": 2509,
        "sales": 0.06
    }, {
        "rank": 2677.333333333333,
        "sales": 0.04
    }, {
        "rank": 2845.6666666666665,
        "sales": 0.03
    }, {
        "rank": 3014,
        "sales": 0.02
    }, {
        "rank": 3772,
        "sales": 0
    }, {
        "rank": 4024.666666666667,
        "sales": 0
    }, {
        "rank": 4277.333333333334,
        "sales": 0
    }, {
        "rank": 5671,
        "sales": 0
    }, {
        "rank": 6051.333333333334,
        "sales": 0
    }, {
        "rank": 6431.666666666667,
        "sales": 0
    }, {
        "rank": 8526,
        "sales": 0
    }, {
        "rank": 9097.333333333334,
        "sales": 0
    }, {
        "rank": 9668.666666666668,
        "sales": 0
    }, {
        "rank": 22518,
        "sales": 0
    }, {
        "rank": 26610.666666666664,
        "sales": 0
    }, {
        "rank": 30703.333333333332,
        "sales": 0
    }],
    "Software": [{
        "rank": 16,
        "sales": 7
    }, {
        "rank": 21.333333333333332,
        "sales": 6.55
    }, {
        "rank": 26.666666666666664,
        "sales": 6.55
    }, {
        "rank": 45,
        "sales": 6.55
    }, {
        "rank": 49.33333333333333,
        "sales": 6.55
    }, {
        "rank": 53.666666666666664,
        "sales": 6.46
    }, {
        "rank": 58,
        "sales": 6.32
    }, {
        "rank": 80,
        "sales": 5.61
    }, {
        "rank": 87.33333333333334,
        "sales": 5.38
    }, {
        "rank": 94.66666666666667,
        "sales": 5.18
    }, {
        "rank": 142,
        "sales": 4.18
    }, {
        "rank": 155.33333333333331,
        "sales": 3.9
    }, {
        "rank": 168.66666666666666,
        "sales": 3.69
    }, {
        "rank": 182,
        "sales": 3.56
    }, {
        "rank": 254,
        "sales": 2.86
    }, {
        "rank": 278,
        "sales": 2.63
    }, {
        "rank": 302,
        "sales": 2.43
    }, {
        "rank": 455,
        "sales": 1.51
    }, {
        "rank": 498,
        "sales": 1.26
    }, {
        "rank": 541,
        "sales": 1.11
    }, {
        "rank": 813,
        "sales": 0.96
    }, {
        "rank": 889.3333333333333,
        "sales": 0.91
    }, {
        "rank": 965.6666666666666,
        "sales": 0.86
    }, {
        "rank": 1452,
        "sales": 0.51
    }, {
        "rank": 1588.6666666666665,
        "sales": 0.41
    }, {
        "rank": 1725.3333333333333,
        "sales": 0.35
    }, {
        "rank": 1862,
        "sales": 0.34
    }, {
        "rank": 2595,
        "sales": 0.26
    }, {
        "rank": 2839.333333333333,
        "sales": 0.23
    }, {
        "rank": 3083.6666666666665,
        "sales": 0.21
    }, {
        "rank": 3328,
        "sales": 0.19
    }, {
        "rank": 4638,
        "sales": 0.08
    }, {
        "rank": 5074.666666666666,
        "sales": 0.04
    }, {
        "rank": 5511.333333333333,
        "sales": 0.02
    }, {
        "rank": 5948,
        "sales": 0.02
    }, {
        "rank": 8289,
        "sales": 0.01
    }, {
        "rank": 9069.333333333334,
        "sales": 0
    }, {
        "rank": 9849.666666666668,
        "sales": 0
    }, {
        "rank": 14813,
        "sales": 0
    }, {
        "rank": 16207.333333333332,
        "sales": 0
    }, {
        "rank": 17601.666666666664,
        "sales": 0
    }, {
        "rank": 26472,
        "sales": 0
    }, {
        "rank": 28964,
        "sales": 0
    }, {
        "rank": 31456,
        "sales": 0
    }, {
        "rank": 47307,
        "sales": 0
    }, {
        "rank": 51760,
        "sales": 0
    }, {
        "rank": 56213,
        "sales": 0
    }, {
        "rank": 84539,
        "sales": 0
    }, {
        "rank": 92496.66666666666,
        "sales": 0
    }, {
        "rank": 100454.33333333333,
        "sales": 0
    }, {
        "rank": 108412,
        "sales": 0
    }, {
        "rank": 151076,
        "sales": 0
    }, {
        "rank": 165297.3333333333,
        "sales": 0
    }, {
        "rank": 179518.66666666666,
        "sales": 0
    }, {
        "rank": 193740,
        "sales": 0
    }, {
        "rank": 269982,
        "sales": 0
    }, {
        "rank": 295396,
        "sales": 0
    }, {
        "rank": 320810,
        "sales": 0
    }, {
        "rank": 482472,
        "sales": 0
    }, {
        "rank": 527888,
        "sales": 0
    }, {
        "rank": 573304,
        "sales": 0
    }, {
        "rank": 2074904,
        "sales": 0
    }, {
        "rank": 2560298.666666667,
        "sales": 0
    }, {
        "rank": 3045693.3333333335,
        "sales": 0
    }]
},
"amazon.de": {
    "Auto": [{
        "rank": 1,
        "sales": 117
    }, {
        "rank": 2,
        "sales": 104.72800000000001
    }, {
        "rank": 3,
        "sales": 92.65066666666667
    }, {
        "rank": 4,
        "sales": 86.45599999999999
    }, {
        "rank": 5,
        "sales": 81
    }, {
        "rank": 6,
        "sales": 81.235
    }, {
        "rank": 7,
        "sales": 74.33333333333333
    }, {
        "rank": 8,
        "sales": 73.202
    }, {
        "rank": 9,
        "sales": 71.61933333333333
    }, {
        "rank": 10,
        "sales": 72.26066666666667
    }, {
        "rank": 20,
        "sales": 56.958999999999996
    }, {
        "rank": 30,
        "sales": 52.109
    }, {
        "rank": 40,
        "sales": 47.844
    }, {
        "rank": 50,
        "sales": 42.64
    }, {
        "rank": 60,
        "sales": 41.472
    }, {
        "rank": 70,
        "sales": 38.080000000000005
    }, {
        "rank": 80,
        "sales": 37.605000000000004
    }, {
        "rank": 90,
        "sales": 35.23866666666667
    }, {
        "rank": 100,
        "sales": 33.18
    }, {
        "rank": 200,
        "sales": 24.804
    }, {
        "rank": 300,
        "sales": 20.351999999999997
    }, {
        "rank": 400,
        "sales": 16.796
    }, {
        "rank": 500,
        "sales": 15.768666666666666
    }, {
        "rank": 600,
        "sales": 12.852
    }, {
        "rank": 700,
        "sales": 11.33
    }, {
        "rank": 800,
        "sales": 9.830666666666668
    }, {
        "rank": 900,
        "sales": 9.064
    }, {
        "rank": 1000,
        "sales": 8.046333333333333
    }, {
        "rank": 2000,
        "sales": 5.123
    }, {
        "rank": 3000,
        "sales": 3.325
    }, {
        "rank": 4000,
        "sales": 2.568
    }, {
        "rank": 5000,
        "sales": 2.010666666666667
    }, {
        "rank": 6000,
        "sales": 1.764
    }, {
        "rank": 7000,
        "sales": 1.512
    }, {
        "rank": 8000,
        "sales": 1.2703333333333333
    }, {
        "rank": 9000,
        "sales": 1.0666666666666667
    }, {
        "rank": 10000,
        "sales": 0.9333333333333333
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Baby": [{
        "rank": 1,
        "sales": 125.83999999999999
    }, {
        "rank": 2,
        "sales": 109.00333333333333
    }, {
        "rank": 3,
        "sales": 100.33200000000001
    }, {
        "rank": 4,
        "sales": 93.06
    }, {
        "rank": 5,
        "sales": 85.966
    }, {
        "rank": 6,
        "sales": 77.87100000000001
    }, {
        "rank": 7,
        "sales": 78.93033333333332
    }, {
        "rank": 8,
        "sales": 77.35366666666667
    }, {
        "rank": 9,
        "sales": 68.53333333333333
    }, {
        "rank": 10,
        "sales": 72.376
    }, {
        "rank": 20,
        "sales": 53.13333333333333
    }, {
        "rank": 30,
        "sales": 48.37
    }, {
        "rank": 40,
        "sales": 43.81333333333334
    }, {
        "rank": 50,
        "sales": 39.38133333333334
    }, {
        "rank": 60,
        "sales": 37.24133333333334
    }, {
        "rank": 70,
        "sales": 34.544999999999995
    }, {
        "rank": 80,
        "sales": 33.516
    }, {
        "rank": 90,
        "sales": 31.788
    }, {
        "rank": 100,
        "sales": 29.715333333333334
    }, {
        "rank": 200,
        "sales": 21.473000000000003
    }, {
        "rank": 300,
        "sales": 16.858666666666668
    }, {
        "rank": 400,
        "sales": 13.184
    }, {
        "rank": 500,
        "sales": 10.9
    }, {
        "rank": 600,
        "sales": 9.750666666666666
    }, {
        "rank": 700,
        "sales": 8.416666666666666
    }, {
        "rank": 800,
        "sales": 7.696
    }, {
        "rank": 900,
        "sales": 6.766
    }, {
        "rank": 1000,
        "sales": 6.324666666666667
    }, {
        "rank": 2000,
        "sales": 2.912
    }, {
        "rank": 3000,
        "sales": 1.8719999999999999
    }, {
        "rank": 4000,
        "sales": 1.3733333333333335
    }, {
        "rank": 5000,
        "sales": 1.0799999999999998
    }, {
        "rank": 6000,
        "sales": 0.748
    }, {
        "rank": 7000,
        "sales": 0.515
    }, {
        "rank": 8000,
        "sales": 0.37766666666666665
    }, {
        "rank": 9000,
        "sales": 0.2826666666666667
    }, {
        "rank": 10000,
        "sales": 0.16666666666666666
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Baumarkt": [{
        "rank": 1,
        "sales": 145.8
    }, {
        "rank": 2,
        "sales": 125.58233333333334
    }, {
        "rank": 3,
        "sales": 111.93866666666666
    }, {
        "rank": 4,
        "sales": 109.04400000000001
    }, {
        "rank": 5,
        "sales": 95.96666666666667
    }, {
        "rank": 6,
        "sales": 98.40433333333334
    }, {
        "rank": 7,
        "sales": 89.51966666666667
    }, {
        "rank": 8,
        "sales": 85.8
    }, {
        "rank": 9,
        "sales": 83.36666666666666
    }, {
        "rank": 10,
        "sales": 87.696
    }, {
        "rank": 20,
        "sales": 69.02
    }, {
        "rank": 30,
        "sales": 65.727
    }, {
        "rank": 40,
        "sales": 57.58133333333333
    }, {
        "rank": 50,
        "sales": 53.733333333333334
    }, {
        "rank": 60,
        "sales": 49.220666666666666
    }, {
        "rank": 70,
        "sales": 49.57666666666667
    }, {
        "rank": 80,
        "sales": 45.186
    }, {
        "rank": 90,
        "sales": 45.08533333333333
    }, {
        "rank": 100,
        "sales": 43.05
    }, {
        "rank": 200,
        "sales": 34.407666666666664
    }, {
        "rank": 300,
        "sales": 27.93
    }, {
        "rank": 400,
        "sales": 24.966666666666665
    }, {
        "rank": 500,
        "sales": 21.386000000000003
    }, {
        "rank": 600,
        "sales": 19.516000000000002
    }, {
        "rank": 700,
        "sales": 19.256666666666668
    }, {
        "rank": 800,
        "sales": 18.057666666666666
    }, {
        "rank": 900,
        "sales": 15.633333333333333
    }, {
        "rank": 1000,
        "sales": 15.426666666666668
    }, {
        "rank": 2000,
        "sales": 9.888
    }, {
        "rank": 3000,
        "sales": 7.1
    }, {
        "rank": 4000,
        "sales": 5.88
    }, {
        "rank": 5000,
        "sales": 4.818666666666667
    }, {
        "rank": 6000,
        "sales": 4.12
    }, {
        "rank": 7000,
        "sales": 3.325
    }, {
        "rank": 8000,
        "sales": 2.952
    }, {
        "rank": 9000,
        "sales": 2.568
    }, {
        "rank": 10000,
        "sales": 2.1666666666666665
    }, {
        "rank": 20000,
        "sales": 1.07
    }, {
        "rank": 30000,
        "sales": 0.4
    }, {
        "rank": 40000,
        "sales": 0
    }],
    "Beauty": [{
        "rank": 1,
        "sales": 169.32000000000002
    }, {
        "rank": 2,
        "sales": 152.11
    }, {
        "rank": 3,
        "sales": 141.58800000000002
    }, {
        "rank": 4,
        "sales": 126.31233333333333
    }, {
        "rank": 5,
        "sales": 124.40533333333333
    }, {
        "rank": 6,
        "sales": 121.208
    }, {
        "rank": 7,
        "sales": 106.96666666666667
    }, {
        "rank": 8,
        "sales": 106.502
    }, {
        "rank": 9,
        "sales": 109.327
    }, {
        "rank": 10,
        "sales": 97.56666666666666
    }, {
        "rank": 20,
        "sales": 83.72
    }, {
        "rank": 30,
        "sales": 77.71700000000001
    }, {
        "rank": 40,
        "sales": 65.71733333333333
    }, {
        "rank": 50,
        "sales": 63.49
    }, {
        "rank": 60,
        "sales": 61.38
    }, {
        "rank": 70,
        "sales": 54.37166666666667
    }, {
        "rank": 80,
        "sales": 54.891
    }, {
        "rank": 90,
        "sales": 52.57266666666667
    }, {
        "rank": 100,
        "sales": 47.672000000000004
    }, {
        "rank": 200,
        "sales": 37.38
    }, {
        "rank": 300,
        "sales": 29.566666666666666
    }, {
        "rank": 400,
        "sales": 23.78966666666667
    }, {
        "rank": 500,
        "sales": 19.754
    }, {
        "rank": 600,
        "sales": 18.27
    }, {
        "rank": 700,
        "sales": 16.583000000000002
    }, {
        "rank": 800,
        "sales": 16.05
    }, {
        "rank": 900,
        "sales": 15.228000000000002
    }, {
        "rank": 1000,
        "sales": 14.097333333333333
    }, {
        "rank": 2000,
        "sales": 7.862333333333334
    }, {
        "rank": 3000,
        "sales": 5.813666666666666
    }, {
        "rank": 4000,
        "sales": 4.468999999999999
    }, {
        "rank": 5000,
        "sales": 3.4596666666666667
    }, {
        "rank": 6000,
        "sales": 2.791333333333333
    }, {
        "rank": 7000,
        "sales": 2.3896666666666664
    }, {
        "rank": 8000,
        "sales": 1.938
    }, {
        "rank": 9000,
        "sales": 1.8359999999999999
    }, {
        "rank": 10000,
        "sales": 1.635
    }, {
        "rank": 20000,
        "sales": 0.43333333333333335
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Bekleidung": [{
        "rank": 1,
        "sales": 59.74
    }, {
        "rank": 2,
        "sales": 55.476
    }, {
        "rank": 3,
        "sales": 51.95666666666667
    }, {
        "rank": 4,
        "sales": 45.584666666666664
    }, {
        "rank": 5,
        "sales": 44.96266666666667
    }, {
        "rank": 6,
        "sales": 42.117
    }, {
        "rank": 7,
        "sales": 41.208
    }, {
        "rank": 8,
        "sales": 42.873333333333335
    }, {
        "rank": 9,
        "sales": 41.05233333333333
    }, {
        "rank": 10,
        "sales": 40.535999999999994
    }, {
        "rank": 20,
        "sales": 34.812
    }, {
        "rank": 30,
        "sales": 30.506666666666668
    }, {
        "rank": 40,
        "sales": 29.793333333333333
    }, {
        "rank": 50,
        "sales": 26.642666666666667
    }, {
        "rank": 60,
        "sales": 26.146666666666665
    }, {
        "rank": 70,
        "sales": 25.833000000000002
    }, {
        "rank": 80,
        "sales": 24.009999999999998
    }, {
        "rank": 90,
        "sales": 23.018666666666665
    }, {
        "rank": 100,
        "sales": 21.93
    }, {
        "rank": 200,
        "sales": 18.234666666666666
    }, {
        "rank": 300,
        "sales": 16.785999999999998
    }, {
        "rank": 400,
        "sales": 14.944333333333333
    }, {
        "rank": 500,
        "sales": 13.192
    }, {
        "rank": 600,
        "sales": 13.068000000000001
    }, {
        "rank": 700,
        "sales": 11.856
    }, {
        "rank": 800,
        "sales": 11.483333333333333
    }, {
        "rank": 900,
        "sales": 10.643333333333334
    }, {
        "rank": 1000,
        "sales": 10.395000000000001
    }, {
        "rank": 2000,
        "sales": 7.63
    }, {
        "rank": 3000,
        "sales": 6.1706666666666665
    }, {
        "rank": 4000,
        "sales": 5.421333333333333
    }, {
        "rank": 5000,
        "sales": 4.664
    }, {
        "rank": 6000,
        "sales": 4.212
    }, {
        "rank": 7000,
        "sales": 3.57
    }, {
        "rank": 8000,
        "sales": 3.296
    }, {
        "rank": 9000,
        "sales": 3.0506666666666664
    }, {
        "rank": 10000,
        "sales": 2.9793333333333334
    }, {
        "rank": 20000,
        "sales": 1.7169999999999999
    }, {
        "rank": 30000,
        "sales": 1.332
    }, {
        "rank": 40000,
        "sales": 0.9956666666666667
    }, {
        "rank": 50000,
        "sales": 0.77
    }, {
        "rank": 60000,
        "sales": 0.618
    }, {
        "rank": 70000,
        "sales": 0.504
    }, {
        "rank": 80000,
        "sales": 0.37766666666666665
    }, {
        "rank": 90000,
        "sales": 0.315
    }, {
        "rank": 100000,
        "sales": 0.23333333333333334
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Beleuchtung": [{
        "rank": 1,
        "sales": 164.59
    }, {
        "rank": 2,
        "sales": 128.43333333333334
    }, {
        "rank": 3,
        "sales": 126.51266666666668
    }, {
        "rank": 4,
        "sales": 108.74333333333334
    }, {
        "rank": 5,
        "sales": 107.484
    }, {
        "rank": 6,
        "sales": 103.148
    }, {
        "rank": 7,
        "sales": 94.11200000000001
    }, {
        "rank": 8,
        "sales": 95.868
    }, {
        "rank": 9,
        "sales": 89.16266666666667
    }, {
        "rank": 10,
        "sales": 86.38933333333333
    }, {
        "rank": 20,
        "sales": 71.19066666666667
    }, {
        "rank": 30,
        "sales": 58.31066666666666
    }, {
        "rank": 40,
        "sales": 52.903999999999996
    }, {
        "rank": 50,
        "sales": 50.38533333333333
    }, {
        "rank": 60,
        "sales": 44.13333333333333
    }, {
        "rank": 70,
        "sales": 43.4
    }, {
        "rank": 80,
        "sales": 39
    }, {
        "rank": 90,
        "sales": 38.11
    }, {
        "rank": 100,
        "sales": 36.67733333333333
    }, {
        "rank": 200,
        "sales": 26.323333333333334
    }, {
        "rank": 300,
        "sales": 21.32766666666667
    }, {
        "rank": 400,
        "sales": 16.917333333333332
    }, {
        "rank": 500,
        "sales": 14.629999999999999
    }, {
        "rank": 600,
        "sales": 12.931999999999999
    }, {
        "rank": 700,
        "sales": 10.941666666666666
    }, {
        "rank": 800,
        "sales": 10.22
    }, {
        "rank": 900,
        "sales": 9.31
    }, {
        "rank": 1000,
        "sales": 8.829
    }, {
        "rank": 2000,
        "sales": 4.223
    }, {
        "rank": 3000,
        "sales": 2.788
    }, {
        "rank": 4000,
        "sales": 2.2186666666666666
    }, {
        "rank": 5000,
        "sales": 1.692
    }, {
        "rank": 6000,
        "sales": 1.1219999999999999
    }, {
        "rank": 7000,
        "sales": 0.8
    }, {
        "rank": 8000,
        "sales": 0.6006666666666667
    }, {
        "rank": 9000,
        "sales": 0.412
    }, {
        "rank": 10000,
        "sales": 0.26666666666666666
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Bücher": [{
        "rank": 1,
        "sales": 75.75
    }, {
        "rank": 2,
        "sales": 67.286
    }, {
        "rank": 3,
        "sales": 63.980000000000004
    }, {
        "rank": 4,
        "sales": 62.675
    }, {
        "rank": 5,
        "sales": 58.743
    }, {
        "rank": 6,
        "sales": 56.00333333333333
    }, {
        "rank": 7,
        "sales": 52.122
    }, {
        "rank": 8,
        "sales": 54.10033333333333
    }, {
        "rank": 9,
        "sales": 52.2
    }, {
        "rank": 10,
        "sales": 50.032000000000004
    }, {
        "rank": 20,
        "sales": 43.708999999999996
    }, {
        "rank": 30,
        "sales": 39.458
    }, {
        "rank": 40,
        "sales": 35.916333333333334
    }, {
        "rank": 50,
        "sales": 32.513666666666666
    }, {
        "rank": 60,
        "sales": 32.4
    }, {
        "rank": 70,
        "sales": 30.996
    }, {
        "rank": 80,
        "sales": 27.6
    }, {
        "rank": 90,
        "sales": 27.2
    }, {
        "rank": 100,
        "sales": 26.316
    }, {
        "rank": 200,
        "sales": 21.046
    }, {
        "rank": 300,
        "sales": 18.581333333333337
    }, {
        "rank": 400,
        "sales": 16.674666666666667
    }, {
        "rank": 500,
        "sales": 15.546666666666665
    }, {
        "rank": 600,
        "sales": 14.274666666666667
    }, {
        "rank": 700,
        "sales": 12.737666666666666
    }, {
        "rank": 800,
        "sales": 11.547666666666666
    }, {
        "rank": 900,
        "sales": 10.952333333333334
    }, {
        "rank": 1000,
        "sales": 9.966666666666667
    }, {
        "rank": 2000,
        "sales": 7.9206666666666665
    }, {
        "rank": 3000,
        "sales": 6.077
    }, {
        "rank": 4000,
        "sales": 5.45
    }, {
        "rank": 5000,
        "sales": 4.366666666666666
    }, {
        "rank": 6000,
        "sales": 3.8666666666666667
    }, {
        "rank": 7000,
        "sales": 3.466666666666667
    }, {
        "rank": 8000,
        "sales": 3.3883333333333336
    }, {
        "rank": 9000,
        "sales": 2.9
    }, {
        "rank": 10000,
        "sales": 2.943
    }, {
        "rank": 20000,
        "sales": 1.8026666666666666
    }, {
        "rank": 30000,
        "sales": 1.4213333333333333
    }, {
        "rank": 40000,
        "sales": 1.1786666666666668
    }, {
        "rank": 50000,
        "sales": 1.0173333333333334
    }, {
        "rank": 60000,
        "sales": 0.748
    }, {
        "rank": 70000,
        "sales": 0.642
    }, {
        "rank": 80000,
        "sales": 0.49933333333333335
    }, {
        "rank": 90000,
        "sales": 0.436
    }, {
        "rank": 100000,
        "sales": 0.3
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Bürobedarf & Schreibwaren": [{
        "rank": 1,
        "sales": 160.67999999999998
    }, {
        "rank": 2,
        "sales": 142.464
    }, {
        "rank": 3,
        "sales": 132.3
    }, {
        "rank": 4,
        "sales": 114.4
    }, {
        "rank": 5,
        "sales": 109.383
    }, {
        "rank": 6,
        "sales": 108.605
    }, {
        "rank": 7,
        "sales": 99.4
    }, {
        "rank": 8,
        "sales": 97.92
    }, {
        "rank": 9,
        "sales": 93.03333333333333
    }, {
        "rank": 10,
        "sales": 98.57233333333333
    }, {
        "rank": 20,
        "sales": 77.13333333333334
    }, {
        "rank": 30,
        "sales": 68.67
    }, {
        "rank": 40,
        "sales": 60.095
    }, {
        "rank": 50,
        "sales": 56.236
    }, {
        "rank": 60,
        "sales": 56.31666666666667
    }, {
        "rank": 70,
        "sales": 48.86666666666667
    }, {
        "rank": 80,
        "sales": 46.46666666666667
    }, {
        "rank": 90,
        "sales": 47.952
    }, {
        "rank": 100,
        "sales": 45.156
    }, {
        "rank": 200,
        "sales": 33.919000000000004
    }, {
        "rank": 300,
        "sales": 26.848666666666666
    }, {
        "rank": 400,
        "sales": 23.814666666666668
    }, {
        "rank": 500,
        "sales": 20.668666666666663
    }, {
        "rank": 600,
        "sales": 19.11
    }, {
        "rank": 700,
        "sales": 16.8
    }, {
        "rank": 800,
        "sales": 15.158333333333333
    }, {
        "rank": 900,
        "sales": 13.158
    }, {
        "rank": 1000,
        "sales": 12.341333333333333
    }, {
        "rank": 2000,
        "sales": 7.7026666666666666
    }, {
        "rank": 3000,
        "sales": 4.9639999999999995
    }, {
        "rank": 4000,
        "sales": 3.7706666666666666
    }, {
        "rank": 5000,
        "sales": 3.024
    }, {
        "rank": 6000,
        "sales": 2.4613333333333336
    }, {
        "rank": 7000,
        "sales": 2.155333333333333
    }, {
        "rank": 8000,
        "sales": 1.802
    }, {
        "rank": 9000,
        "sales": 1.505
    }, {
        "rank": 10000,
        "sales": 1.224
    }, {
        "rank": 20000,
        "sales": 0.2
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Computer & Zubehör": [{
        "rank": 1,
        "sales": 218.28
    }, {
        "rank": 2,
        "sales": 185.082
    }, {
        "rank": 3,
        "sales": 151.23333333333332
    }, {
        "rank": 4,
        "sales": 142.89533333333333
    }, {
        "rank": 5,
        "sales": 131.988
    }, {
        "rank": 6,
        "sales": 128.1
    }, {
        "rank": 7,
        "sales": 122.88933333333333
    }, {
        "rank": 8,
        "sales": 110.8
    }, {
        "rank": 9,
        "sales": 113.81233333333333
    }, {
        "rank": 10,
        "sales": 103.49133333333333
    }, {
        "rank": 20,
        "sales": 83.38666666666667
    }, {
        "rank": 30,
        "sales": 68.88266666666667
    }, {
        "rank": 40,
        "sales": 58.61366666666667
    }, {
        "rank": 50,
        "sales": 55.15533333333334
    }, {
        "rank": 60,
        "sales": 51.192
    }, {
        "rank": 70,
        "sales": 44.06966666666666
    }, {
        "rank": 80,
        "sales": 42.965333333333334
    }, {
        "rank": 90,
        "sales": 40.13866666666667
    }, {
        "rank": 100,
        "sales": 38.73133333333333
    }, {
        "rank": 200,
        "sales": 23.275
    }, {
        "rank": 300,
        "sales": 16.583000000000002
    }, {
        "rank": 400,
        "sales": 12.4
    }, {
        "rank": 500,
        "sales": 9.566666666666666
    }, {
        "rank": 600,
        "sales": 7.9206666666666665
    }, {
        "rank": 700,
        "sales": 6.2283333333333335
    }, {
        "rank": 800,
        "sales": 5.527666666666667
    }, {
        "rank": 900,
        "sales": 4.713333333333334
    }, {
        "rank": 1000,
        "sales": 4.235
    }, {
        "rank": 2000,
        "sales": 1.53
    }, {
        "rank": 3000,
        "sales": 0.6799999999999999
    }, {
        "rank": 4000,
        "sales": 0.2
    }, {
        "rank": 5000,
        "sales": 0
    }],
    "Drogerie & Körperpflege": [{
        "rank": 1,
        "sales": 248.4
    }, {
        "rank": 2,
        "sales": 207.34133333333332
    }, {
        "rank": 3,
        "sales": 193.41466666666665
    }, {
        "rank": 4,
        "sales": 176.06133333333335
    }, {
        "rank": 5,
        "sales": 170.345
    }, {
        "rank": 6,
        "sales": 158.406
    }, {
        "rank": 7,
        "sales": 149.56666666666666
    }, {
        "rank": 8,
        "sales": 147.56
    }, {
        "rank": 9,
        "sales": 153.07233333333335
    }, {
        "rank": 10,
        "sales": 138.067
    }, {
        "rank": 20,
        "sales": 116.73333333333333
    }, {
        "rank": 30,
        "sales": 104.69333333333334
    }, {
        "rank": 40,
        "sales": 92.13333333333334
    }, {
        "rank": 50,
        "sales": 85.8
    }, {
        "rank": 60,
        "sales": 81.57433333333333
    }, {
        "rank": 70,
        "sales": 83.53033333333333
    }, {
        "rank": 80,
        "sales": 74.63000000000001
    }, {
        "rank": 90,
        "sales": 73.675
    }, {
        "rank": 100,
        "sales": 68.175
    }, {
        "rank": 200,
        "sales": 51.94766666666667
    }, {
        "rank": 300,
        "sales": 44.75466666666667
    }, {
        "rank": 400,
        "sales": 38.625
    }, {
        "rank": 500,
        "sales": 34.505
    }, {
        "rank": 600,
        "sales": 30.4
    }, {
        "rank": 700,
        "sales": 29.817333333333334
    }, {
        "rank": 800,
        "sales": 27.09
    }, {
        "rank": 900,
        "sales": 25.956
    }, {
        "rank": 1000,
        "sales": 24.670333333333335
    }, {
        "rank": 2000,
        "sales": 16.812
    }, {
        "rank": 3000,
        "sales": 10.548
    }, {
        "rank": 4000,
        "sales": 8.208
    }, {
        "rank": 5000,
        "sales": 6.239999999999999
    }, {
        "rank": 6000,
        "sales": 4.881666666666666
    }, {
        "rank": 7000,
        "sales": 4.315666666666667
    }, {
        "rank": 8000,
        "sales": 3.673666666666667
    }, {
        "rank": 9000,
        "sales": 3.0853333333333333
    }, {
        "rank": 10000,
        "sales": 2.626
    }, {
        "rank": 20000,
        "sales": 1.1306666666666667
    }, {
        "rank": 30000,
        "sales": 0.36666666666666664
    }, {
        "rank": 40000,
        "sales": 0
    }],
    "DVD & Blu-ray": [{
        "rank": 1,
        "sales": 115.36
    }, {
        "rank": 2,
        "sales": 97.33333333333333
    }, {
        "rank": 3,
        "sales": 91.91033333333333
    }, {
        "rank": 4,
        "sales": 88.722
    }, {
        "rank": 5,
        "sales": 85.10066666666667
    }, {
        "rank": 6,
        "sales": 76.962
    }, {
        "rank": 7,
        "sales": 77.14
    }, {
        "rank": 8,
        "sales": 73.944
    }, {
        "rank": 9,
        "sales": 70.44800000000001
    }, {
        "rank": 10,
        "sales": 69.28466666666667
    }, {
        "rank": 20,
        "sales": 56.593666666666664
    }, {
        "rank": 30,
        "sales": 53.393
    }, {
        "rank": 40,
        "sales": 48.548
    }, {
        "rank": 50,
        "sales": 46.57933333333334
    }, {
        "rank": 60,
        "sales": 42.717999999999996
    }, {
        "rank": 70,
        "sales": 40.598
    }, {
        "rank": 80,
        "sales": 38.064
    }, {
        "rank": 90,
        "sales": 37.276666666666664
    }, {
        "rank": 100,
        "sales": 34.205333333333336
    }, {
        "rank": 200,
        "sales": 27.074666666666666
    }, {
        "rank": 300,
        "sales": 22.372
    }, {
        "rank": 400,
        "sales": 20.387333333333334
    }, {
        "rank": 500,
        "sales": 17.957333333333334
    }, {
        "rank": 600,
        "sales": 16.048
    }, {
        "rank": 700,
        "sales": 14.645000000000001
    }, {
        "rank": 800,
        "sales": 14.409333333333333
    }, {
        "rank": 900,
        "sales": 12.692333333333332
    }, {
        "rank": 1000,
        "sales": 12.306666666666667
    }, {
        "rank": 2000,
        "sales": 7.474
    }, {
        "rank": 3000,
        "sales": 5.353
    }, {
        "rank": 4000,
        "sales": 4.1946666666666665
    }, {
        "rank": 5000,
        "sales": 3.1646666666666667
    }, {
        "rank": 6000,
        "sales": 2.625
    }, {
        "rank": 7000,
        "sales": 2.1756666666666664
    }, {
        "rank": 8000,
        "sales": 1.8026666666666666
    }, {
        "rank": 9000,
        "sales": 1.605
    }, {
        "rank": 10000,
        "sales": 1.313
    }, {
        "rank": 20000,
        "sales": 0.3333333333333333
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Elektro-Großgeräte": [{
        "rank": 1,
        "sales": 64.31
    }, {
        "rank": 2,
        "sales": 49.504
    }, {
        "rank": 3,
        "sales": 45.867333333333335
    }, {
        "rank": 4,
        "sales": 40.23866666666667
    }, {
        "rank": 5,
        "sales": 39.53066666666667
    }, {
        "rank": 6,
        "sales": 36.41566666666667
    }, {
        "rank": 7,
        "sales": 34.775999999999996
    }, {
        "rank": 8,
        "sales": 31.586666666666666
    }, {
        "rank": 9,
        "sales": 31.09333333333333
    }, {
        "rank": 10,
        "sales": 29.575
    }, {
        "rank": 20,
        "sales": 22.999000000000002
    }, {
        "rank": 30,
        "sales": 18.305
    }, {
        "rank": 40,
        "sales": 15.484333333333332
    }, {
        "rank": 50,
        "sales": 13.566
    }, {
        "rank": 60,
        "sales": 12.325666666666667
    }, {
        "rank": 70,
        "sales": 11.118
    }, {
        "rank": 80,
        "sales": 10.6
    }, {
        "rank": 90,
        "sales": 9.986666666666668
    }, {
        "rank": 100,
        "sales": 8.942
    }, {
        "rank": 200,
        "sales": 5.477333333333333
    }, {
        "rank": 300,
        "sales": 4.36
    }, {
        "rank": 400,
        "sales": 2.835
    }, {
        "rank": 500,
        "sales": 2.2680000000000002
    }, {
        "rank": 600,
        "sales": 1.8900000000000001
    }, {
        "rank": 700,
        "sales": 1.645
    }, {
        "rank": 800,
        "sales": 1.4
    }, {
        "rank": 900,
        "sales": 1.292
    }, {
        "rank": 1000,
        "sales": 1.1786666666666668
    }, {
        "rank": 2000,
        "sales": 0.3
    }, {
        "rank": 3000,
        "sales": 0
    }],
    "Elektronik": [{
        "rank": 1,
        "sales": 183
    }, {
        "rank": 2,
        "sales": 159.90200000000002
    }, {
        "rank": 3,
        "sales": 152.368
    }, {
        "rank": 4,
        "sales": 139.23
    }, {
        "rank": 5,
        "sales": 135.252
    }, {
        "rank": 6,
        "sales": 122.94766666666666
    }, {
        "rank": 7,
        "sales": 116.824
    }, {
        "rank": 8,
        "sales": 119.268
    }, {
        "rank": 9,
        "sales": 113.27866666666667
    }, {
        "rank": 10,
        "sales": 107.88266666666667
    }, {
        "rank": 20,
        "sales": 85.91799999999999
    }, {
        "rank": 30,
        "sales": 78.19266666666667
    }, {
        "rank": 40,
        "sales": 66.76666666666667
    }, {
        "rank": 50,
        "sales": 67.10766666666667
    }, {
        "rank": 60,
        "sales": 58.65
    }, {
        "rank": 70,
        "sales": 57.416666666666664
    }, {
        "rank": 80,
        "sales": 54.92666666666666
    }, {
        "rank": 90,
        "sales": 48.9
    }, {
        "rank": 100,
        "sales": 49.608
    }, {
        "rank": 200,
        "sales": 37.096333333333334
    }, {
        "rank": 300,
        "sales": 27.808666666666667
    }, {
        "rank": 400,
        "sales": 23.999000000000002
    }, {
        "rank": 500,
        "sales": 20.483999999999998
    }, {
        "rank": 600,
        "sales": 16.694
    }, {
        "rank": 700,
        "sales": 15.440666666666667
    }, {
        "rank": 800,
        "sales": 13.26
    }, {
        "rank": 900,
        "sales": 11.749666666666666
    }, {
        "rank": 1000,
        "sales": 11.445
    }, {
        "rank": 2000,
        "sales": 6.026333333333333
    }, {
        "rank": 3000,
        "sales": 3.944
    }, {
        "rank": 4000,
        "sales": 2.996
    }, {
        "rank": 5000,
        "sales": 2.1333333333333333
    }, {
        "rank": 6000,
        "sales": 1.6293333333333335
    }, {
        "rank": 7000,
        "sales": 1.225
    }, {
        "rank": 8000,
        "sales": 0.875
    }, {
        "rank": 9000,
        "sales": 0.648
    }, {
        "rank": 10000,
        "sales": 0.43333333333333335
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Fremdsprachige Bücher": [{
        "rank": 1,
        "sales": 10.7
    }, {
        "rank": 2,
        "sales": 9.033333333333333
    }, {
        "rank": 3,
        "sales": 8.636
    }, {
        "rank": 4,
        "sales": 8.667
    }, {
        "rank": 5,
        "sales": 7.8
    }, {
        "rank": 6,
        "sales": 7.944999999999999
    }, {
        "rank": 7,
        "sales": 7.77
    }, {
        "rank": 8,
        "sales": 7.595
    }, {
        "rank": 9,
        "sales": 7.208
    }, {
        "rank": 10,
        "sales": 7.002666666666667
    }, {
        "rank": 20,
        "sales": 6.685333333333333
    }, {
        "rank": 30,
        "sales": 6.212999999999999
    }, {
        "rank": 40,
        "sales": 5.474
    }, {
        "rank": 50,
        "sales": 5.236000000000001
    }, {
        "rank": 60,
        "sales": 5.364
    }, {
        "rank": 70,
        "sales": 5.04
    }, {
        "rank": 80,
        "sales": 4.760000000000001
    }, {
        "rank": 90,
        "sales": 4.658
    }, {
        "rank": 100,
        "sales": 4.868666666666667
    }, {
        "rank": 200,
        "sales": 3.99
    }, {
        "rank": 300,
        "sales": 3.5013333333333336
    }, {
        "rank": 400,
        "sales": 3.36
    }, {
        "rank": 500,
        "sales": 3.2456666666666667
    }, {
        "rank": 600,
        "sales": 3.1319999999999997
    }, {
        "rank": 700,
        "sales": 2.9603333333333333
    }, {
        "rank": 800,
        "sales": 2.853333333333333
    }, {
        "rank": 900,
        "sales": 2.7560000000000002
    }, {
        "rank": 1000,
        "sales": 2.525
    }, {
        "rank": 2000,
        "sales": 2.074
    }, {
        "rank": 3000,
        "sales": 1.8726666666666667
    }, {
        "rank": 4000,
        "sales": 1.648
    }, {
        "rank": 5000,
        "sales": 1.54
    }, {
        "rank": 6000,
        "sales": 1.4486666666666668
    }, {
        "rank": 7000,
        "sales": 1.352
    }, {
        "rank": 8000,
        "sales": 1.2826666666666666
    }, {
        "rank": 9000,
        "sales": 1.2716666666666667
    }, {
        "rank": 10000,
        "sales": 1.1446666666666667
    }, {
        "rank": 20000,
        "sales": 0.84
    }, {
        "rank": 30000,
        "sales": 0.7133333333333333
    }, {
        "rank": 40000,
        "sales": 0.5813333333333334
    }, {
        "rank": 50000,
        "sales": 0.49
    }, {
        "rank": 60000,
        "sales": 0.4723333333333333
    }, {
        "rank": 70000,
        "sales": 0.3923333333333333
    }, {
        "rank": 80000,
        "sales": 0.35
    }, {
        "rank": 90000,
        "sales": 0.324
    }, {
        "rank": 100000,
        "sales": 0.26666666666666666
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Games": [{
        "rank": 1,
        "sales": 162.17999999999998
    }, {
        "rank": 2,
        "sales": 134.708
    }, {
        "rank": 3,
        "sales": 119.782
    }, {
        "rank": 4,
        "sales": 107.6
    }, {
        "rank": 5,
        "sales": 105.28
    }, {
        "rank": 6,
        "sales": 102.96866666666666
    }, {
        "rank": 7,
        "sales": 95.08200000000001
    }, {
        "rank": 8,
        "sales": 88.23666666666666
    }, {
        "rank": 9,
        "sales": 87.09666666666666
    }, {
        "rank": 10,
        "sales": 79.92466666666665
    }, {
        "rank": 20,
        "sales": 61.676
    }, {
        "rank": 30,
        "sales": 54.792
    }, {
        "rank": 40,
        "sales": 45.663333333333334
    }, {
        "rank": 50,
        "sales": 42.443333333333335
    }, {
        "rank": 60,
        "sales": 36.788000000000004
    }, {
        "rank": 70,
        "sales": 35.452666666666666
    }, {
        "rank": 80,
        "sales": 31.621
    }, {
        "rank": 90,
        "sales": 29.778666666666666
    }, {
        "rank": 100,
        "sales": 27.37
    }, {
        "rank": 200,
        "sales": 17.82
    }, {
        "rank": 300,
        "sales": 11.474666666666668
    }, {
        "rank": 400,
        "sales": 8.937999999999999
    }, {
        "rank": 500,
        "sales": 6.883666666666667
    }, {
        "rank": 600,
        "sales": 5.202
    }, {
        "rank": 700,
        "sales": 4.2
    }, {
        "rank": 800,
        "sales": 3.5
    }, {
        "rank": 900,
        "sales": 3.0260000000000002
    }, {
        "rank": 1000,
        "sales": 2.834
    }, {
        "rank": 2000,
        "sales": 1.044
    }, {
        "rank": 3000,
        "sales": 0.23333333333333334
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Garten": [{
        "rank": 1,
        "sales": 131.84
    }, {
        "rank": 2,
        "sales": 119.791
    }, {
        "rank": 3,
        "sales": 103.96533333333333
    }, {
        "rank": 4,
        "sales": 94.09833333333333
    }, {
        "rank": 5,
        "sales": 88.981
    }, {
        "rank": 6,
        "sales": 85.714
    }, {
        "rank": 7,
        "sales": 84.735
    }, {
        "rank": 8,
        "sales": 82.50333333333333
    }, {
        "rank": 9,
        "sales": 79.88866666666667
    }, {
        "rank": 10,
        "sales": 78.32400000000001
    }, {
        "rank": 20,
        "sales": 65.03666666666666
    }, {
        "rank": 30,
        "sales": 52.924
    }, {
        "rank": 40,
        "sales": 51.336
    }, {
        "rank": 50,
        "sales": 44.812
    }, {
        "rank": 60,
        "sales": 43.94133333333333
    }, {
        "rank": 70,
        "sales": 41.44466666666666
    }, {
        "rank": 80,
        "sales": 40.07566666666666
    }, {
        "rank": 90,
        "sales": 35.451
    }, {
        "rank": 100,
        "sales": 34.608
    }, {
        "rank": 200,
        "sales": 25.40666666666667
    }, {
        "rank": 300,
        "sales": 21.07
    }, {
        "rank": 400,
        "sales": 18.2
    }, {
        "rank": 500,
        "sales": 16.45
    }, {
        "rank": 600,
        "sales": 15.372333333333334
    }, {
        "rank": 700,
        "sales": 13.129999999999999
    }, {
        "rank": 800,
        "sales": 11.666666666666666
    }, {
        "rank": 900,
        "sales": 11.517666666666665
    }, {
        "rank": 1000,
        "sales": 10.088
    }, {
        "rank": 2000,
        "sales": 5.61
    }, {
        "rank": 3000,
        "sales": 4.069333333333334
    }, {
        "rank": 4000,
        "sales": 2.9246666666666665
    }, {
        "rank": 5000,
        "sales": 2.14
    }, {
        "rank": 6000,
        "sales": 1.635
    }, {
        "rank": 7000,
        "sales": 1.166
    }, {
        "rank": 8000,
        "sales": 0.85
    }, {
        "rank": 9000,
        "sales": 0.63
    }, {
        "rank": 10000,
        "sales": 0.43333333333333335
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Gewerbe, Industrie & Wissenschaft": [{
        "rank": 1,
        "sales": 98.58
    }, {
        "rank": 2,
        "sales": 79.413
    }, {
        "rank": 3,
        "sales": 70.52066666666666
    }, {
        "rank": 4,
        "sales": 65.17333333333333
    }, {
        "rank": 5,
        "sales": 63.61966666666667
    }, {
        "rank": 6,
        "sales": 58.22933333333334
    }, {
        "rank": 7,
        "sales": 52.65466666666667
    }, {
        "rank": 8,
        "sales": 54.245666666666665
    }, {
        "rank": 9,
        "sales": 50.085
    }, {
        "rank": 10,
        "sales": 48.653999999999996
    }, {
        "rank": 20,
        "sales": 36.01566666666667
    }, {
        "rank": 30,
        "sales": 30.110333333333333
    }, {
        "rank": 40,
        "sales": 26.265
    }, {
        "rank": 50,
        "sales": 22.994333333333334
    }, {
        "rank": 60,
        "sales": 22.526666666666664
    }, {
        "rank": 70,
        "sales": 19.50133333333333
    }, {
        "rank": 80,
        "sales": 18.41
    }, {
        "rank": 90,
        "sales": 16.3
    }, {
        "rank": 100,
        "sales": 15.877333333333333
    }, {
        "rank": 200,
        "sales": 9.418000000000001
    }, {
        "rank": 300,
        "sales": 6.804
    }, {
        "rank": 400,
        "sales": 4.713333333333334
    }, {
        "rank": 500,
        "sales": 3.8866666666666663
    }, {
        "rank": 600,
        "sales": 3.0260000000000002
    }, {
        "rank": 700,
        "sales": 2.575
    }, {
        "rank": 800,
        "sales": 2.1420000000000003
    }, {
        "rank": 900,
        "sales": 1.9983333333333335
    }, {
        "rank": 1000,
        "sales": 1.715
    }, {
        "rank": 2000,
        "sales": 0.5
    }, {
        "rank": 3000,
        "sales": 0
    }],
    "Haustier": [{
        "rank": 1,
        "sales": 90.64
    }, {
        "rank": 2,
        "sales": 79.555
    }, {
        "rank": 3,
        "sales": 74.556
    }, {
        "rank": 4,
        "sales": 66.36633333333333
    }, {
        "rank": 5,
        "sales": 66.49
    }, {
        "rank": 6,
        "sales": 59.398
    }, {
        "rank": 7,
        "sales": 60.443999999999996
    }, {
        "rank": 8,
        "sales": 57.815666666666665
    }, {
        "rank": 9,
        "sales": 54.46133333333333
    }, {
        "rank": 10,
        "sales": 54.463
    }, {
        "rank": 20,
        "sales": 43.785
    }, {
        "rank": 30,
        "sales": 39.672000000000004
    }, {
        "rank": 40,
        "sales": 33.4
    }, {
        "rank": 50,
        "sales": 31.242666666666665
    }, {
        "rank": 60,
        "sales": 29.290000000000003
    }, {
        "rank": 70,
        "sales": 29.866
    }, {
        "rank": 80,
        "sales": 27.595333333333333
    }, {
        "rank": 90,
        "sales": 24.9
    }, {
        "rank": 100,
        "sales": 24.344
    }, {
        "rank": 200,
        "sales": 18.974666666666668
    }, {
        "rank": 300,
        "sales": 14.533333333333333
    }, {
        "rank": 400,
        "sales": 12.982666666666667
    }, {
        "rank": 500,
        "sales": 10.3
    }, {
        "rank": 600,
        "sales": 9.022666666666668
    }, {
        "rank": 700,
        "sales": 8.146666666666667
    }, {
        "rank": 800,
        "sales": 7.4543333333333335
    }, {
        "rank": 900,
        "sales": 6.6659999999999995
    }, {
        "rank": 1000,
        "sales": 6.420333333333334
    }, {
        "rank": 2000,
        "sales": 4.248
    }, {
        "rank": 3000,
        "sales": 2.8496666666666663
    }, {
        "rank": 4000,
        "sales": 2.066666666666667
    }, {
        "rank": 5000,
        "sales": 1.7510000000000001
    }, {
        "rank": 6000,
        "sales": 1.5623333333333334
    }, {
        "rank": 7000,
        "sales": 1.212
    }, {
        "rank": 8000,
        "sales": 1.0953333333333333
    }, {
        "rank": 9000,
        "sales": 0.91
    }, {
        "rank": 10000,
        "sales": 0.7333333333333333
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Kamera": [{
        "rank": 1,
        "sales": 64.66
    }, {
        "rank": 2,
        "sales": 51.476
    }, {
        "rank": 3,
        "sales": 45.696000000000005
    }, {
        "rank": 4,
        "sales": 43.42466666666667
    }, {
        "rank": 5,
        "sales": 40.385999999999996
    }, {
        "rank": 6,
        "sales": 36.90833333333333
    }, {
        "rank": 7,
        "sales": 36.38
    }, {
        "rank": 8,
        "sales": 34.379333333333335
    }, {
        "rank": 9,
        "sales": 33.86266666666667
    }, {
        "rank": 10,
        "sales": 30.797
    }, {
        "rank": 20,
        "sales": 24.253333333333334
    }, {
        "rank": 30,
        "sales": 18.9
    }, {
        "rank": 40,
        "sales": 16.960666666666665
    }, {
        "rank": 50,
        "sales": 15.253333333333334
    }, {
        "rank": 60,
        "sales": 13.664666666666667
    }, {
        "rank": 70,
        "sales": 12.896666666666667
    }, {
        "rank": 80,
        "sales": 11.345666666666666
    }, {
        "rank": 90,
        "sales": 11.059333333333333
    }, {
        "rank": 100,
        "sales": 10.352666666666666
    }, {
        "rank": 200,
        "sales": 6.358333333333333
    }, {
        "rank": 300,
        "sales": 4.148
    }, {
        "rank": 400,
        "sales": 3.379
    }, {
        "rank": 500,
        "sales": 2.584
    }, {
        "rank": 600,
        "sales": 2.247
    }, {
        "rank": 700,
        "sales": 1.9080000000000001
    }, {
        "rank": 800,
        "sales": 1.564
    }, {
        "rank": 900,
        "sales": 1.3866666666666667
    }, {
        "rank": 1000,
        "sales": 1.1333333333333333
    }, {
        "rank": 2000,
        "sales": 0.26666666666666666
    }, {
        "rank": 3000,
        "sales": 0
    }],
    "Koffer, Rucksäcke & Taschen": [{
        "rank": 1,
        "sales": 84
    }, {
        "rank": 2,
        "sales": 70.096
    }, {
        "rank": 3,
        "sales": 62.919999999999995
    }, {
        "rank": 4,
        "sales": 59.74166666666667
    }, {
        "rank": 5,
        "sales": 54.46133333333333
    }, {
        "rank": 6,
        "sales": 53.072
    }, {
        "rank": 7,
        "sales": 50.64666666666667
    }, {
        "rank": 8,
        "sales": 49.486
    }, {
        "rank": 9,
        "sales": 45.48266666666667
    }, {
        "rank": 10,
        "sales": 43.111999999999995
    }, {
        "rank": 20,
        "sales": 36.224333333333334
    }, {
        "rank": 30,
        "sales": 29.60533333333333
    }, {
        "rank": 40,
        "sales": 27.324
    }, {
        "rank": 50,
        "sales": 24.115000000000002
    }, {
        "rank": 60,
        "sales": 21.378333333333334
    }, {
        "rank": 70,
        "sales": 21.240000000000002
    }, {
        "rank": 80,
        "sales": 18.433333333333334
    }, {
        "rank": 90,
        "sales": 17.647333333333332
    }, {
        "rank": 100,
        "sales": 16.854
    }, {
        "rank": 200,
        "sales": 9.622000000000002
    }, {
        "rank": 300,
        "sales": 7.854
    }, {
        "rank": 400,
        "sales": 7.012333333333333
    }, {
        "rank": 500,
        "sales": 5.333333333333333
    }, {
        "rank": 600,
        "sales": 4.703666666666667
    }, {
        "rank": 700,
        "sales": 3.933333333333333
    }, {
        "rank": 800,
        "sales": 3.3646666666666665
    }, {
        "rank": 900,
        "sales": 2.8953333333333333
    }, {
        "rank": 1000,
        "sales": 2.791333333333333
    }, {
        "rank": 2000,
        "sales": 1.1666666666666667
    }, {
        "rank": 3000,
        "sales": 0.52
    }, {
        "rank": 4000,
        "sales": 0.2
    }, {
        "rank": 5000,
        "sales": 0
    }],
    "Küche & Haushalt": [{
        "rank": 1,
        "sales": 189
    }, {
        "rank": 2,
        "sales": 171.036
    }, {
        "rank": 3,
        "sales": 158.04
    }, {
        "rank": 4,
        "sales": 150.529
    }, {
        "rank": 5,
        "sales": 141.13299999999998
    }, {
        "rank": 6,
        "sales": 135.783
    }, {
        "rank": 7,
        "sales": 126.44966666666666
    }, {
        "rank": 8,
        "sales": 122.81033333333333
    }, {
        "rank": 9,
        "sales": 117.32833333333333
    }, {
        "rank": 10,
        "sales": 123.67866666666667
    }, {
        "rank": 20,
        "sales": 103.18366666666667
    }, {
        "rank": 30,
        "sales": 91.455
    }, {
        "rank": 40,
        "sales": 84.805
    }, {
        "rank": 50,
        "sales": 76.79366666666667
    }, {
        "rank": 60,
        "sales": 74.43466666666667
    }, {
        "rank": 70,
        "sales": 74.00833333333334
    }, {
        "rank": 80,
        "sales": 69.16000000000001
    }, {
        "rank": 90,
        "sales": 66.80266666666667
    }, {
        "rank": 100,
        "sales": 64.688
    }, {
        "rank": 200,
        "sales": 51.757333333333335
    }, {
        "rank": 300,
        "sales": 44.858666666666664
    }, {
        "rank": 400,
        "sales": 40.669999999999995
    }, {
        "rank": 500,
        "sales": 35.46666666666667
    }, {
        "rank": 600,
        "sales": 33.558
    }, {
        "rank": 700,
        "sales": 32.99166666666667
    }, {
        "rank": 800,
        "sales": 29.066666666666666
    }, {
        "rank": 900,
        "sales": 28.218666666666664
    }, {
        "rank": 1000,
        "sales": 26.485333333333333
    }, {
        "rank": 2000,
        "sales": 18.230999999999998
    }, {
        "rank": 3000,
        "sales": 14.824000000000002
    }, {
        "rank": 4000,
        "sales": 11.984
    }, {
        "rank": 5000,
        "sales": 10.246666666666666
    }, {
        "rank": 6000,
        "sales": 9.24
    }, {
        "rank": 7000,
        "sales": 8.262
    }, {
        "rank": 8000,
        "sales": 7.65
    }, {
        "rank": 9000,
        "sales": 7.35
    }, {
        "rank": 10000,
        "sales": 6.42
    }, {
        "rank": 20000,
        "sales": 3
    }, {
        "rank": 30000,
        "sales": 2.094333333333333
    }, {
        "rank": 40000,
        "sales": 1.3733333333333335
    }, {
        "rank": 50000,
        "sales": 0.8753333333333334
    }, {
        "rank": 60000,
        "sales": 0.6063333333333334
    }, {
        "rank": 70000,
        "sales": 0.385
    }, {
        "rank": 80000,
        "sales": 0.23333333333333334
    }, {
        "rank": 90000,
        "sales": 0
    }],
    "Lebensmittel & Getränke": [{
        "rank": 1,
        "sales": 164.85
    }, {
        "rank": 2,
        "sales": 135.87866666666667
    }, {
        "rank": 3,
        "sales": 125.866
    }, {
        "rank": 4,
        "sales": 122.904
    }, {
        "rank": 5,
        "sales": 116.1
    }, {
        "rank": 6,
        "sales": 108.61466666666666
    }, {
        "rank": 7,
        "sales": 104.23333333333333
    }, {
        "rank": 8,
        "sales": 103.33200000000001
    }, {
        "rank": 9,
        "sales": 93.568
    }, {
        "rank": 10,
        "sales": 89.92366666666666
    }, {
        "rank": 20,
        "sales": 75.22666666666667
    }, {
        "rank": 30,
        "sales": 67.16866666666667
    }, {
        "rank": 40,
        "sales": 59.08766666666667
    }, {
        "rank": 50,
        "sales": 53.958
    }, {
        "rank": 60,
        "sales": 52.858
    }, {
        "rank": 70,
        "sales": 47.464000000000006
    }, {
        "rank": 80,
        "sales": 45.89866666666667
    }, {
        "rank": 90,
        "sales": 45.396
    }, {
        "rank": 100,
        "sales": 40.233333333333334
    }, {
        "rank": 200,
        "sales": 29.886000000000003
    }, {
        "rank": 300,
        "sales": 23.596
    }, {
        "rank": 400,
        "sales": 18.55
    }, {
        "rank": 500,
        "sales": 15.738666666666667
    }, {
        "rank": 600,
        "sales": 14.098
    }, {
        "rank": 700,
        "sales": 12.508000000000001
    }, {
        "rank": 800,
        "sales": 10.918000000000001
    }, {
        "rank": 900,
        "sales": 9.984
    }, {
        "rank": 1000,
        "sales": 8.8
    }, {
        "rank": 2000,
        "sales": 5.304
    }, {
        "rank": 3000,
        "sales": 3.6746666666666665
    }, {
        "rank": 4000,
        "sales": 2.765
    }, {
        "rank": 5000,
        "sales": 2.216333333333333
    }, {
        "rank": 6000,
        "sales": 1.645
    }, {
        "rank": 7000,
        "sales": 1.2483333333333335
    }, {
        "rank": 8000,
        "sales": 0.9540000000000001
    }, {
        "rank": 9000,
        "sales": 0.7420000000000001
    }, {
        "rank": 10000,
        "sales": 0.5333333333333333
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Motorrad": [{
        "rank": 1,
        "sales": 11.22
    }, {
        "rank": 2,
        "sales": 7.884
    }, {
        "rank": 3,
        "sales": 5.665
    }, {
        "rank": 4,
        "sales": 4.454
    }, {
        "rank": 5,
        "sales": 3.7079999999999997
    }, {
        "rank": 6,
        "sales": 3.24
    }, {
        "rank": 7,
        "sales": 2.853333333333333
    }, {
        "rank": 8,
        "sales": 2.592
    }, {
        "rank": 9,
        "sales": 2.222
    }, {
        "rank": 10,
        "sales": 2.06
    }, {
        "rank": 20,
        "sales": 1.06
    }, {
        "rank": 30,
        "sales": 0.6176666666666667
    }, {
        "rank": 40,
        "sales": 0.3333333333333333
    }, {
        "rank": 50,
        "sales": 0.2
    }, {
        "rank": 60,
        "sales": 0
    }],
    "Musikinstrumente": [{
        "rank": 1,
        "sales": 57.24
    }, {
        "rank": 2,
        "sales": 46.852
    }, {
        "rank": 3,
        "sales": 42.364000000000004
    }, {
        "rank": 4,
        "sales": 38.53333333333333
    }, {
        "rank": 5,
        "sales": 36.3
    }, {
        "rank": 6,
        "sales": 36.57
    }, {
        "rank": 7,
        "sales": 34.35466666666667
    }, {
        "rank": 8,
        "sales": 33.99033333333333
    }, {
        "rank": 9,
        "sales": 32.235
    }, {
        "rank": 10,
        "sales": 30.030666666666665
    }, {
        "rank": 20,
        "sales": 25.501666666666665
    }, {
        "rank": 30,
        "sales": 22.149
    }, {
        "rank": 40,
        "sales": 20.088
    }, {
        "rank": 50,
        "sales": 17.884999999999998
    }, {
        "rank": 60,
        "sales": 15.991666666666667
    }, {
        "rank": 70,
        "sales": 15.871666666666666
    }, {
        "rank": 80,
        "sales": 14
    }, {
        "rank": 90,
        "sales": 12.8
    }, {
        "rank": 100,
        "sales": 12.237333333333334
    }, {
        "rank": 200,
        "sales": 7.626666666666667
    }, {
        "rank": 300,
        "sales": 5.905333333333333
    }, {
        "rank": 400,
        "sales": 4.814333333333334
    }, {
        "rank": 500,
        "sales": 4.223
    }, {
        "rank": 600,
        "sales": 3.673666666666667
    }, {
        "rank": 700,
        "sales": 3.103
    }, {
        "rank": 800,
        "sales": 2.7613333333333334
    }, {
        "rank": 900,
        "sales": 2.2439999999999998
    }, {
        "rank": 1000,
        "sales": 1.972
    }, {
        "rank": 2000,
        "sales": 0.63
    }, {
        "rank": 3000,
        "sales": 0.16666666666666666
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Schmuck": [{
        "rank": 1,
        "sales": 37.8
    }, {
        "rank": 2,
        "sales": 31.824
    }, {
        "rank": 3,
        "sales": 28.566666666666666
    }, {
        "rank": 4,
        "sales": 28.105
    }, {
        "rank": 5,
        "sales": 26.924
    }, {
        "rank": 6,
        "sales": 24.576666666666664
    }, {
        "rank": 7,
        "sales": 23.433333333333334
    }, {
        "rank": 8,
        "sales": 24.253333333333334
    }, {
        "rank": 9,
        "sales": 23.98
    }, {
        "rank": 10,
        "sales": 22.933666666666667
    }, {
        "rank": 20,
        "sales": 17.766666666666666
    }, {
        "rank": 30,
        "sales": 16.116
    }, {
        "rank": 40,
        "sales": 15.19
    }, {
        "rank": 50,
        "sales": 13.466666666666667
    }, {
        "rank": 60,
        "sales": 13.173333333333334
    }, {
        "rank": 70,
        "sales": 12.635
    }, {
        "rank": 80,
        "sales": 12.535
    }, {
        "rank": 90,
        "sales": 11
    }, {
        "rank": 100,
        "sales": 11.129999999999999
    }, {
        "rank": 200,
        "sales": 7.103666666666667
    }, {
        "rank": 300,
        "sales": 6.1946666666666665
    }, {
        "rank": 400,
        "sales": 5.588666666666667
    }, {
        "rank": 500,
        "sales": 5.168
    }, {
        "rank": 600,
        "sales": 4.941333333333334
    }, {
        "rank": 700,
        "sales": 4.107333333333333
    }, {
        "rank": 800,
        "sales": 3.99
    }, {
        "rank": 900,
        "sales": 3.852
    }, {
        "rank": 1000,
        "sales": 3.605
    }, {
        "rank": 2000,
        "sales": 2.52
    }, {
        "rank": 3000,
        "sales": 1.8373333333333333
    }, {
        "rank": 4000,
        "sales": 1.3666666666666667
    }, {
        "rank": 5000,
        "sales": 1.1219999999999999
    }, {
        "rank": 6000,
        "sales": 0.9
    }, {
        "rank": 7000,
        "sales": 0.8356666666666667
    }, {
        "rank": 8000,
        "sales": 0.6333333333333333
    }, {
        "rank": 9000,
        "sales": 0.5386666666666666
    }, {
        "rank": 10000,
        "sales": 0.4666666666666667
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Schuhe & Handtaschen": [{
        "rank": 1,
        "sales": 53.04
    }, {
        "rank": 2,
        "sales": 48.18566666666666
    }, {
        "rank": 3,
        "sales": 41.57833333333333
    }, {
        "rank": 4,
        "sales": 39.68933333333334
    }, {
        "rank": 5,
        "sales": 38.029333333333334
    }, {
        "rank": 6,
        "sales": 36.05
    }, {
        "rank": 7,
        "sales": 34.374
    }, {
        "rank": 8,
        "sales": 34.846333333333334
    }, {
        "rank": 9,
        "sales": 32.864
    }, {
        "rank": 10,
        "sales": 30.766666666666666
    }, {
        "rank": 20,
        "sales": 26.230666666666664
    }, {
        "rank": 30,
        "sales": 23.243666666666666
    }, {
        "rank": 40,
        "sales": 21.458666666666666
    }, {
        "rank": 50,
        "sales": 19.392
    }, {
        "rank": 60,
        "sales": 19.512
    }, {
        "rank": 70,
        "sales": 17.476
    }, {
        "rank": 80,
        "sales": 17.15
    }, {
        "rank": 90,
        "sales": 16.136666666666667
    }, {
        "rank": 100,
        "sales": 16.272000000000002
    }, {
        "rank": 200,
        "sales": 11.433333333333334
    }, {
        "rank": 300,
        "sales": 9.819333333333333
    }, {
        "rank": 400,
        "sales": 8.715
    }, {
        "rank": 500,
        "sales": 7.696
    }, {
        "rank": 600,
        "sales": 7.240333333333334
    }, {
        "rank": 700,
        "sales": 6.586666666666667
    }, {
        "rank": 800,
        "sales": 6.48
    }, {
        "rank": 900,
        "sales": 5.985
    }, {
        "rank": 1000,
        "sales": 5.596333333333333
    }, {
        "rank": 2000,
        "sales": 3.636
    }, {
        "rank": 3000,
        "sales": 3.312
    }, {
        "rank": 4000,
        "sales": 2.6693333333333333
    }, {
        "rank": 5000,
        "sales": 2.412
    }, {
        "rank": 6000,
        "sales": 2.088
    }, {
        "rank": 7000,
        "sales": 1.8373333333333333
    }, {
        "rank": 8000,
        "sales": 1.5486666666666666
    }, {
        "rank": 9000,
        "sales": 1.512
    }, {
        "rank": 10000,
        "sales": 1.3679999999999999
    }, {
        "rank": 20000,
        "sales": 0.63
    }, {
        "rank": 30000,
        "sales": 0.324
    }, {
        "rank": 40000,
        "sales": 0.16666666666666666
    }, {
        "rank": 50000,
        "sales": 0
    }],
    "Software": [{
        "rank": 1,
        "sales": 129.78
    }, {
        "rank": 2,
        "sales": 105.98
    }, {
        "rank": 3,
        "sales": 92.78533333333333
    }, {
        "rank": 4,
        "sales": 81.77866666666667
    }, {
        "rank": 5,
        "sales": 74.19433333333333
    }, {
        "rank": 6,
        "sales": 69.54133333333333
    }, {
        "rank": 7,
        "sales": 67.01766666666667
    }, {
        "rank": 8,
        "sales": 59.691
    }, {
        "rank": 9,
        "sales": 58.87
    }, {
        "rank": 10,
        "sales": 53.4
    }, {
        "rank": 20,
        "sales": 39.82066666666666
    }, {
        "rank": 30,
        "sales": 30.488
    }, {
        "rank": 40,
        "sales": 26.705
    }, {
        "rank": 50,
        "sales": 22.572
    }, {
        "rank": 60,
        "sales": 19.221333333333334
    }, {
        "rank": 70,
        "sales": 17.12
    }, {
        "rank": 80,
        "sales": 15.229666666666667
    }, {
        "rank": 90,
        "sales": 13.242666666666667
    }, {
        "rank": 100,
        "sales": 11.5
    }, {
        "rank": 200,
        "sales": 4.886333333333334
    }, {
        "rank": 300,
        "sales": 2.356666666666667
    }, {
        "rank": 400,
        "sales": 1.4623333333333333
    }, {
        "rank": 500,
        "sales": 0.84
    }, {
        "rank": 600,
        "sales": 0.42
    }, {
        "rank": 700,
        "sales": 0.16666666666666666
    }, {
        "rank": 800,
        "sales": 0
    }]
},
"amazon.co.uk": {
    "Baby": [{
        "rank": 1,
        "sales": 124.63000000000001
    }, {
        "rank": 2,
        "sales": 102.93333333333334
    }, {
        "rank": 3,
        "sales": 97.72
    }, {
        "rank": 4,
        "sales": 90.65
    }, {
        "rank": 5,
        "sales": 87.804
    }, {
        "rank": 6,
        "sales": 78.846
    }, {
        "rank": 7,
        "sales": 74
    }, {
        "rank": 8,
        "sales": 75.472
    }, {
        "rank": 9,
        "sales": 74.268
    }, {
        "rank": 10,
        "sales": 71.29766666666666
    }, {
        "rank": 20,
        "sales": 57.708
    }, {
        "rank": 30,
        "sales": 48.684999999999995
    }, {
        "rank": 40,
        "sales": 43.333333333333336
    }, {
        "rank": 50,
        "sales": 39.727999999999994
    }, {
        "rank": 60,
        "sales": 36.88533333333333
    }, {
        "rank": 70,
        "sales": 33.898
    }, {
        "rank": 80,
        "sales": 31.680333333333333
    }, {
        "rank": 90,
        "sales": 31.85033333333333
    }, {
        "rank": 100,
        "sales": 29.217666666666666
    }, {
        "rank": 200,
        "sales": 21.2
    }, {
        "rank": 300,
        "sales": 17.221999999999998
    }, {
        "rank": 400,
        "sales": 13.389999999999999
    }, {
        "rank": 500,
        "sales": 11.881
    }, {
        "rank": 600,
        "sales": 9.724
    }, {
        "rank": 700,
        "sales": 8.926666666666668
    }, {
        "rank": 800,
        "sales": 8.409333333333333
    }, {
        "rank": 900,
        "sales": 7.7379999999999995
    }, {
        "rank": 1000,
        "sales": 7.133333333333334
    }, {
        "rank": 2000,
        "sales": 3.162
    }, {
        "rank": 3000,
        "sales": 2.0846666666666667
    }, {
        "rank": 4000,
        "sales": 1.4349999999999998
    }, {
        "rank": 5000,
        "sales": 0.9956666666666667
    }, {
        "rank": 6000,
        "sales": 0.646
    }, {
        "rank": 7000,
        "sales": 0.40800000000000003
    }, {
        "rank": 8000,
        "sales": 0.2773333333333333
    }, {
        "rank": 9000,
        "sales": 0.16666666666666666
    }, {
        "rank": 10000,
        "sales": 0
    }],
    "Beauty": [{
        "rank": 1,
        "sales": 152.51000000000002
    }, {
        "rank": 2,
        "sales": 142.71733333333336
    }, {
        "rank": 3,
        "sales": 123.42833333333333
    }, {
        "rank": 4,
        "sales": 113.38933333333333
    }, {
        "rank": 5,
        "sales": 111.895
    }, {
        "rank": 6,
        "sales": 111.21633333333332
    }, {
        "rank": 7,
        "sales": 107.11066666666667
    }, {
        "rank": 8,
        "sales": 99.82
    }, {
        "rank": 9,
        "sales": 95.069
    }, {
        "rank": 10,
        "sales": 89.83333333333333
    }, {
        "rank": 20,
        "sales": 80.46000000000001
    }, {
        "rank": 30,
        "sales": 68.848
    }, {
        "rank": 40,
        "sales": 64.87766666666667
    }, {
        "rank": 50,
        "sales": 60.419333333333334
    }, {
        "rank": 60,
        "sales": 56.888333333333335
    }, {
        "rank": 70,
        "sales": 51.98066666666667
    }, {
        "rank": 80,
        "sales": 50.093333333333334
    }, {
        "rank": 90,
        "sales": 49.896
    }, {
        "rank": 100,
        "sales": 48.024
    }, {
        "rank": 200,
        "sales": 33.9
    }, {
        "rank": 300,
        "sales": 29.046
    }, {
        "rank": 400,
        "sales": 24.709999999999997
    }, {
        "rank": 500,
        "sales": 19.866666666666667
    }, {
        "rank": 600,
        "sales": 17.784666666666666
    }, {
        "rank": 700,
        "sales": 15.999333333333334
    }, {
        "rank": 800,
        "sales": 15.369
    }, {
        "rank": 900,
        "sales": 14.508000000000001
    }, {
        "rank": 1000,
        "sales": 13.252666666666666
    }, {
        "rank": 2000,
        "sales": 9.555
    }, {
        "rank": 3000,
        "sales": 6.685333333333333
    }, {
        "rank": 4000,
        "sales": 4.633333333333334
    }, {
        "rank": 5000,
        "sales": 3.952
    }, {
        "rank": 6000,
        "sales": 3.227333333333333
    }, {
        "rank": 7000,
        "sales": 2.6666666666666665
    }, {
        "rank": 8000,
        "sales": 2.3333333333333335
    }, {
        "rank": 9000,
        "sales": 2.033333333333333
    }, {
        "rank": 10000,
        "sales": 1.98
    }, {
        "rank": 20000,
        "sales": 0.763
    }, {
        "rank": 30000,
        "sales": 0.23333333333333334
    }, {
        "rank": 40000,
        "sales": 0
    }],
    "Car & Motorbike": [{
        "rank": 1,
        "sales": 80.56
    }, {
        "rank": 2,
        "sales": 69.04133333333333
    }, {
        "rank": 3,
        "sales": 59.75833333333333
    }, {
        "rank": 4,
        "sales": 56.78733333333333
    }, {
        "rank": 5,
        "sales": 55.190666666666665
    }, {
        "rank": 6,
        "sales": 52.61133333333333
    }, {
        "rank": 7,
        "sales": 49.53866666666667
    }, {
        "rank": 8,
        "sales": 47.31133333333333
    }, {
        "rank": 9,
        "sales": 48.468666666666664
    }, {
        "rank": 10,
        "sales": 43.598333333333336
    }, {
        "rank": 20,
        "sales": 37.17066666666666
    }, {
        "rank": 30,
        "sales": 30.733333333333334
    }, {
        "rank": 40,
        "sales": 28.111666666666668
    }, {
        "rank": 50,
        "sales": 26.18
    }, {
        "rank": 60,
        "sales": 24.68566666666667
    }, {
        "rank": 70,
        "sales": 23.73
    }, {
        "rank": 80,
        "sales": 23.148000000000003
    }, {
        "rank": 90,
        "sales": 22.067999999999998
    }, {
        "rank": 100,
        "sales": 21.096
    }, {
        "rank": 200,
        "sales": 14.375666666666666
    }, {
        "rank": 300,
        "sales": 11.008999999999999
    }, {
        "rank": 400,
        "sales": 9.345
    }, {
        "rank": 500,
        "sales": 7.8693333333333335
    }, {
        "rank": 600,
        "sales": 7.128
    }, {
        "rank": 700,
        "sales": 6.218666666666667
    }, {
        "rank": 800,
        "sales": 5.582666666666666
    }, {
        "rank": 900,
        "sales": 4.881666666666666
    }, {
        "rank": 1000,
        "sales": 4.749333333333333
    }, {
        "rank": 2000,
        "sales": 2.996
    }, {
        "rank": 3000,
        "sales": 2.0846666666666667
    }, {
        "rank": 4000,
        "sales": 1.3666666666666667
    }, {
        "rank": 5000,
        "sales": 1.0536666666666668
    }, {
        "rank": 6000,
        "sales": 0.721
    }, {
        "rank": 7000,
        "sales": 0.505
    }, {
        "rank": 8000,
        "sales": 0.37766666666666665
    }, {
        "rank": 9000,
        "sales": 0.2826666666666667
    }, {
        "rank": 10000,
        "sales": 0.16666666666666666
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Clothing": [{
        "rank": 1,
        "sales": 37
    }, {
        "rank": 2,
        "sales": 34.125
    }, {
        "rank": 3,
        "sales": 32.1
    }, {
        "rank": 4,
        "sales": 28.866
    }, {
        "rank": 5,
        "sales": 28.89
    }, {
        "rank": 6,
        "sales": 26.74566666666667
    }, {
        "rank": 7,
        "sales": 27.395333333333333
    }, {
        "rank": 8,
        "sales": 26.108
    }, {
        "rank": 9,
        "sales": 24.682666666666666
    }, {
        "rank": 10,
        "sales": 23.663999999999998
    }, {
        "rank": 20,
        "sales": 20.65
    }, {
        "rank": 30,
        "sales": 18.088
    }, {
        "rank": 40,
        "sales": 17.255
    }, {
        "rank": 50,
        "sales": 15.587666666666667
    }, {
        "rank": 60,
        "sales": 14.666666666666666
    }, {
        "rank": 70,
        "sales": 15.296333333333333
    }, {
        "rank": 80,
        "sales": 14.544
    }, {
        "rank": 90,
        "sales": 13.65
    }, {
        "rank": 100,
        "sales": 13.356
    }, {
        "rank": 200,
        "sales": 10.234
    }, {
        "rank": 300,
        "sales": 8.84
    }, {
        "rank": 400,
        "sales": 8.310333333333334
    }, {
        "rank": 500,
        "sales": 7.526
    }, {
        "rank": 600,
        "sales": 7.069999999999999
    }, {
        "rank": 700,
        "sales": 6.660666666666667
    }, {
        "rank": 800,
        "sales": 6.233333333333333
    }, {
        "rank": 900,
        "sales": 6.576333333333333
    }, {
        "rank": 1000,
        "sales": 5.925333333333333
    }, {
        "rank": 2000,
        "sales": 4.760000000000001
    }, {
        "rank": 3000,
        "sales": 3.996
    }, {
        "rank": 4000,
        "sales": 3.348
    }, {
        "rank": 5000,
        "sales": 2.835
    }, {
        "rank": 6000,
        "sales": 2.496
    }, {
        "rank": 7000,
        "sales": 2.1973333333333334
    }, {
        "rank": 8000,
        "sales": 1.9666666666666666
    }, {
        "rank": 9000,
        "sales": 1.9080000000000001
    }, {
        "rank": 10000,
        "sales": 1.7833333333333334
    }, {
        "rank": 20000,
        "sales": 0.9666666666666667
    }, {
        "rank": 30000,
        "sales": 0.648
    }, {
        "rank": 40000,
        "sales": 0.436
    }, {
        "rank": 50000,
        "sales": 0.2906666666666667
    }, {
        "rank": 60000,
        "sales": 0.2
    }, {
        "rank": 70000,
        "sales": 0
    }],
    "Computers": [{
        "rank": 1,
        "sales": 178.07999999999998
    }, {
        "rank": 2,
        "sales": 145.00233333333333
    }, {
        "rank": 3,
        "sales": 137.97666666666666
    }, {
        "rank": 4,
        "sales": 125.87466666666666
    }, {
        "rank": 5,
        "sales": 115.34200000000001
    }, {
        "rank": 6,
        "sales": 115.29266666666668
    }, {
        "rank": 7,
        "sales": 107.39466666666667
    }, {
        "rank": 8,
        "sales": 105.455
    }, {
        "rank": 9,
        "sales": 97.13333333333334
    }, {
        "rank": 10,
        "sales": 97.02600000000001
    }, {
        "rank": 20,
        "sales": 78.45166666666667
    }, {
        "rank": 30,
        "sales": 66.46666666666667
    }, {
        "rank": 40,
        "sales": 61.8
    }, {
        "rank": 50,
        "sales": 56.89033333333334
    }, {
        "rank": 60,
        "sales": 52.496
    }, {
        "rank": 70,
        "sales": 52.71966666666666
    }, {
        "rank": 80,
        "sales": 49.464000000000006
    }, {
        "rank": 90,
        "sales": 43.56666666666667
    }, {
        "rank": 100,
        "sales": 44.964000000000006
    }, {
        "rank": 200,
        "sales": 30.232666666666667
    }, {
        "rank": 300,
        "sales": 24.48
    }, {
        "rank": 400,
        "sales": 20.973333333333336
    }, {
        "rank": 500,
        "sales": 18.582333333333334
    }, {
        "rank": 600,
        "sales": 15.75
    }, {
        "rank": 700,
        "sales": 14.22
    }, {
        "rank": 800,
        "sales": 12.437333333333333
    }, {
        "rank": 900,
        "sales": 10.533333333333333
    }, {
        "rank": 1000,
        "sales": 9.949333333333334
    }, {
        "rank": 2000,
        "sales": 5.319999999999999
    }, {
        "rank": 3000,
        "sales": 3.1666666666666665
    }, {
        "rank": 4000,
        "sales": 2.415
    }, {
        "rank": 5000,
        "sales": 1.8903333333333334
    }, {
        "rank": 6000,
        "sales": 1.4280000000000002
    }, {
        "rank": 7000,
        "sales": 1.1219999999999999
    }, {
        "rank": 8000,
        "sales": 0.91
    }, {
        "rank": 9000,
        "sales": 0.7266666666666667
    }, {
        "rank": 10000,
        "sales": 0.5
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "DIY & Tools": [{
        "rank": 1,
        "sales": 125
    }, {
        "rank": 2,
        "sales": 112.35466666666666
    }, {
        "rank": 3,
        "sales": 105.609
    }, {
        "rank": 4,
        "sales": 94.18
    }, {
        "rank": 5,
        "sales": 88.40866666666668
    }, {
        "rank": 6,
        "sales": 87.885
    }, {
        "rank": 7,
        "sales": 82.144
    }, {
        "rank": 8,
        "sales": 84.06
    }, {
        "rank": 9,
        "sales": 79.275
    }, {
        "rank": 10,
        "sales": 77.83933333333333
    }, {
        "rank": 20,
        "sales": 61.812
    }, {
        "rank": 30,
        "sales": 53.63333333333333
    }, {
        "rank": 40,
        "sales": 51.90466666666667
    }, {
        "rank": 50,
        "sales": 48.684999999999995
    }, {
        "rank": 60,
        "sales": 45.724666666666664
    }, {
        "rank": 70,
        "sales": 41.309999999999995
    }, {
        "rank": 80,
        "sales": 42.074
    }, {
        "rank": 90,
        "sales": 40.257333333333335
    }, {
        "rank": 100,
        "sales": 37.275
    }, {
        "rank": 200,
        "sales": 27.837333333333333
    }, {
        "rank": 300,
        "sales": 23.1
    }, {
        "rank": 400,
        "sales": 18.415666666666667
    }, {
        "rank": 500,
        "sales": 17.730666666666664
    }, {
        "rank": 600,
        "sales": 14.948
    }, {
        "rank": 700,
        "sales": 14.724
    }, {
        "rank": 800,
        "sales": 12.894333333333332
    }, {
        "rank": 900,
        "sales": 12.96
    }, {
        "rank": 1000,
        "sales": 11.9
    }, {
        "rank": 2000,
        "sales": 7.333333333333333
    }, {
        "rank": 3000,
        "sales": 5.372
    }, {
        "rank": 4000,
        "sales": 4.033333333333333
    }, {
        "rank": 5000,
        "sales": 3.3666666666666667
    }, {
        "rank": 6000,
        "sales": 2.8616666666666664
    }, {
        "rank": 7000,
        "sales": 2.725
    }, {
        "rank": 8000,
        "sales": 2.222
    }, {
        "rank": 9000,
        "sales": 2.124
    }, {
        "rank": 10000,
        "sales": 1.8539999999999999
    }, {
        "rank": 20000,
        "sales": 0.9706666666666667
    }, {
        "rank": 30000,
        "sales": 0.4376666666666667
    }, {
        "rank": 40000,
        "sales": 0.2
    }, {
        "rank": 50000,
        "sales": 0
    }],
    "Electronics": [{
        "rank": 1,
        "sales": 205.03
    }, {
        "rank": 2,
        "sales": 183.98066666666668
    }, {
        "rank": 3,
        "sales": 166.87933333333334
    }, {
        "rank": 4,
        "sales": 158.18400000000003
    }, {
        "rank": 5,
        "sales": 150.638
    }, {
        "rank": 6,
        "sales": 131.66666666666666
    }, {
        "rank": 7,
        "sales": 128.75799999999998
    }, {
        "rank": 8,
        "sales": 126.49866666666667
    }, {
        "rank": 9,
        "sales": 122.33866666666667
    }, {
        "rank": 10,
        "sales": 116.416
    }, {
        "rank": 20,
        "sales": 100.67966666666666
    }, {
        "rank": 30,
        "sales": 83.12100000000001
    }, {
        "rank": 40,
        "sales": 73.62899999999999
    }, {
        "rank": 50,
        "sales": 70.455
    }, {
        "rank": 60,
        "sales": 62.56666666666667
    }, {
        "rank": 70,
        "sales": 58.833333333333336
    }, {
        "rank": 80,
        "sales": 60.712999999999994
    }, {
        "rank": 90,
        "sales": 57.275999999999996
    }, {
        "rank": 100,
        "sales": 51.68
    }, {
        "rank": 200,
        "sales": 39.01933333333333
    }, {
        "rank": 300,
        "sales": 28.149333333333335
    }, {
        "rank": 400,
        "sales": 22.962666666666667
    }, {
        "rank": 500,
        "sales": 18.766666666666666
    }, {
        "rank": 600,
        "sales": 16.867
    }, {
        "rank": 700,
        "sales": 15.907333333333334
    }, {
        "rank": 800,
        "sales": 14.606
    }, {
        "rank": 900,
        "sales": 12.478
    }, {
        "rank": 1000,
        "sales": 11.907333333333334
    }, {
        "rank": 2000,
        "sales": 6.4976666666666665
    }, {
        "rank": 3000,
        "sales": 4.566333333333334
    }, {
        "rank": 4000,
        "sales": 3.6333333333333333
    }, {
        "rank": 5000,
        "sales": 2.8890000000000002
    }, {
        "rank": 6000,
        "sales": 2.415
    }, {
        "rank": 7000,
        "sales": 2.065
    }, {
        "rank": 8000,
        "sales": 1.8196666666666668
    }, {
        "rank": 9000,
        "sales": 1.6
    }, {
        "rank": 10000,
        "sales": 1.462
    }, {
        "rank": 20000,
        "sales": 0.5
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Garden & Outdoors": [{
        "rank": 1,
        "sales": 110.21000000000001
    }, {
        "rank": 2,
        "sales": 93.806
    }, {
        "rank": 3,
        "sales": 84.50333333333333
    }, {
        "rank": 4,
        "sales": 85.05633333333334
    }, {
        "rank": 5,
        "sales": 73.8
    }, {
        "rank": 6,
        "sales": 75.36366666666666
    }, {
        "rank": 7,
        "sales": 71.015
    }, {
        "rank": 8,
        "sales": 66.572
    }, {
        "rank": 9,
        "sales": 64.464
    }, {
        "rank": 10,
        "sales": 62.014
    }, {
        "rank": 20,
        "sales": 51.135999999999996
    }, {
        "rank": 30,
        "sales": 46.71066666666666
    }, {
        "rank": 40,
        "sales": 43.236
    }, {
        "rank": 50,
        "sales": 39.59
    }, {
        "rank": 60,
        "sales": 35.326
    }, {
        "rank": 70,
        "sales": 34.626666666666665
    }, {
        "rank": 80,
        "sales": 32.585
    }, {
        "rank": 90,
        "sales": 29.633333333333333
    }, {
        "rank": 100,
        "sales": 30.672
    }, {
        "rank": 200,
        "sales": 20.366
    }, {
        "rank": 300,
        "sales": 16.252
    }, {
        "rank": 400,
        "sales": 14.042
    }, {
        "rank": 500,
        "sales": 12.672
    }, {
        "rank": 600,
        "sales": 10.302
    }, {
        "rank": 700,
        "sales": 9.366666666666667
    }, {
        "rank": 800,
        "sales": 9.555666666666667
    }, {
        "rank": 900,
        "sales": 8.398
    }, {
        "rank": 1000,
        "sales": 7.844333333333334
    }, {
        "rank": 2000,
        "sales": 4.911333333333333
    }, {
        "rank": 3000,
        "sales": 3.3303333333333334
    }, {
        "rank": 4000,
        "sales": 2.675
    }, {
        "rank": 5000,
        "sales": 2.12
    }, {
        "rank": 6000,
        "sales": 1.7333333333333334
    }, {
        "rank": 7000,
        "sales": 1.5
    }, {
        "rank": 8000,
        "sales": 1.3466666666666667
    }, {
        "rank": 9000,
        "sales": 1.26
    }, {
        "rank": 10000,
        "sales": 1.1306666666666667
    }, {
        "rank": 20000,
        "sales": 0.26666666666666666
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Grocery": [{
        "rank": 1,
        "sales": 117.72
    }, {
        "rank": 2,
        "sales": 97.82933333333334
    }, {
        "rank": 3,
        "sales": 90.16000000000001
    }, {
        "rank": 4,
        "sales": 84.24499999999999
    }, {
        "rank": 5,
        "sales": 77.554
    }, {
        "rank": 6,
        "sales": 75.57333333333332
    }, {
        "rank": 7,
        "sales": 74.09400000000001
    }, {
        "rank": 8,
        "sales": 67.53333333333333
    }, {
        "rank": 9,
        "sales": 70.04933333333334
    }, {
        "rank": 10,
        "sales": 69.39666666666668
    }, {
        "rank": 20,
        "sales": 54.46133333333333
    }, {
        "rank": 30,
        "sales": 47.689
    }, {
        "rank": 40,
        "sales": 45.153999999999996
    }, {
        "rank": 50,
        "sales": 42.3
    }, {
        "rank": 60,
        "sales": 37.86966666666667
    }, {
        "rank": 70,
        "sales": 35.496
    }, {
        "rank": 80,
        "sales": 35.784
    }, {
        "rank": 90,
        "sales": 32.333999999999996
    }, {
        "rank": 100,
        "sales": 31.955
    }, {
        "rank": 200,
        "sales": 23.712
    }, {
        "rank": 300,
        "sales": 20.375999999999998
    }, {
        "rank": 400,
        "sales": 17.567999999999998
    }, {
        "rank": 500,
        "sales": 14.687999999999999
    }, {
        "rank": 600,
        "sales": 13.734
    }, {
        "rank": 700,
        "sales": 11.143666666666666
    }, {
        "rank": 800,
        "sales": 10.754666666666667
    }, {
        "rank": 900,
        "sales": 9.936
    }, {
        "rank": 1000,
        "sales": 8.633333333333333
    }, {
        "rank": 2000,
        "sales": 5.27
    }, {
        "rank": 3000,
        "sales": 3.852
    }, {
        "rank": 4000,
        "sales": 2.788
    }, {
        "rank": 5000,
        "sales": 2.3449999999999998
    }, {
        "rank": 6000,
        "sales": 1.9973333333333334
    }, {
        "rank": 7000,
        "sales": 1.6986666666666668
    }, {
        "rank": 8000,
        "sales": 1.5336666666666665
    }, {
        "rank": 9000,
        "sales": 1.339
    }, {
        "rank": 10000,
        "sales": 1.2716666666666667
    }, {
        "rank": 20000,
        "sales": 0.3
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Health & Personal Care": [{
        "rank": 1,
        "sales": 234.36
    }, {
        "rank": 2,
        "sales": 190.082
    }, {
        "rank": 3,
        "sales": 186.084
    }, {
        "rank": 4,
        "sales": 163.0476666666667
    }, {
        "rank": 5,
        "sales": 162.46266666666668
    }, {
        "rank": 6,
        "sales": 148.20066666666668
    }, {
        "rank": 7,
        "sales": 151.22666666666666
    }, {
        "rank": 8,
        "sales": 149.03933333333333
    }, {
        "rank": 9,
        "sales": 144.71566666666666
    }, {
        "rank": 10,
        "sales": 129.23333333333332
    }, {
        "rank": 20,
        "sales": 110.45033333333335
    }, {
        "rank": 30,
        "sales": 101.05333333333333
    }, {
        "rank": 40,
        "sales": 89.046
    }, {
        "rank": 50,
        "sales": 84.55199999999999
    }, {
        "rank": 60,
        "sales": 81.92633333333333
    }, {
        "rank": 70,
        "sales": 77.062
    }, {
        "rank": 80,
        "sales": 71.482
    }, {
        "rank": 90,
        "sales": 71.22633333333333
    }, {
        "rank": 100,
        "sales": 65.348
    }, {
        "rank": 200,
        "sales": 53.301
    }, {
        "rank": 300,
        "sales": 43.015
    }, {
        "rank": 400,
        "sales": 36.839666666666666
    }, {
        "rank": 500,
        "sales": 31.966666666666665
    }, {
        "rank": 600,
        "sales": 30.775333333333332
    }, {
        "rank": 700,
        "sales": 29.066666666666666
    }, {
        "rank": 800,
        "sales": 26.39333333333333
    }, {
        "rank": 900,
        "sales": 23
    }, {
        "rank": 1000,
        "sales": 21.66433333333333
    }, {
        "rank": 2000,
        "sales": 14.455
    }, {
        "rank": 3000,
        "sales": 9.758000000000001
    }, {
        "rank": 4000,
        "sales": 7.4
    }, {
        "rank": 5000,
        "sales": 6.408
    }, {
        "rank": 6000,
        "sales": 4.9
    }, {
        "rank": 7000,
        "sales": 4.381333333333333
    }, {
        "rank": 8000,
        "sales": 3.924
    }, {
        "rank": 9000,
        "sales": 3.2933333333333334
    }, {
        "rank": 10000,
        "sales": 2.9526666666666666
    }, {
        "rank": 20000,
        "sales": 1.5623333333333334
    }, {
        "rank": 30000,
        "sales": 0.8203333333333334
    }, {
        "rank": 40000,
        "sales": 0.36666666666666664
    }, {
        "rank": 50000,
        "sales": 0
    }],
    "Jewellery": [{
        "rank": 1,
        "sales": 39.9
    }, {
        "rank": 2,
        "sales": 34.41466666666667
    }, {
        "rank": 3,
        "sales": 30.022
    }, {
        "rank": 4,
        "sales": 27.366666666666667
    }, {
        "rank": 5,
        "sales": 26.058
    }, {
        "rank": 6,
        "sales": 26.77766666666667
    }, {
        "rank": 7,
        "sales": 25.451999999999998
    }, {
        "rank": 8,
        "sales": 24.743
    }, {
        "rank": 9,
        "sales": 23.907333333333334
    }, {
        "rank": 10,
        "sales": 22.542666666666666
    }, {
        "rank": 20,
        "sales": 18.404
    }, {
        "rank": 30,
        "sales": 16.35
    }, {
        "rank": 40,
        "sales": 14.751333333333333
    }, {
        "rank": 50,
        "sales": 12.806333333333333
    }, {
        "rank": 60,
        "sales": 11.831999999999999
    }, {
        "rank": 70,
        "sales": 11.554
    }, {
        "rank": 80,
        "sales": 11.227
    }, {
        "rank": 90,
        "sales": 9.996
    }, {
        "rank": 100,
        "sales": 9.366666666666667
    }, {
        "rank": 200,
        "sales": 7.276
    }, {
        "rank": 300,
        "sales": 6.140333333333333
    }, {
        "rank": 400,
        "sales": 5.145
    }, {
        "rank": 500,
        "sales": 4.664
    }, {
        "rank": 600,
        "sales": 4.16
    }, {
        "rank": 700,
        "sales": 3.924
    }, {
        "rank": 800,
        "sales": 3.4979999999999998
    }, {
        "rank": 900,
        "sales": 3.2456666666666667
    }, {
        "rank": 1000,
        "sales": 2.981333333333333
    }, {
        "rank": 2000,
        "sales": 1.8726666666666667
    }, {
        "rank": 3000,
        "sales": 1.308
    }, {
        "rank": 4000,
        "sales": 0.8753333333333334
    }, {
        "rank": 5000,
        "sales": 0.6666666666666666
    }, {
        "rank": 6000,
        "sales": 0.525
    }, {
        "rank": 7000,
        "sales": 0.36666666666666664
    }, {
        "rank": 8000,
        "sales": 0.306
    }, {
        "rank": 9000,
        "sales": 0.245
    }, {
        "rank": 10000,
        "sales": 0.16666666666666666
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Kitchen & Home": [{
        "rank": 1,
        "sales": 181.8
    }, {
        "rank": 2,
        "sales": 161.5
    }, {
        "rank": 3,
        "sales": 159.467
    }, {
        "rank": 4,
        "sales": 139.44733333333335
    }, {
        "rank": 5,
        "sales": 142.38
    }, {
        "rank": 6,
        "sales": 131.90666666666667
    }, {
        "rank": 7,
        "sales": 125.154
    }, {
        "rank": 8,
        "sales": 125.125
    }, {
        "rank": 9,
        "sales": 123.066
    }, {
        "rank": 10,
        "sales": 114.50033333333334
    }, {
        "rank": 20,
        "sales": 102.11333333333333
    }, {
        "rank": 30,
        "sales": 87
    }, {
        "rank": 40,
        "sales": 82.28
    }, {
        "rank": 50,
        "sales": 79.695
    }, {
        "rank": 60,
        "sales": 75.74
    }, {
        "rank": 70,
        "sales": 73.86566666666667
    }, {
        "rank": 80,
        "sales": 69.685
    }, {
        "rank": 90,
        "sales": 66.023
    }, {
        "rank": 100,
        "sales": 67.032
    }, {
        "rank": 200,
        "sales": 52.61133333333333
    }, {
        "rank": 300,
        "sales": 46.440000000000005
    }, {
        "rank": 400,
        "sales": 35.326
    }, {
        "rank": 500,
        "sales": 32.5
    }, {
        "rank": 600,
        "sales": 31.382
    }, {
        "rank": 700,
        "sales": 32.00966666666667
    }, {
        "rank": 800,
        "sales": 27.20266666666667
    }, {
        "rank": 900,
        "sales": 25.166333333333334
    }, {
        "rank": 1000,
        "sales": 23.052
    }, {
        "rank": 2000,
        "sales": 15.991666666666667
    }, {
        "rank": 3000,
        "sales": 13.034666666666668
    }, {
        "rank": 4000,
        "sales": 10.404
    }, {
        "rank": 5000,
        "sales": 9.487333333333334
    }, {
        "rank": 6000,
        "sales": 7.833333333333333
    }, {
        "rank": 7000,
        "sales": 7.596
    }, {
        "rank": 8000,
        "sales": 6.592
    }, {
        "rank": 9000,
        "sales": 5.95
    }, {
        "rank": 10000,
        "sales": 5.635000000000001
    }, {
        "rank": 20000,
        "sales": 3.1973333333333334
    }, {
        "rank": 30000,
        "sales": 2.135
    }, {
        "rank": 40000,
        "sales": 1.4133333333333333
    }, {
        "rank": 50000,
        "sales": 0.909
    }, {
        "rank": 60000,
        "sales": 0.6396666666666667
    }, {
        "rank": 70000,
        "sales": 0.44633333333333336
    }, {
        "rank": 80000,
        "sales": 0.2853333333333333
    }, {
        "rank": 90000,
        "sales": 0.16666666666666666
    }, {
        "rank": 100000,
        "sales": 0
    }],
    "Large Appliances": [{
        "rank": 1,
        "sales": 26.75
    }, {
        "rank": 2,
        "sales": 22.225
    }, {
        "rank": 3,
        "sales": 19.1
    }, {
        "rank": 4,
        "sales": 19.08
    }, {
        "rank": 5,
        "sales": 18.094
    }, {
        "rank": 6,
        "sales": 16.555
    }, {
        "rank": 7,
        "sales": 15.217333333333332
    }, {
        "rank": 8,
        "sales": 14.900666666666666
    }, {
        "rank": 9,
        "sales": 13.966666666666667
    }, {
        "rank": 10,
        "sales": 14.751333333333333
    }, {
        "rank": 20,
        "sales": 11.089666666666666
    }, {
        "rank": 30,
        "sales": 9.266666666666667
    }, {
        "rank": 40,
        "sales": 8.798
    }, {
        "rank": 50,
        "sales": 8.020666666666667
    }, {
        "rank": 60,
        "sales": 7.489999999999999
    }, {
        "rank": 70,
        "sales": 6.960666666666667
    }, {
        "rank": 80,
        "sales": 6.3516666666666675
    }, {
        "rank": 90,
        "sales": 5.833333333333333
    }, {
        "rank": 100,
        "sales": 5.699333333333333
    }, {
        "rank": 200,
        "sales": 3.852
    }, {
        "rank": 300,
        "sales": 3.1246666666666667
    }, {
        "rank": 400,
        "sales": 2.496
    }, {
        "rank": 500,
        "sales": 2.1756666666666664
    }, {
        "rank": 600,
        "sales": 1.8853333333333333
    }, {
        "rank": 700,
        "sales": 1.8719999999999999
    }, {
        "rank": 800,
        "sales": 1.7803333333333333
    }, {
        "rank": 900,
        "sales": 1.5793333333333335
    }, {
        "rank": 1000,
        "sales": 1.4763333333333333
    }, {
        "rank": 2000,
        "sales": 1.0246666666666666
    }, {
        "rank": 3000,
        "sales": 0.6933333333333334
    }, {
        "rank": 4000,
        "sales": 0.5086666666666667
    }, {
        "rank": 5000,
        "sales": 0.396
    }, {
        "rank": 6000,
        "sales": 0.26666666666666666
    }, {
        "rank": 7000,
        "sales": 0.20199999999999999
    }, {
        "rank": 8000,
        "sales": 0.16666666666666666
    }, {
        "rank": 9000,
        "sales": 0
    }],
    "Lighting": [{
        "rank": 1,
        "sales": 100.88000000000001
    }, {
        "rank": 2,
        "sales": 89.67066666666666
    }, {
        "rank": 3,
        "sales": 78.68733333333333
    }, {
        "rank": 4,
        "sales": 74.95566666666667
    }, {
        "rank": 5,
        "sales": 67.9
    }, {
        "rank": 6,
        "sales": 62.014
    }, {
        "rank": 7,
        "sales": 59.908
    }, {
        "rank": 8,
        "sales": 59.29
    }, {
        "rank": 9,
        "sales": 56.135
    }, {
        "rank": 10,
        "sales": 54.349666666666664
    }, {
        "rank": 20,
        "sales": 45.432
    }, {
        "rank": 30,
        "sales": 38.54866666666667
    }, {
        "rank": 40,
        "sales": 34.195
    }, {
        "rank": 50,
        "sales": 30.06433333333333
    }, {
        "rank": 60,
        "sales": 29.220666666666666
    }, {
        "rank": 70,
        "sales": 26.316
    }, {
        "rank": 80,
        "sales": 26.244000000000003
    }, {
        "rank": 90,
        "sales": 24.38
    }, {
        "rank": 100,
        "sales": 22.995
    }, {
        "rank": 200,
        "sales": 14.345333333333334
    }, {
        "rank": 300,
        "sales": 10.334333333333332
    }, {
        "rank": 400,
        "sales": 8.772
    }, {
        "rank": 500,
        "sales": 8.208
    }, {
        "rank": 600,
        "sales": 7.037333333333334
    }, {
        "rank": 700,
        "sales": 6.444
    }, {
        "rank": 800,
        "sales": 5.333333333333333
    }, {
        "rank": 900,
        "sales": 5.026666666666667
    }, {
        "rank": 1000,
        "sales": 4.655
    }, {
        "rank": 2000,
        "sales": 2.376
    }, {
        "rank": 3000,
        "sales": 1.1786666666666668
    }, {
        "rank": 4000,
        "sales": 0.654
    }, {
        "rank": 5000,
        "sales": 0.3
    }, {
        "rank": 6000,
        "sales": 0
    }],
    "Luggage": [{
        "rank": 1,
        "sales": 70.35
    }, {
        "rank": 2,
        "sales": 59.466
    }, {
        "rank": 3,
        "sales": 51.63733333333333
    }, {
        "rank": 4,
        "sales": 48.440000000000005
    }, {
        "rank": 5,
        "sales": 43.13333333333333
    }, {
        "rank": 6,
        "sales": 42.397333333333336
    }, {
        "rank": 7,
        "sales": 42.292
    }, {
        "rank": 8,
        "sales": 40.51166666666666
    }, {
        "rank": 9,
        "sales": 38.949333333333335
    }, {
        "rank": 10,
        "sales": 37.568666666666665
    }, {
        "rank": 20,
        "sales": 27.336000000000002
    }, {
        "rank": 30,
        "sales": 24.09733333333333
    }, {
        "rank": 40,
        "sales": 21.270666666666667
    }, {
        "rank": 50,
        "sales": 18.281
    }, {
        "rank": 60,
        "sales": 16.566666666666666
    }, {
        "rank": 70,
        "sales": 15.639999999999999
    }, {
        "rank": 80,
        "sales": 15.300999999999998
    }, {
        "rank": 90,
        "sales": 13.567666666666666
    }, {
        "rank": 100,
        "sales": 12.666666666666666
    }, {
        "rank": 200,
        "sales": 8.282
    }, {
        "rank": 300,
        "sales": 6.48
    }, {
        "rank": 400,
        "sales": 4.8533333333333335
    }, {
        "rank": 500,
        "sales": 3.876
    }, {
        "rank": 600,
        "sales": 3.488
    }, {
        "rank": 700,
        "sales": 3.0156666666666667
    }, {
        "rank": 800,
        "sales": 2.652333333333333
    }, {
        "rank": 900,
        "sales": 2.2826666666666666
    }, {
        "rank": 1000,
        "sales": 1.957
    }, {
        "rank": 2000,
        "sales": 0.5723333333333334
    }, {
        "rank": 3000,
        "sales": 0.16666666666666666
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Musical Instruments": [{
        "rank": 1,
        "sales": 65.4
    }, {
        "rank": 2,
        "sales": 52.324
    }, {
        "rank": 3,
        "sales": 46.716
    }, {
        "rank": 4,
        "sales": 45.756
    }, {
        "rank": 5,
        "sales": 40.63
    }, {
        "rank": 6,
        "sales": 37.8
    }, {
        "rank": 7,
        "sales": 36.856
    }, {
        "rank": 8,
        "sales": 35.775333333333336
    }, {
        "rank": 9,
        "sales": 35.51
    }, {
        "rank": 10,
        "sales": 34.668
    }, {
        "rank": 20,
        "sales": 25.766666666666666
    }, {
        "rank": 30,
        "sales": 22.233333333333334
    }, {
        "rank": 40,
        "sales": 20.86
    }, {
        "rank": 50,
        "sales": 19.040000000000003
    }, {
        "rank": 60,
        "sales": 18.275666666666666
    }, {
        "rank": 70,
        "sales": 16.92
    }, {
        "rank": 80,
        "sales": 15.912
    }, {
        "rank": 90,
        "sales": 14.908666666666667
    }, {
        "rank": 100,
        "sales": 13.664666666666667
    }, {
        "rank": 200,
        "sales": 9.523
    }, {
        "rank": 300,
        "sales": 6.566666666666666
    }, {
        "rank": 400,
        "sales": 5.521333333333333
    }, {
        "rank": 500,
        "sales": 4.760000000000001
    }, {
        "rank": 600,
        "sales": 4.114
    }, {
        "rank": 700,
        "sales": 3.602333333333333
    }, {
        "rank": 800,
        "sales": 3.2
    }, {
        "rank": 900,
        "sales": 3.103
    }, {
        "rank": 1000,
        "sales": 2.746666666666667
    }, {
        "rank": 2000,
        "sales": 1.4813333333333332
    }, {
        "rank": 3000,
        "sales": 1.09
    }, {
        "rank": 4000,
        "sales": 0.6586666666666667
    }, {
        "rank": 5000,
        "sales": 0.43333333333333335
    }, {
        "rank": 6000,
        "sales": 0.2693333333333333
    }, {
        "rank": 7000,
        "sales": 0.16666666666666666
    }, {
        "rank": 8000,
        "sales": 0
    }],
    "Office Products": [{
        "rank": 1,
        "sales": 164.3
    }, {
        "rank": 2,
        "sales": 139.15200000000002
    }, {
        "rank": 3,
        "sales": 130.647
    }, {
        "rank": 4,
        "sales": 114.13333333333334
    }, {
        "rank": 5,
        "sales": 111.41166666666666
    }, {
        "rank": 6,
        "sales": 111.636
    }, {
        "rank": 7,
        "sales": 106.39366666666666
    }, {
        "rank": 8,
        "sales": 98.94866666666667
    }, {
        "rank": 9,
        "sales": 97.78999999999999
    }, {
        "rank": 10,
        "sales": 91.47233333333334
    }, {
        "rank": 20,
        "sales": 79.00533333333333
    }, {
        "rank": 30,
        "sales": 71.172
    }, {
        "rank": 40,
        "sales": 61.86866666666666
    }, {
        "rank": 50,
        "sales": 59.11266666666667
    }, {
        "rank": 60,
        "sales": 56.519999999999996
    }, {
        "rank": 70,
        "sales": 51.01933333333333
    }, {
        "rank": 80,
        "sales": 48.11
    }, {
        "rank": 90,
        "sales": 49.19533333333333
    }, {
        "rank": 100,
        "sales": 43.766666666666666
    }, {
        "rank": 200,
        "sales": 32.5
    }, {
        "rank": 300,
        "sales": 28.747333333333334
    }, {
        "rank": 400,
        "sales": 23.2
    }, {
        "rank": 500,
        "sales": 20.57
    }, {
        "rank": 600,
        "sales": 19.153000000000002
    }, {
        "rank": 700,
        "sales": 18
    }, {
        "rank": 800,
        "sales": 15.789666666666667
    }, {
        "rank": 900,
        "sales": 15.175333333333333
    }, {
        "rank": 1000,
        "sales": 15.012
    }, {
        "rank": 2000,
        "sales": 8.203333333333333
    }, {
        "rank": 3000,
        "sales": 5.555000000000001
    }, {
        "rank": 4000,
        "sales": 4.381333333333333
    }, {
        "rank": 5000,
        "sales": 3.492
    }, {
        "rank": 6000,
        "sales": 2.853333333333333
    }, {
        "rank": 7000,
        "sales": 2.322666666666667
    }, {
        "rank": 8000,
        "sales": 2.071
    }, {
        "rank": 9000,
        "sales": 1.8530000000000002
    }, {
        "rank": 10000,
        "sales": 1.605
    }, {
        "rank": 20000,
        "sales": 0.43333333333333335
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "PC & Video Games": [{
        "rank": 1,
        "sales": 141.75
    }, {
        "rank": 2,
        "sales": 121.01700000000001
    }, {
        "rank": 3,
        "sales": 109.296
    }, {
        "rank": 4,
        "sales": 96.85866666666668
    }, {
        "rank": 5,
        "sales": 88.876
    }, {
        "rank": 6,
        "sales": 86.485
    }, {
        "rank": 7,
        "sales": 78.43333333333334
    }, {
        "rank": 8,
        "sales": 81.144
    }, {
        "rank": 9,
        "sales": 76.60266666666666
    }, {
        "rank": 10,
        "sales": 73.91733333333333
    }, {
        "rank": 20,
        "sales": 57.522666666666666
    }, {
        "rank": 30,
        "sales": 48.90133333333333
    }, {
        "rank": 40,
        "sales": 42.36266666666667
    }, {
        "rank": 50,
        "sales": 39.744
    }, {
        "rank": 60,
        "sales": 35.757333333333335
    }, {
        "rank": 70,
        "sales": 32.17033333333333
    }, {
        "rank": 80,
        "sales": 29.75
    }, {
        "rank": 90,
        "sales": 29.829666666666665
    }, {
        "rank": 100,
        "sales": 26.35
    }, {
        "rank": 200,
        "sales": 17.304
    }, {
        "rank": 300,
        "sales": 12.4
    }, {
        "rank": 400,
        "sales": 9.956666666666667
    }, {
        "rank": 500,
        "sales": 8.132
    }, {
        "rank": 600,
        "sales": 6.669666666666667
    }, {
        "rank": 700,
        "sales": 5.390333333333333
    }, {
        "rank": 800,
        "sales": 4.600666666666667
    }, {
        "rank": 900,
        "sales": 4.214666666666667
    }, {
        "rank": 1000,
        "sales": 3.7060000000000004
    }, {
        "rank": 2000,
        "sales": 1.645
    }, {
        "rank": 3000,
        "sales": 1.1093333333333333
    }, {
        "rank": 4000,
        "sales": 0.6586666666666667
    }, {
        "rank": 5000,
        "sales": 0.3703333333333333
    }, {
        "rank": 6000,
        "sales": 0.2
    }, {
        "rank": 7000,
        "sales": 0
    }],
    "Pet Supplies": [{
        "rank": 1,
        "sales": 134.64
    }, {
        "rank": 2,
        "sales": 112.86666666666666
    }, {
        "rank": 3,
        "sales": 105.43766666666667
    }, {
        "rank": 4,
        "sales": 99.99499999999999
    }, {
        "rank": 5,
        "sales": 97.95466666666667
    }, {
        "rank": 6,
        "sales": 85.6
    }, {
        "rank": 7,
        "sales": 83.708
    }, {
        "rank": 8,
        "sales": 83.055
    }, {
        "rank": 9,
        "sales": 78.795
    }, {
        "rank": 10,
        "sales": 77.16799999999999
    }, {
        "rank": 20,
        "sales": 65.43633333333334
    }, {
        "rank": 30,
        "sales": 56.664
    }, {
        "rank": 40,
        "sales": 48.348
    }, {
        "rank": 50,
        "sales": 44.94233333333333
    }, {
        "rank": 60,
        "sales": 43.919999999999995
    }, {
        "rank": 70,
        "sales": 38.266666666666666
    }, {
        "rank": 80,
        "sales": 36.958
    }, {
        "rank": 90,
        "sales": 36.534666666666666
    }, {
        "rank": 100,
        "sales": 33.92133333333333
    }, {
        "rank": 200,
        "sales": 25.668
    }, {
        "rank": 300,
        "sales": 19.466666666666665
    }, {
        "rank": 400,
        "sales": 17.441
    }, {
        "rank": 500,
        "sales": 14.075999999999999
    }, {
        "rank": 600,
        "sales": 13.144
    }, {
        "rank": 700,
        "sales": 11.379333333333333
    }, {
        "rank": 800,
        "sales": 10.402999999999999
    }, {
        "rank": 900,
        "sales": 9.662333333333333
    }, {
        "rank": 1000,
        "sales": 9.325333333333333
    }, {
        "rank": 2000,
        "sales": 5.123333333333333
    }, {
        "rank": 3000,
        "sales": 3.296
    }, {
        "rank": 4000,
        "sales": 2.4
    }, {
        "rank": 5000,
        "sales": 1.9973333333333334
    }, {
        "rank": 6000,
        "sales": 1.692
    }, {
        "rank": 7000,
        "sales": 1.417
    }, {
        "rank": 8000,
        "sales": 1.155
    }, {
        "rank": 9000,
        "sales": 0.9986666666666667
    }, {
        "rank": 10000,
        "sales": 0.7666666666666667
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Shoes & Bags": [{
        "rank": 1,
        "sales": 84
    }, {
        "rank": 2,
        "sales": 70.864
    }, {
        "rank": 3,
        "sales": 62.63333333333333
    }, {
        "rank": 4,
        "sales": 58.43333333333333
    }, {
        "rank": 5,
        "sales": 59.13533333333333
    }, {
        "rank": 6,
        "sales": 53.260666666666665
    }, {
        "rank": 7,
        "sales": 54.72
    }, {
        "rank": 8,
        "sales": 51.345
    }, {
        "rank": 9,
        "sales": 47.36666666666667
    }, {
        "rank": 10,
        "sales": 49.22
    }, {
        "rank": 20,
        "sales": 39.856
    }, {
        "rank": 30,
        "sales": 35.748000000000005
    }, {
        "rank": 40,
        "sales": 31.57
    }, {
        "rank": 50,
        "sales": 29.746
    }, {
        "rank": 60,
        "sales": 26.81433333333333
    }, {
        "rank": 70,
        "sales": 24.566666666666666
    }, {
        "rank": 80,
        "sales": 24.033333333333335
    }, {
        "rank": 90,
        "sales": 22.969
    }, {
        "rank": 100,
        "sales": 22.862333333333332
    }, {
        "rank": 200,
        "sales": 17.028000000000002
    }, {
        "rank": 300,
        "sales": 13.674000000000001
    }, {
        "rank": 400,
        "sales": 11.695333333333334
    }, {
        "rank": 500,
        "sales": 10.282
    }, {
        "rank": 600,
        "sales": 8.753333333333334
    }, {
        "rank": 700,
        "sales": 7.833333333333333
    }, {
        "rank": 800,
        "sales": 7.704
    }, {
        "rank": 900,
        "sales": 6.86
    }, {
        "rank": 1000,
        "sales": 6.335
    }, {
        "rank": 2000,
        "sales": 3.2616666666666663
    }, {
        "rank": 3000,
        "sales": 1.9863333333333335
    }, {
        "rank": 4000,
        "sales": 1.6099999999999999
    }, {
        "rank": 5000,
        "sales": 1.2
    }, {
        "rank": 6000,
        "sales": 1.015
    }, {
        "rank": 7000,
        "sales": 0.77
    }, {
        "rank": 8000,
        "sales": 0.5666666666666667
    }, {
        "rank": 9000,
        "sales": 0.45066666666666666
    }, {
        "rank": 10000,
        "sales": 0.3333333333333333
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Software": [{
        "rank": 1,
        "sales": 72.08
    }, {
        "rank": 2,
        "sales": 55.854
    }, {
        "rank": 3,
        "sales": 44.339000000000006
    }, {
        "rank": 4,
        "sales": 40.77466666666667
    }, {
        "rank": 5,
        "sales": 37.605000000000004
    }, {
        "rank": 6,
        "sales": 32.690666666666665
    }, {
        "rank": 7,
        "sales": 30.669333333333334
    }, {
        "rank": 8,
        "sales": 27.90666666666667
    }, {
        "rank": 9,
        "sales": 26.82133333333333
    }, {
        "rank": 10,
        "sales": 24.004
    }, {
        "rank": 20,
        "sales": 14.96
    }, {
        "rank": 30,
        "sales": 10.885333333333334
    }, {
        "rank": 40,
        "sales": 8.216
    }, {
        "rank": 50,
        "sales": 6.536666666666666
    }, {
        "rank": 60,
        "sales": 5.180000000000001
    }, {
        "rank": 70,
        "sales": 4.5296666666666665
    }, {
        "rank": 80,
        "sales": 3.602333333333333
    }, {
        "rank": 90,
        "sales": 2.7199999999999998
    }, {
        "rank": 100,
        "sales": 2.332
    }, {
        "rank": 200,
        "sales": 0.5333333333333333
    }, {
        "rank": 300,
        "sales": 0
    }],
    "Sports & Outdoors": [{
        "rank": 1,
        "sales": 118.17
    }, {
        "rank": 2,
        "sales": 110.70766666666667
    }, {
        "rank": 3,
        "sales": 93.06666666666666
    }, {
        "rank": 4,
        "sales": 88.97800000000001
    }, {
        "rank": 5,
        "sales": 90.32466666666666
    }, {
        "rank": 6,
        "sales": 85.716
    }, {
        "rank": 7,
        "sales": 77.99600000000001
    }, {
        "rank": 8,
        "sales": 76.22
    }, {
        "rank": 9,
        "sales": 76.17866666666667
    }, {
        "rank": 10,
        "sales": 70.66633333333333
    }, {
        "rank": 20,
        "sales": 58.166666666666664
    }, {
        "rank": 30,
        "sales": 52.28433333333333
    }, {
        "rank": 40,
        "sales": 48.382
    }, {
        "rank": 50,
        "sales": 45.56033333333333
    }, {
        "rank": 60,
        "sales": 41.7
    }, {
        "rank": 70,
        "sales": 43.164
    }, {
        "rank": 80,
        "sales": 40.10333333333333
    }, {
        "rank": 90,
        "sales": 36.663000000000004
    }, {
        "rank": 100,
        "sales": 35.31633333333333
    }, {
        "rank": 200,
        "sales": 28.105
    }, {
        "rank": 300,
        "sales": 23.4
    }, {
        "rank": 400,
        "sales": 20.256666666666668
    }, {
        "rank": 500,
        "sales": 18.162333333333333
    }, {
        "rank": 600,
        "sales": 17.476333333333333
    }, {
        "rank": 700,
        "sales": 16.05933333333333
    }, {
        "rank": 800,
        "sales": 14.074666666666667
    }, {
        "rank": 900,
        "sales": 13.002666666666666
    }, {
        "rank": 1000,
        "sales": 11.2
    }, {
        "rank": 2000,
        "sales": 6.8340000000000005
    }, {
        "rank": 3000,
        "sales": 5.522666666666667
    }, {
        "rank": 4000,
        "sales": 4.208666666666667
    }, {
        "rank": 5000,
        "sales": 3.3920000000000003
    }, {
        "rank": 6000,
        "sales": 2.916
    }, {
        "rank": 7000,
        "sales": 2.461
    }, {
        "rank": 8000,
        "sales": 2.1
    }, {
        "rank": 9000,
        "sales": 1.944
    }, {
        "rank": 10000,
        "sales": 1.6833333333333333
    }, {
        "rank": 20000,
        "sales": 0.728
    }, {
        "rank": 30000,
        "sales": 0.23333333333333334
    }, {
        "rank": 40000,
        "sales": 0
    }],
    "Toys & Games": [{
        "rank": 1,
        "sales": 132.84
    }, {
        "rank": 2,
        "sales": 115.704
    }, {
        "rank": 3,
        "sales": 107.18333333333334
    }, {
        "rank": 4,
        "sales": 99.72
    }, {
        "rank": 5,
        "sales": 91.312
    }, {
        "rank": 6,
        "sales": 90.93599999999999
    }, {
        "rank": 7,
        "sales": 84.44800000000001
    }, {
        "rank": 8,
        "sales": 79.45333333333333
    }, {
        "rank": 9,
        "sales": 83.31233333333333
    }, {
        "rank": 10,
        "sales": 81.205
    }, {
        "rank": 20,
        "sales": 62.85566666666667
    }, {
        "rank": 30,
        "sales": 57.824
    }, {
        "rank": 40,
        "sales": 51.1
    }, {
        "rank": 50,
        "sales": 49.67733333333333
    }, {
        "rank": 60,
        "sales": 46.452999999999996
    }, {
        "rank": 70,
        "sales": 45.50933333333333
    }, {
        "rank": 80,
        "sales": 44.352
    }, {
        "rank": 90,
        "sales": 41.440000000000005
    }, {
        "rank": 100,
        "sales": 38.06666666666667
    }, {
        "rank": 200,
        "sales": 32.11866666666666
    }, {
        "rank": 300,
        "sales": 26.46466666666667
    }, {
        "rank": 400,
        "sales": 22.388333333333332
    }, {
        "rank": 500,
        "sales": 20.4
    }, {
        "rank": 600,
        "sales": 19.19
    }, {
        "rank": 700,
        "sales": 18.512
    }, {
        "rank": 800,
        "sales": 16.4
    }, {
        "rank": 900,
        "sales": 15.352
    }, {
        "rank": 1000,
        "sales": 15.3
    }, {
        "rank": 2000,
        "sales": 9.044
    }, {
        "rank": 3000,
        "sales": 7.63
    }, {
        "rank": 4000,
        "sales": 5.886
    }, {
        "rank": 5000,
        "sales": 4.610666666666666
    }, {
        "rank": 6000,
        "sales": 3.7666666666666666
    }, {
        "rank": 7000,
        "sales": 3.2993333333333337
    }, {
        "rank": 8000,
        "sales": 3.01
    }, {
        "rank": 9000,
        "sales": 2.566666666666667
    }, {
        "rank": 10000,
        "sales": 2.356666666666667
    }, {
        "rank": 20000,
        "sales": 1.284
    }, {
        "rank": 30000,
        "sales": 0.6523333333333333
    }, {
        "rank": 40000,
        "sales": 0.3
    }, {
        "rank": 50000,
        "sales": 0
    }],
    "Watches": [{
        "rank": 1,
        "sales": 32
    }, {
        "rank": 2,
        "sales": 28.908
    }, {
        "rank": 3,
        "sales": 26.087333333333333
    }, {
        "rank": 4,
        "sales": 22.66
    }, {
        "rank": 5,
        "sales": 20.978
    }, {
        "rank": 6,
        "sales": 19.822
    }, {
        "rank": 7,
        "sales": 18.5
    }, {
        "rank": 8,
        "sales": 18.054
    }, {
        "rank": 9,
        "sales": 17.34
    }, {
        "rank": 10,
        "sales": 17.548000000000002
    }, {
        "rank": 20,
        "sales": 13.752
    }, {
        "rank": 30,
        "sales": 11.34
    }, {
        "rank": 40,
        "sales": 10.07
    }, {
        "rank": 50,
        "sales": 9.080666666666668
    }, {
        "rank": 60,
        "sales": 8.381666666666666
    }, {
        "rank": 70,
        "sales": 7.412000000000001
    }, {
        "rank": 80,
        "sales": 7.375666666666667
    }, {
        "rank": 90,
        "sales": 6.333333333333333
    }, {
        "rank": 100,
        "sales": 6.086
    }, {
        "rank": 200,
        "sales": 4.101666666666667
    }, {
        "rank": 300,
        "sales": 3.1246666666666667
    }, {
        "rank": 400,
        "sales": 2.3459999999999996
    }, {
        "rank": 500,
        "sales": 2.03
    }, {
        "rank": 600,
        "sales": 1.8530000000000002
    }, {
        "rank": 700,
        "sales": 1.635
    }, {
        "rank": 800,
        "sales": 1.4486666666666668
    }, {
        "rank": 900,
        "sales": 1.2950000000000002
    }, {
        "rank": 1000,
        "sales": 1.2013333333333334
    }, {
        "rank": 2000,
        "sales": 0.49466666666666664
    }, {
        "rank": 3000,
        "sales": 0.2
    }, {
        "rank": 4000,
        "sales": 0
    }]
},
"amazon.fr": {
    "Animalerie": [{
        "rank": 1,
        "sales": 22
    }, {
        "rank": 2,
        "sales": 21.146
    }, {
        "rank": 3,
        "sales": 18.685333333333332
    }, {
        "rank": 4,
        "sales": 17.645333333333333
    }, {
        "rank": 5,
        "sales": 16.233333333333334
    }, {
        "rank": 6,
        "sales": 16.727666666666668
    }, {
        "rank": 7,
        "sales": 15.284666666666668
    }, {
        "rank": 8,
        "sales": 15.581999999999999
    }, {
        "rank": 9,
        "sales": 14.620000000000001
    }, {
        "rank": 10,
        "sales": 15.120000000000001
    }, {
        "rank": 20,
        "sales": 12.804333333333334
    }, {
        "rank": 30,
        "sales": 11.375
    }, {
        "rank": 40,
        "sales": 10.670666666666667
    }, {
        "rank": 50,
        "sales": 9.595
    }, {
        "rank": 60,
        "sales": 9.394666666666666
    }, {
        "rank": 70,
        "sales": 9.360000000000001
    }, {
        "rank": 80,
        "sales": 9.083333333333334
    }, {
        "rank": 90,
        "sales": 8.066666666666666
    }, {
        "rank": 100,
        "sales": 8.034
    }, {
        "rank": 200,
        "sales": 6.426
    }, {
        "rank": 300,
        "sales": 5.83
    }, {
        "rank": 400,
        "sales": 5.047
    }, {
        "rank": 500,
        "sales": 4.284000000000001
    }, {
        "rank": 600,
        "sales": 3.3526666666666665
    }, {
        "rank": 700,
        "sales": 2.7199999999999998
    }, {
        "rank": 800,
        "sales": 2.485
    }, {
        "rank": 900,
        "sales": 2.226
    }, {
        "rank": 1000,
        "sales": 1.976
    }, {
        "rank": 2000,
        "sales": 0.8203333333333334
    }, {
        "rank": 3000,
        "sales": 0.3333333333333333
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Auto et Moto": [{
        "rank": 1,
        "sales": 32
    }, {
        "rank": 2,
        "sales": 29.962666666666667
    }, {
        "rank": 3,
        "sales": 27.998333333333335
    }, {
        "rank": 4,
        "sales": 24.980666666666664
    }, {
        "rank": 5,
        "sales": 24.85
    }, {
        "rank": 6,
        "sales": 24.624000000000002
    }, {
        "rank": 7,
        "sales": 23.390666666666668
    }, {
        "rank": 8,
        "sales": 21.681333333333335
    }, {
        "rank": 9,
        "sales": 22.608
    }, {
        "rank": 10,
        "sales": 21.080666666666666
    }, {
        "rank": 20,
        "sales": 17.466666666666665
    }, {
        "rank": 30,
        "sales": 16.308333333333334
    }, {
        "rank": 40,
        "sales": 15.322666666666667
    }, {
        "rank": 50,
        "sales": 15.151
    }, {
        "rank": 60,
        "sales": 14.292
    }, {
        "rank": 70,
        "sales": 12.827
    }, {
        "rank": 80,
        "sales": 12.967333333333332
    }, {
        "rank": 90,
        "sales": 12.78
    }, {
        "rank": 100,
        "sales": 11.696
    }, {
        "rank": 200,
        "sales": 7.349333333333333
    }, {
        "rank": 300,
        "sales": 6.984
    }, {
        "rank": 400,
        "sales": 6.624
    }, {
        "rank": 500,
        "sales": 6.2540000000000004
    }, {
        "rank": 600,
        "sales": 5.928
    }, {
        "rank": 700,
        "sales": 5.533333333333333
    }, {
        "rank": 800,
        "sales": 5.4
    }, {
        "rank": 900,
        "sales": 5.582666666666666
    }, {
        "rank": 1000,
        "sales": 5.321666666666667
    }, {
        "rank": 2000,
        "sales": 3
    }, {
        "rank": 3000,
        "sales": 2.3459999999999996
    }, {
        "rank": 4000,
        "sales": 1.8853333333333333
    }, {
        "rank": 5000,
        "sales": 1.6606666666666667
    }, {
        "rank": 6000,
        "sales": 1.4266666666666665
    }, {
        "rank": 7000,
        "sales": 1.1446666666666667
    }, {
        "rank": 8000,
        "sales": 1.02
    }, {
        "rank": 9000,
        "sales": 0.9186666666666666
    }, {
        "rank": 10000,
        "sales": 0.7666666666666667
    }, {
        "rank": 20000,
        "sales": 0.26666666666666666
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Bagages": [{
        "rank": 1,
        "sales": 31.32
    }, {
        "rank": 2,
        "sales": 24.766666666666666
    }, {
        "rank": 3,
        "sales": 22.433333333333334
    }, {
        "rank": 4,
        "sales": 22.291666666666668
    }, {
        "rank": 5,
        "sales": 20.65
    }, {
        "rank": 6,
        "sales": 19.074
    }, {
        "rank": 7,
        "sales": 19.009333333333334
    }, {
        "rank": 8,
        "sales": 17.612000000000002
    }, {
        "rank": 9,
        "sales": 18.036
    }, {
        "rank": 10,
        "sales": 17.334
    }, {
        "rank": 20,
        "sales": 13.981333333333334
    }, {
        "rank": 30,
        "sales": 11.514000000000001
    }, {
        "rank": 40,
        "sales": 10.472000000000001
    }, {
        "rank": 50,
        "sales": 9.716333333333333
    }, {
        "rank": 60,
        "sales": 9.504
    }, {
        "rank": 70,
        "sales": 9.010666666666667
    }, {
        "rank": 80,
        "sales": 7.878
    }, {
        "rank": 90,
        "sales": 7.656333333333333
    }, {
        "rank": 100,
        "sales": 7.739
    }, {
        "rank": 200,
        "sales": 5.066666666666666
    }, {
        "rank": 300,
        "sales": 4.229333333333333
    }, {
        "rank": 400,
        "sales": 3.6746666666666665
    }, {
        "rank": 500,
        "sales": 3.325
    }, {
        "rank": 600,
        "sales": 3.0316666666666667
    }, {
        "rank": 700,
        "sales": 2.720666666666667
    }, {
        "rank": 800,
        "sales": 2.356666666666667
    }, {
        "rank": 900,
        "sales": 2.3253333333333335
    }, {
        "rank": 1000,
        "sales": 1.9863333333333335
    }, {
        "rank": 2000,
        "sales": 1.1520000000000001
    }, {
        "rank": 3000,
        "sales": 0.7200000000000001
    }, {
        "rank": 4000,
        "sales": 0.49
    }, {
        "rank": 5000,
        "sales": 0.324
    }, {
        "rank": 6000,
        "sales": 0.2
    }, {
        "rank": 7000,
        "sales": 0
    }],
    "Beauté et Parfum": [{
        "rank": 1,
        "sales": 68.64
    }, {
        "rank": 2,
        "sales": 59.78
    }, {
        "rank": 3,
        "sales": 56.124
    }, {
        "rank": 4,
        "sales": 50.50933333333333
    }, {
        "rank": 5,
        "sales": 48.76
    }, {
        "rank": 6,
        "sales": 46.60466666666667
    }, {
        "rank": 7,
        "sales": 45.648
    }, {
        "rank": 8,
        "sales": 42.875
    }, {
        "rank": 9,
        "sales": 41.580000000000005
    }, {
        "rank": 10,
        "sales": 40.04
    }, {
        "rank": 20,
        "sales": 31.949666666666666
    }, {
        "rank": 30,
        "sales": 30.204
    }, {
        "rank": 40,
        "sales": 25.466666666666665
    }, {
        "rank": 50,
        "sales": 25.287666666666667
    }, {
        "rank": 60,
        "sales": 23.053333333333335
    }, {
        "rank": 70,
        "sales": 22.470000000000002
    }, {
        "rank": 80,
        "sales": 21.16466666666667
    }, {
        "rank": 90,
        "sales": 20.628
    }, {
        "rank": 100,
        "sales": 19.066666666666666
    }, {
        "rank": 200,
        "sales": 13.674000000000001
    }, {
        "rank": 300,
        "sales": 9.498666666666667
    }, {
        "rank": 400,
        "sales": 7.383
    }, {
        "rank": 500,
        "sales": 6.4
    }, {
        "rank": 600,
        "sales": 6
    }, {
        "rank": 700,
        "sales": 5.813999999999999
    }, {
        "rank": 800,
        "sales": 5.867999999999999
    }, {
        "rank": 900,
        "sales": 5.356
    }, {
        "rank": 1000,
        "sales": 5.066
    }, {
        "rank": 2000,
        "sales": 3.06
    }, {
        "rank": 3000,
        "sales": 1.9666666666666666
    }, {
        "rank": 4000,
        "sales": 1.476
    }, {
        "rank": 5000,
        "sales": 1.0246666666666666
    }, {
        "rank": 6000,
        "sales": 0.721
    }, {
        "rank": 7000,
        "sales": 0.5546666666666666
    }, {
        "rank": 8000,
        "sales": 0.374
    }, {
        "rank": 9000,
        "sales": 0.272
    }, {
        "rank": 10000,
        "sales": 0.2
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Bébés & Puériculture": [{
        "rank": 1,
        "sales": 0
    }],
    "Bijoux": [{
        "rank": 1,
        "sales": 22.88
    }, {
        "rank": 2,
        "sales": 21.412
    }, {
        "rank": 3,
        "sales": 19.968
    }, {
        "rank": 4,
        "sales": 19.240000000000002
    }, {
        "rank": 5,
        "sales": 19.044666666666668
    }, {
        "rank": 6,
        "sales": 18.234666666666666
    }, {
        "rank": 7,
        "sales": 17.33833333333333
    }, {
        "rank": 8,
        "sales": 17.00166666666667
    }, {
        "rank": 9,
        "sales": 17.395
    }, {
        "rank": 10,
        "sales": 17.476666666666667
    }, {
        "rank": 20,
        "sales": 15.392
    }, {
        "rank": 30,
        "sales": 14.178666666666667
    }, {
        "rank": 40,
        "sales": 11.844666666666665
    }, {
        "rank": 50,
        "sales": 10.26
    }, {
        "rank": 60,
        "sales": 8.854333333333333
    }, {
        "rank": 70,
        "sales": 8.282
    }, {
        "rank": 80,
        "sales": 8.085
    }, {
        "rank": 90,
        "sales": 7.592
    }, {
        "rank": 100,
        "sales": 6.936000000000001
    }, {
        "rank": 200,
        "sales": 4.848
    }, {
        "rank": 300,
        "sales": 4.876
    }, {
        "rank": 400,
        "sales": 4.77
    }, {
        "rank": 500,
        "sales": 4.708
    }, {
        "rank": 600,
        "sales": 4.680000000000001
    }, {
        "rank": 700,
        "sales": 4.48
    }, {
        "rank": 800,
        "sales": 4.452
    }, {
        "rank": 900,
        "sales": 4.208333333333333
    }, {
        "rank": 1000,
        "sales": 4.174666666666666
    }, {
        "rank": 2000,
        "sales": 2.9
    }, {
        "rank": 3000,
        "sales": 2.781
    }, {
        "rank": 4000,
        "sales": 2.6599999999999997
    }, {
        "rank": 5000,
        "sales": 2.506333333333333
    }, {
        "rank": 6000,
        "sales": 2.556
    }, {
        "rank": 7000,
        "sales": 2.3573333333333335
    }, {
        "rank": 8000,
        "sales": 2.3449999999999998
    }, {
        "rank": 9000,
        "sales": 2.253333333333333
    }, {
        "rank": 10000,
        "sales": 2.1420000000000003
    }, {
        "rank": 20000,
        "sales": 1.8893333333333333
    }, {
        "rank": 30000,
        "sales": 1.6099999999999999
    }, {
        "rank": 40000,
        "sales": 1.4076666666666666
    }, {
        "rank": 50000,
        "sales": 1.3679999999999999
    }, {
        "rank": 60000,
        "sales": 1.2016666666666667
    }, {
        "rank": 70000,
        "sales": 1.166
    }, {
        "rank": 80000,
        "sales": 1.1159999999999999
    }, {
        "rank": 90000,
        "sales": 1.07
    }, {
        "rank": 100000,
        "sales": 0.9986666666666667
    }, {
        "rank": 200000,
        "sales": 0.648
    }, {
        "rank": 300000,
        "sales": 0.504
    }, {
        "rank": 400000,
        "sales": 0.37766666666666665
    }, {
        "rank": 500000,
        "sales": 0.306
    }, {
        "rank": 600000,
        "sales": 0.23333333333333334
    }, {
        "rank": 700000,
        "sales": 0.218
    }, {
        "rank": 800000,
        "sales": 0.16666666666666666
    }, {
        "rank": 900000,
        "sales": 0
    }],
    "Bricolage": [{
        "rank": 1,
        "sales": 43.43
    }, {
        "rank": 2,
        "sales": 38.86533333333333
    }, {
        "rank": 3,
        "sales": 36.22666666666667
    }, {
        "rank": 4,
        "sales": 33.16166666666667
    }, {
        "rank": 5,
        "sales": 32.9
    }, {
        "rank": 6,
        "sales": 32.544000000000004
    }, {
        "rank": 7,
        "sales": 30.59
    }, {
        "rank": 8,
        "sales": 28.266666666666666
    }, {
        "rank": 9,
        "sales": 29.185333333333332
    }, {
        "rank": 10,
        "sales": 29.016000000000002
    }, {
        "rank": 20,
        "sales": 24.360333333333333
    }, {
        "rank": 30,
        "sales": 20.5
    }, {
        "rank": 40,
        "sales": 19.156333333333336
    }, {
        "rank": 50,
        "sales": 18.725
    }, {
        "rank": 60,
        "sales": 18.457333333333334
    }, {
        "rank": 70,
        "sales": 16.49
    }, {
        "rank": 80,
        "sales": 15.999333333333334
    }, {
        "rank": 90,
        "sales": 15.3
    }, {
        "rank": 100,
        "sales": 15.514999999999999
    }, {
        "rank": 200,
        "sales": 8.961
    }, {
        "rank": 300,
        "sales": 7.349333333333333
    }, {
        "rank": 400,
        "sales": 7.085
    }, {
        "rank": 500,
        "sales": 6.324
    }, {
        "rank": 600,
        "sales": 6.1113333333333335
    }, {
        "rank": 700,
        "sales": 6.042
    }, {
        "rank": 800,
        "sales": 5.8100000000000005
    }, {
        "rank": 900,
        "sales": 5.796
    }, {
        "rank": 1000,
        "sales": 5.547333333333333
    }, {
        "rank": 2000,
        "sales": 4.104
    }, {
        "rank": 3000,
        "sales": 3.0853333333333333
    }, {
        "rank": 4000,
        "sales": 2.844
    }, {
        "rank": 5000,
        "sales": 2.5439999999999996
    }, {
        "rank": 6000,
        "sales": 2.222
    }, {
        "rank": 7000,
        "sales": 2.252666666666667
    }, {
        "rank": 8000,
        "sales": 1.972
    }, {
        "rank": 9000,
        "sales": 1.9066666666666667
    }, {
        "rank": 10000,
        "sales": 1.8026666666666666
    }, {
        "rank": 20000,
        "sales": 1.26
    }, {
        "rank": 30000,
        "sales": 0.8926666666666667
    }, {
        "rank": 40000,
        "sales": 0.6933333333333334
    }, {
        "rank": 50000,
        "sales": 0.535
    }, {
        "rank": 60000,
        "sales": 0.42400000000000004
    }, {
        "rank": 70000,
        "sales": 0.3433333333333334
    }, {
        "rank": 80000,
        "sales": 0.2853333333333333
    }, {
        "rank": 90000,
        "sales": 0.25433333333333336
    }, {
        "rank": 100000,
        "sales": 0.2
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Chaussures et Sacs": [{
        "rank": 1,
        "sales": 7.5600000000000005
    }, {
        "rank": 2,
        "sales": 6.925333333333333
    }, {
        "rank": 3,
        "sales": 6.3629999999999995
    }, {
        "rank": 4,
        "sales": 6.405
    }, {
        "rank": 5,
        "sales": 6.086
    }, {
        "rank": 6,
        "sales": 6.218666666666667
    }, {
        "rank": 7,
        "sales": 6.055000000000001
    }, {
        "rank": 8,
        "sales": 6.156000000000001
    }, {
        "rank": 9,
        "sales": 5.7459999999999996
    }, {
        "rank": 10,
        "sales": 5.956333333333333
    }, {
        "rank": 20,
        "sales": 5.425
    }, {
        "rank": 30,
        "sales": 5.229333333333333
    }, {
        "rank": 40,
        "sales": 4.766666666666667
    }, {
        "rank": 50,
        "sales": 4.713333333333334
    }, {
        "rank": 60,
        "sales": 4.566666666666666
    }, {
        "rank": 70,
        "sales": 4.645333333333334
    }, {
        "rank": 80,
        "sales": 4.444
    }, {
        "rank": 90,
        "sales": 4.333333333333333
    }, {
        "rank": 100,
        "sales": 4.558000000000001
    }, {
        "rank": 200,
        "sales": 3.978
    }, {
        "rank": 300,
        "sales": 3.816333333333333
    }, {
        "rank": 400,
        "sales": 3.466666666666667
    }, {
        "rank": 500,
        "sales": 3.1666666666666665
    }, {
        "rank": 600,
        "sales": 3.094
    }, {
        "rank": 700,
        "sales": 3.2336666666666667
    }, {
        "rank": 800,
        "sales": 3.1386666666666665
    }, {
        "rank": 900,
        "sales": 3.1246666666666667
    }, {
        "rank": 1000,
        "sales": 3.0316666666666667
    }, {
        "rank": 2000,
        "sales": 2.704
    }, {
        "rank": 3000,
        "sales": 2.664
    }, {
        "rank": 4000,
        "sales": 2.568
    }, {
        "rank": 5000,
        "sales": 2.5069999999999997
    }, {
        "rank": 6000,
        "sales": 2.2666666666666666
    }, {
        "rank": 7000,
        "sales": 2.2
    }, {
        "rank": 8000,
        "sales": 2.1883333333333335
    }, {
        "rank": 9000,
        "sales": 2.2613333333333334
    }, {
        "rank": 10000,
        "sales": 2.2680000000000002
    }, {
        "rank": 20000,
        "sales": 2.0140000000000002
    }, {
        "rank": 30000,
        "sales": 1.8026666666666666
    }, {
        "rank": 40000,
        "sales": 1.7666666666666666
    }, {
        "rank": 50000,
        "sales": 1.712
    }, {
        "rank": 60000,
        "sales": 1.6253333333333333
    }, {
        "rank": 70000,
        "sales": 1.5693333333333332
    }, {
        "rank": 80000,
        "sales": 1.5623333333333334
    }, {
        "rank": 90000,
        "sales": 1.512
    }, {
        "rank": 100000,
        "sales": 1.4486666666666668
    }, {
        "rank": 200000,
        "sales": 1.2133333333333334
    }, {
        "rank": 300000,
        "sales": 1.0986666666666667
    }, {
        "rank": 400000,
        "sales": 1.02
    }, {
        "rank": 500000,
        "sales": 0.9333333333333333
    }, {
        "rank": 600000,
        "sales": 0.9
    }, {
        "rank": 700000,
        "sales": 0.9359999999999999
    }, {
        "rank": 800000,
        "sales": 0.8916666666666667
    }, {
        "rank": 900000,
        "sales": 0.872
    }, {
        "rank": 1000000,
        "sales": 0.7666666666666667
    }],
    "Commerce, Industrie & Science": [{
        "rank": 1,
        "sales": 22.05
    }, {
        "rank": 2,
        "sales": 18.7
    }, {
        "rank": 3,
        "sales": 17.33833333333333
    }, {
        "rank": 4,
        "sales": 16.625
    }, {
        "rank": 5,
        "sales": 15.217333333333332
    }, {
        "rank": 6,
        "sales": 15.045333333333334
    }, {
        "rank": 7,
        "sales": 14.490666666666668
    }, {
        "rank": 8,
        "sales": 14.58
    }, {
        "rank": 9,
        "sales": 13.133333333333333
    }, {
        "rank": 10,
        "sales": 12.927999999999999
    }, {
        "rank": 20,
        "sales": 10.948
    }, {
        "rank": 30,
        "sales": 9.752
    }, {
        "rank": 40,
        "sales": 8.085
    }, {
        "rank": 50,
        "sales": 7.4159999999999995
    }, {
        "rank": 60,
        "sales": 7.056
    }, {
        "rank": 70,
        "sales": 6.3293333333333335
    }, {
        "rank": 80,
        "sales": 6.430666666666666
    }, {
        "rank": 90,
        "sales": 5.925333333333333
    }, {
        "rank": 100,
        "sales": 5.985
    }, {
        "rank": 200,
        "sales": 4.957666666666666
    }, {
        "rank": 300,
        "sales": 4.1819999999999995
    }, {
        "rank": 400,
        "sales": 3.85
    }, {
        "rank": 500,
        "sales": 3.466666666666667
    }, {
        "rank": 600,
        "sales": 3.0973333333333333
    }, {
        "rank": 700,
        "sales": 3.1246666666666667
    }, {
        "rank": 800,
        "sales": 2.746666666666667
    }, {
        "rank": 900,
        "sales": 2.575
    }, {
        "rank": 1000,
        "sales": 2.508666666666667
    }, {
        "rank": 2000,
        "sales": 1.6606666666666667
    }, {
        "rank": 3000,
        "sales": 1.224
    }, {
        "rank": 4000,
        "sales": 0.9893333333333333
    }, {
        "rank": 5000,
        "sales": 0.8203333333333334
    }, {
        "rank": 6000,
        "sales": 0.6333333333333333
    }, {
        "rank": 7000,
        "sales": 0.5546666666666666
    }, {
        "rank": 8000,
        "sales": 0.4713333333333333
    }, {
        "rank": 9000,
        "sales": 0.40800000000000003
    }, {
        "rank": 10000,
        "sales": 0.36666666666666664
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Cuisine & Maison": [{
        "rank": 1,
        "sales": 43
    }, {
        "rank": 2,
        "sales": 41.587333333333326
    }, {
        "rank": 3,
        "sales": 38.213
    }, {
        "rank": 4,
        "sales": 37.415
    }, {
        "rank": 5,
        "sales": 35.190000000000005
    }, {
        "rank": 6,
        "sales": 34.943999999999996
    }, {
        "rank": 7,
        "sales": 33.16166666666667
    }, {
        "rank": 8,
        "sales": 34.132
    }, {
        "rank": 9,
        "sales": 32.58233333333333
    }, {
        "rank": 10,
        "sales": 32.37866666666667
    }, {
        "rank": 20,
        "sales": 29.888666666666666
    }, {
        "rank": 30,
        "sales": 26.656
    }, {
        "rank": 40,
        "sales": 26.892
    }, {
        "rank": 50,
        "sales": 24.206333333333337
    }, {
        "rank": 60,
        "sales": 23.2
    }, {
        "rank": 70,
        "sales": 22.845333333333333
    }, {
        "rank": 80,
        "sales": 21.321
    }, {
        "rank": 90,
        "sales": 19.633333333333333
    }, {
        "rank": 100,
        "sales": 19.413333333333334
    }, {
        "rank": 200,
        "sales": 14.678666666666667
    }, {
        "rank": 300,
        "sales": 12.32
    }, {
        "rank": 400,
        "sales": 10.494
    }, {
        "rank": 500,
        "sales": 9.359333333333332
    }, {
        "rank": 600,
        "sales": 9.416
    }, {
        "rank": 700,
        "sales": 8.568000000000001
    }, {
        "rank": 800,
        "sales": 8.193999999999999
    }, {
        "rank": 900,
        "sales": 8.155
    }, {
        "rank": 1000,
        "sales": 7.5
    }, {
        "rank": 2000,
        "sales": 6.84
    }, {
        "rank": 3000,
        "sales": 6.09
    }, {
        "rank": 4000,
        "sales": 5.813666666666666
    }, {
        "rank": 5000,
        "sales": 5.441333333333334
    }, {
        "rank": 6000,
        "sales": 5.075
    }, {
        "rank": 7000,
        "sales": 4.734666666666667
    }, {
        "rank": 8000,
        "sales": 4.174666666666666
    }, {
        "rank": 9000,
        "sales": 4.173
    }, {
        "rank": 10000,
        "sales": 3.8133333333333335
    }, {
        "rank": 20000,
        "sales": 2.4819999999999998
    }, {
        "rank": 30000,
        "sales": 1.8883333333333332
    }, {
        "rank": 40000,
        "sales": 1.5479999999999998
    }, {
        "rank": 50000,
        "sales": 1.308
    }, {
        "rank": 60000,
        "sales": 1.06
    }, {
        "rank": 70000,
        "sales": 0.875
    }, {
        "rank": 80000,
        "sales": 0.7140000000000001
    }, {
        "rank": 90000,
        "sales": 0.6903333333333334
    }, {
        "rank": 100000,
        "sales": 0.5333333333333333
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "DVD & Blu-ray": [{
        "rank": 1,
        "sales": 48.480000000000004
    }, {
        "rank": 2,
        "sales": 40.83766666666667
    }, {
        "rank": 3,
        "sales": 39.567
    }, {
        "rank": 4,
        "sales": 35.175
    }, {
        "rank": 5,
        "sales": 32.062
    }, {
        "rank": 6,
        "sales": 30.957333333333334
    }, {
        "rank": 7,
        "sales": 30.672
    }, {
        "rank": 8,
        "sales": 29.139666666666667
    }, {
        "rank": 9,
        "sales": 27.282666666666668
    }, {
        "rank": 10,
        "sales": 26.127666666666666
    }, {
        "rank": 20,
        "sales": 19.966666666666665
    }, {
        "rank": 30,
        "sales": 17.955
    }, {
        "rank": 40,
        "sales": 15.808
    }, {
        "rank": 50,
        "sales": 15.042
    }, {
        "rank": 60,
        "sales": 13.462
    }, {
        "rank": 70,
        "sales": 12.188333333333333
    }, {
        "rank": 80,
        "sales": 11.398666666666665
    }, {
        "rank": 90,
        "sales": 10.746333333333332
    }, {
        "rank": 100,
        "sales": 10.098
    }, {
        "rank": 200,
        "sales": 7.097666666666667
    }, {
        "rank": 300,
        "sales": 5.083666666666667
    }, {
        "rank": 400,
        "sales": 4.1946666666666665
    }, {
        "rank": 500,
        "sales": 3.597
    }, {
        "rank": 600,
        "sales": 2.8
    }, {
        "rank": 700,
        "sales": 2.603666666666667
    }, {
        "rank": 800,
        "sales": 2.3253333333333335
    }, {
        "rank": 900,
        "sales": 1.919
    }, {
        "rank": 1000,
        "sales": 1.82
    }, {
        "rank": 2000,
        "sales": 0.8203333333333334
    }, {
        "rank": 3000,
        "sales": 0.39966666666666667
    }, {
        "rank": 4000,
        "sales": 0.16666666666666666
    }, {
        "rank": 5000,
        "sales": 0
    }],
    "Epicerie": [{
        "rank": 1,
        "sales": 87.86999999999999
    }, {
        "rank": 2,
        "sales": 80.333
    }, {
        "rank": 3,
        "sales": 70.45466666666667
    }, {
        "rank": 4,
        "sales": 64.61
    }, {
        "rank": 5,
        "sales": 58.99
    }, {
        "rank": 6,
        "sales": 56.547000000000004
    }, {
        "rank": 7,
        "sales": 55.65
    }, {
        "rank": 8,
        "sales": 50.93766666666667
    }, {
        "rank": 9,
        "sales": 48.666666666666664
    }, {
        "rank": 10,
        "sales": 50.397000000000006
    }, {
        "rank": 20,
        "sales": 38.216
    }, {
        "rank": 30,
        "sales": 35.27966666666667
    }, {
        "rank": 40,
        "sales": 30.669333333333334
    }, {
        "rank": 50,
        "sales": 28.283666666666665
    }, {
        "rank": 60,
        "sales": 25.934666666666665
    }, {
        "rank": 70,
        "sales": 23.095333333333333
    }, {
        "rank": 80,
        "sales": 21.964
    }, {
        "rank": 90,
        "sales": 20.366666666666667
    }, {
        "rank": 100,
        "sales": 20.528666666666666
    }, {
        "rank": 200,
        "sales": 13.475
    }, {
        "rank": 300,
        "sales": 9.879666666666667
    }, {
        "rank": 400,
        "sales": 8.2
    }, {
        "rank": 500,
        "sales": 8.102333333333332
    }, {
        "rank": 600,
        "sales": 6.466666666666667
    }, {
        "rank": 700,
        "sales": 5.15
    }, {
        "rank": 800,
        "sales": 4.977666666666667
    }, {
        "rank": 900,
        "sales": 4.494
    }, {
        "rank": 1000,
        "sales": 3.9
    }, {
        "rank": 2000,
        "sales": 2.275
    }, {
        "rank": 3000,
        "sales": 1.2950000000000002
    }, {
        "rank": 4000,
        "sales": 0.7846666666666666
    }, {
        "rank": 5000,
        "sales": 0.44633333333333336
    }, {
        "rank": 6000,
        "sales": 0.23333333333333334
    }, {
        "rank": 7000,
        "sales": 0
    }],
    "Fournitures de bureau": [{
        "rank": 1,
        "sales": 71.71000000000001
    }, {
        "rank": 2,
        "sales": 64.715
    }, {
        "rank": 3,
        "sales": 59.81933333333333
    }, {
        "rank": 4,
        "sales": 53.958
    }, {
        "rank": 5,
        "sales": 53.74966666666667
    }, {
        "rank": 6,
        "sales": 51.948
    }, {
        "rank": 7,
        "sales": 50.53966666666667
    }, {
        "rank": 8,
        "sales": 45.315333333333335
    }, {
        "rank": 9,
        "sales": 44.873666666666665
    }, {
        "rank": 10,
        "sales": 45.792
    }, {
        "rank": 20,
        "sales": 37.34733333333334
    }, {
        "rank": 30,
        "sales": 33.526666666666664
    }, {
        "rank": 40,
        "sales": 30.457333333333334
    }, {
        "rank": 50,
        "sales": 28.908
    }, {
        "rank": 60,
        "sales": 25.233333333333334
    }, {
        "rank": 70,
        "sales": 25.884
    }, {
        "rank": 80,
        "sales": 22.866666666666667
    }, {
        "rank": 90,
        "sales": 22.625666666666667
    }, {
        "rank": 100,
        "sales": 22.19
    }, {
        "rank": 200,
        "sales": 16.166666666666668
    }, {
        "rank": 300,
        "sales": 13.815333333333333
    }, {
        "rank": 400,
        "sales": 10.226666666666667
    }, {
        "rank": 500,
        "sales": 9.681333333333333
    }, {
        "rank": 600,
        "sales": 8.566666666666666
    }, {
        "rank": 700,
        "sales": 8.181000000000001
    }, {
        "rank": 800,
        "sales": 7.854
    }, {
        "rank": 900,
        "sales": 7.735
    }, {
        "rank": 1000,
        "sales": 7.137333333333333
    }, {
        "rank": 2000,
        "sales": 4.545
    }, {
        "rank": 3000,
        "sales": 3.57
    }, {
        "rank": 4000,
        "sales": 2.862
    }, {
        "rank": 5000,
        "sales": 2.288
    }, {
        "rank": 6000,
        "sales": 1.8
    }, {
        "rank": 7000,
        "sales": 1.5150000000000001
    }, {
        "rank": 8000,
        "sales": 1.3679999999999999
    }, {
        "rank": 9000,
        "sales": 1.0666666666666667
    }, {
        "rank": 10000,
        "sales": 0.9706666666666667
    }, {
        "rank": 20000,
        "sales": 0.2
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Gros électroménager": [{
        "rank": 1,
        "sales": 17.509999999999998
    }, {
        "rank": 2,
        "sales": 14.133333333333333
    }, {
        "rank": 3,
        "sales": 12.943666666666667
    }, {
        "rank": 4,
        "sales": 11.5
    }, {
        "rank": 5,
        "sales": 11.699333333333334
    }, {
        "rank": 6,
        "sales": 10.806999999999999
    }, {
        "rank": 7,
        "sales": 10.272
    }, {
        "rank": 8,
        "sales": 9.808333333333334
    }, {
        "rank": 9,
        "sales": 8.8
    }, {
        "rank": 10,
        "sales": 9.228666666666667
    }, {
        "rank": 20,
        "sales": 6.466666666666667
    }, {
        "rank": 30,
        "sales": 5.813666666666666
    }, {
        "rank": 40,
        "sales": 5.184
    }, {
        "rank": 50,
        "sales": 4.333333333333333
    }, {
        "rank": 60,
        "sales": 4.36
    }, {
        "rank": 70,
        "sales": 3.9603333333333333
    }, {
        "rank": 80,
        "sales": 3.3333333333333335
    }, {
        "rank": 90,
        "sales": 3.317
    }, {
        "rank": 100,
        "sales": 3.1319999999999997
    }, {
        "rank": 200,
        "sales": 1.9863333333333335
    }, {
        "rank": 300,
        "sales": 1.5546666666666666
    }, {
        "rank": 400,
        "sales": 1.2126666666666668
    }, {
        "rank": 500,
        "sales": 0.981
    }, {
        "rank": 600,
        "sales": 0.7973333333333333
    }, {
        "rank": 700,
        "sales": 0.6903333333333334
    }, {
        "rank": 800,
        "sales": 0.5653333333333334
    }, {
        "rank": 900,
        "sales": 0.4593333333333333
    }, {
        "rank": 1000,
        "sales": 0.36666666666666664
    }, {
        "rank": 2000,
        "sales": 0
    }],
    "High-tech": [{
        "rank": 1,
        "sales": 103.78999999999999
    }, {
        "rank": 2,
        "sales": 87.82466666666666
    }, {
        "rank": 3,
        "sales": 80.34200000000001
    }, {
        "rank": 4,
        "sales": 78.758
    }, {
        "rank": 5,
        "sales": 70.93333333333334
    }, {
        "rank": 6,
        "sales": 73.00966666666666
    }, {
        "rank": 7,
        "sales": 66
    }, {
        "rank": 8,
        "sales": 65.382
    }, {
        "rank": 9,
        "sales": 66.80366666666667
    }, {
        "rank": 10,
        "sales": 65.844
    }, {
        "rank": 20,
        "sales": 55.39033333333334
    }, {
        "rank": 30,
        "sales": 46.7
    }, {
        "rank": 40,
        "sales": 45.898
    }, {
        "rank": 50,
        "sales": 44.39933333333333
    }, {
        "rank": 60,
        "sales": 40.635
    }, {
        "rank": 70,
        "sales": 38.480000000000004
    }, {
        "rank": 80,
        "sales": 36.312
    }, {
        "rank": 90,
        "sales": 35.397666666666666
    }, {
        "rank": 100,
        "sales": 33.599333333333334
    }, {
        "rank": 200,
        "sales": 26.104
    }, {
        "rank": 300,
        "sales": 21.364333333333335
    }, {
        "rank": 400,
        "sales": 17.833333333333332
    }, {
        "rank": 500,
        "sales": 14.733333333333333
    }, {
        "rank": 600,
        "sales": 13.424333333333333
    }, {
        "rank": 700,
        "sales": 12.2
    }, {
        "rank": 800,
        "sales": 12.535
    }, {
        "rank": 900,
        "sales": 11.301333333333334
    }, {
        "rank": 1000,
        "sales": 11.16
    }, {
        "rank": 2000,
        "sales": 7.002666666666667
    }, {
        "rank": 3000,
        "sales": 5.984
    }, {
        "rank": 4000,
        "sales": 5.58
    }, {
        "rank": 5000,
        "sales": 4.658
    }, {
        "rank": 6000,
        "sales": 4.351333333333333
    }, {
        "rank": 7000,
        "sales": 3.6666666666666665
    }, {
        "rank": 8000,
        "sales": 3.466666666666667
    }, {
        "rank": 9000,
        "sales": 3.0636666666666668
    }, {
        "rank": 10000,
        "sales": 3.067333333333333
    }, {
        "rank": 20000,
        "sales": 1.8333333333333333
    }, {
        "rank": 30000,
        "sales": 1.3733333333333335
    }, {
        "rank": 40000,
        "sales": 1.054
    }, {
        "rank": 50000,
        "sales": 0.8320000000000001
    }, {
        "rank": 60000,
        "sales": 0.612
    }, {
        "rank": 70000,
        "sales": 0.5086666666666667
    }, {
        "rank": 80000,
        "sales": 0.3703333333333333
    }, {
        "rank": 90000,
        "sales": 0.28800000000000003
    }, {
        "rank": 100000,
        "sales": 0.2
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Hygiène et Soins du corps": [{
        "rank": 1,
        "sales": 105.93
    }, {
        "rank": 2,
        "sales": 91.52066666666666
    }, {
        "rank": 3,
        "sales": 84.348
    }, {
        "rank": 4,
        "sales": 79.60633333333334
    }, {
        "rank": 5,
        "sales": 74.07966666666667
    }, {
        "rank": 6,
        "sales": 68.18599999999999
    }, {
        "rank": 7,
        "sales": 65.611
    }, {
        "rank": 8,
        "sales": 63.99466666666667
    }, {
        "rank": 9,
        "sales": 62.088
    }, {
        "rank": 10,
        "sales": 58.06666666666667
    }, {
        "rank": 20,
        "sales": 50.73866666666667
    }, {
        "rank": 30,
        "sales": 44.45
    }, {
        "rank": 40,
        "sales": 40.95133333333333
    }, {
        "rank": 50,
        "sales": 38.01866666666667
    }, {
        "rank": 60,
        "sales": 36.733
    }, {
        "rank": 70,
        "sales": 33.814
    }, {
        "rank": 80,
        "sales": 32.224000000000004
    }, {
        "rank": 90,
        "sales": 30.846
    }, {
        "rank": 100,
        "sales": 28.526
    }, {
        "rank": 200,
        "sales": 21.874666666666666
    }, {
        "rank": 300,
        "sales": 18.096
    }, {
        "rank": 400,
        "sales": 15.015333333333333
    }, {
        "rank": 500,
        "sales": 13.51
    }, {
        "rank": 600,
        "sales": 11.872000000000002
    }, {
        "rank": 700,
        "sales": 10.132
    }, {
        "rank": 800,
        "sales": 9.325666666666667
    }, {
        "rank": 900,
        "sales": 8.943999999999999
    }, {
        "rank": 1000,
        "sales": 8.748
    }, {
        "rank": 2000,
        "sales": 5.441333333333334
    }, {
        "rank": 3000,
        "sales": 3.848
    }, {
        "rank": 4000,
        "sales": 2.8666666666666667
    }, {
        "rank": 5000,
        "sales": 2.322666666666667
    }, {
        "rank": 6000,
        "sales": 1.7843333333333333
    }, {
        "rank": 7000,
        "sales": 1.498
    }, {
        "rank": 8000,
        "sales": 1.1333333333333333
    }, {
        "rank": 9000,
        "sales": 0.909
    }, {
        "rank": 10000,
        "sales": 0.7333333333333333
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Informatique": [{
        "rank": 1,
        "sales": 110.24
    }, {
        "rank": 2,
        "sales": 85.86666666666666
    }, {
        "rank": 3,
        "sales": 79.10933333333334
    }, {
        "rank": 4,
        "sales": 70.856
    }, {
        "rank": 5,
        "sales": 67.795
    }, {
        "rank": 6,
        "sales": 64.342
    }, {
        "rank": 7,
        "sales": 60.375
    }, {
        "rank": 8,
        "sales": 56.443999999999996
    }, {
        "rank": 9,
        "sales": 54.075
    }, {
        "rank": 10,
        "sales": 55.00866666666666
    }, {
        "rank": 20,
        "sales": 39.243
    }, {
        "rank": 30,
        "sales": 33.88333333333333
    }, {
        "rank": 40,
        "sales": 29.389333333333337
    }, {
        "rank": 50,
        "sales": 25.375999999999998
    }, {
        "rank": 60,
        "sales": 22.253666666666668
    }, {
        "rank": 70,
        "sales": 20.536
    }, {
        "rank": 80,
        "sales": 20.237666666666666
    }, {
        "rank": 90,
        "sales": 18.612000000000002
    }, {
        "rank": 100,
        "sales": 16.387999999999998
    }, {
        "rank": 200,
        "sales": 8.034
    }, {
        "rank": 300,
        "sales": 5.768
    }, {
        "rank": 400,
        "sales": 4.487333333333334
    }, {
        "rank": 500,
        "sales": 3.466666666666667
    }, {
        "rank": 600,
        "sales": 3.0156666666666667
    }, {
        "rank": 700,
        "sales": 2.4266666666666667
    }, {
        "rank": 800,
        "sales": 2.08
    }, {
        "rank": 900,
        "sales": 1.8359999999999999
    }, {
        "rank": 1000,
        "sales": 1.764
    }, {
        "rank": 2000,
        "sales": 0.63
    }, {
        "rank": 3000,
        "sales": 0.16666666666666666
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Instruments de musique": [{
        "rank": 1,
        "sales": 12
    }, {
        "rank": 2,
        "sales": 11.99
    }, {
        "rank": 3,
        "sales": 10.955
    }, {
        "rank": 4,
        "sales": 10.434666666666667
    }, {
        "rank": 5,
        "sales": 10.122666666666667
    }, {
        "rank": 6,
        "sales": 9.595
    }, {
        "rank": 7,
        "sales": 10.044
    }, {
        "rank": 8,
        "sales": 9.864
    }, {
        "rank": 9,
        "sales": 9.415
    }, {
        "rank": 10,
        "sales": 9.363333333333333
    }, {
        "rank": 20,
        "sales": 8.72
    }, {
        "rank": 30,
        "sales": 7.575
    }, {
        "rank": 40,
        "sales": 7.381666666666666
    }, {
        "rank": 50,
        "sales": 7.418666666666667
    }, {
        "rank": 60,
        "sales": 7.169
    }, {
        "rank": 70,
        "sales": 6.533333333333333
    }, {
        "rank": 80,
        "sales": 6.621333333333333
    }, {
        "rank": 90,
        "sales": 6.482666666666666
    }, {
        "rank": 100,
        "sales": 6.501333333333333
    }, {
        "rank": 200,
        "sales": 5.688666666666666
    }, {
        "rank": 300,
        "sales": 5.328
    }, {
        "rank": 400,
        "sales": 4.760000000000001
    }, {
        "rank": 500,
        "sales": 4.6080000000000005
    }, {
        "rank": 600,
        "sales": 4.073666666666666
    }, {
        "rank": 700,
        "sales": 4.214666666666667
    }, {
        "rank": 800,
        "sales": 3.7333333333333334
    }, {
        "rank": 900,
        "sales": 3.7060000000000004
    }, {
        "rank": 1000,
        "sales": 3.533333333333333
    }, {
        "rank": 2000,
        "sales": 3.161
    }, {
        "rank": 3000,
        "sales": 2.566666666666667
    }, {
        "rank": 4000,
        "sales": 2.5433333333333334
    }, {
        "rank": 5000,
        "sales": 2.231666666666667
    }, {
        "rank": 6000,
        "sales": 2.074
    }, {
        "rank": 7000,
        "sales": 1.972
    }, {
        "rank": 8000,
        "sales": 1.8516666666666666
    }, {
        "rank": 9000,
        "sales": 1.7506666666666668
    }, {
        "rank": 10000,
        "sales": 1.6833333333333333
    }, {
        "rank": 20000,
        "sales": 1.2666666666666666
    }, {
        "rank": 30000,
        "sales": 1.085
    }, {
        "rank": 40000,
        "sales": 0.9
    }, {
        "rank": 50000,
        "sales": 0.872
    }, {
        "rank": 60000,
        "sales": 0.728
    }, {
        "rank": 70000,
        "sales": 0.6586666666666667
    }, {
        "rank": 80000,
        "sales": 0.654
    }, {
        "rank": 90000,
        "sales": 0.5666666666666667
    }, {
        "rank": 100000,
        "sales": 0.515
    }, {
        "rank": 200000,
        "sales": 0.327
    }, {
        "rank": 300000,
        "sales": 0.2
    }, {
        "rank": 400000,
        "sales": 0
    }],
    "Jardin": [{
        "rank": 1,
        "sales": 38.38
    }, {
        "rank": 2,
        "sales": 35.152
    }, {
        "rank": 3,
        "sales": 33.948
    }, {
        "rank": 4,
        "sales": 31.886000000000003
    }, {
        "rank": 5,
        "sales": 28.886000000000003
    }, {
        "rank": 6,
        "sales": 28.151999999999997
    }, {
        "rank": 7,
        "sales": 26.8
    }, {
        "rank": 8,
        "sales": 27.404999999999998
    }, {
        "rank": 9,
        "sales": 25.755
    }, {
        "rank": 10,
        "sales": 25.216333333333335
    }, {
        "rank": 20,
        "sales": 22.213666666666665
    }, {
        "rank": 30,
        "sales": 21.079
    }, {
        "rank": 40,
        "sales": 18.951999999999998
    }, {
        "rank": 50,
        "sales": 18.675333333333334
    }, {
        "rank": 60,
        "sales": 16.252
    }, {
        "rank": 70,
        "sales": 15.565333333333333
    }, {
        "rank": 80,
        "sales": 14.84
    }, {
        "rank": 90,
        "sales": 14.074666666666667
    }, {
        "rank": 100,
        "sales": 14.133666666666667
    }, {
        "rank": 200,
        "sales": 7.002666666666667
    }, {
        "rank": 300,
        "sales": 6.984
    }, {
        "rank": 400,
        "sales": 6.721666666666667
    }, {
        "rank": 500,
        "sales": 6.23
    }, {
        "rank": 600,
        "sales": 5.905333333333333
    }, {
        "rank": 700,
        "sales": 5.678
    }, {
        "rank": 800,
        "sales": 5.705
    }, {
        "rank": 900,
        "sales": 5.5649999999999995
    }, {
        "rank": 1000,
        "sales": 5.2
    }, {
        "rank": 2000,
        "sales": 3.8826666666666667
    }, {
        "rank": 3000,
        "sales": 3.4979999999999998
    }, {
        "rank": 4000,
        "sales": 3.2760000000000002
    }, {
        "rank": 5000,
        "sales": 2.6666666666666665
    }, {
        "rank": 6000,
        "sales": 2.4376666666666664
    }, {
        "rank": 7000,
        "sales": 2.2613333333333334
    }, {
        "rank": 8000,
        "sales": 2.0493333333333332
    }, {
        "rank": 9000,
        "sales": 1.8373333333333333
    }, {
        "rank": 10000,
        "sales": 1.764
    }, {
        "rank": 20000,
        "sales": 0.9013333333333333
    }, {
        "rank": 30000,
        "sales": 0.5399999999999999
    }, {
        "rank": 40000,
        "sales": 0.3433333333333334
    }, {
        "rank": 50000,
        "sales": 0.2
    }, {
        "rank": 60000,
        "sales": 0
    }],
    "Jeux et Jouets": [{
        "rank": 1,
        "sales": 53.559999999999995
    }, {
        "rank": 2,
        "sales": 45.93333333333333
    }, {
        "rank": 3,
        "sales": 43.418
    }, {
        "rank": 4,
        "sales": 43.85433333333334
    }, {
        "rank": 5,
        "sales": 40.425
    }, {
        "rank": 6,
        "sales": 38.213
    }, {
        "rank": 7,
        "sales": 38.089333333333336
    }, {
        "rank": 8,
        "sales": 36.330666666666666
    }, {
        "rank": 9,
        "sales": 35.08866666666667
    }, {
        "rank": 10,
        "sales": 34.965
    }, {
        "rank": 20,
        "sales": 31.028666666666666
    }, {
        "rank": 30,
        "sales": 26.35
    }, {
        "rank": 40,
        "sales": 25.956
    }, {
        "rank": 50,
        "sales": 24.516000000000002
    }, {
        "rank": 60,
        "sales": 23.580333333333332
    }, {
        "rank": 70,
        "sales": 22.392
    }, {
        "rank": 80,
        "sales": 21.16466666666667
    }, {
        "rank": 90,
        "sales": 20.3
    }, {
        "rank": 100,
        "sales": 19.482666666666667
    }, {
        "rank": 200,
        "sales": 14.385
    }, {
        "rank": 300,
        "sales": 11.446666666666665
    }, {
        "rank": 400,
        "sales": 9.898
    }, {
        "rank": 500,
        "sales": 9.416
    }, {
        "rank": 600,
        "sales": 8.193999999999999
    }, {
        "rank": 700,
        "sales": 7.879333333333333
    }, {
        "rank": 800,
        "sales": 6.933333333333334
    }, {
        "rank": 900,
        "sales": 6.933333333333334
    }, {
        "rank": 1000,
        "sales": 6.562
    }, {
        "rank": 2000,
        "sales": 5.1306666666666665
    }, {
        "rank": 3000,
        "sales": 4.284000000000001
    }, {
        "rank": 4000,
        "sales": 3.6
    }, {
        "rank": 5000,
        "sales": 2.9579999999999997
    }, {
        "rank": 6000,
        "sales": 2.6
    }, {
        "rank": 7000,
        "sales": 2.3449999999999998
    }, {
        "rank": 8000,
        "sales": 2.124
    }, {
        "rank": 9000,
        "sales": 1.8196666666666668
    }, {
        "rank": 10000,
        "sales": 1.7280000000000002
    }, {
        "rank": 20000,
        "sales": 0.756
    }, {
        "rank": 30000,
        "sales": 0.35
    }, {
        "rank": 40000,
        "sales": 0.16666666666666666
    }, {
        "rank": 50000,
        "sales": 0
    }],
    "Jeux vidéo": [{
        "rank": 1,
        "sales": 38.88
    }, {
        "rank": 2,
        "sales": 32.10133333333333
    }, {
        "rank": 3,
        "sales": 30.312
    }, {
        "rank": 4,
        "sales": 27.21333333333333
    }, {
        "rank": 5,
        "sales": 26.923000000000002
    }, {
        "rank": 6,
        "sales": 23.802333333333333
    }, {
        "rank": 7,
        "sales": 22.633333333333333
    }, {
        "rank": 8,
        "sales": 23.544
    }, {
        "rank": 9,
        "sales": 21.555999999999997
    }, {
        "rank": 10,
        "sales": 20.705
    }, {
        "rank": 20,
        "sales": 17.701999999999998
    }, {
        "rank": 30,
        "sales": 14.633333333333333
    }, {
        "rank": 40,
        "sales": 13.797333333333334
    }, {
        "rank": 50,
        "sales": 12.722666666666667
    }, {
        "rank": 60,
        "sales": 12.233666666666666
    }, {
        "rank": 70,
        "sales": 11.664
    }, {
        "rank": 80,
        "sales": 10.745000000000001
    }, {
        "rank": 90,
        "sales": 10.059666666666667
    }, {
        "rank": 100,
        "sales": 9.8
    }, {
        "rank": 200,
        "sales": 7.038333333333333
    }, {
        "rank": 300,
        "sales": 5.88
    }, {
        "rank": 400,
        "sales": 5.136
    }, {
        "rank": 500,
        "sales": 4.242
    }, {
        "rank": 600,
        "sales": 3.7333333333333334
    }, {
        "rank": 700,
        "sales": 3.57
    }, {
        "rank": 800,
        "sales": 3.2239999999999998
    }, {
        "rank": 900,
        "sales": 3.01
    }, {
        "rank": 1000,
        "sales": 2.844
    }, {
        "rank": 2000,
        "sales": 1.4333333333333333
    }, {
        "rank": 3000,
        "sales": 0.9179999999999999
    }, {
        "rank": 4000,
        "sales": 0.6359999999999999
    }, {
        "rank": 5000,
        "sales": 0.43200000000000005
    }, {
        "rank": 6000,
        "sales": 0.272
    }, {
        "rank": 7000,
        "sales": 0.2
    }, {
        "rank": 8000,
        "sales": 0
    }],
    "Livres": [{
        "rank": 1,
        "sales": 91.16000000000001
    }, {
        "rank": 2,
        "sales": 73.63333333333334
    }, {
        "rank": 3,
        "sales": 72.216
    }, {
        "rank": 4,
        "sales": 65.345
    }, {
        "rank": 5,
        "sales": 58.8
    }, {
        "rank": 6,
        "sales": 58.835
    }, {
        "rank": 7,
        "sales": 55.882666666666665
    }, {
        "rank": 8,
        "sales": 53.872
    }, {
        "rank": 9,
        "sales": 53.64266666666666
    }, {
        "rank": 10,
        "sales": 52.559999999999995
    }, {
        "rank": 20,
        "sales": 41.04533333333333
    }, {
        "rank": 30,
        "sales": 35.60366666666666
    }, {
        "rank": 40,
        "sales": 31.892
    }, {
        "rank": 50,
        "sales": 29.121666666666666
    }, {
        "rank": 60,
        "sales": 29.052
    }, {
        "rank": 70,
        "sales": 25.84
    }, {
        "rank": 80,
        "sales": 25.2
    }, {
        "rank": 90,
        "sales": 24.696
    }, {
        "rank": 100,
        "sales": 23.397333333333332
    }, {
        "rank": 200,
        "sales": 16.818666666666665
    }, {
        "rank": 300,
        "sales": 13.731666666666666
    }, {
        "rank": 400,
        "sales": 11.266666666666667
    }, {
        "rank": 500,
        "sales": 9.433333333333334
    }, {
        "rank": 600,
        "sales": 8.75
    }, {
        "rank": 700,
        "sales": 8.064
    }, {
        "rank": 800,
        "sales": 7.105
    }, {
        "rank": 900,
        "sales": 6.3516666666666675
    }, {
        "rank": 1000,
        "sales": 5.836666666666667
    }, {
        "rank": 2000,
        "sales": 2.9579999999999997
    }, {
        "rank": 3000,
        "sales": 1.7340000000000002
    }, {
        "rank": 4000,
        "sales": 1.1159999999999999
    }, {
        "rank": 5000,
        "sales": 0.6333333333333333
    }, {
        "rank": 6000,
        "sales": 0.40800000000000003
    }, {
        "rank": 7000,
        "sales": 0.23333333333333334
    }, {
        "rank": 8000,
        "sales": 0
    }],
    "Logiciels": [{
        "rank": 1,
        "sales": 13.91
    }, {
        "rank": 2,
        "sales": 11.801333333333334
    }, {
        "rank": 3,
        "sales": 10.741333333333333
    }, {
        "rank": 4,
        "sales": 9.999333333333334
    }, {
        "rank": 5,
        "sales": 9.434
    }, {
        "rank": 6,
        "sales": 9.264999999999999
    }, {
        "rank": 7,
        "sales": 8.783999999999999
    }, {
        "rank": 8,
        "sales": 7.866666666666666
    }, {
        "rank": 9,
        "sales": 7.828
    }, {
        "rank": 10,
        "sales": 7.735
    }, {
        "rank": 20,
        "sales": 6.36
    }, {
        "rank": 30,
        "sales": 5.266666666666667
    }, {
        "rank": 40,
        "sales": 4.862
    }, {
        "rank": 50,
        "sales": 4.796
    }, {
        "rank": 60,
        "sales": 4.3870000000000005
    }, {
        "rank": 70,
        "sales": 3.982666666666667
    }, {
        "rank": 80,
        "sales": 3.74
    }, {
        "rank": 90,
        "sales": 3.675
    }, {
        "rank": 100,
        "sales": 3.3333333333333335
    }, {
        "rank": 200,
        "sales": 2.457666666666667
    }, {
        "rank": 300,
        "sales": 1.9666666666666666
    }, {
        "rank": 400,
        "sales": 1.6666666666666667
    }, {
        "rank": 500,
        "sales": 1.4666666666666666
    }, {
        "rank": 600,
        "sales": 1.352
    }, {
        "rank": 700,
        "sales": 1.1783333333333335
    }, {
        "rank": 800,
        "sales": 1.1306666666666667
    }, {
        "rank": 900,
        "sales": 0.986
    }, {
        "rank": 1000,
        "sales": 0.981
    }, {
        "rank": 2000,
        "sales": 0.49
    }, {
        "rank": 3000,
        "sales": 0.2826666666666667
    }, {
        "rank": 4000,
        "sales": 0.16666666666666666
    }, {
        "rank": 5000,
        "sales": 0
    }],
    "Luminaires et Eclairage": [{
        "rank": 1,
        "sales": 59.36
    }, {
        "rank": 2,
        "sales": 48.824
    }, {
        "rank": 3,
        "sales": 47.306000000000004
    }, {
        "rank": 4,
        "sales": 40.36666666666667
    }, {
        "rank": 5,
        "sales": 39.97
    }, {
        "rank": 6,
        "sales": 36.629333333333335
    }, {
        "rank": 7,
        "sales": 35.461999999999996
    }, {
        "rank": 8,
        "sales": 35.175
    }, {
        "rank": 9,
        "sales": 33.372
    }, {
        "rank": 10,
        "sales": 34.26233333333333
    }, {
        "rank": 20,
        "sales": 27.178
    }, {
        "rank": 30,
        "sales": 24.270666666666667
    }, {
        "rank": 40,
        "sales": 22.127
    }, {
        "rank": 50,
        "sales": 18.833333333333332
    }, {
        "rank": 60,
        "sales": 18.368333333333332
    }, {
        "rank": 70,
        "sales": 14.8
    }, {
        "rank": 80,
        "sales": 13.370000000000001
    }, {
        "rank": 90,
        "sales": 11.698666666666666
    }, {
        "rank": 100,
        "sales": 10.620000000000001
    }, {
        "rank": 200,
        "sales": 7.133333333333334
    }, {
        "rank": 300,
        "sales": 6.587999999999999
    }, {
        "rank": 400,
        "sales": 5.521333333333333
    }, {
        "rank": 500,
        "sales": 5.2
    }, {
        "rank": 600,
        "sales": 4.433333333333334
    }, {
        "rank": 700,
        "sales": 4
    }, {
        "rank": 800,
        "sales": 3.92
    }, {
        "rank": 900,
        "sales": 3.57
    }, {
        "rank": 1000,
        "sales": 3.366
    }, {
        "rank": 2000,
        "sales": 1.8903333333333334
    }, {
        "rank": 3000,
        "sales": 1.0666666666666667
    }, {
        "rank": 4000,
        "sales": 0.7066666666666667
    }, {
        "rank": 5000,
        "sales": 0.41600000000000004
    }, {
        "rank": 6000,
        "sales": 0.23333333333333334
    }, {
        "rank": 7000,
        "sales": 0
    }],
    "Montres": [{
        "rank": 1,
        "sales": 14.17
    }, {
        "rank": 2,
        "sales": 12.483333333333333
    }, {
        "rank": 3,
        "sales": 11.445
    }, {
        "rank": 4,
        "sales": 10.92
    }, {
        "rank": 5,
        "sales": 10.9
    }, {
        "rank": 6,
        "sales": 10.088
    }, {
        "rank": 7,
        "sales": 9.999333333333334
    }, {
        "rank": 8,
        "sales": 9.292
    }, {
        "rank": 9,
        "sales": 9.72
    }, {
        "rank": 10,
        "sales": 8.921666666666665
    }, {
        "rank": 20,
        "sales": 7.733333333333333
    }, {
        "rank": 30,
        "sales": 7.561333333333334
    }, {
        "rank": 40,
        "sales": 7.056
    }, {
        "rank": 50,
        "sales": 6.274666666666667
    }, {
        "rank": 60,
        "sales": 5.656000000000001
    }, {
        "rank": 70,
        "sales": 5.688
    }, {
        "rank": 80,
        "sales": 5.2
    }, {
        "rank": 90,
        "sales": 4.55
    }, {
        "rank": 100,
        "sales": 4.284000000000001
    }, {
        "rank": 200,
        "sales": 3.7800000000000002
    }, {
        "rank": 300,
        "sales": 3.57
    }, {
        "rank": 400,
        "sales": 3.395
    }, {
        "rank": 500,
        "sales": 3.4153333333333333
    }, {
        "rank": 600,
        "sales": 3.2760000000000002
    }, {
        "rank": 700,
        "sales": 3.0506666666666664
    }, {
        "rank": 800,
        "sales": 2.912
    }, {
        "rank": 900,
        "sales": 2.754
    }, {
        "rank": 1000,
        "sales": 2.6
    }, {
        "rank": 2000,
        "sales": 2.216333333333333
    }, {
        "rank": 3000,
        "sales": 1.7510000000000001
    }, {
        "rank": 4000,
        "sales": 1.605
    }, {
        "rank": 5000,
        "sales": 1.4896666666666667
    }, {
        "rank": 6000,
        "sales": 1.2333333333333334
    }, {
        "rank": 7000,
        "sales": 1.26
    }, {
        "rank": 8000,
        "sales": 1.1626666666666667
    }, {
        "rank": 9000,
        "sales": 1
    }, {
        "rank": 10000,
        "sales": 0.9763333333333333
    }, {
        "rank": 20000,
        "sales": 0.6
    }, {
        "rank": 30000,
        "sales": 0.4666666666666667
    }, {
        "rank": 40000,
        "sales": 0.37766666666666665
    }, {
        "rank": 50000,
        "sales": 0.2906666666666667
    }, {
        "rank": 60000,
        "sales": 0.24733333333333332
    }, {
        "rank": 70000,
        "sales": 0.20400000000000001
    }, {
        "rank": 80000,
        "sales": 0.16666666666666666
    }, {
        "rank": 90000,
        "sales": 0
    }],
    "Sports et Loisirs": [{
        "rank": 1,
        "sales": 45.32
    }, {
        "rank": 2,
        "sales": 42.946000000000005
    }, {
        "rank": 3,
        "sales": 38.306666666666665
    }, {
        "rank": 4,
        "sales": 36.11866666666666
    }, {
        "rank": 5,
        "sales": 34.037
    }, {
        "rank": 6,
        "sales": 32.959666666666664
    }, {
        "rank": 7,
        "sales": 34.272000000000006
    }, {
        "rank": 8,
        "sales": 31.276333333333334
    }, {
        "rank": 9,
        "sales": 32.724000000000004
    }, {
        "rank": 10,
        "sales": 29.7
    }, {
        "rank": 20,
        "sales": 27.784333333333333
    }, {
        "rank": 30,
        "sales": 25.776
    }, {
        "rank": 40,
        "sales": 23.140666666666668
    }, {
        "rank": 50,
        "sales": 21.366666666666667
    }, {
        "rank": 60,
        "sales": 21.970666666666666
    }, {
        "rank": 70,
        "sales": 20.790000000000003
    }, {
        "rank": 80,
        "sales": 20.16
    }, {
        "rank": 90,
        "sales": 19.413333333333334
    }, {
        "rank": 100,
        "sales": 19.656
    }, {
        "rank": 200,
        "sales": 14.805
    }, {
        "rank": 300,
        "sales": 10.166
    }, {
        "rank": 400,
        "sales": 9.950999999999999
    }, {
        "rank": 500,
        "sales": 9.416
    }, {
        "rank": 600,
        "sales": 9.108
    }, {
        "rank": 700,
        "sales": 8.424
    }, {
        "rank": 800,
        "sales": 7.833333333333333
    }, {
        "rank": 900,
        "sales": 8.132
    }, {
        "rank": 1000,
        "sales": 7.808666666666666
    }, {
        "rank": 2000,
        "sales": 6.239999999999999
    }, {
        "rank": 3000,
        "sales": 5.547333333333333
    }, {
        "rank": 4000,
        "sales": 4.2
    }, {
        "rank": 5000,
        "sales": 3.924
    }, {
        "rank": 6000,
        "sales": 3.3280000000000003
    }, {
        "rank": 7000,
        "sales": 3.01
    }, {
        "rank": 8000,
        "sales": 2.765
    }, {
        "rank": 9000,
        "sales": 2.496
    }, {
        "rank": 10000,
        "sales": 2.3003333333333336
    }, {
        "rank": 20000,
        "sales": 1.224
    }, {
        "rank": 30000,
        "sales": 0.748
    }, {
        "rank": 40000,
        "sales": 0.4666666666666667
    }, {
        "rank": 50000,
        "sales": 0.306
    }, {
        "rank": 60000,
        "sales": 0.2
    }, {
        "rank": 70000,
        "sales": 0
    }],
    "Vêtements et accessoires": [{
        "rank": 1,
        "sales": 51.36
    }, {
        "rank": 2,
        "sales": 43.384
    }, {
        "rank": 3,
        "sales": 40.684999999999995
    }, {
        "rank": 4,
        "sales": 37.4
    }, {
        "rank": 5,
        "sales": 37.625
    }, {
        "rank": 6,
        "sales": 35.949333333333335
    }, {
        "rank": 7,
        "sales": 34.505
    }, {
        "rank": 8,
        "sales": 33.251999999999995
    }, {
        "rank": 9,
        "sales": 34.38
    }, {
        "rank": 10,
        "sales": 32.06733333333333
    }, {
        "rank": 20,
        "sales": 27.569666666666667
    }, {
        "rank": 30,
        "sales": 24.854
    }, {
        "rank": 40,
        "sales": 22.733333333333334
    }, {
        "rank": 50,
        "sales": 22.790000000000003
    }, {
        "rank": 60,
        "sales": 22.14
    }, {
        "rank": 70,
        "sales": 20.685
    }, {
        "rank": 80,
        "sales": 20.14
    }, {
        "rank": 90,
        "sales": 19.872
    }, {
        "rank": 100,
        "sales": 18.258
    }, {
        "rank": 200,
        "sales": 15.950333333333333
    }, {
        "rank": 300,
        "sales": 12.790666666666668
    }, {
        "rank": 400,
        "sales": 10.776666666666667
    }, {
        "rank": 500,
        "sales": 8.228
    }, {
        "rank": 600,
        "sales": 7.484666666666667
    }, {
        "rank": 700,
        "sales": 6.760000000000001
    }, {
        "rank": 800,
        "sales": 6.758
    }, {
        "rank": 900,
        "sales": 6.086
    }, {
        "rank": 1000,
        "sales": 6.191999999999999
    }, {
        "rank": 2000,
        "sales": 4.208666666666667
    }, {
        "rank": 3000,
        "sales": 3.4596666666666667
    }, {
        "rank": 4000,
        "sales": 3.1246666666666667
    }, {
        "rank": 5000,
        "sales": 2.8
    }, {
        "rank": 6000,
        "sales": 2.6853333333333333
    }, {
        "rank": 7000,
        "sales": 2.592
    }, {
        "rank": 8000,
        "sales": 2.415
    }, {
        "rank": 9000,
        "sales": 2.2
    }, {
        "rank": 10000,
        "sales": 2.247
    }, {
        "rank": 20000,
        "sales": 1.3910000000000002
    }, {
        "rank": 30000,
        "sales": 0.9013333333333333
    }, {
        "rank": 40000,
        "sales": 0.646
    }, {
        "rank": 50000,
        "sales": 0.5086666666666667
    }, {
        "rank": 60000,
        "sales": 0.33666666666666667
    }, {
        "rank": 70000,
        "sales": 0.2853333333333333
    }, {
        "rank": 80000,
        "sales": 0.2
    }, {
        "rank": 90000,
        "sales": 0
    }]
},
"amazon.es": {
    "Bebé": [{
        "rank": 1,
        "sales": 65.1
    }, {
        "rank": 2,
        "sales": 57.888000000000005
    }, {
        "rank": 3,
        "sales": 51.90466666666667
    }, {
        "rank": 4,
        "sales": 46.716
    }, {
        "rank": 5,
        "sales": 45.17066666666666
    }, {
        "rank": 6,
        "sales": 43.61
    }, {
        "rank": 7,
        "sales": 40.766
    }, {
        "rank": 8,
        "sales": 40.565000000000005
    }, {
        "rank": 9,
        "sales": 38.59066666666667
    }, {
        "rank": 10,
        "sales": 38.65466666666667
    }, {
        "rank": 20,
        "sales": 31.003
    }, {
        "rank": 30,
        "sales": 27.432333333333336
    }, {
        "rank": 40,
        "sales": 24.576666666666664
    }, {
        "rank": 50,
        "sales": 24.634
    }, {
        "rank": 60,
        "sales": 22.507333333333335
    }, {
        "rank": 70,
        "sales": 20.133333333333333
    }, {
        "rank": 80,
        "sales": 19.741666666666667
    }, {
        "rank": 90,
        "sales": 19.652333333333335
    }, {
        "rank": 100,
        "sales": 18.726666666666667
    }, {
        "rank": 200,
        "sales": 12.308
    }, {
        "rank": 300,
        "sales": 9.475999999999999
    }, {
        "rank": 400,
        "sales": 8.617666666666667
    }, {
        "rank": 500,
        "sales": 8.077333333333334
    }, {
        "rank": 600,
        "sales": 7.412000000000001
    }, {
        "rank": 700,
        "sales": 7.14
    }, {
        "rank": 800,
        "sales": 6.4479999999999995
    }, {
        "rank": 900,
        "sales": 5.928
    }, {
        "rank": 1000,
        "sales": 5.6353333333333335
    }, {
        "rank": 2000,
        "sales": 2.6146666666666665
    }, {
        "rank": 3000,
        "sales": 1.53
    }, {
        "rank": 4000,
        "sales": 0.9956666666666667
    }, {
        "rank": 5000,
        "sales": 0.6586666666666667
    }, {
        "rank": 6000,
        "sales": 0.42400000000000004
    }, {
        "rank": 7000,
        "sales": 0.23333333333333334
    }, {
        "rank": 8000,
        "sales": 0
    }],
    "Belleza": [{
        "rank": 1,
        "sales": 71.28
    }, {
        "rank": 2,
        "sales": 62.78733333333333
    }, {
        "rank": 3,
        "sales": 58.794666666666664
    }, {
        "rank": 4,
        "sales": 54.452666666666666
    }, {
        "rank": 5,
        "sales": 53.91866666666667
    }, {
        "rank": 6,
        "sales": 52.715333333333334
    }, {
        "rank": 7,
        "sales": 52.28366666666667
    }, {
        "rank": 8,
        "sales": 47.30166666666666
    }, {
        "rank": 9,
        "sales": 49.958333333333336
    }, {
        "rank": 10,
        "sales": 44.96666666666667
    }, {
        "rank": 20,
        "sales": 40.188
    }, {
        "rank": 30,
        "sales": 39.60333333333333
    }, {
        "rank": 40,
        "sales": 32.06666666666667
    }, {
        "rank": 50,
        "sales": 22.969
    }, {
        "rank": 60,
        "sales": 21.041666666666668
    }, {
        "rank": 70,
        "sales": 20.22233333333333
    }, {
        "rank": 80,
        "sales": 19.192333333333334
    }, {
        "rank": 90,
        "sales": 18.832666666666668
    }, {
        "rank": 100,
        "sales": 18.396
    }, {
        "rank": 200,
        "sales": 7.21
    }, {
        "rank": 300,
        "sales": 6.798
    }, {
        "rank": 400,
        "sales": 6.586666666666667
    }, {
        "rank": 500,
        "sales": 6.317333333333334
    }, {
        "rank": 600,
        "sales": 6.444
    }, {
        "rank": 700,
        "sales": 5.8580000000000005
    }, {
        "rank": 800,
        "sales": 6.099
    }, {
        "rank": 900,
        "sales": 6.048
    }, {
        "rank": 1000,
        "sales": 5.9399999999999995
    }, {
        "rank": 2000,
        "sales": 5.194
    }, {
        "rank": 3000,
        "sales": 4.922
    }, {
        "rank": 4000,
        "sales": 4.444
    }, {
        "rank": 5000,
        "sales": 4.318
    }, {
        "rank": 6000,
        "sales": 4.428
    }, {
        "rank": 7000,
        "sales": 4.13
    }, {
        "rank": 8000,
        "sales": 3.8133333333333335
    }, {
        "rank": 9000,
        "sales": 3.604
    }, {
        "rank": 10000,
        "sales": 3.36
    }, {
        "rank": 20000,
        "sales": 2.04
    }, {
        "rank": 30000,
        "sales": 1.4763333333333333
    }, {
        "rank": 40000,
        "sales": 1.0666666666666667
    }, {
        "rank": 50000,
        "sales": 0.8333333333333334
    }, {
        "rank": 60000,
        "sales": 0.7266666666666667
    }, {
        "rank": 70000,
        "sales": 0.5386666666666666
    }, {
        "rank": 80000,
        "sales": 0.4376666666666667
    }, {
        "rank": 90000,
        "sales": 0.39966666666666667
    }, {
        "rank": 100000,
        "sales": 0.3
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Bricolaje y herramientas": [{
        "rank": 1,
        "sales": 70.72
    }, {
        "rank": 2,
        "sales": 60.2
    }, {
        "rank": 3,
        "sales": 57.50833333333333
    }, {
        "rank": 4,
        "sales": 57.059999999999995
    }, {
        "rank": 5,
        "sales": 54.142
    }, {
        "rank": 6,
        "sales": 53.15566666666667
    }, {
        "rank": 7,
        "sales": 51.52066666666666
    }, {
        "rank": 8,
        "sales": 49.68
    }, {
        "rank": 9,
        "sales": 47.11
    }, {
        "rank": 10,
        "sales": 43.86666666666667
    }, {
        "rank": 20,
        "sales": 38.76233333333333
    }, {
        "rank": 30,
        "sales": 34.57566666666666
    }, {
        "rank": 40,
        "sales": 34.133
    }, {
        "rank": 50,
        "sales": 31.941333333333333
    }, {
        "rank": 60,
        "sales": 31.032
    }, {
        "rank": 70,
        "sales": 29.255999999999997
    }, {
        "rank": 80,
        "sales": 29.03033333333333
    }, {
        "rank": 90,
        "sales": 27.055
    }, {
        "rank": 100,
        "sales": 26.53533333333333
    }, {
        "rank": 200,
        "sales": 20.528666666666666
    }, {
        "rank": 300,
        "sales": 13.635
    }, {
        "rank": 400,
        "sales": 13.879333333333333
    }, {
        "rank": 500,
        "sales": 13.225333333333333
    }, {
        "rank": 600,
        "sales": 12.716666666666667
    }, {
        "rank": 700,
        "sales": 11.717333333333332
    }, {
        "rank": 800,
        "sales": 11.589333333333334
    }, {
        "rank": 900,
        "sales": 10.986666666666668
    }, {
        "rank": 1000,
        "sales": 11.024000000000001
    }, {
        "rank": 2000,
        "sales": 7.834666666666666
    }, {
        "rank": 3000,
        "sales": 4.915333333333334
    }, {
        "rank": 4000,
        "sales": 4.7379999999999995
    }, {
        "rank": 5000,
        "sales": 4.532
    }, {
        "rank": 6000,
        "sales": 4.360333333333333
    }, {
        "rank": 7000,
        "sales": 4.468999999999999
    }, {
        "rank": 8000,
        "sales": 3.966666666666667
    }, {
        "rank": 9000,
        "sales": 3.703333333333333
    }, {
        "rank": 10000,
        "sales": 3.4339999999999997
    }, {
        "rank": 20000,
        "sales": 2.12
    }, {
        "rank": 30000,
        "sales": 1.4400000000000002
    }, {
        "rank": 40000,
        "sales": 0.98
    }, {
        "rank": 50000,
        "sales": 0.7070000000000001
    }, {
        "rank": 60000,
        "sales": 0.52
    }, {
        "rank": 70000,
        "sales": 0.3703333333333333
    }, {
        "rank": 80000,
        "sales": 0.327
    }, {
        "rank": 90000,
        "sales": 0.206
    }, {
        "rank": 100000,
        "sales": 0.16666666666666666
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Coche y moto": [{
        "rank": 1,
        "sales": 28.89
    }, {
        "rank": 2,
        "sales": 24.5
    }, {
        "rank": 3,
        "sales": 24.450666666666667
    }, {
        "rank": 4,
        "sales": 23.868
    }, {
        "rank": 5,
        "sales": 23.28966666666667
    }, {
        "rank": 6,
        "sales": 22.428
    }, {
        "rank": 7,
        "sales": 21.887999999999998
    }, {
        "rank": 8,
        "sales": 20.23
    }, {
        "rank": 9,
        "sales": 19.855999999999998
    }, {
        "rank": 10,
        "sales": 20.85533333333333
    }, {
        "rank": 20,
        "sales": 18.566333333333333
    }, {
        "rank": 30,
        "sales": 16.184
    }, {
        "rank": 40,
        "sales": 15.217333333333332
    }, {
        "rank": 50,
        "sales": 15.443666666666667
    }, {
        "rank": 60,
        "sales": 14.873
    }, {
        "rank": 70,
        "sales": 13.328
    }, {
        "rank": 80,
        "sales": 12.985000000000001
    }, {
        "rank": 90,
        "sales": 11.766666666666667
    }, {
        "rank": 100,
        "sales": 12.019666666666668
    }, {
        "rank": 200,
        "sales": 7.072
    }, {
        "rank": 300,
        "sales": 6.690666666666667
    }, {
        "rank": 400,
        "sales": 6.536666666666666
    }, {
        "rank": 500,
        "sales": 6.026333333333333
    }, {
        "rank": 600,
        "sales": 6.09
    }, {
        "rank": 700,
        "sales": 5.723333333333333
    }, {
        "rank": 800,
        "sales": 5.754666666666666
    }, {
        "rank": 900,
        "sales": 5.596333333333333
    }, {
        "rank": 1000,
        "sales": 5.386666666666667
    }, {
        "rank": 2000,
        "sales": 4.017
    }, {
        "rank": 3000,
        "sales": 3.7800000000000002
    }, {
        "rank": 4000,
        "sales": 3.5243333333333333
    }, {
        "rank": 5000,
        "sales": 3.1243333333333334
    }, {
        "rank": 6000,
        "sales": 3.0883333333333334
    }, {
        "rank": 7000,
        "sales": 2.652
    }, {
        "rank": 8000,
        "sales": 2.652333333333333
    }, {
        "rank": 9000,
        "sales": 2.323
    }, {
        "rank": 10000,
        "sales": 2.3400000000000003
    }, {
        "rank": 20000,
        "sales": 1.5479999999999998
    }, {
        "rank": 30000,
        "sales": 1.1626666666666667
    }, {
        "rank": 40000,
        "sales": 0.8583333333333333
    }, {
        "rank": 50000,
        "sales": 0.7
    }, {
        "rank": 60000,
        "sales": 0.5950000000000001
    }, {
        "rank": 70000,
        "sales": 0.49933333333333335
    }, {
        "rank": 80000,
        "sales": 0.41600000000000004
    }, {
        "rank": 90000,
        "sales": 0.3333333333333333
    }, {
        "rank": 100000,
        "sales": 0.3
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Deportes y aire libre": [{
        "rank": 1,
        "sales": 76.3
    }, {
        "rank": 2,
        "sales": 67.32
    }, {
        "rank": 3,
        "sales": 61.51533333333334
    }, {
        "rank": 4,
        "sales": 60.059
    }, {
        "rank": 5,
        "sales": 56.56733333333333
    }, {
        "rank": 6,
        "sales": 55.662666666666674
    }, {
        "rank": 7,
        "sales": 50.06233333333333
    }, {
        "rank": 8,
        "sales": 51.198
    }, {
        "rank": 9,
        "sales": 49.088
    }, {
        "rank": 10,
        "sales": 46.662
    }, {
        "rank": 20,
        "sales": 43.2
    }, {
        "rank": 30,
        "sales": 38.064
    }, {
        "rank": 40,
        "sales": 35.63733333333333
    }, {
        "rank": 50,
        "sales": 32.825
    }, {
        "rank": 60,
        "sales": 32.655
    }, {
        "rank": 70,
        "sales": 32.028666666666666
    }, {
        "rank": 80,
        "sales": 29.546
    }, {
        "rank": 90,
        "sales": 30.067
    }, {
        "rank": 100,
        "sales": 27.333333333333332
    }, {
        "rank": 200,
        "sales": 22.995
    }, {
        "rank": 300,
        "sales": 15.857
    }, {
        "rank": 400,
        "sales": 13.770000000000001
    }, {
        "rank": 500,
        "sales": 13.879333333333333
    }, {
        "rank": 600,
        "sales": 12.342
    }, {
        "rank": 700,
        "sales": 11.6
    }, {
        "rank": 800,
        "sales": 11.389999999999999
    }, {
        "rank": 900,
        "sales": 11.197333333333335
    }, {
        "rank": 1000,
        "sales": 10.99
    }, {
        "rank": 2000,
        "sales": 8.417333333333334
    }, {
        "rank": 3000,
        "sales": 5.487666666666667
    }, {
        "rank": 4000,
        "sales": 3.9866666666666664
    }, {
        "rank": 5000,
        "sales": 3.811
    }, {
        "rank": 6000,
        "sales": 3.780666666666667
    }, {
        "rank": 7000,
        "sales": 3.6746666666666665
    }, {
        "rank": 8000,
        "sales": 3.6696666666666666
    }, {
        "rank": 9000,
        "sales": 3.4979999999999998
    }, {
        "rank": 10000,
        "sales": 3.2333333333333334
    }, {
        "rank": 20000,
        "sales": 2.508666666666667
    }, {
        "rank": 30000,
        "sales": 1.7833333333333334
    }, {
        "rank": 40000,
        "sales": 1.332
    }, {
        "rank": 50000,
        "sales": 0.9666666666666667
    }, {
        "rank": 60000,
        "sales": 0.828
    }, {
        "rank": 70000,
        "sales": 0.63
    }, {
        "rank": 80000,
        "sales": 0.504
    }, {
        "rank": 90000,
        "sales": 0.396
    }, {
        "rank": 100000,
        "sales": 0.3
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Electrónica": [{
        "rank": 1,
        "sales": 173.4
    }, {
        "rank": 2,
        "sales": 152.5773333333333
    }, {
        "rank": 3,
        "sales": 140.11433333333335
    }, {
        "rank": 4,
        "sales": 139.26566666666668
    }, {
        "rank": 5,
        "sales": 130.04066666666668
    }, {
        "rank": 6,
        "sales": 118.898
    }, {
        "rank": 7,
        "sales": 112.43333333333334
    }, {
        "rank": 8,
        "sales": 111.11200000000001
    }, {
        "rank": 9,
        "sales": 114.336
    }, {
        "rank": 10,
        "sales": 108.325
    }, {
        "rank": 20,
        "sales": 88.02600000000001
    }, {
        "rank": 30,
        "sales": 79.44733333333333
    }, {
        "rank": 40,
        "sales": 75.22466666666666
    }, {
        "rank": 50,
        "sales": 68.98666666666666
    }, {
        "rank": 60,
        "sales": 66.42666666666666
    }, {
        "rank": 70,
        "sales": 62.05333333333333
    }, {
        "rank": 80,
        "sales": 61.668
    }, {
        "rank": 90,
        "sales": 58.743
    }, {
        "rank": 100,
        "sales": 55.08533333333333
    }, {
        "rank": 200,
        "sales": 37.8
    }, {
        "rank": 300,
        "sales": 21.816
    }, {
        "rank": 400,
        "sales": 15.2
    }, {
        "rank": 500,
        "sales": 12.428666666666667
    }, {
        "rank": 600,
        "sales": 10.3
    }, {
        "rank": 700,
        "sales": 10.140666666666668
    }, {
        "rank": 800,
        "sales": 9.808333333333334
    }, {
        "rank": 900,
        "sales": 9.044
    }, {
        "rank": 1000,
        "sales": 8.909333333333333
    }, {
        "rank": 2000,
        "sales": 6.933333333333334
    }, {
        "rank": 3000,
        "sales": 5.253
    }, {
        "rank": 4000,
        "sales": 4.298666666666667
    }, {
        "rank": 5000,
        "sales": 3.4650000000000003
    }, {
        "rank": 6000,
        "sales": 2.727
    }, {
        "rank": 7000,
        "sales": 2.2333333333333334
    }, {
        "rank": 8000,
        "sales": 1.8666666666666667
    }, {
        "rank": 9000,
        "sales": 1.6763333333333332
    }, {
        "rank": 10000,
        "sales": 1.3466666666666667
    }, {
        "rank": 20000,
        "sales": 0.23333333333333334
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Equipaje": [{
        "rank": 1,
        "sales": 74.46000000000001
    }, {
        "rank": 2,
        "sales": 66.14399999999999
    }, {
        "rank": 3,
        "sales": 59.43
    }, {
        "rank": 4,
        "sales": 54.73866666666667
    }, {
        "rank": 5,
        "sales": 52.15
    }, {
        "rank": 6,
        "sales": 51.557
    }, {
        "rank": 7,
        "sales": 46.274
    }, {
        "rank": 8,
        "sales": 45.010999999999996
    }, {
        "rank": 9,
        "sales": 45.22533333333333
    }, {
        "rank": 10,
        "sales": 41
    }, {
        "rank": 20,
        "sales": 35.48833333333334
    }, {
        "rank": 30,
        "sales": 29.256333333333334
    }, {
        "rank": 40,
        "sales": 27.21333333333333
    }, {
        "rank": 50,
        "sales": 24.307333333333336
    }, {
        "rank": 60,
        "sales": 23.106333333333335
    }, {
        "rank": 70,
        "sales": 21.311
    }, {
        "rank": 80,
        "sales": 21.564
    }, {
        "rank": 90,
        "sales": 19.759999999999998
    }, {
        "rank": 100,
        "sales": 18.166666666666668
    }, {
        "rank": 200,
        "sales": 13.520000000000001
    }, {
        "rank": 300,
        "sales": 10.985333333333333
    }, {
        "rank": 400,
        "sales": 8.845333333333334
    }, {
        "rank": 500,
        "sales": 6.800666666666667
    }, {
        "rank": 600,
        "sales": 4.466666666666667
    }, {
        "rank": 700,
        "sales": 4.06
    }, {
        "rank": 800,
        "sales": 3.885
    }, {
        "rank": 900,
        "sales": 3.7093333333333334
    }, {
        "rank": 1000,
        "sales": 3.64
    }, {
        "rank": 2000,
        "sales": 2.4733333333333336
    }, {
        "rank": 3000,
        "sales": 1.498
    }, {
        "rank": 4000,
        "sales": 0.9186666666666666
    }, {
        "rank": 5000,
        "sales": 0.5493333333333333
    }, {
        "rank": 6000,
        "sales": 0.3433333333333334
    }, {
        "rank": 7000,
        "sales": 0.2
    }, {
        "rank": 8000,
        "sales": 0
    }],
    "Hogar": [{
        "rank": 1,
        "sales": 84.66000000000001
    }, {
        "rank": 2,
        "sales": 75.99
    }, {
        "rank": 3,
        "sales": 71.128
    }, {
        "rank": 4,
        "sales": 69.12533333333334
    }, {
        "rank": 5,
        "sales": 67.165
    }, {
        "rank": 6,
        "sales": 67.54366666666667
    }, {
        "rank": 7,
        "sales": 62.109
    }, {
        "rank": 8,
        "sales": 64.201
    }, {
        "rank": 9,
        "sales": 58.209666666666664
    }, {
        "rank": 10,
        "sales": 57.664
    }, {
        "rank": 20,
        "sales": 52.044999999999995
    }, {
        "rank": 30,
        "sales": 46.157000000000004
    }, {
        "rank": 40,
        "sales": 46.08133333333333
    }, {
        "rank": 50,
        "sales": 43.47
    }, {
        "rank": 60,
        "sales": 42.75333333333333
    }, {
        "rank": 70,
        "sales": 41.440000000000005
    }, {
        "rank": 80,
        "sales": 40.248000000000005
    }, {
        "rank": 90,
        "sales": 39.97
    }, {
        "rank": 100,
        "sales": 38.216
    }, {
        "rank": 200,
        "sales": 28.325
    }, {
        "rank": 300,
        "sales": 21.916999999999998
    }, {
        "rank": 400,
        "sales": 20.09
    }, {
        "rank": 500,
        "sales": 14.455
    }, {
        "rank": 600,
        "sales": 14.098
    }, {
        "rank": 700,
        "sales": 13.416
    }, {
        "rank": 800,
        "sales": 13.195
    }, {
        "rank": 900,
        "sales": 12.266666666666667
    }, {
        "rank": 1000,
        "sales": 12.360000000000001
    }, {
        "rank": 2000,
        "sales": 10.574000000000002
    }, {
        "rank": 3000,
        "sales": 8.921666666666665
    }, {
        "rank": 4000,
        "sales": 8.136000000000001
    }, {
        "rank": 5000,
        "sales": 6.614999999999999
    }, {
        "rank": 6000,
        "sales": 5.508
    }, {
        "rank": 7000,
        "sales": 5.026666666666667
    }, {
        "rank": 8000,
        "sales": 4.888
    }, {
        "rank": 9000,
        "sales": 4.932
    }, {
        "rank": 10000,
        "sales": 4.477666666666667
    }, {
        "rank": 20000,
        "sales": 3.4953333333333334
    }, {
        "rank": 30000,
        "sales": 2.45
    }, {
        "rank": 40000,
        "sales": 1.962
    }, {
        "rank": 50000,
        "sales": 1.4
    }, {
        "rank": 60000,
        "sales": 1.2126666666666668
    }, {
        "rank": 70000,
        "sales": 0.909
    }, {
        "rank": 80000,
        "sales": 0.7626666666666666
    }, {
        "rank": 90000,
        "sales": 0.6713333333333333
    }, {
        "rank": 100000,
        "sales": 0.5
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Iluminación": [{
        "rank": 1,
        "sales": 275.4
    }, {
        "rank": 2,
        "sales": 229.37233333333333
    }, {
        "rank": 3,
        "sales": 201.845
    }, {
        "rank": 4,
        "sales": 186.095
    }, {
        "rank": 5,
        "sales": 172.67466666666667
    }, {
        "rank": 6,
        "sales": 157.16666666666666
    }, {
        "rank": 7,
        "sales": 149.86666666666667
    }, {
        "rank": 8,
        "sales": 150.85
    }, {
        "rank": 9,
        "sales": 146.59799999999998
    }, {
        "rank": 10,
        "sales": 137.608
    }, {
        "rank": 20,
        "sales": 111.99333333333334
    }, {
        "rank": 30,
        "sales": 95.62233333333333
    }, {
        "rank": 40,
        "sales": 80.852
    }, {
        "rank": 50,
        "sales": 76.14333333333335
    }, {
        "rank": 60,
        "sales": 70.65566666666668
    }, {
        "rank": 70,
        "sales": 63.17333333333333
    }, {
        "rank": 80,
        "sales": 58.548
    }, {
        "rank": 90,
        "sales": 54.03333333333333
    }, {
        "rank": 100,
        "sales": 51.1
    }, {
        "rank": 200,
        "sales": 34.205333333333336
    }, {
        "rank": 300,
        "sales": 24.851999999999997
    }, {
        "rank": 400,
        "sales": 19.147666666666666
    }, {
        "rank": 500,
        "sales": 16.1
    }, {
        "rank": 600,
        "sales": 14.088333333333333
    }, {
        "rank": 700,
        "sales": 10.537666666666667
    }, {
        "rank": 800,
        "sales": 8.216
    }, {
        "rank": 900,
        "sales": 6.188
    }, {
        "rank": 1000,
        "sales": 5.215
    }, {
        "rank": 2000,
        "sales": 3.7453333333333334
    }, {
        "rank": 3000,
        "sales": 1.6
    }, {
        "rank": 4000,
        "sales": 0.7
    }, {
        "rank": 5000,
        "sales": 0.23333333333333334
    }, {
        "rank": 6000,
        "sales": 0
    }],
    "Industria, empresas y ciencia": [{
        "rank": 1,
        "sales": 56.16
    }, {
        "rank": 2,
        "sales": 46.662
    }, {
        "rank": 3,
        "sales": 46.01
    }, {
        "rank": 4,
        "sales": 43.21266666666667
    }, {
        "rank": 5,
        "sales": 41.055
    }, {
        "rank": 6,
        "sales": 39.99733333333334
    }, {
        "rank": 7,
        "sales": 37.73233333333334
    }, {
        "rank": 8,
        "sales": 36.38
    }, {
        "rank": 9,
        "sales": 37.27166666666667
    }, {
        "rank": 10,
        "sales": 36.827999999999996
    }, {
        "rank": 20,
        "sales": 31.49366666666667
    }, {
        "rank": 30,
        "sales": 27.169
    }, {
        "rank": 40,
        "sales": 27.144000000000002
    }, {
        "rank": 50,
        "sales": 23.833333333333332
    }, {
        "rank": 60,
        "sales": 22.766666666666666
    }, {
        "rank": 70,
        "sales": 23.214
    }, {
        "rank": 80,
        "sales": 22.225
    }, {
        "rank": 90,
        "sales": 21.970666666666666
    }, {
        "rank": 100,
        "sales": 20.765333333333334
    }, {
        "rank": 200,
        "sales": 15.970666666666666
    }, {
        "rank": 300,
        "sales": 12.845
    }, {
        "rank": 400,
        "sales": 10.989333333333333
    }, {
        "rank": 500,
        "sales": 8.772
    }, {
        "rank": 600,
        "sales": 7.035
    }, {
        "rank": 700,
        "sales": 5.385666666666666
    }, {
        "rank": 800,
        "sales": 5.278666666666667
    }, {
        "rank": 900,
        "sales": 5.304666666666666
    }, {
        "rank": 1000,
        "sales": 5.232
    }, {
        "rank": 2000,
        "sales": 4.466666666666667
    }, {
        "rank": 3000,
        "sales": 4.522666666666667
    }, {
        "rank": 4000,
        "sales": 4.174666666666666
    }, {
        "rank": 5000,
        "sales": 4.396333333333333
    }, {
        "rank": 6000,
        "sales": 3.7666666666666666
    }, {
        "rank": 7000,
        "sales": 3.675
    }, {
        "rank": 8000,
        "sales": 3.531
    }, {
        "rank": 9000,
        "sales": 3.258666666666667
    }, {
        "rank": 10000,
        "sales": 3.204
    }, {
        "rank": 20000,
        "sales": 2.1959999999999997
    }, {
        "rank": 30000,
        "sales": 1.7280000000000002
    }, {
        "rank": 40000,
        "sales": 1.3910000000000002
    }, {
        "rank": 50000,
        "sales": 1.144
    }, {
        "rank": 60000,
        "sales": 0.9426666666666667
    }, {
        "rank": 70000,
        "sales": 0.8480000000000001
    }, {
        "rank": 80000,
        "sales": 0.6666666666666666
    }, {
        "rank": 90000,
        "sales": 0.612
    }, {
        "rank": 100000,
        "sales": 0.544
    }, {
        "rank": 200000,
        "sales": 0.16666666666666666
    }, {
        "rank": 300000,
        "sales": 0
    }],
    "Informática": [{
        "rank": 1,
        "sales": 695.36
    }, {
        "rank": 2,
        "sales": 586.3473333333333
    }, {
        "rank": 3,
        "sales": 507.50100000000003
    }, {
        "rank": 4,
        "sales": 444.51366666666667
    }, {
        "rank": 5,
        "sales": 427.82166666666666
    }, {
        "rank": 6,
        "sales": 382.296
    }, {
        "rank": 7,
        "sales": 386.15066666666667
    }, {
        "rank": 8,
        "sales": 363.888
    }, {
        "rank": 9,
        "sales": 325.22
    }, {
        "rank": 10,
        "sales": 312.0226666666667
    }, {
        "rank": 20,
        "sales": 232.06433333333334
    }, {
        "rank": 30,
        "sales": 190.75533333333334
    }, {
        "rank": 40,
        "sales": 167.13466666666667
    }, {
        "rank": 50,
        "sales": 153.04566666666668
    }, {
        "rank": 60,
        "sales": 138.49200000000002
    }, {
        "rank": 70,
        "sales": 116.33333333333333
    }, {
        "rank": 80,
        "sales": 108.63000000000001
    }, {
        "rank": 90,
        "sales": 99.182
    }, {
        "rank": 100,
        "sales": 95.58500000000001
    }, {
        "rank": 200,
        "sales": 51.24066666666667
    }, {
        "rank": 300,
        "sales": 34.52066666666666
    }, {
        "rank": 400,
        "sales": 14.282666666666668
    }, {
        "rank": 500,
        "sales": 9.662333333333333
    }, {
        "rank": 600,
        "sales": 9.045333333333334
    }, {
        "rank": 700,
        "sales": 8.12
    }, {
        "rank": 800,
        "sales": 7.103666666666667
    }, {
        "rank": 900,
        "sales": 5.8100000000000005
    }, {
        "rank": 1000,
        "sales": 4.715999999999999
    }, {
        "rank": 2000,
        "sales": 0.2
    }, {
        "rank": 3000,
        "sales": 0
    }],
    "Instrumentos musicales": [{
        "rank": 1,
        "sales": 55.62
    }, {
        "rank": 2,
        "sales": 47.06666666666667
    }, {
        "rank": 3,
        "sales": 44.064
    }, {
        "rank": 4,
        "sales": 41.378
    }, {
        "rank": 5,
        "sales": 41.688
    }, {
        "rank": 6,
        "sales": 37.03333333333333
    }, {
        "rank": 7,
        "sales": 36.771
    }, {
        "rank": 8,
        "sales": 35.292
    }, {
        "rank": 9,
        "sales": 36.324
    }, {
        "rank": 10,
        "sales": 33.09433333333333
    }, {
        "rank": 20,
        "sales": 28.77
    }, {
        "rank": 30,
        "sales": 26.459999999999997
    }, {
        "rank": 40,
        "sales": 23.209333333333333
    }, {
        "rank": 50,
        "sales": 22.962666666666667
    }, {
        "rank": 60,
        "sales": 21.492
    }, {
        "rank": 70,
        "sales": 20.069333333333336
    }, {
        "rank": 80,
        "sales": 19.221333333333334
    }, {
        "rank": 90,
        "sales": 17.607666666666667
    }, {
        "rank": 100,
        "sales": 18.312
    }, {
        "rank": 200,
        "sales": 14.388
    }, {
        "rank": 300,
        "sales": 12.260666666666667
    }, {
        "rank": 400,
        "sales": 11.094666666666665
    }, {
        "rank": 500,
        "sales": 9.915333333333333
    }, {
        "rank": 600,
        "sales": 8.595666666666666
    }, {
        "rank": 700,
        "sales": 7.632000000000001
    }, {
        "rank": 800,
        "sales": 3.6333333333333333
    }, {
        "rank": 900,
        "sales": 3.0300000000000002
    }, {
        "rank": 1000,
        "sales": 2.516
    }, {
        "rank": 2000,
        "sales": 0.3
    }, {
        "rank": 3000,
        "sales": 0
    }],
    "Jardín": [{
        "rank": 1,
        "sales": 71.02
    }, {
        "rank": 2,
        "sales": 59.06666666666667
    }, {
        "rank": 3,
        "sales": 59.550333333333334
    }, {
        "rank": 4,
        "sales": 53.664
    }, {
        "rank": 5,
        "sales": 52.29333333333333
    }, {
        "rank": 6,
        "sales": 51.3
    }, {
        "rank": 7,
        "sales": 47.345666666666666
    }, {
        "rank": 8,
        "sales": 46.9
    }, {
        "rank": 9,
        "sales": 45.27466666666667
    }, {
        "rank": 10,
        "sales": 45.936
    }, {
        "rank": 20,
        "sales": 36.629333333333335
    }, {
        "rank": 30,
        "sales": 34.14666666666667
    }, {
        "rank": 40,
        "sales": 33.245
    }, {
        "rank": 50,
        "sales": 29.020666666666667
    }, {
        "rank": 60,
        "sales": 29.793333333333333
    }, {
        "rank": 70,
        "sales": 26.986
    }, {
        "rank": 80,
        "sales": 26.208000000000002
    }, {
        "rank": 90,
        "sales": 26.559666666666665
    }, {
        "rank": 100,
        "sales": 25.488
    }, {
        "rank": 200,
        "sales": 20.709999999999997
    }, {
        "rank": 300,
        "sales": 16.501333333333335
    }, {
        "rank": 400,
        "sales": 14.451333333333334
    }, {
        "rank": 500,
        "sales": 12.634666666666668
    }, {
        "rank": 600,
        "sales": 11.76
    }, {
        "rank": 700,
        "sales": 10.54
    }, {
        "rank": 800,
        "sales": 9.986666666666668
    }, {
        "rank": 900,
        "sales": 8.68
    }, {
        "rank": 1000,
        "sales": 7.622
    }, {
        "rank": 2000,
        "sales": 6.465999999999999
    }, {
        "rank": 3000,
        "sales": 5.845
    }, {
        "rank": 4000,
        "sales": 5.304
    }, {
        "rank": 5000,
        "sales": 4.9783333333333335
    }, {
        "rank": 6000,
        "sales": 4.410333333333333
    }, {
        "rank": 7000,
        "sales": 4.204666666666666
    }, {
        "rank": 8000,
        "sales": 3.996666666666667
    }, {
        "rank": 9000,
        "sales": 3.5686666666666667
    }, {
        "rank": 10000,
        "sales": 3.29
    }, {
        "rank": 20000,
        "sales": 1.8516666666666666
    }, {
        "rank": 30000,
        "sales": 1.3443333333333334
    }, {
        "rank": 40000,
        "sales": 0.8926666666666667
    }, {
        "rank": 50000,
        "sales": 0.6776666666666666
    }, {
        "rank": 60000,
        "sales": 0.49466666666666664
    }, {
        "rank": 70000,
        "sales": 0.3466666666666667
    }, {
        "rank": 80000,
        "sales": 0.28
    }, {
        "rank": 90000,
        "sales": 0.2
    }, {
        "rank": 100000,
        "sales": 0
    }],
    "Joyería": [{
        "rank": 1,
        "sales": 58.32
    }, {
        "rank": 2,
        "sales": 51.048
    }, {
        "rank": 3,
        "sales": 44.403999999999996
    }, {
        "rank": 4,
        "sales": 41
    }, {
        "rank": 5,
        "sales": 41.80133333333333
    }, {
        "rank": 6,
        "sales": 40.160666666666664
    }, {
        "rank": 7,
        "sales": 39.132
    }, {
        "rank": 8,
        "sales": 37.943999999999996
    }, {
        "rank": 9,
        "sales": 36.251999999999995
    }, {
        "rank": 10,
        "sales": 35.035
    }, {
        "rank": 20,
        "sales": 29.540000000000003
    }, {
        "rank": 30,
        "sales": 25.772
    }, {
        "rank": 40,
        "sales": 24.733333333333334
    }, {
        "rank": 50,
        "sales": 22.304
    }, {
        "rank": 60,
        "sales": 21.562666666666665
    }, {
        "rank": 70,
        "sales": 20.359666666666666
    }, {
        "rank": 80,
        "sales": 19.156333333333336
    }, {
        "rank": 90,
        "sales": 19.032
    }, {
        "rank": 100,
        "sales": 18.373333333333335
    }, {
        "rank": 200,
        "sales": 13.933333333333334
    }, {
        "rank": 300,
        "sales": 12.768666666666666
    }, {
        "rank": 400,
        "sales": 10.6
    }, {
        "rank": 500,
        "sales": 9.666666666666666
    }, {
        "rank": 600,
        "sales": 9.379999999999999
    }, {
        "rank": 700,
        "sales": 8.583333333333334
    }, {
        "rank": 800,
        "sales": 8.024
    }, {
        "rank": 900,
        "sales": 7.433333333333334
    }, {
        "rank": 1000,
        "sales": 7.066666666666666
    }, {
        "rank": 2000,
        "sales": 3.4676666666666667
    }, {
        "rank": 3000,
        "sales": 2.3400000000000003
    }, {
        "rank": 4000,
        "sales": 1.5546666666666666
    }, {
        "rank": 5000,
        "sales": 1.06
    }, {
        "rank": 6000,
        "sales": 0.763
    }, {
        "rank": 7000,
        "sales": 0.49466666666666664
    }, {
        "rank": 8000,
        "sales": 0.303
    }, {
        "rank": 9000,
        "sales": 0.2
    }, {
        "rank": 10000,
        "sales": 0
    }],
    "Juguetes y juegos": [{
        "rank": 1,
        "sales": 51.5
    }, {
        "rank": 2,
        "sales": 45.69766666666667
    }, {
        "rank": 3,
        "sales": 42.882666666666665
    }, {
        "rank": 4,
        "sales": 41.019999999999996
    }, {
        "rank": 5,
        "sales": 38.93066666666667
    }, {
        "rank": 6,
        "sales": 38.626999999999995
    }, {
        "rank": 7,
        "sales": 38.18633333333333
    }, {
        "rank": 8,
        "sales": 36.827999999999996
    }, {
        "rank": 9,
        "sales": 34.965
    }, {
        "rank": 10,
        "sales": 35.49766666666667
    }, {
        "rank": 20,
        "sales": 29.470000000000002
    }, {
        "rank": 30,
        "sales": 26.333666666666666
    }, {
        "rank": 40,
        "sales": 26.014666666666667
    }, {
        "rank": 50,
        "sales": 24.634
    }, {
        "rank": 60,
        "sales": 22.213666666666665
    }, {
        "rank": 70,
        "sales": 21.977333333333334
    }, {
        "rank": 80,
        "sales": 21.43566666666667
    }, {
        "rank": 90,
        "sales": 19.982000000000003
    }, {
        "rank": 100,
        "sales": 19.81
    }, {
        "rank": 200,
        "sales": 15.621333333333332
    }, {
        "rank": 300,
        "sales": 14.587666666666667
    }, {
        "rank": 400,
        "sales": 12.895999999999999
    }, {
        "rank": 500,
        "sales": 11.845
    }, {
        "rank": 600,
        "sales": 11.520333333333333
    }, {
        "rank": 700,
        "sales": 10.370000000000001
    }, {
        "rank": 800,
        "sales": 9.494
    }, {
        "rank": 900,
        "sales": 9.237666666666666
    }, {
        "rank": 1000,
        "sales": 8.409333333333333
    }, {
        "rank": 2000,
        "sales": 4.633333333333334
    }, {
        "rank": 3000,
        "sales": 4.759666666666666
    }, {
        "rank": 4000,
        "sales": 4.166666666666667
    }, {
        "rank": 5000,
        "sales": 4.033333333333333
    }, {
        "rank": 6000,
        "sales": 3.914
    }, {
        "rank": 7000,
        "sales": 3.924
    }, {
        "rank": 8000,
        "sales": 3.7093333333333334
    }, {
        "rank": 9000,
        "sales": 3.4
    }, {
        "rank": 10000,
        "sales": 3.4560000000000004
    }, {
        "rank": 20000,
        "sales": 2.312
    }, {
        "rank": 30000,
        "sales": 1.8903333333333334
    }, {
        "rank": 40000,
        "sales": 1.4906666666666666
    }, {
        "rank": 50000,
        "sales": 1.212
    }, {
        "rank": 60000,
        "sales": 1.0746666666666667
    }, {
        "rank": 70000,
        "sales": 0.972
    }, {
        "rank": 80000,
        "sales": 0.8640000000000001
    }, {
        "rank": 90000,
        "sales": 0.721
    }, {
        "rank": 100000,
        "sales": 0.6903333333333334
    }, {
        "rank": 200000,
        "sales": 0.23333333333333334
    }, {
        "rank": 300000,
        "sales": 0
    }],
    "Libros": [{
        "rank": 1,
        "sales": 32.32
    }, {
        "rank": 2,
        "sales": 28.490000000000002
    }, {
        "rank": 3,
        "sales": 25.445333333333334
    }, {
        "rank": 4,
        "sales": 24.444000000000003
    }, {
        "rank": 5,
        "sales": 23.217
    }, {
        "rank": 6,
        "sales": 21.412
    }, {
        "rank": 7,
        "sales": 20.686666666666667
    }, {
        "rank": 8,
        "sales": 19.866333333333333
    }, {
        "rank": 9,
        "sales": 19.54733333333333
    }, {
        "rank": 10,
        "sales": 17.333333333333332
    }, {
        "rank": 20,
        "sales": 13.937999999999999
    }, {
        "rank": 30,
        "sales": 12.888
    }, {
        "rank": 40,
        "sales": 11.2
    }, {
        "rank": 50,
        "sales": 10.317333333333332
    }, {
        "rank": 60,
        "sales": 9.756
    }, {
        "rank": 70,
        "sales": 8.602
    }, {
        "rank": 80,
        "sales": 8.488666666666667
    }, {
        "rank": 90,
        "sales": 8.025
    }, {
        "rank": 100,
        "sales": 7.347333333333333
    }, {
        "rank": 200,
        "sales": 5.180000000000001
    }, {
        "rank": 300,
        "sales": 4.0280000000000005
    }, {
        "rank": 400,
        "sales": 3.1310000000000002
    }, {
        "rank": 500,
        "sales": 2.8176666666666668
    }, {
        "rank": 600,
        "sales": 2.3689999999999998
    }, {
        "rank": 700,
        "sales": 2.0536666666666665
    }, {
        "rank": 800,
        "sales": 1.9616666666666667
    }, {
        "rank": 900,
        "sales": 1.7
    }, {
        "rank": 1000,
        "sales": 1.645
    }, {
        "rank": 2000,
        "sales": 0.8640000000000001
    }, {
        "rank": 3000,
        "sales": 0.43333333333333335
    }, {
        "rank": 4000,
        "sales": 0.26666666666666666
    }, {
        "rank": 5000,
        "sales": 0
    }],
    "Oficina y papelería": [{
        "rank": 1,
        "sales": 462.24
    }, {
        "rank": 2,
        "sales": 397.0506666666667
    }, {
        "rank": 3,
        "sales": 350.211
    }, {
        "rank": 4,
        "sales": 302.3
    }, {
        "rank": 5,
        "sales": 294.90933333333334
    }, {
        "rank": 6,
        "sales": 290.19599999999997
    }, {
        "rank": 7,
        "sales": 271.8546666666667
    }, {
        "rank": 8,
        "sales": 248.561
    }, {
        "rank": 9,
        "sales": 253.7326666666667
    }, {
        "rank": 10,
        "sales": 236.11033333333336
    }, {
        "rank": 20,
        "sales": 187.89333333333335
    }, {
        "rank": 30,
        "sales": 159.58133333333333
    }, {
        "rank": 40,
        "sales": 140.624
    }, {
        "rank": 50,
        "sales": 130.34666666666666
    }, {
        "rank": 60,
        "sales": 116.68866666666666
    }, {
        "rank": 70,
        "sales": 110.75933333333334
    }, {
        "rank": 80,
        "sales": 109.94466666666668
    }, {
        "rank": 90,
        "sales": 101.79266666666668
    }, {
        "rank": 100,
        "sales": 92.87166666666667
    }, {
        "rank": 200,
        "sales": 65.664
    }, {
        "rank": 300,
        "sales": 49.04266666666667
    }, {
        "rank": 400,
        "sales": 38.688
    }, {
        "rank": 500,
        "sales": 32.648
    }, {
        "rank": 600,
        "sales": 24.696
    }, {
        "rank": 700,
        "sales": 20.5
    }, {
        "rank": 800,
        "sales": 18.904
    }, {
        "rank": 900,
        "sales": 16.564
    }, {
        "rank": 1000,
        "sales": 15.732333333333335
    }, {
        "rank": 2000,
        "sales": 5.688666666666666
    }, {
        "rank": 3000,
        "sales": 2.322666666666667
    }, {
        "rank": 4000,
        "sales": 0.8126666666666666
    }, {
        "rank": 5000,
        "sales": 0.16666666666666666
    }, {
        "rank": 6000,
        "sales": 0
    }],
    "Películas y TV": [{
        "rank": 1,
        "sales": 9.09
    }, {
        "rank": 2,
        "sales": 7.9
    }, {
        "rank": 3,
        "sales": 7.884
    }, {
        "rank": 4,
        "sales": 7.278666666666667
    }, {
        "rank": 5,
        "sales": 6.7636666666666665
    }, {
        "rank": 6,
        "sales": 6.804
    }, {
        "rank": 7,
        "sales": 6.283
    }, {
        "rank": 8,
        "sales": 6.23
    }, {
        "rank": 9,
        "sales": 6.285666666666667
    }, {
        "rank": 10,
        "sales": 5.689666666666667
    }, {
        "rank": 20,
        "sales": 5.195666666666667
    }, {
        "rank": 30,
        "sales": 4.3
    }, {
        "rank": 40,
        "sales": 4.323666666666667
    }, {
        "rank": 50,
        "sales": 3.7706666666666666
    }, {
        "rank": 60,
        "sales": 3.604
    }, {
        "rank": 70,
        "sales": 3.4339999999999997
    }, {
        "rank": 80,
        "sales": 3.5606666666666666
    }, {
        "rank": 90,
        "sales": 3.3526666666666665
    }, {
        "rank": 100,
        "sales": 3.3063333333333333
    }, {
        "rank": 200,
        "sales": 2.652333333333333
    }, {
        "rank": 300,
        "sales": 2.1
    }, {
        "rank": 400,
        "sales": 1.8853333333333333
    }, {
        "rank": 500,
        "sales": 1.802
    }, {
        "rank": 600,
        "sales": 1.6606666666666667
    }, {
        "rank": 700,
        "sales": 1.5253333333333332
    }, {
        "rank": 800,
        "sales": 1.442
    }, {
        "rank": 900,
        "sales": 1.417
    }, {
        "rank": 1000,
        "sales": 1.2456666666666665
    }, {
        "rank": 2000,
        "sales": 0.8926666666666667
    }, {
        "rank": 3000,
        "sales": 0.6866666666666668
    }, {
        "rank": 4000,
        "sales": 0.5386666666666666
    }, {
        "rank": 5000,
        "sales": 0.49
    }, {
        "rank": 6000,
        "sales": 0.43200000000000005
    }, {
        "rank": 7000,
        "sales": 0.33666666666666667
    }, {
        "rank": 8000,
        "sales": 0.321
    }, {
        "rank": 9000,
        "sales": 0.2773333333333333
    }, {
        "rank": 10000,
        "sales": 0.23333333333333334
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Relojes": [{
        "rank": 1,
        "sales": 69.55
    }, {
        "rank": 2,
        "sales": 60.12
    }, {
        "rank": 3,
        "sales": 54.576
    }, {
        "rank": 4,
        "sales": 47.06666666666667
    }, {
        "rank": 5,
        "sales": 47.099333333333334
    }, {
        "rank": 6,
        "sales": 43.63766666666667
    }, {
        "rank": 7,
        "sales": 42.665
    }, {
        "rank": 8,
        "sales": 41.90833333333333
    }, {
        "rank": 9,
        "sales": 41.311
    }, {
        "rank": 10,
        "sales": 38.64
    }, {
        "rank": 20,
        "sales": 30.762666666666668
    }, {
        "rank": 30,
        "sales": 26.133333333333333
    }, {
        "rank": 40,
        "sales": 23.903333333333332
    }, {
        "rank": 50,
        "sales": 23.326
    }, {
        "rank": 60,
        "sales": 21.181333333333335
    }, {
        "rank": 70,
        "sales": 19.358333333333334
    }, {
        "rank": 80,
        "sales": 18.529999999999998
    }, {
        "rank": 90,
        "sales": 17.473000000000003
    }, {
        "rank": 100,
        "sales": 18.057666666666666
    }, {
        "rank": 200,
        "sales": 12.348
    }, {
        "rank": 300,
        "sales": 9.846333333333332
    }, {
        "rank": 400,
        "sales": 8.034
    }, {
        "rank": 500,
        "sales": 7.3116666666666665
    }, {
        "rank": 600,
        "sales": 5.974
    }, {
        "rank": 700,
        "sales": 5.005
    }, {
        "rank": 800,
        "sales": 4.14
    }, {
        "rank": 900,
        "sales": 3.8876666666666666
    }, {
        "rank": 1000,
        "sales": 3.71
    }, {
        "rank": 2000,
        "sales": 2.108
    }, {
        "rank": 3000,
        "sales": 1.212
    }, {
        "rank": 4000,
        "sales": 0.7420000000000001
    }, {
        "rank": 5000,
        "sales": 0.455
    }, {
        "rank": 6000,
        "sales": 0.23333333333333334
    }, {
        "rank": 7000,
        "sales": 0
    }],
    "Ropa y accesorios": [{
        "rank": 1,
        "sales": 27.040000000000003
    }, {
        "rank": 2,
        "sales": 23.263666666666666
    }, {
        "rank": 3,
        "sales": 23.326
    }, {
        "rank": 4,
        "sales": 22.090666666666667
    }, {
        "rank": 5,
        "sales": 19.982000000000003
    }, {
        "rank": 6,
        "sales": 20.196
    }, {
        "rank": 7,
        "sales": 19.040000000000003
    }, {
        "rank": 8,
        "sales": 17.84333333333333
    }, {
        "rank": 9,
        "sales": 17.922666666666665
    }, {
        "rank": 10,
        "sales": 16.866666666666667
    }, {
        "rank": 20,
        "sales": 15.514999999999999
    }, {
        "rank": 30,
        "sales": 14.256
    }, {
        "rank": 40,
        "sales": 12.669
    }, {
        "rank": 50,
        "sales": 12.331333333333333
    }, {
        "rank": 60,
        "sales": 11.1
    }, {
        "rank": 70,
        "sales": 10.986666666666668
    }, {
        "rank": 80,
        "sales": 11.124
    }, {
        "rank": 90,
        "sales": 10.791
    }, {
        "rank": 100,
        "sales": 9.485000000000001
    }, {
        "rank": 200,
        "sales": 5.032
    }, {
        "rank": 300,
        "sales": 5.123
    }, {
        "rank": 400,
        "sales": 4.749333333333333
    }, {
        "rank": 500,
        "sales": 4.566333333333334
    }, {
        "rank": 600,
        "sales": 4.6723333333333334
    }, {
        "rank": 700,
        "sales": 4.522666666666667
    }, {
        "rank": 800,
        "sales": 4.5360000000000005
    }, {
        "rank": 900,
        "sales": 4.25
    }, {
        "rank": 1000,
        "sales": 4.1819999999999995
    }, {
        "rank": 2000,
        "sales": 3.01
    }, {
        "rank": 3000,
        "sales": 2.686
    }, {
        "rank": 4000,
        "sales": 2.5406666666666666
    }, {
        "rank": 5000,
        "sales": 2.485
    }, {
        "rank": 6000,
        "sales": 2.2893333333333334
    }, {
        "rank": 7000,
        "sales": 2.3616666666666664
    }, {
        "rank": 8000,
        "sales": 2.247
    }, {
        "rank": 9000,
        "sales": 2.1959999999999997
    }, {
        "rank": 10000,
        "sales": 2.14
    }, {
        "rank": 20000,
        "sales": 1.4763333333333333
    }, {
        "rank": 30000,
        "sales": 1.2013333333333334
    }, {
        "rank": 40000,
        "sales": 1.0536666666666668
    }, {
        "rank": 50000,
        "sales": 0.8833333333333333
    }, {
        "rank": 60000,
        "sales": 0.7406666666666666
    }, {
        "rank": 70000,
        "sales": 0.6733333333333333
    }, {
        "rank": 80000,
        "sales": 0.648
    }, {
        "rank": 90000,
        "sales": 0.5760000000000001
    }, {
        "rank": 100000,
        "sales": 0.5
    }, {
        "rank": 200000,
        "sales": 0.23333333333333334
    }, {
        "rank": 300000,
        "sales": 0
    }],
    "Salud y cuidado personal": [{
        "rank": 1,
        "sales": 116.6
    }, {
        "rank": 2,
        "sales": 104.45833333333333
    }, {
        "rank": 3,
        "sales": 90.64
    }, {
        "rank": 4,
        "sales": 83.45966666666666
    }, {
        "rank": 5,
        "sales": 80.958
    }, {
        "rank": 6,
        "sales": 76.874
    }, {
        "rank": 7,
        "sales": 74.154
    }, {
        "rank": 8,
        "sales": 73.25066666666666
    }, {
        "rank": 9,
        "sales": 73.90799999999999
    }, {
        "rank": 10,
        "sales": 66.7
    }, {
        "rank": 20,
        "sales": 57.43966666666667
    }, {
        "rank": 30,
        "sales": 52.82333333333334
    }, {
        "rank": 40,
        "sales": 47.208333333333336
    }, {
        "rank": 50,
        "sales": 44.54666666666667
    }, {
        "rank": 60,
        "sales": 43.29933333333334
    }, {
        "rank": 70,
        "sales": 38.5
    }, {
        "rank": 80,
        "sales": 38.71
    }, {
        "rank": 90,
        "sales": 37.91366666666667
    }, {
        "rank": 100,
        "sales": 36.9
    }, {
        "rank": 200,
        "sales": 27.427666666666667
    }, {
        "rank": 300,
        "sales": 19.633333333333333
    }, {
        "rank": 400,
        "sales": 14.616000000000001
    }, {
        "rank": 500,
        "sales": 13.879333333333333
    }, {
        "rank": 600,
        "sales": 12.342
    }, {
        "rank": 700,
        "sales": 11.913666666666668
    }, {
        "rank": 800,
        "sales": 11.912666666666667
    }, {
        "rank": 900,
        "sales": 11.162666666666667
    }, {
        "rank": 1000,
        "sales": 11.232
    }, {
        "rank": 2000,
        "sales": 5.3773333333333335
    }, {
        "rank": 3000,
        "sales": 3.0300000000000002
    }, {
        "rank": 4000,
        "sales": 2.0493333333333332
    }, {
        "rank": 5000,
        "sales": 1.292
    }, {
        "rank": 6000,
        "sales": 0.856
    }, {
        "rank": 7000,
        "sales": 0.535
    }, {
        "rank": 8000,
        "sales": 0.321
    }, {
        "rank": 9000,
        "sales": 0.16666666666666666
    }, {
        "rank": 10000,
        "sales": 0
    }],
    "Software": [{
        "rank": 1,
        "sales": 23.23
    }, {
        "rank": 2,
        "sales": 21.376666666666665
    }, {
        "rank": 3,
        "sales": 19.680666666666664
    }, {
        "rank": 4,
        "sales": 19.075
    }, {
        "rank": 5,
        "sales": 17.701999999999998
    }, {
        "rank": 6,
        "sales": 17.316
    }, {
        "rank": 7,
        "sales": 15.965
    }, {
        "rank": 8,
        "sales": 15.183666666666666
    }, {
        "rank": 9,
        "sales": 15.072333333333335
    }, {
        "rank": 10,
        "sales": 15.550666666666666
    }, {
        "rank": 20,
        "sales": 13.032
    }, {
        "rank": 30,
        "sales": 11.7
    }, {
        "rank": 40,
        "sales": 10.836
    }, {
        "rank": 50,
        "sales": 9.870000000000001
    }, {
        "rank": 60,
        "sales": 8.933333333333334
    }, {
        "rank": 70,
        "sales": 8.96
    }, {
        "rank": 80,
        "sales": 8.656666666666666
    }, {
        "rank": 90,
        "sales": 8.417333333333334
    }, {
        "rank": 100,
        "sales": 8.014999999999999
    }, {
        "rank": 200,
        "sales": 6.395333333333334
    }, {
        "rank": 300,
        "sales": 5.58
    }, {
        "rank": 400,
        "sales": 4.726
    }, {
        "rank": 500,
        "sales": 4.242
    }, {
        "rank": 600,
        "sales": 3.939
    }, {
        "rank": 700,
        "sales": 3.8866666666666663
    }, {
        "rank": 800,
        "sales": 3.71
    }, {
        "rank": 900,
        "sales": 3.466666666666667
    }, {
        "rank": 1000,
        "sales": 3.296
    }, {
        "rank": 2000,
        "sales": 2.390333333333333
    }, {
        "rank": 3000,
        "sales": 1.9333333333333333
    }, {
        "rank": 4000,
        "sales": 1.75
    }, {
        "rank": 5000,
        "sales": 1.5253333333333332
    }, {
        "rank": 6000,
        "sales": 1.3780000000000001
    }, {
        "rank": 7000,
        "sales": 1.2016666666666667
    }, {
        "rank": 8000,
        "sales": 1.0773333333333333
    }, {
        "rank": 9000,
        "sales": 0.986
    }, {
        "rank": 10000,
        "sales": 0.9269999999999999
    }, {
        "rank": 20000,
        "sales": 0.51
    }, {
        "rank": 30000,
        "sales": 0.31799999999999995
    }, {
        "rank": 40000,
        "sales": 0.2
    }, {
        "rank": 50000,
        "sales": 0
    }],
    "Supermercado": [{
        "rank": 1,
        "sales": 124.95
    }, {
        "rank": 2,
        "sales": 109.889
    }, {
        "rank": 3,
        "sales": 94.67066666666666
    }, {
        "rank": 4,
        "sales": 95.484
    }, {
        "rank": 5,
        "sales": 85.49
    }, {
        "rank": 6,
        "sales": 82.50666666666666
    }, {
        "rank": 7,
        "sales": 80.115
    }, {
        "rank": 8,
        "sales": 79.632
    }, {
        "rank": 9,
        "sales": 72.896
    }, {
        "rank": 10,
        "sales": 75.06
    }, {
        "rank": 20,
        "sales": 60.059999999999995
    }, {
        "rank": 30,
        "sales": 51.544
    }, {
        "rank": 40,
        "sales": 47.483
    }, {
        "rank": 50,
        "sales": 42.766666666666666
    }, {
        "rank": 60,
        "sales": 42.541333333333334
    }, {
        "rank": 70,
        "sales": 39.14
    }, {
        "rank": 80,
        "sales": 37.251666666666665
    }, {
        "rank": 90,
        "sales": 34.946000000000005
    }, {
        "rank": 100,
        "sales": 34.230333333333334
    }, {
        "rank": 200,
        "sales": 26.642999999999997
    }, {
        "rank": 300,
        "sales": 21.424
    }, {
        "rank": 400,
        "sales": 18.832666666666668
    }, {
        "rank": 500,
        "sales": 16.048
    }, {
        "rank": 600,
        "sales": 15.016666666666667
    }, {
        "rank": 700,
        "sales": 13.175999999999998
    }, {
        "rank": 800,
        "sales": 10.5
    }, {
        "rank": 900,
        "sales": 9.810666666666666
    }, {
        "rank": 1000,
        "sales": 9.395999999999999
    }, {
        "rank": 2000,
        "sales": 4.680000000000001
    }, {
        "rank": 3000,
        "sales": 3.8513333333333337
    }, {
        "rank": 4000,
        "sales": 2.7976666666666667
    }, {
        "rank": 5000,
        "sales": 1.8853333333333333
    }, {
        "rank": 6000,
        "sales": 1.3666666666666667
    }, {
        "rank": 7000,
        "sales": 1.054
    }, {
        "rank": 8000,
        "sales": 0.7973333333333333
    }, {
        "rank": 9000,
        "sales": 0.612
    }, {
        "rank": 10000,
        "sales": 0.4
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Videojuegos": [{
        "rank": 1,
        "sales": 143.42000000000002
    }, {
        "rank": 2,
        "sales": 129.042
    }, {
        "rank": 3,
        "sales": 114.345
    }, {
        "rank": 4,
        "sales": 103.99566666666666
    }, {
        "rank": 5,
        "sales": 102.6
    }, {
        "rank": 6,
        "sales": 91.16933333333333
    }, {
        "rank": 7,
        "sales": 88.09400000000001
    }, {
        "rank": 8,
        "sales": 89.712
    }, {
        "rank": 9,
        "sales": 87.41799999999999
    }, {
        "rank": 10,
        "sales": 78.44333333333334
    }, {
        "rank": 20,
        "sales": 67.032
    }, {
        "rank": 30,
        "sales": 55.37966666666667
    }, {
        "rank": 40,
        "sales": 52.092
    }, {
        "rank": 50,
        "sales": 48.105333333333334
    }, {
        "rank": 60,
        "sales": 42.16133333333333
    }, {
        "rank": 70,
        "sales": 39.1
    }, {
        "rank": 80,
        "sales": 36.49466666666667
    }, {
        "rank": 90,
        "sales": 34.233333333333334
    }, {
        "rank": 100,
        "sales": 34.230000000000004
    }, {
        "rank": 200,
        "sales": 23.483999999999998
    }, {
        "rank": 300,
        "sales": 17.992
    }, {
        "rank": 400,
        "sales": 14.516333333333334
    }, {
        "rank": 500,
        "sales": 11.633333333333333
    }, {
        "rank": 600,
        "sales": 10.573333333333332
    }, {
        "rank": 700,
        "sales": 8.533999999999999
    }, {
        "rank": 800,
        "sales": 7.484666666666667
    }, {
        "rank": 900,
        "sales": 6.02
    }, {
        "rank": 1000,
        "sales": 5.2683333333333335
    }, {
        "rank": 2000,
        "sales": 1.1900000000000002
    }, {
        "rank": 3000,
        "sales": 0.16666666666666666
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Zapatos y complementos": [{
        "rank": 1,
        "sales": 27
    }, {
        "rank": 2,
        "sales": 25.524
    }, {
        "rank": 3,
        "sales": 22.38533333333333
    }, {
        "rank": 4,
        "sales": 20.875999999999998
    }, {
        "rank": 5,
        "sales": 20.475
    }, {
        "rank": 6,
        "sales": 19.67
    }, {
        "rank": 7,
        "sales": 19.548000000000002
    }, {
        "rank": 8,
        "sales": 17.884
    }, {
        "rank": 9,
        "sales": 18.432000000000002
    }, {
        "rank": 10,
        "sales": 17.465
    }, {
        "rank": 20,
        "sales": 15.26
    }, {
        "rank": 30,
        "sales": 12.692333333333332
    }, {
        "rank": 40,
        "sales": 12.18
    }, {
        "rank": 50,
        "sales": 11.881
    }, {
        "rank": 60,
        "sales": 10.815
    }, {
        "rank": 70,
        "sales": 9.931666666666667
    }, {
        "rank": 80,
        "sales": 9.622000000000002
    }, {
        "rank": 90,
        "sales": 9.282
    }, {
        "rank": 100,
        "sales": 8.854333333333333
    }, {
        "rank": 200,
        "sales": 7.037999999999999
    }, {
        "rank": 300,
        "sales": 6.194999999999999
    }, {
        "rank": 400,
        "sales": 5.652
    }, {
        "rank": 500,
        "sales": 4.840999999999999
    }, {
        "rank": 600,
        "sales": 4.41
    }, {
        "rank": 700,
        "sales": 3.957333333333333
    }, {
        "rank": 800,
        "sales": 3.432
    }, {
        "rank": 900,
        "sales": 3.1446666666666667
    }, {
        "rank": 1000,
        "sales": 3.01
    }, {
        "rank": 2000,
        "sales": 2.288
    }, {
        "rank": 3000,
        "sales": 2.034666666666667
    }, {
        "rank": 4000,
        "sales": 1.7280000000000002
    }, {
        "rank": 5000,
        "sales": 1.4280000000000002
    }, {
        "rank": 6000,
        "sales": 1.3299999999999998
    }, {
        "rank": 7000,
        "sales": 1.1783333333333335
    }, {
        "rank": 8000,
        "sales": 1.1626666666666667
    }, {
        "rank": 9000,
        "sales": 0.9956666666666667
    }, {
        "rank": 10000,
        "sales": 0.9
    }, {
        "rank": 20000,
        "sales": 0.4666666666666667
    }, {
        "rank": 30000,
        "sales": 0.28800000000000003
    }, {
        "rank": 40000,
        "sales": 0.16666666666666666
    }, {
        "rank": 50000,
        "sales": 0
    }]
},
"amazon.it": {
    "Abbigliamento": [{
        "rank": 1,
        "sales": 30.6
    }, {
        "rank": 2,
        "sales": 27.707666666666668
    }, {
        "rank": 3,
        "sales": 27.52466666666667
    }, {
        "rank": 4,
        "sales": 26.215
    }, {
        "rank": 5,
        "sales": 24.926
    }, {
        "rank": 6,
        "sales": 24.273666666666667
    }, {
        "rank": 7,
        "sales": 23.98933333333333
    }, {
        "rank": 8,
        "sales": 23.73
    }, {
        "rank": 9,
        "sales": 24.234333333333332
    }, {
        "rank": 10,
        "sales": 23.834666666666667
    }, {
        "rank": 20,
        "sales": 20.291
    }, {
        "rank": 30,
        "sales": 19.944000000000003
    }, {
        "rank": 40,
        "sales": 18.725
    }, {
        "rank": 50,
        "sales": 17.5
    }, {
        "rank": 60,
        "sales": 16.354
    }, {
        "rank": 70,
        "sales": 16.704
    }, {
        "rank": 80,
        "sales": 15.75
    }, {
        "rank": 90,
        "sales": 15.184
    }, {
        "rank": 100,
        "sales": 15.265333333333333
    }, {
        "rank": 200,
        "sales": 10.706
    }, {
        "rank": 300,
        "sales": 9.610666666666667
    }, {
        "rank": 400,
        "sales": 8.568000000000001
    }, {
        "rank": 500,
        "sales": 8.374
    }, {
        "rank": 600,
        "sales": 7.5
    }, {
        "rank": 700,
        "sales": 7.668333333333334
    }, {
        "rank": 800,
        "sales": 7.107
    }, {
        "rank": 900,
        "sales": 7.164
    }, {
        "rank": 1000,
        "sales": 6.819333333333334
    }, {
        "rank": 2000,
        "sales": 5.544
    }, {
        "rank": 3000,
        "sales": 2.8616666666666664
    }, {
        "rank": 4000,
        "sales": 2.4026666666666667
    }, {
        "rank": 5000,
        "sales": 1.957
    }, {
        "rank": 6000,
        "sales": 1.648
    }, {
        "rank": 7000,
        "sales": 1.4896666666666667
    }, {
        "rank": 8000,
        "sales": 1.296
    }, {
        "rank": 9000,
        "sales": 1.0746666666666667
    }, {
        "rank": 10000,
        "sales": 0.9613333333333334
    }, {
        "rank": 20000,
        "sales": 0.3
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Alimentari e cura della casa": [{
        "rank": 1,
        "sales": 61.95
    }, {
        "rank": 2,
        "sales": 53.373666666666665
    }, {
        "rank": 3,
        "sales": 43.934999999999995
    }, {
        "rank": 4,
        "sales": 39.833333333333336
    }, {
        "rank": 5,
        "sales": 39.326
    }, {
        "rank": 6,
        "sales": 35.632
    }, {
        "rank": 7,
        "sales": 33.166666666666664
    }, {
        "rank": 8,
        "sales": 32.3
    }, {
        "rank": 9,
        "sales": 33.099666666666664
    }, {
        "rank": 10,
        "sales": 31.279666666666667
    }, {
        "rank": 20,
        "sales": 23.637999999999998
    }, {
        "rank": 30,
        "sales": 19.973333333333336
    }, {
        "rank": 40,
        "sales": 17.767
    }, {
        "rank": 50,
        "sales": 15.586333333333334
    }, {
        "rank": 60,
        "sales": 13.668000000000001
    }, {
        "rank": 70,
        "sales": 13.572000000000001
    }, {
        "rank": 80,
        "sales": 12.697333333333335
    }, {
        "rank": 90,
        "sales": 12.168000000000001
    }, {
        "rank": 100,
        "sales": 11.305
    }, {
        "rank": 200,
        "sales": 7.616
    }, {
        "rank": 300,
        "sales": 5.168
    }, {
        "rank": 400,
        "sales": 4.16
    }, {
        "rank": 500,
        "sales": 3.4339999999999997
    }, {
        "rank": 600,
        "sales": 2.9963333333333333
    }, {
        "rank": 700,
        "sales": 2.834
    }, {
        "rank": 800,
        "sales": 2.3459999999999996
    }, {
        "rank": 900,
        "sales": 2.2319999999999998
    }, {
        "rank": 1000,
        "sales": 1.98
    }, {
        "rank": 2000,
        "sales": 0.654
    }, {
        "rank": 3000,
        "sales": 0.2
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Auto e Moto": [{
        "rank": 1,
        "sales": 35.97
    }, {
        "rank": 2,
        "sales": 29.727666666666668
    }, {
        "rank": 3,
        "sales": 27.433333333333334
    }, {
        "rank": 4,
        "sales": 28.37633333333333
    }, {
        "rank": 5,
        "sales": 25.75
    }, {
        "rank": 6,
        "sales": 25.133333333333333
    }, {
        "rank": 7,
        "sales": 25.344
    }, {
        "rank": 8,
        "sales": 24.696
    }, {
        "rank": 9,
        "sales": 22.590333333333334
    }, {
        "rank": 10,
        "sales": 23.433
    }, {
        "rank": 20,
        "sales": 19.759999999999998
    }, {
        "rank": 30,
        "sales": 17.748
    }, {
        "rank": 40,
        "sales": 17.115000000000002
    }, {
        "rank": 50,
        "sales": 16.585
    }, {
        "rank": 60,
        "sales": 14.981666666666666
    }, {
        "rank": 70,
        "sales": 14.586
    }, {
        "rank": 80,
        "sales": 14.008000000000001
    }, {
        "rank": 90,
        "sales": 13.68
    }, {
        "rank": 100,
        "sales": 12.46
    }, {
        "rank": 200,
        "sales": 6.733333333333333
    }, {
        "rank": 300,
        "sales": 6.84
    }, {
        "rank": 400,
        "sales": 6.283
    }, {
        "rank": 500,
        "sales": 6.018
    }, {
        "rank": 600,
        "sales": 6.191999999999999
    }, {
        "rank": 700,
        "sales": 5.6
    }, {
        "rank": 800,
        "sales": 5.665
    }, {
        "rank": 900,
        "sales": 5.7780000000000005
    }, {
        "rank": 1000,
        "sales": 5.724
    }, {
        "rank": 2000,
        "sales": 4.2443333333333335
    }, {
        "rank": 3000,
        "sales": 3.7449999999999997
    }, {
        "rank": 4000,
        "sales": 3.366
    }, {
        "rank": 5000,
        "sales": 3.162
    }, {
        "rank": 6000,
        "sales": 3.01
    }, {
        "rank": 7000,
        "sales": 2.8800000000000003
    }, {
        "rank": 8000,
        "sales": 2.5
    }, {
        "rank": 9000,
        "sales": 2.496666666666667
    }, {
        "rank": 10000,
        "sales": 2.31
    }, {
        "rank": 20000,
        "sales": 1.462
    }, {
        "rank": 30000,
        "sales": 1.1093333333333333
    }, {
        "rank": 40000,
        "sales": 0.85
    }, {
        "rank": 50000,
        "sales": 0.6866666666666668
    }, {
        "rank": 60000,
        "sales": 0.5723333333333334
    }, {
        "rank": 70000,
        "sales": 0.504
    }, {
        "rank": 80000,
        "sales": 0.42
    }, {
        "rank": 90000,
        "sales": 0.33999999999999997
    }, {
        "rank": 100000,
        "sales": 0.3
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Bellezza": [{
        "rank": 1,
        "sales": 93.96000000000001
    }, {
        "rank": 2,
        "sales": 76.66666666666667
    }, {
        "rank": 3,
        "sales": 77.31733333333334
    }, {
        "rank": 4,
        "sales": 70.35
    }, {
        "rank": 5,
        "sales": 67.235
    }, {
        "rank": 6,
        "sales": 62.28333333333333
    }, {
        "rank": 7,
        "sales": 61.45666666666667
    }, {
        "rank": 8,
        "sales": 58.580000000000005
    }, {
        "rank": 9,
        "sales": 61.62133333333333
    }, {
        "rank": 10,
        "sales": 55.233333333333334
    }, {
        "rank": 20,
        "sales": 47.06666666666667
    }, {
        "rank": 30,
        "sales": 45.582
    }, {
        "rank": 40,
        "sales": 41.14933333333333
    }, {
        "rank": 50,
        "sales": 39.910999999999994
    }, {
        "rank": 60,
        "sales": 37.24
    }, {
        "rank": 70,
        "sales": 35.665
    }, {
        "rank": 80,
        "sales": 32.7
    }, {
        "rank": 90,
        "sales": 34.443999999999996
    }, {
        "rank": 100,
        "sales": 31.858666666666668
    }, {
        "rank": 200,
        "sales": 20.988
    }, {
        "rank": 300,
        "sales": 14.017
    }, {
        "rank": 400,
        "sales": 12.790666666666668
    }, {
        "rank": 500,
        "sales": 11.526
    }, {
        "rank": 600,
        "sales": 10.7
    }, {
        "rank": 700,
        "sales": 11.118
    }, {
        "rank": 800,
        "sales": 10.317333333333332
    }, {
        "rank": 900,
        "sales": 9.333333333333334
    }, {
        "rank": 1000,
        "sales": 9.360000000000001
    }, {
        "rank": 2000,
        "sales": 7.102
    }, {
        "rank": 3000,
        "sales": 5.145
    }, {
        "rank": 4000,
        "sales": 3.978
    }, {
        "rank": 5000,
        "sales": 3.2640000000000002
    }, {
        "rank": 6000,
        "sales": 2.6933333333333334
    }, {
        "rank": 7000,
        "sales": 2.2666666666666666
    }, {
        "rank": 8000,
        "sales": 1.972
    }, {
        "rank": 9000,
        "sales": 1.7340000000000002
    }, {
        "rank": 10000,
        "sales": 1.4666666666666666
    }, {
        "rank": 20000,
        "sales": 0.4
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Casa e cucina": [{
        "rank": 1,
        "sales": 58.85
    }, {
        "rank": 2,
        "sales": 52.29333333333333
    }, {
        "rank": 3,
        "sales": 50.32166666666667
    }, {
        "rank": 4,
        "sales": 47.92366666666667
    }, {
        "rank": 5,
        "sales": 42.3
    }, {
        "rank": 6,
        "sales": 43.83433333333333
    }, {
        "rank": 7,
        "sales": 41.06266666666667
    }, {
        "rank": 8,
        "sales": 42.400999999999996
    }, {
        "rank": 9,
        "sales": 40.385999999999996
    }, {
        "rank": 10,
        "sales": 39.98233333333334
    }, {
        "rank": 20,
        "sales": 34.989000000000004
    }, {
        "rank": 30,
        "sales": 31.64
    }, {
        "rank": 40,
        "sales": 29.217666666666666
    }, {
        "rank": 50,
        "sales": 27.844333333333335
    }, {
        "rank": 60,
        "sales": 28.30366666666667
    }, {
        "rank": 70,
        "sales": 26.605999999999998
    }, {
        "rank": 80,
        "sales": 25.55
    }, {
        "rank": 90,
        "sales": 24.648000000000003
    }, {
        "rank": 100,
        "sales": 24.948
    }, {
        "rank": 200,
        "sales": 17.17
    }, {
        "rank": 300,
        "sales": 13.91
    }, {
        "rank": 400,
        "sales": 9.9
    }, {
        "rank": 500,
        "sales": 9.656
    }, {
        "rank": 600,
        "sales": 9.919
    }, {
        "rank": 700,
        "sales": 9.592
    }, {
        "rank": 800,
        "sales": 8.789333333333333
    }, {
        "rank": 900,
        "sales": 9.083333333333334
    }, {
        "rank": 1000,
        "sales": 8.377333333333333
    }, {
        "rank": 2000,
        "sales": 7.266666666666667
    }, {
        "rank": 3000,
        "sales": 4.9
    }, {
        "rank": 4000,
        "sales": 4.315666666666667
    }, {
        "rank": 5000,
        "sales": 3.5363333333333333
    }, {
        "rank": 6000,
        "sales": 3.0853333333333333
    }, {
        "rank": 7000,
        "sales": 2.652
    }, {
        "rank": 8000,
        "sales": 2.3
    }, {
        "rank": 9000,
        "sales": 2.17
    }, {
        "rank": 10000,
        "sales": 1.8883333333333332
    }, {
        "rank": 20000,
        "sales": 0.7743333333333333
    }, {
        "rank": 30000,
        "sales": 0.3333333333333333
    }, {
        "rank": 40000,
        "sales": 0
    }],
    "CD e Vinili": [{
        "rank": 1,
        "sales": 15.15
    }, {
        "rank": 2,
        "sales": 14.110999999999999
    }, {
        "rank": 3,
        "sales": 14.004
    }, {
        "rank": 4,
        "sales": 12.591333333333333
    }, {
        "rank": 5,
        "sales": 12.187333333333333
    }, {
        "rank": 6,
        "sales": 12.825666666666667
    }, {
        "rank": 7,
        "sales": 11.729999999999999
    }, {
        "rank": 8,
        "sales": 12.055333333333333
    }, {
        "rank": 9,
        "sales": 11.177333333333333
    }, {
        "rank": 10,
        "sales": 10.9
    }, {
        "rank": 20,
        "sales": 10.094
    }, {
        "rank": 30,
        "sales": 9.808333333333334
    }, {
        "rank": 40,
        "sales": 8.766666666666667
    }, {
        "rank": 50,
        "sales": 8.433333333333334
    }, {
        "rank": 60,
        "sales": 8.33
    }, {
        "rank": 70,
        "sales": 8.444666666666667
    }, {
        "rank": 80,
        "sales": 8.388
    }, {
        "rank": 90,
        "sales": 7.828
    }, {
        "rank": 100,
        "sales": 8.138666666666667
    }, {
        "rank": 200,
        "sales": 7.092
    }, {
        "rank": 300,
        "sales": 6.214333333333333
    }, {
        "rank": 400,
        "sales": 5.985
    }, {
        "rank": 500,
        "sales": 5.650666666666667
    }, {
        "rank": 600,
        "sales": 5.442666666666667
    }, {
        "rank": 700,
        "sales": 5.319999999999999
    }, {
        "rank": 800,
        "sales": 5.292
    }, {
        "rank": 900,
        "sales": 4.848
    }, {
        "rank": 1000,
        "sales": 4.806666666666667
    }, {
        "rank": 2000,
        "sales": 4.165
    }, {
        "rank": 3000,
        "sales": 3.7800000000000002
    }, {
        "rank": 4000,
        "sales": 3.433333333333333
    }, {
        "rank": 5000,
        "sales": 3.325
    }, {
        "rank": 6000,
        "sales": 3.24
    }, {
        "rank": 7000,
        "sales": 3.074
    }, {
        "rank": 8000,
        "sales": 3.052
    }, {
        "rank": 9000,
        "sales": 2.916
    }, {
        "rank": 10000,
        "sales": 2.808
    }, {
        "rank": 20000,
        "sales": 2.24
    }, {
        "rank": 30000,
        "sales": 1.8666666666666667
    }, {
        "rank": 40000,
        "sales": 1.7166666666666666
    }, {
        "rank": 50000,
        "sales": 1.6763333333333332
    }, {
        "rank": 60000,
        "sales": 1.5193333333333332
    }, {
        "rank": 70000,
        "sales": 1.4896666666666667
    }, {
        "rank": 80000,
        "sales": 1.352
    }, {
        "rank": 90000,
        "sales": 1.3443333333333334
    }, {
        "rank": 100000,
        "sales": 1.2366666666666668
    }, {
        "rank": 200000,
        "sales": 0.91
    }, {
        "rank": 300000,
        "sales": 0.721
    }, {
        "rank": 400000,
        "sales": 0.654
    }, {
        "rank": 500000,
        "sales": 0.5
    }, {
        "rank": 600000,
        "sales": 0.4723333333333333
    }, {
        "rank": 700000,
        "sales": 0.436
    }, {
        "rank": 800000,
        "sales": 0.37766666666666665
    }, {
        "rank": 900000,
        "sales": 0.3466666666666667
    }, {
        "rank": 1000000,
        "sales": 0.3
    }],
    "Commercio, Industria e Scienza": [{
        "rank": 1,
        "sales": 38.85
    }, {
        "rank": 2,
        "sales": 35.824666666666666
    }, {
        "rank": 3,
        "sales": 31.78933333333333
    }, {
        "rank": 4,
        "sales": 29.87
    }, {
        "rank": 5,
        "sales": 28.912
    }, {
        "rank": 6,
        "sales": 27.37
    }, {
        "rank": 7,
        "sales": 26.81433333333333
    }, {
        "rank": 8,
        "sales": 25.333333333333332
    }, {
        "rank": 9,
        "sales": 26.500333333333334
    }, {
        "rank": 10,
        "sales": 25.687333333333335
    }, {
        "rank": 20,
        "sales": 22.363
    }, {
        "rank": 30,
        "sales": 19.066666666666666
    }, {
        "rank": 40,
        "sales": 18.546666666666667
    }, {
        "rank": 50,
        "sales": 17.069000000000003
    }, {
        "rank": 60,
        "sales": 16.328333333333333
    }, {
        "rank": 70,
        "sales": 16.154666666666667
    }, {
        "rank": 80,
        "sales": 16.05
    }, {
        "rank": 90,
        "sales": 14.566666666666666
    }, {
        "rank": 100,
        "sales": 14.133333333333333
    }, {
        "rank": 200,
        "sales": 11.466666666666667
    }, {
        "rank": 300,
        "sales": 10.234
    }, {
        "rank": 400,
        "sales": 9.700999999999999
    }, {
        "rank": 500,
        "sales": 8.515333333333334
    }, {
        "rank": 600,
        "sales": 7.661333333333333
    }, {
        "rank": 700,
        "sales": 6.8
    }, {
        "rank": 800,
        "sales": 6.705333333333333
    }, {
        "rank": 900,
        "sales": 6.206
    }, {
        "rank": 1000,
        "sales": 5.759333333333333
    }, {
        "rank": 2000,
        "sales": 2.996
    }, {
        "rank": 3000,
        "sales": 1.8666666666666667
    }, {
        "rank": 4000,
        "sales": 1.3733333333333335
    }, {
        "rank": 5000,
        "sales": 0.986
    }, {
        "rank": 6000,
        "sales": 0.7846666666666666
    }, {
        "rank": 7000,
        "sales": 0.5706666666666667
    }, {
        "rank": 8000,
        "sales": 0.42400000000000004
    }, {
        "rank": 9000,
        "sales": 0.324
    }, {
        "rank": 10000,
        "sales": 0.23333333333333334
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Elettronica": [{
        "rank": 1,
        "sales": 156
    }, {
        "rank": 2,
        "sales": 145.80533333333332
    }, {
        "rank": 3,
        "sales": 127.83999999999999
    }, {
        "rank": 4,
        "sales": 122.58133333333333
    }, {
        "rank": 5,
        "sales": 122.33433333333332
    }, {
        "rank": 6,
        "sales": 113.11999999999999
    }, {
        "rank": 7,
        "sales": 107.08566666666667
    }, {
        "rank": 8,
        "sales": 100.8
    }, {
        "rank": 9,
        "sales": 105.876
    }, {
        "rank": 10,
        "sales": 104.204
    }, {
        "rank": 20,
        "sales": 82.67466666666665
    }, {
        "rank": 30,
        "sales": 72.65266666666666
    }, {
        "rank": 40,
        "sales": 71.604
    }, {
        "rank": 50,
        "sales": 67.068
    }, {
        "rank": 60,
        "sales": 63.467999999999996
    }, {
        "rank": 70,
        "sales": 61.04
    }, {
        "rank": 80,
        "sales": 55.276666666666664
    }, {
        "rank": 90,
        "sales": 53.733333333333334
    }, {
        "rank": 100,
        "sales": 50.898
    }, {
        "rank": 200,
        "sales": 37.06666666666667
    }, {
        "rank": 300,
        "sales": 31.319333333333336
    }, {
        "rank": 400,
        "sales": 24.745
    }, {
        "rank": 500,
        "sales": 21.186
    }, {
        "rank": 600,
        "sales": 17.613
    }, {
        "rank": 700,
        "sales": 16.112000000000002
    }, {
        "rank": 800,
        "sales": 15.078333333333335
    }, {
        "rank": 900,
        "sales": 13.365666666666668
    }, {
        "rank": 1000,
        "sales": 13.462
    }, {
        "rank": 2000,
        "sales": 9.602666666666666
    }, {
        "rank": 3000,
        "sales": 7.521
    }, {
        "rank": 4000,
        "sales": 5.976
    }, {
        "rank": 5000,
        "sales": 4.83
    }, {
        "rank": 6000,
        "sales": 4.287333333333334
    }, {
        "rank": 7000,
        "sales": 3.6719999999999997
    }, {
        "rank": 8000,
        "sales": 3.2336666666666667
    }, {
        "rank": 9000,
        "sales": 2.6
    }, {
        "rank": 10000,
        "sales": 2.470666666666667
    }, {
        "rank": 20000,
        "sales": 0.748
    }, {
        "rank": 30000,
        "sales": 0.23333333333333334
    }, {
        "rank": 40000,
        "sales": 0
    }],
    "Fai da te": [{
        "rank": 1,
        "sales": 88.4
    }, {
        "rank": 2,
        "sales": 79.27933333333334
    }, {
        "rank": 3,
        "sales": 66.03333333333333
    }, {
        "rank": 4,
        "sales": 62.662
    }, {
        "rank": 5,
        "sales": 63.22
    }, {
        "rank": 6,
        "sales": 59.13533333333333
    }, {
        "rank": 7,
        "sales": 56.745666666666665
    }, {
        "rank": 8,
        "sales": 54.677
    }, {
        "rank": 9,
        "sales": 53.882333333333335
    }, {
        "rank": 10,
        "sales": 52.28366666666667
    }, {
        "rank": 20,
        "sales": 39.289
    }, {
        "rank": 30,
        "sales": 35.019999999999996
    }, {
        "rank": 40,
        "sales": 30.766666666666666
    }, {
        "rank": 50,
        "sales": 28.616666666666667
    }, {
        "rank": 60,
        "sales": 28.019333333333336
    }, {
        "rank": 70,
        "sales": 27.104666666666667
    }, {
        "rank": 80,
        "sales": 24.038
    }, {
        "rank": 90,
        "sales": 24.452333333333335
    }, {
        "rank": 100,
        "sales": 21.896
    }, {
        "rank": 200,
        "sales": 13.497333333333334
    }, {
        "rank": 300,
        "sales": 10.5
    }, {
        "rank": 400,
        "sales": 9.17
    }, {
        "rank": 500,
        "sales": 7.92
    }, {
        "rank": 600,
        "sales": 6.9959999999999996
    }, {
        "rank": 700,
        "sales": 6.405
    }, {
        "rank": 800,
        "sales": 5.8709999999999996
    }, {
        "rank": 900,
        "sales": 5.474
    }, {
        "rank": 1000,
        "sales": 5.319999999999999
    }, {
        "rank": 2000,
        "sales": 2.568
    }, {
        "rank": 3000,
        "sales": 1.4140000000000001
    }, {
        "rank": 4000,
        "sales": 0.8916666666666667
    }, {
        "rank": 5000,
        "sales": 0.53
    }, {
        "rank": 6000,
        "sales": 0.315
    }, {
        "rank": 7000,
        "sales": 0.16666666666666666
    }, {
        "rank": 8000,
        "sales": 0
    }],
    "Film e TV": [{
        "rank": 1,
        "sales": 17
    }, {
        "rank": 2,
        "sales": 16.531666666666666
    }, {
        "rank": 3,
        "sales": 14.133333333333333
    }, {
        "rank": 4,
        "sales": 13.567666666666666
    }, {
        "rank": 5,
        "sales": 13.416
    }, {
        "rank": 6,
        "sales": 12.965333333333332
    }, {
        "rank": 7,
        "sales": 13.225333333333333
    }, {
        "rank": 8,
        "sales": 12.154
    }, {
        "rank": 9,
        "sales": 12.225333333333333
    }, {
        "rank": 10,
        "sales": 11.3
    }, {
        "rank": 20,
        "sales": 10.325
    }, {
        "rank": 30,
        "sales": 9.18
    }, {
        "rank": 40,
        "sales": 8.686333333333332
    }, {
        "rank": 50,
        "sales": 8.435
    }, {
        "rank": 60,
        "sales": 8.162
    }, {
        "rank": 70,
        "sales": 8.065999999999999
    }, {
        "rank": 80,
        "sales": 7.381666666666666
    }, {
        "rank": 90,
        "sales": 7.384666666666666
    }, {
        "rank": 100,
        "sales": 7.343999999999999
    }, {
        "rank": 200,
        "sales": 5.723333333333333
    }, {
        "rank": 300,
        "sales": 5.117333333333334
    }, {
        "rank": 400,
        "sales": 4.5296666666666665
    }, {
        "rank": 500,
        "sales": 2.966666666666667
    }, {
        "rank": 600,
        "sales": 2.643666666666667
    }, {
        "rank": 700,
        "sales": 2.3800000000000003
    }, {
        "rank": 800,
        "sales": 2.094333333333333
    }, {
        "rank": 900,
        "sales": 1.8883333333333332
    }, {
        "rank": 1000,
        "sales": 1.6333333333333333
    }, {
        "rank": 2000,
        "sales": 0.763
    }, {
        "rank": 3000,
        "sales": 0.35
    }, {
        "rank": 4000,
        "sales": 0.16666666666666666
    }, {
        "rank": 5000,
        "sales": 0
    }],
    "Giardino e giardinaggio": [{
        "rank": 1,
        "sales": 65.52
    }, {
        "rank": 2,
        "sales": 55.385999999999996
    }, {
        "rank": 3,
        "sales": 53.955000000000005
    }, {
        "rank": 4,
        "sales": 48.08266666666667
    }, {
        "rank": 5,
        "sales": 47.268
    }, {
        "rank": 6,
        "sales": 42.251666666666665
    }, {
        "rank": 7,
        "sales": 43.416000000000004
    }, {
        "rank": 8,
        "sales": 39.998333333333335
    }, {
        "rank": 9,
        "sales": 37.63333333333333
    }, {
        "rank": 10,
        "sales": 37.298
    }, {
        "rank": 20,
        "sales": 30.033333333333335
    }, {
        "rank": 30,
        "sales": 27.295
    }, {
        "rank": 40,
        "sales": 24.823
    }, {
        "rank": 50,
        "sales": 22.041999999999998
    }, {
        "rank": 60,
        "sales": 17.887666666666668
    }, {
        "rank": 70,
        "sales": 16.88266666666667
    }, {
        "rank": 80,
        "sales": 16.524
    }, {
        "rank": 90,
        "sales": 15.08
    }, {
        "rank": 100,
        "sales": 14.373666666666667
    }, {
        "rank": 200,
        "sales": 6.531333333333333
    }, {
        "rank": 300,
        "sales": 6.154
    }, {
        "rank": 400,
        "sales": 5.813999999999999
    }, {
        "rank": 500,
        "sales": 5.849333333333333
    }, {
        "rank": 600,
        "sales": 5.617999999999999
    }, {
        "rank": 700,
        "sales": 5.544
    }, {
        "rank": 800,
        "sales": 5.3
    }, {
        "rank": 900,
        "sales": 4.876
    }, {
        "rank": 1000,
        "sales": 4.522666666666667
    }, {
        "rank": 2000,
        "sales": 2.4613333333333336
    }, {
        "rank": 3000,
        "sales": 1.635
    }, {
        "rank": 4000,
        "sales": 1.03
    }, {
        "rank": 5000,
        "sales": 0.7140000000000001
    }, {
        "rank": 6000,
        "sales": 0.48533333333333334
    }, {
        "rank": 7000,
        "sales": 0.36000000000000004
    }, {
        "rank": 8000,
        "sales": 0.23333333333333334
    }, {
        "rank": 9000,
        "sales": 0
    }],
    "Giochi e giocattoli": [{
        "rank": 1,
        "sales": 59.36
    }, {
        "rank": 2,
        "sales": 54.318333333333335
    }, {
        "rank": 3,
        "sales": 48.72
    }, {
        "rank": 4,
        "sales": 47.556000000000004
    }, {
        "rank": 5,
        "sales": 43.92266666666667
    }, {
        "rank": 6,
        "sales": 44.064
    }, {
        "rank": 7,
        "sales": 41.976
    }, {
        "rank": 8,
        "sales": 42.074
    }, {
        "rank": 9,
        "sales": 37.7
    }, {
        "rank": 10,
        "sales": 37.638000000000005
    }, {
        "rank": 20,
        "sales": 34.80733333333333
    }, {
        "rank": 30,
        "sales": 30.368
    }, {
        "rank": 40,
        "sales": 27.333333333333332
    }, {
        "rank": 50,
        "sales": 27.23
    }, {
        "rank": 60,
        "sales": 25.544
    }, {
        "rank": 70,
        "sales": 24.344
    }, {
        "rank": 80,
        "sales": 23.528000000000002
    }, {
        "rank": 90,
        "sales": 23.397333333333332
    }, {
        "rank": 100,
        "sales": 21.805
    }, {
        "rank": 200,
        "sales": 16.006
    }, {
        "rank": 300,
        "sales": 12.447666666666667
    }, {
        "rank": 400,
        "sales": 10.246666666666666
    }, {
        "rank": 500,
        "sales": 9.201333333333334
    }, {
        "rank": 600,
        "sales": 9.156
    }, {
        "rank": 700,
        "sales": 8.647333333333334
    }, {
        "rank": 800,
        "sales": 8.060666666666666
    }, {
        "rank": 900,
        "sales": 7.2
    }, {
        "rank": 1000,
        "sales": 7.418666666666667
    }, {
        "rank": 2000,
        "sales": 5.652
    }, {
        "rank": 3000,
        "sales": 4.511333333333334
    }, {
        "rank": 4000,
        "sales": 4.046
    }, {
        "rank": 5000,
        "sales": 3.7423333333333333
    }, {
        "rank": 6000,
        "sales": 3.4003333333333337
    }, {
        "rank": 7000,
        "sales": 3.1959999999999997
    }, {
        "rank": 8000,
        "sales": 3.168
    }, {
        "rank": 9000,
        "sales": 2.8280000000000003
    }, {
        "rank": 10000,
        "sales": 2.7123333333333335
    }, {
        "rank": 20000,
        "sales": 1.8359999999999999
    }, {
        "rank": 30000,
        "sales": 1.4140000000000001
    }, {
        "rank": 40000,
        "sales": 1.2353333333333334
    }, {
        "rank": 50000,
        "sales": 1.008
    }, {
        "rank": 60000,
        "sales": 0.8203333333333334
    }, {
        "rank": 70000,
        "sales": 0.6396666666666667
    }, {
        "rank": 80000,
        "sales": 0.5546666666666666
    }, {
        "rank": 90000,
        "sales": 0.4593333333333333
    }, {
        "rank": 100000,
        "sales": 0.36666666666666664
    }, {
        "rank": 200000,
        "sales": 0
    }],
    "Gioielli": [{
        "rank": 1,
        "sales": 34.88
    }, {
        "rank": 2,
        "sales": 27.266666666666666
    }, {
        "rank": 3,
        "sales": 26.886666666666667
    }, {
        "rank": 4,
        "sales": 24.961000000000002
    }, {
        "rank": 5,
        "sales": 21.566666666666666
    }, {
        "rank": 6,
        "sales": 22.381333333333334
    }, {
        "rank": 7,
        "sales": 20.256666666666668
    }, {
        "rank": 8,
        "sales": 19.69066666666667
    }, {
        "rank": 9,
        "sales": 18.849
    }, {
        "rank": 10,
        "sales": 18.62
    }, {
        "rank": 20,
        "sales": 15.229666666666667
    }, {
        "rank": 30,
        "sales": 13.020000000000001
    }, {
        "rank": 40,
        "sales": 12.135333333333334
    }, {
        "rank": 50,
        "sales": 10.335666666666667
    }, {
        "rank": 60,
        "sales": 9.233333333333333
    }, {
        "rank": 70,
        "sales": 8.549000000000001
    }, {
        "rank": 80,
        "sales": 7.985333333333333
    }, {
        "rank": 90,
        "sales": 7.036333333333333
    }, {
        "rank": 100,
        "sales": 7.204666666666666
    }, {
        "rank": 200,
        "sales": 5.433333333333334
    }, {
        "rank": 300,
        "sales": 4.83
    }, {
        "rank": 400,
        "sales": 4.212
    }, {
        "rank": 500,
        "sales": 3.4003333333333337
    }, {
        "rank": 600,
        "sales": 2.966666666666667
    }, {
        "rank": 700,
        "sales": 2.7386666666666666
    }, {
        "rank": 800,
        "sales": 2.472
    }, {
        "rank": 900,
        "sales": 2.332
    }, {
        "rank": 1000,
        "sales": 2.08
    }, {
        "rank": 2000,
        "sales": 1.01
    }, {
        "rank": 3000,
        "sales": 0.618
    }, {
        "rank": 4000,
        "sales": 0.3703333333333333
    }, {
        "rank": 5000,
        "sales": 0.2
    }, {
        "rank": 6000,
        "sales": 0
    }],
    "Illuminazione": [{
        "rank": 1,
        "sales": 138.23999999999998
    }, {
        "rank": 2,
        "sales": 107.16666666666667
    }, {
        "rank": 3,
        "sales": 100.66000000000001
    }, {
        "rank": 4,
        "sales": 96.13799999999999
    }, {
        "rank": 5,
        "sales": 84.15
    }, {
        "rank": 6,
        "sales": 84.98366666666668
    }, {
        "rank": 7,
        "sales": 75.718
    }, {
        "rank": 8,
        "sales": 74.61999999999999
    }, {
        "rank": 9,
        "sales": 71.78500000000001
    }, {
        "rank": 10,
        "sales": 67.94566666666667
    }, {
        "rank": 20,
        "sales": 52.80466666666667
    }, {
        "rank": 30,
        "sales": 45.71
    }, {
        "rank": 40,
        "sales": 39.58633333333333
    }, {
        "rank": 50,
        "sales": 37.823
    }, {
        "rank": 60,
        "sales": 34.025999999999996
    }, {
        "rank": 70,
        "sales": 32.08233333333333
    }, {
        "rank": 80,
        "sales": 28.704
    }, {
        "rank": 90,
        "sales": 28.151999999999997
    }, {
        "rank": 100,
        "sales": 26.46466666666667
    }, {
        "rank": 200,
        "sales": 8.68
    }, {
        "rank": 300,
        "sales": 6.562
    }, {
        "rank": 400,
        "sales": 6.086
    }, {
        "rank": 500,
        "sales": 5.971333333333333
    }, {
        "rank": 600,
        "sales": 5.653333333333333
    }, {
        "rank": 700,
        "sales": 5.492666666666667
    }, {
        "rank": 800,
        "sales": 5.076
    }, {
        "rank": 900,
        "sales": 4.148
    }, {
        "rank": 1000,
        "sales": 3.638
    }, {
        "rank": 2000,
        "sales": 1.0799999999999998
    }, {
        "rank": 3000,
        "sales": 0.23333333333333334
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Informatica": [{
        "rank": 1,
        "sales": 186.85
    }, {
        "rank": 2,
        "sales": 157.76000000000002
    }, {
        "rank": 3,
        "sales": 149.256
    }, {
        "rank": 4,
        "sales": 127.06666666666666
    }, {
        "rank": 5,
        "sales": 118.76666666666667
    }, {
        "rank": 6,
        "sales": 112.16666666666667
    }, {
        "rank": 7,
        "sales": 111.03733333333334
    }, {
        "rank": 8,
        "sales": 110.33999999999999
    }, {
        "rank": 9,
        "sales": 103.11
    }, {
        "rank": 10,
        "sales": 103.25933333333334
    }, {
        "rank": 20,
        "sales": 79.30799999999999
    }, {
        "rank": 30,
        "sales": 62.85566666666667
    }, {
        "rank": 40,
        "sales": 57.575
    }, {
        "rank": 50,
        "sales": 53.352
    }, {
        "rank": 60,
        "sales": 48.364000000000004
    }, {
        "rank": 70,
        "sales": 43.89
    }, {
        "rank": 80,
        "sales": 38.93333333333333
    }, {
        "rank": 90,
        "sales": 37.96
    }, {
        "rank": 100,
        "sales": 37.496
    }, {
        "rank": 200,
        "sales": 23.328
    }, {
        "rank": 300,
        "sales": 13.482
    }, {
        "rank": 400,
        "sales": 10.504
    }, {
        "rank": 500,
        "sales": 9.186666666666667
    }, {
        "rank": 600,
        "sales": 7.828
    }, {
        "rank": 700,
        "sales": 7.133333333333334
    }, {
        "rank": 800,
        "sales": 6.0633333333333335
    }, {
        "rank": 900,
        "sales": 5.340999999999999
    }, {
        "rank": 1000,
        "sales": 4.905
    }, {
        "rank": 2000,
        "sales": 1.4333333333333333
    }, {
        "rank": 3000,
        "sales": 0.4666666666666667
    }, {
        "rank": 4000,
        "sales": 0
    }],
    "Libri": [{
        "rank": 1,
        "sales": 65.4
    }, {
        "rank": 2,
        "sales": 54.71266666666667
    }, {
        "rank": 3,
        "sales": 47.689
    }, {
        "rank": 4,
        "sales": 43.86
    }, {
        "rank": 5,
        "sales": 41.344
    }, {
        "rank": 6,
        "sales": 39.338
    }, {
        "rank": 7,
        "sales": 39.14933333333333
    }, {
        "rank": 8,
        "sales": 37.345
    }, {
        "rank": 9,
        "sales": 36.772333333333336
    }, {
        "rank": 10,
        "sales": 34.299
    }, {
        "rank": 20,
        "sales": 27.336000000000002
    }, {
        "rank": 30,
        "sales": 23.333333333333332
    }, {
        "rank": 40,
        "sales": 21.63
    }, {
        "rank": 50,
        "sales": 19.493
    }, {
        "rank": 60,
        "sales": 19.368
    }, {
        "rank": 70,
        "sales": 17.506666666666668
    }, {
        "rank": 80,
        "sales": 16.059
    }, {
        "rank": 90,
        "sales": 15.854999999999999
    }, {
        "rank": 100,
        "sales": 15.299333333333333
    }, {
        "rank": 200,
        "sales": 11.088
    }, {
        "rank": 300,
        "sales": 8.656666666666666
    }, {
        "rank": 400,
        "sales": 6.936000000000001
    }, {
        "rank": 500,
        "sales": 6.066666666666666
    }, {
        "rank": 600,
        "sales": 5.151
    }, {
        "rank": 700,
        "sales": 4.669333333333333
    }, {
        "rank": 800,
        "sales": 4.3919999999999995
    }, {
        "rank": 900,
        "sales": 3.996666666666667
    }, {
        "rank": 1000,
        "sales": 3.433333333333333
    }, {
        "rank": 2000,
        "sales": 1.7313333333333332
    }, {
        "rank": 3000,
        "sales": 0.9269999999999999
    }, {
        "rank": 4000,
        "sales": 0.5653333333333334
    }, {
        "rank": 5000,
        "sales": 0.312
    }, {
        "rank": 6000,
        "sales": 0.16666666666666666
    }, {
        "rank": 7000,
        "sales": 0
    }],
    "Orologi": [{
        "rank": 1,
        "sales": 51
    }, {
        "rank": 2,
        "sales": 45.650666666666666
    }, {
        "rank": 3,
        "sales": 41.868
    }, {
        "rank": 4,
        "sales": 36.90833333333333
    }, {
        "rank": 5,
        "sales": 35.315000000000005
    }, {
        "rank": 6,
        "sales": 34.452
    }, {
        "rank": 7,
        "sales": 31.076
    }, {
        "rank": 8,
        "sales": 31.86433333333333
    }, {
        "rank": 9,
        "sales": 29.892
    }, {
        "rank": 10,
        "sales": 27.266666666666666
    }, {
        "rank": 20,
        "sales": 23.50766666666667
    }, {
        "rank": 30,
        "sales": 19.645333333333333
    }, {
        "rank": 40,
        "sales": 17.029333333333334
    }, {
        "rank": 50,
        "sales": 15.217333333333332
    }, {
        "rank": 60,
        "sales": 15.078333333333335
    }, {
        "rank": 70,
        "sales": 13.443333333333333
    }, {
        "rank": 80,
        "sales": 12.024000000000001
    }, {
        "rank": 90,
        "sales": 10.706
    }, {
        "rank": 100,
        "sales": 7.4543333333333335
    }, {
        "rank": 200,
        "sales": 6.066666666666666
    }, {
        "rank": 300,
        "sales": 5.337999999999999
    }, {
        "rank": 400,
        "sales": 4.6723333333333334
    }, {
        "rank": 500,
        "sales": 4.0329999999999995
    }, {
        "rank": 600,
        "sales": 3.5
    }, {
        "rank": 700,
        "sales": 3.3063333333333333
    }, {
        "rank": 800,
        "sales": 2.94
    }, {
        "rank": 900,
        "sales": 2.566666666666667
    }, {
        "rank": 1000,
        "sales": 2.5439999999999996
    }, {
        "rank": 2000,
        "sales": 1.2333333333333334
    }, {
        "rank": 3000,
        "sales": 0.7
    }, {
        "rank": 4000,
        "sales": 0.412
    }, {
        "rank": 5000,
        "sales": 0.23333333333333334
    }, {
        "rank": 6000,
        "sales": 0
    }],
    "Prima infanzia": [{
        "rank": 1,
        "sales": 117.7
    }, {
        "rank": 2,
        "sales": 96.73
    }, {
        "rank": 3,
        "sales": 89.96000000000001
    }, {
        "rank": 4,
        "sales": 88.07199999999999
    }, {
        "rank": 5,
        "sales": 78.03
    }, {
        "rank": 6,
        "sales": 73.83099999999999
    }, {
        "rank": 7,
        "sales": 73.07733333333334
    }, {
        "rank": 8,
        "sales": 71.26
    }, {
        "rank": 9,
        "sales": 67.774
    }, {
        "rank": 10,
        "sales": 63.96666666666667
    }, {
        "rank": 20,
        "sales": 55.16
    }, {
        "rank": 30,
        "sales": 47.294
    }, {
        "rank": 40,
        "sales": 45.18966666666667
    }, {
        "rank": 50,
        "sales": 40.30733333333333
    }, {
        "rank": 60,
        "sales": 40.03933333333334
    }, {
        "rank": 70,
        "sales": 36.12266666666667
    }, {
        "rank": 80,
        "sales": 36.00633333333334
    }, {
        "rank": 90,
        "sales": 31.6
    }, {
        "rank": 100,
        "sales": 30.94
    }, {
        "rank": 200,
        "sales": 22.882
    }, {
        "rank": 300,
        "sales": 16.1
    }, {
        "rank": 400,
        "sales": 13.638666666666667
    }, {
        "rank": 500,
        "sales": 12.24
    }, {
        "rank": 600,
        "sales": 10.538666666666668
    }, {
        "rank": 700,
        "sales": 10.022333333333334
    }, {
        "rank": 800,
        "sales": 9.344666666666667
    }, {
        "rank": 900,
        "sales": 8.282
    }, {
        "rank": 1000,
        "sales": 7.810666666666666
    }, {
        "rank": 2000,
        "sales": 3.838
    }, {
        "rank": 3000,
        "sales": 3.5606666666666666
    }, {
        "rank": 4000,
        "sales": 2.8973333333333335
    }, {
        "rank": 5000,
        "sales": 2.121
    }, {
        "rank": 6000,
        "sales": 1.7476666666666667
    }, {
        "rank": 7000,
        "sales": 1.404
    }, {
        "rank": 8000,
        "sales": 1.0333333333333334
    }, {
        "rank": 9000,
        "sales": 0.8480000000000001
    }, {
        "rank": 10000,
        "sales": 0.6333333333333333
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Salute e cura della persona": [{
        "rank": 1,
        "sales": 90.72
    }, {
        "rank": 2,
        "sales": 78.016
    }, {
        "rank": 3,
        "sales": 73.93833333333333
    }, {
        "rank": 4,
        "sales": 69.012
    }, {
        "rank": 5,
        "sales": 65.808
    }, {
        "rank": 6,
        "sales": 61.46
    }, {
        "rank": 7,
        "sales": 58.82933333333334
    }, {
        "rank": 8,
        "sales": 58.70733333333333
    }, {
        "rank": 9,
        "sales": 53.4
    }, {
        "rank": 10,
        "sales": 56.303999999999995
    }, {
        "rank": 20,
        "sales": 47.519999999999996
    }, {
        "rank": 30,
        "sales": 42.732
    }, {
        "rank": 40,
        "sales": 39.492
    }, {
        "rank": 50,
        "sales": 37.080000000000005
    }, {
        "rank": 60,
        "sales": 33.834666666666664
    }, {
        "rank": 70,
        "sales": 32.309333333333335
    }, {
        "rank": 80,
        "sales": 30.43
    }, {
        "rank": 90,
        "sales": 29.917333333333332
    }, {
        "rank": 100,
        "sales": 30.302
    }, {
        "rank": 200,
        "sales": 17.922
    }, {
        "rank": 300,
        "sales": 14.213333333333333
    }, {
        "rank": 400,
        "sales": 12.133333333333333
    }, {
        "rank": 500,
        "sales": 11.770000000000001
    }, {
        "rank": 600,
        "sales": 10.1
    }, {
        "rank": 700,
        "sales": 10.137
    }, {
        "rank": 800,
        "sales": 9.374
    }, {
        "rank": 900,
        "sales": 8.595666666666666
    }, {
        "rank": 1000,
        "sales": 8.211333333333334
    }, {
        "rank": 2000,
        "sales": 4.650666666666667
    }, {
        "rank": 3000,
        "sales": 2.788
    }, {
        "rank": 4000,
        "sales": 1.9226666666666667
    }, {
        "rank": 5000,
        "sales": 1.313
    }, {
        "rank": 6000,
        "sales": 0.9893333333333333
    }, {
        "rank": 7000,
        "sales": 0.7066666666666667
    }, {
        "rank": 8000,
        "sales": 0.49
    }, {
        "rank": 9000,
        "sales": 0.309
    }, {
        "rank": 10000,
        "sales": 0.2
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Scarpe e borse": [{
        "rank": 1,
        "sales": 20.14
    }, {
        "rank": 2,
        "sales": 17.525333333333332
    }, {
        "rank": 3,
        "sales": 15.47
    }, {
        "rank": 4,
        "sales": 15.372000000000002
    }, {
        "rank": 5,
        "sales": 14.751333333333333
    }, {
        "rank": 6,
        "sales": 13.355666666666668
    }, {
        "rank": 7,
        "sales": 13.661333333333333
    }, {
        "rank": 8,
        "sales": 12.376
    }, {
        "rank": 9,
        "sales": 12.708
    }, {
        "rank": 10,
        "sales": 12.269333333333332
    }, {
        "rank": 20,
        "sales": 10.045
    }, {
        "rank": 30,
        "sales": 9.045333333333334
    }, {
        "rank": 40,
        "sales": 8.496
    }, {
        "rank": 50,
        "sales": 7.553333333333333
    }, {
        "rank": 60,
        "sales": 7.137333333333333
    }, {
        "rank": 70,
        "sales": 5.622333333333333
    }, {
        "rank": 80,
        "sales": 4.966666666666667
    }, {
        "rank": 90,
        "sales": 5.22
    }, {
        "rank": 100,
        "sales": 4.875333333333333
    }, {
        "rank": 200,
        "sales": 4.257333333333333
    }, {
        "rank": 300,
        "sales": 3.8876666666666666
    }, {
        "rank": 400,
        "sales": 3.427333333333333
    }, {
        "rank": 500,
        "sales": 3.1973333333333334
    }, {
        "rank": 600,
        "sales": 2.9066666666666667
    }, {
        "rank": 700,
        "sales": 2.5406666666666666
    }, {
        "rank": 800,
        "sales": 2.3920000000000003
    }, {
        "rank": 900,
        "sales": 2.3040000000000003
    }, {
        "rank": 1000,
        "sales": 2.155333333333333
    }, {
        "rank": 2000,
        "sales": 1.313
    }, {
        "rank": 3000,
        "sales": 1.008
    }, {
        "rank": 4000,
        "sales": 0.721
    }, {
        "rank": 5000,
        "sales": 0.6176666666666667
    }, {
        "rank": 6000,
        "sales": 0.476
    }, {
        "rank": 7000,
        "sales": 0.3703333333333333
    }, {
        "rank": 8000,
        "sales": 0.303
    }, {
        "rank": 9000,
        "sales": 0.272
    }, {
        "rank": 10000,
        "sales": 0.2
    }, {
        "rank": 20000,
        "sales": 0
    }],
    "Software": [{
        "rank": 1,
        "sales": 27.82
    }, {
        "rank": 2,
        "sales": 23.390666666666668
    }, {
        "rank": 3,
        "sales": 21.12933333333333
    }, {
        "rank": 4,
        "sales": 19.759333333333334
    }, {
        "rank": 5,
        "sales": 18.791999999999998
    }, {
        "rank": 6,
        "sales": 16.864
    }, {
        "rank": 7,
        "sales": 16.59
    }, {
        "rank": 8,
        "sales": 15.352
    }, {
        "rank": 9,
        "sales": 15.986666666666668
    }, {
        "rank": 10,
        "sales": 14.626
    }, {
        "rank": 20,
        "sales": 12.389666666666667
    }, {
        "rank": 30,
        "sales": 10.423333333333334
    }, {
        "rank": 40,
        "sales": 8.8
    }, {
        "rank": 50,
        "sales": 8.147333333333332
    }, {
        "rank": 60,
        "sales": 8.064
    }, {
        "rank": 70,
        "sales": 7.35
    }, {
        "rank": 80,
        "sales": 6.6659999999999995
    }, {
        "rank": 90,
        "sales": 6.830666666666667
    }, {
        "rank": 100,
        "sales": 6.145666666666667
    }, {
        "rank": 200,
        "sales": 4.4976666666666665
    }, {
        "rank": 300,
        "sales": 3.888
    }, {
        "rank": 400,
        "sales": 3.1893333333333334
    }, {
        "rank": 500,
        "sales": 2.7733333333333334
    }, {
        "rank": 600,
        "sales": 2.485
    }, {
        "rank": 700,
        "sales": 2.2186666666666666
    }, {
        "rank": 800,
        "sales": 2.088
    }, {
        "rank": 900,
        "sales": 1.9080000000000001
    }, {
        "rank": 1000,
        "sales": 1.7313333333333332
    }, {
        "rank": 2000,
        "sales": 0.8666666666666667
    }, {
        "rank": 3000,
        "sales": 0.535
    }, {
        "rank": 4000,
        "sales": 0.35
    }, {
        "rank": 5000,
        "sales": 0.2
    }, {
        "rank": 6000,
        "sales": 0
    }],
    "Sport e tempo libero": [{
        "rank": 1,
        "sales": 44
    }, {
        "rank": 2,
        "sales": 41.125
    }, {
        "rank": 3,
        "sales": 39.748666666666665
    }, {
        "rank": 4,
        "sales": 36.676
    }, {
        "rank": 5,
        "sales": 35.856
    }, {
        "rank": 6,
        "sales": 33.028666666666666
    }, {
        "rank": 7,
        "sales": 32.06733333333333
    }, {
        "rank": 8,
        "sales": 32.153333333333336
    }, {
        "rank": 9,
        "sales": 32.004
    }, {
        "rank": 10,
        "sales": 30.740000000000002
    }, {
        "rank": 20,
        "sales": 27.358999999999998
    }, {
        "rank": 30,
        "sales": 24.34466666666667
    }, {
        "rank": 40,
        "sales": 22.325333333333333
    }, {
        "rank": 50,
        "sales": 22.199666666666666
    }, {
        "rank": 60,
        "sales": 20.865000000000002
    }, {
        "rank": 70,
        "sales": 19.517333333333333
    }, {
        "rank": 80,
        "sales": 19.584
    }, {
        "rank": 90,
        "sales": 18.48
    }, {
        "rank": 100,
        "sales": 18.161333333333335
    }, {
        "rank": 200,
        "sales": 14.45
    }, {
        "rank": 300,
        "sales": 6.834333333333333
    }, {
        "rank": 400,
        "sales": 6.760000000000001
    }, {
        "rank": 500,
        "sales": 6.84
    }, {
        "rank": 600,
        "sales": 6.166666666666667
    }, {
        "rank": 700,
        "sales": 6.516
    }, {
        "rank": 800,
        "sales": 6.1706666666666665
    }, {
        "rank": 900,
        "sales": 5.95
    }, {
        "rank": 1000,
        "sales": 5.962666666666666
    }, {
        "rank": 2000,
        "sales": 5.408
    }, {
        "rank": 3000,
        "sales": 4.169333333333333
    }, {
        "rank": 4000,
        "sales": 3.6666666666666665
    }, {
        "rank": 5000,
        "sales": 3.815
    }, {
        "rank": 6000,
        "sales": 3.3666666666666667
    }, {
        "rank": 7000,
        "sales": 3.395
    }, {
        "rank": 8000,
        "sales": 3.1333333333333333
    }, {
        "rank": 9000,
        "sales": 3.158666666666667
    }, {
        "rank": 10000,
        "sales": 2.933333333333333
    }, {
        "rank": 20000,
        "sales": 2.216333333333333
    }, {
        "rank": 30000,
        "sales": 1.645
    }, {
        "rank": 40000,
        "sales": 1.3426666666666667
    }, {
        "rank": 50000,
        "sales": 1.1306666666666667
    }, {
        "rank": 60000,
        "sales": 0.9893333333333333
    }, {
        "rank": 70000,
        "sales": 0.8
    }, {
        "rank": 80000,
        "sales": 0.7070000000000001
    }, {
        "rank": 90000,
        "sales": 0.6713333333333333
    }, {
        "rank": 100000,
        "sales": 0.578
    }, {
        "rank": 200000,
        "sales": 0.2
    }, {
        "rank": 300000,
        "sales": 0
    }],
    "Strumenti musicali e DJ": [{
        "rank": 1,
        "sales": 57.769999999999996
    }, {
        "rank": 2,
        "sales": 47.174
    }, {
        "rank": 3,
        "sales": 45.18
    }, {
        "rank": 4,
        "sales": 41.09
    }, {
        "rank": 5,
        "sales": 38.955000000000005
    }, {
        "rank": 6,
        "sales": 37.59466666666666
    }, {
        "rank": 7,
        "sales": 35.157333333333334
    }, {
        "rank": 8,
        "sales": 34.65
    }, {
        "rank": 9,
        "sales": 34.88
    }, {
        "rank": 10,
        "sales": 32.690000000000005
    }, {
        "rank": 20,
        "sales": 27.206666666666667
    }, {
        "rank": 30,
        "sales": 22.96066666666667
    }, {
        "rank": 40,
        "sales": 20.733333333333334
    }, {
        "rank": 50,
        "sales": 20.037333333333333
    }, {
        "rank": 60,
        "sales": 18.281
    }, {
        "rank": 70,
        "sales": 17.818666666666665
    }, {
        "rank": 80,
        "sales": 16.496666666666666
    }, {
        "rank": 90,
        "sales": 16.57133333333333
    }, {
        "rank": 100,
        "sales": 15.183666666666666
    }, {
        "rank": 200,
        "sales": 10.2
    }, {
        "rank": 300,
        "sales": 8.450333333333333
    }, {
        "rank": 400,
        "sales": 7.775333333333333
    }, {
        "rank": 500,
        "sales": 6.4976666666666665
    }, {
        "rank": 600,
        "sales": 6.055000000000001
    }, {
        "rank": 700,
        "sales": 5.233333333333333
    }, {
        "rank": 800,
        "sales": 4.708
    }, {
        "rank": 900,
        "sales": 4.13
    }, {
        "rank": 1000,
        "sales": 4.178333333333333
    }, {
        "rank": 2000,
        "sales": 3.3626666666666667
    }, {
        "rank": 3000,
        "sales": 2.7666666666666666
    }, {
        "rank": 4000,
        "sales": 2.278
    }, {
        "rank": 5000,
        "sales": 1.9413333333333334
    }, {
        "rank": 6000,
        "sales": 1.6
    }, {
        "rank": 7000,
        "sales": 1.498
    }, {
        "rank": 8000,
        "sales": 1.224
    }, {
        "rank": 9000,
        "sales": 1.12
    }, {
        "rank": 10000,
        "sales": 0.9986666666666667
    }, {
        "rank": 20000,
        "sales": 0.3333333333333333
    }, {
        "rank": 30000,
        "sales": 0
    }],
    "Valigeria": [{
        "rank": 1,
        "sales": 54.059999999999995
    }, {
        "rank": 2,
        "sales": 43.3
    }, {
        "rank": 3,
        "sales": 39.491
    }, {
        "rank": 4,
        "sales": 38.407333333333334
    }, {
        "rank": 5,
        "sales": 34.1
    }, {
        "rank": 6,
        "sales": 33.048
    }, {
        "rank": 7,
        "sales": 32.24
    }, {
        "rank": 8,
        "sales": 31.886000000000003
    }, {
        "rank": 9,
        "sales": 30.78033333333333
    }, {
        "rank": 10,
        "sales": 28.424
    }, {
        "rank": 20,
        "sales": 23.157333333333334
    }, {
        "rank": 30,
        "sales": 20.422666666666665
    }, {
        "rank": 40,
        "sales": 17.3
    }, {
        "rank": 50,
        "sales": 16.941666666666666
    }, {
        "rank": 60,
        "sales": 15.986666666666668
    }, {
        "rank": 70,
        "sales": 14.831999999999999
    }, {
        "rank": 80,
        "sales": 13.192
    }, {
        "rank": 90,
        "sales": 12.634666666666668
    }, {
        "rank": 100,
        "sales": 11.783333333333333
    }, {
        "rank": 200,
        "sales": 7.888
    }, {
        "rank": 300,
        "sales": 6.413333333333333
    }, {
        "rank": 400,
        "sales": 5.4399999999999995
    }, {
        "rank": 500,
        "sales": 4.533333333333333
    }, {
        "rank": 600,
        "sales": 3.6053333333333333
    }, {
        "rank": 700,
        "sales": 2.746666666666667
    }, {
        "rank": 800,
        "sales": 2.312
    }, {
        "rank": 900,
        "sales": 2.1073333333333335
    }, {
        "rank": 1000,
        "sales": 1.6666666666666667
    }, {
        "rank": 2000,
        "sales": 0.4
    }, {
        "rank": 3000,
        "sales": 0
    }],
    "Videogiochi": [{
        "rank": 1,
        "sales": 47.080000000000005
    }, {
        "rank": 2,
        "sales": 37.538333333333334
    }, {
        "rank": 3,
        "sales": 34.43633333333333
    }, {
        "rank": 4,
        "sales": 31.826999999999998
    }, {
        "rank": 5,
        "sales": 30.16
    }, {
        "rank": 6,
        "sales": 28.875
    }, {
        "rank": 7,
        "sales": 28.368
    }, {
        "rank": 8,
        "sales": 26.208000000000002
    }, {
        "rank": 9,
        "sales": 25.272
    }, {
        "rank": 10,
        "sales": 25.38
    }, {
        "rank": 20,
        "sales": 19.158
    }, {
        "rank": 30,
        "sales": 16.285999999999998
    }, {
        "rank": 40,
        "sales": 14.518
    }, {
        "rank": 50,
        "sales": 13.225999999999999
    }, {
        "rank": 60,
        "sales": 12.086333333333332
    }, {
        "rank": 70,
        "sales": 11.166666666666666
    }, {
        "rank": 80,
        "sales": 10.571333333333333
    }, {
        "rank": 90,
        "sales": 10.15
    }, {
        "rank": 100,
        "sales": 8.54
    }, {
        "rank": 200,
        "sales": 5.824333333333333
    }, {
        "rank": 300,
        "sales": 5.033333333333333
    }, {
        "rank": 400,
        "sales": 4.133333333333334
    }, {
        "rank": 500,
        "sales": 3.8160000000000003
    }, {
        "rank": 600,
        "sales": 3.3303333333333334
    }, {
        "rank": 700,
        "sales": 3.103
    }, {
        "rank": 800,
        "sales": 2.808
    }, {
        "rank": 900,
        "sales": 2.3800000000000003
    }, {
        "rank": 1000,
        "sales": 2.1973333333333334
    }, {
        "rank": 2000,
        "sales": 1.04
    }, {
        "rank": 3000,
        "sales": 0.5546666666666666
    }, {
        "rank": 4000,
        "sales": 0.3
    }, {
        "rank": 5000,
        "sales": 0
    }]
}
}


  // ... Add sales data for other websites

function getSalesData(category, salesRank, website) {
  // Check if the category exists in the category mapping
  if (!categoryMapping[category]) {
      return "Category not found";
  }

  // Check if the website exists in the salesData
  if (!salesData[website]) {
      return "Website not found";
  }

  // Find the sales data for the given category and website
  const categorySalesData = salesData[website][category];
  if (!categorySalesData) {
      return "No sales data found for the category on the website";
  }

  // Find the closest or exact match for the given sales rank
  let closestMatch = null;
  for (const salesEntry of categorySalesData) {
      if (salesEntry.rank === salesRank) {
          return salesEntry.sales; // Exact match found
      } else if (!closestMatch || Math.abs(salesEntry.rank - salesRank) < Math.abs(closestMatch.rank - salesRank)) {
          closestMatch = salesEntry;
      }
  }

  // If closest match found, calculate estimated sales
  if (closestMatch) {
      const lowerRank = closestMatch.rank;
      const higherRank = categorySalesData.find((entry) => entry.rank > lowerRank);

      if (higherRank) {
          const lowerSales = closestMatch.sales;
          const higherSales = higherRank.sales;
          const weightForLowerRank = (higherRank.rank - salesRank) / (higherRank.rank - lowerRank);
          const weightForHigherRank = 1 - weightForLowerRank;
          const estimatedSales = (lowerSales * weightForLowerRank) + (higherSales * weightForHigherRank);

          return estimatedSales;
      } else {
          return closestMatch.sales; // No higher rank, return the closest match
      }
  } else {
      return "Sales data not found for the given rank";
  }
}
        const perdaySales = productInfoContainer.querySelector('#perdaySales'); // Add a container to display the result

// Example usage:
const website = 'amazon.com';
const sales = getSalesData(category, Amazondata.detailPageListingResponse.sales_rank.value, website);
console.log(`Sales for ${category} with rank ${Amazondata.detailPageListingResponse.sales_rank.value} on ${website}: ${sales}`);
    perdaySales.innerText=Math.round((sales*30)*100)/100


        const closeButton = document.createElement('div');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;'; // Use the "times" symbol (X) for the close button
        closeButton.addEventListener('click', () => {
            // Remove the productInfoContainer when the close button is clicked
            document.body.removeChild(productInfoContainer);
        });

        // Append the close button to the productInfoContainer
        productInfoContainer.appendChild(closeButton);
        // Append the productInfoContainer to the body or another parent element
        document.body.appendChild(productInfoContainer);
    }



    function displaySearchResults(products, container) {
        const popupContainer = document.createElement('div');

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.width = '100%';
        closeButton.addEventListener('click', () => {
            // Remove the modal from the DOM when the close button is clicked
            document.body.removeChild(popupContainer);
        });
        popupContainer.appendChild(closeButton);
        container.innerHTML = ''; // Clear previous results

        if (products.length === 0) {
            container.innerText = 'No results found.';
            return;
        }

        // Create a list of search results
        const list = document.createElement('ul');

        // Function to fetch and display an image for a product
      // Function to fetch an image URL and convert it to Base64
function fetchAndDisplayImage(product, index) {
    GM.xmlHttpRequest({
        method: "GET",
        url: product.imageUrl,
        responseType: "arraybuffer", // Use arraybuffer to handle binary data
        onload: function (response) {
            if (response.status === 200) {
                const listItem = document.createElement('li');
                listItem.innerText = `${index + 1}. ${product.title} (ASIN: ${product.asin})`;

                const productImage = document.createElement('img');
                const binaryData = new Uint8Array(response.response);
                const base64Image = btoa(String.fromCharCode.apply(null, binaryData));
                const base64Url = 'data:image/jpeg;base64,' + base64Image; // Adjust the MIME type as needed

                productImage.src = base64Url;

                listItem.style.cursor = 'pointer';

                // Add a click event listener to each result to handle selection
                listItem.addEventListener('click', () => {
                    // Extract the ASIN of the selected product
                    const selectedAsin = product.asin;
                    startss(selectedAsin);
                });

                list.appendChild(listItem);
                list.appendChild(productImage);
            } else {
                console.error(`Failed to fetch image for ${product.title}`);
            }
        },
        onerror: function (error) {
            console.error(`Error fetching image for ${product.title}: ${error}`);
        },
    });
}

// Loop through products and fetch/display images
for (let index = 0; index < products.length; index++) {
    const product = products[index];
    fetchAndDisplayImage(product, index);
}

container.appendChild(list);


        // Loop through products and fetch/display images
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            fetchAndDisplayImage(product, index);
        }

        container.appendChild(list);
    }

    // Usage example:
    // displaySearchResults(productsArray, resultContainerElement);





// Function to fetch data from Seller Central
function fetchDataFromSellerCentral(asin) {
    const baseUrl = "https://sellercentral.amazon.com/rcpublic/productmatch";
    const endpoint = "productmatch";
    makeRequest(asin, baseUrl, endpoint);
}

// Function to fetch additional product info
function fetchAdditionalProductInfo(asin) {
    const baseUrl = "https://sellercentral.amazon.com/rcpublic/getadditionalpronductinfo";
    const endpoint = "additionalproductinfo";

    makeRequest(asin, baseUrl, endpoint);
}

// Reusable function to make HTTP requests
function makeRequest(asin, baseUrl, endpoint){
    const countryCode = "US";
    const locale = "en-US";
    const url = endpoint === "productmatch"
        ? `${baseUrl}?searchKey=${asin}&countryCode=${countryCode}&locale=${locale}`
        : `${baseUrl}?countryCode=${countryCode}&asin=${asin}&fnsku=&searchType=GENERAL&locale=${locale}`;

    // Define custom headers here
    const headers = {
        ':authority': 'sellercentral.amazon.com',
        ':method': 'GET',
        ':path': endpoint === "productmatch"
            ? `/rcpublic/productmatch?searchKey=${asin}&countryCode=${countryCode}&locale=${locale}`
            : `/rcpublic/getadditionalpronductinfo?countryCode=${countryCode}&asin=${asin}&fnsku=&searchType=GENERAL&locale=${locale}`,
        ':scheme': 'https',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        // 'Cookie': 'ubid-main=YOUR_COOKIE_VALUE; i18n-prefs=USD; __utmc=YOUR_COOKIE_VALUE; __utmz=YOUR_COOKIE_VALUE; __utma=YOUR_COOKIE_VALUE; _ga=YOUR_COOKIE_VALUE; skin=noskin; sid="YOUR_COOKIE_VALUE"; ld=SCXXWPDirect; JSESSIONID=YOUR_COOKIE_VALUE; av-profile=YOUR_COOKIE_VALUE; s_pers=YOUR_COOKIE_VALUE; s_dl=YOUR_COOKIE_VALUE; s_ev15=YOUR_COOKIE_VALUE; s_sess=YOUR_COOKIE_VALUE; lc-main=en_US; csm-hit=YOUR_COOKIE_VALUE; x-main="YOUR_COOKIE_VALUE"; at-main=YOUR_COOKIE_VALUE; sess-at-main=YOUR_COOKIE_VALUE; sst-main=YOUR_COOKIE_VALUE; session-id-apay=YOUR_COOKIE_VALUE; session-id=YOUR_COOKIE_VALUE; session-id-time=YOUR_COOKIE_VALUE; session-token=YOUR_COOKIE_VALUE',
        'Dnt': '1',
        'Referer': 'https://sellercentral.amazon.com/hz/fba/profitabilitycalculator/index?lang=en_US',
        'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        // Add more headers as needed
    };
    console.log(`Fetching data from Seller Central (${endpoint})...`);
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: headers,
        onload: function (response) {
            console.log("Response received.");
            if (response.status === 200) {
                const data = JSON.parse(response.responseText);
                if (endpoint === "productmatch") {
                    extractCategoryAndRank(data);
                    newglobal(data.data);
                } else if (endpoint === "additionalproductinfo") {
                    console.log(data);
                    global(data.data);
                }
                mergeData();
            } else {
                console.error(`Error fetching ${endpoint} data:`, response.statusText);
            }
        },
        onerror: function (error) {
            console.error(`Error fetching ${endpoint} data:`, error);
        }
    });
}
  var mergedDatas = null;
    function mergeData() {
        if (globalData !== null && anothergolbal !== null) {
            // Merge globalData and anotherGlobalData into a single object
            mergedDatas = { ...globalData, ...anothergolbal,...feesdata };

        } else {
            console.log("Global data is not available yet.");
        }
    }


    // Function to fetch programs from the provided URL
   // Reusable function to make HTTP requests
function makeHttpRequest1(url, payload, headers, onSuccess, onError) {
    console.log(`Fetching data from URL: ${url}`);
    GM_xmlhttpRequest({
        method: payload ? 'POST' : 'GET',
        url: url,
        headers: headers,
        data: payload ? JSON.stringify(payload) : undefined,
        onload: function (response) {
            console.log("Response received.");
            if (response.status === 200) {
                try {
                    const responseData = JSON.parse(response.responseText);
                    onSuccess(responseData);
                } catch (error) {
                    console.error("Error parsing response data:", error);
                    onError(error);
                }
            } else {
                console.error(`Error fetching data:`, response.statusText);
                onError(response.statusText);
            }
        },
        onerror: function (error) {
            console.error("Error fetching data:", error);
            onError(error);
        }
    });
}


// Function to fetch programs
function fetchPrograms(asin) {
    const programsUrl = `https://sellercentral.amazon.com/rcpublic/getprograms?countryCode=US&asin=${asin}&locale=en-US`;

    // Define headers for this request
    const headers = {
        ':authority': 'sellercentral.amazon.com',
        ':method': 'GET',
        ':path': `/rcpublic/getprograms?countryCode=US&asin=${asin}&locale=en-US`,
        ':scheme': 'https',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        // // 'Cookie': 'Your_Cookie_Values', // Replace with your actual cookies
        'Dnt': '1',
        'Referer': 'https://sellercentral.amazon.com/hz/fba/profitabilitycalculator/index?lang=en_US',
        'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
    };
    makeHttpRequest1(programsUrl, null, headers, function (data) {
        another(data);
        mergeData();
    }, function (error) {
        console.error("Error fetching programs:", error);
    });
}

function fetchFees(asin) {
    console.log("Merged Data:", mergedDatas);

    if (!mergedDatas || !mergedDatas.otherProducts || !mergedDatas.otherProducts.products) {
        console.error("No valid data available to fetch fees.");
        return; // Exit the function gracefully.
    }
    const data = mergedDatas.otherProducts.products[0];
    let countryCode = 'US';
    const amou = mergedDatas.price || "";
    const feesUrl = `https://sellercentral.amazon.com/rcpublic/getfees?countryCode=${countryCode}&locale=en-US`;
    const feesPayload = {
        countryCode: countryCode,
        itemInfo: {
            asin: asin,
            glProductGroupName: data.gl || "",
            packageLength: data.length || "",
            packageWidth: data.width || "",
            packageHeight: data.height || "",
            dimensionUnit: data.dimensionUnit || "",
            packageWeight: data.weight || "",
            weightUnit: data.weightUnit || "",
            afnPriceStr: amou.amount || "",
            mfnPriceStr: amou.amount || "",
            mfnShippingPriceStr: "0",
            currency: amou.currency || "",
            isNewDefined: false,
        },
        programIdList: mergedDatas.programInfoList ? mergedDatas.programInfoList.map(obj => obj.name) : [],
        programParamMap: {},
    };
    const headers = {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Anti-Csrftoken-A2z': 'Your_Anti_Csrf_Token',
        'Content-Type': 'application/json; charset=UTF-8',
        'Dnt': '1',
        'Origin': 'https://sellercentral.amazon.com',
        'Referer': 'https://sellercentral.amazon.com/hz/fba/profitabilitycalculator/index?lang=en_US',
        'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
    };

    makeHttpRequest1(feesUrl, feesPayload, headers, function (feesData) {
        if (feesData.error) {
            console.error("Error fetching fees:", feesData.error);
        } else {
            displayProductInfo(mergedDatas, feesData);
            console.log(feesData);
        }
    }, function (error) {
        console.error("Error making the HTTP request:", error);
    });
}

    addCustomButton()
    let asin=null
    async function startss(asin){
        try {
            if (asin) {
                console.log("ASIN found:", asin);
                await getMeltable(asin)
                await fetchDataFromSellerCentral3(asin)
                await fetchAmazonReviewInfo(asin);
                await fetchAmazonReviewSingleInfo(asin)
                await Amzondata(asin)
                await sendGetRequestWithHeaders(asin);
                await isHazMat(asin, result => {
                isHazmat=result});
                await fetchDataFromSellerCentral(asin);
                await fetchAdditionalProductInfo(asin);
                await fetchPrograms(asin);
                await mergeData()
                setTimeout(async()=>{
                   await fetchFees(asin);
                },4000)
            } else {
                console.log("No ASIN found in the URL.");
            }
        } catch (error) {
            console.error("Script error:", error);
        }
    }

})();