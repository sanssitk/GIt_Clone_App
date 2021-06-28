const URL = "http://localhost:3000/tweets";

const onEnter = (e) => {
  if (e.key == "Enter") {
    getTwitterData();
  }
};

/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {
  const query = document.getElementById("user-search-input").value;
  if (!query) return;
  const encodedQuery = encodeURIComponent(query);
  const url = `${URL}?query=${encodedQuery}&max_result=10`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      buildTweets(data, 10);
    });
};

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {};

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {};

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {};

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    console.log(tweets);
  let tweetContainer = "";
//   tweets.map((tweet) => {
//     tweetContainer += `
//     <div class="tweet-container">
//             <div class="tweet-user-info">
//               <img
//                 src="https://pyxis.nymag.com/v1/imgs/6fa/2db/55c2f2230acb1120847b83f7c7bc0525d1-profile-movie.rsquare.w1200.jpg"
//                 alt=""
//               />
//               <div class="tweet-title-name">
//                 <p>William</p>
//                 <p style="font-size: 8px">@William</p>
//               </div>
//             </div>
//             <div class="tweet-images-container">
//               <div class="tweet-image"></div>
//             </div>
//             <div class="tweet-text-container">
//               <p>
//                 ${tweet.full_text}
//               </p>
//             </div>
//             <div class="tweet-date-container">20 Hours ago</div>
//           </div>
//           `;
//   });
//   document.querySelector(".tweets-list").innerHTML = tweetContainer;
};

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {};

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {};
