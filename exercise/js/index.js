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
  const count = 10;
  const query = document.getElementById("user-search-input").value;
  if (!query) return;
  const encodedQuery = encodeURIComponent(query);
  const url = `${URL}?q=${encodedQuery}&count=${count}`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((twittes) => {
      buildTweets(twittes.statuses, count);
    });
};

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {};

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
  document.getElementById("user-search-input").value = e.innerText;
  getTwitterData();
};

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {};

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
  let tweetContainer = "";
  tweets.map((tweet) => {
    const createdDate = moment(tweet.created_at).fromNow();
    tweetContainer += `
    <div class="tweet-container">
      <div class="tweet-user-info">
        <img
          src=${tweet.user.profile_image_url_https}
          alt=""
        />
        <div class="tweet-title-name">
          <p>${tweet.user.name}</p>
          <p style="font-size: 8px">@${tweet.user.screen_name}</p>
        </div>
      </div>
      `;

    if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
      tweetContainer += buildImages(tweet.extended_entities.media);
      tweetContainer += buildVideo(tweet.extended_entities.media);
    }
    tweetContainer += ` <div class="tweet-text-container">
            <p>
                ${tweet.full_text}
            </p>
        </div>
      <div class="tweet-date-container">${createdDate}</div>
    </div>
          `;
  });
  document.querySelector(".tweets-list").innerHTML = tweetContainer;
};

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
  let imageContent = `<div class="tweet-images-container">`;
  let imageExits = false;
  mediaList.map((media) => {
    if (media.type == "photo") {
      imageExits = true;
      imageContent += `<div class="tweet-image" style="background-image: url(${media.media_url_https})"></div>`;
    }
  });
  imageContent += `</div>`;
  return imageExits ? imageContent : "";
};

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {
  let videoContent = `<div class="tweet-video-container">`;
  let videoExits = false;
  mediaList.map((media) => {
    if (media.type == "video") {
      videoExits = true;
      videoContent += `
      <video controls>
                <source src="${media.video_info.variants[0].url}" type="video/mp4" />
              </video>`;
    } else if (media.type == "animated_gif") {
      videoExits = true;
      videoContent += `
      <video loop autoplay>
                <source src="${media.video_info.variants[0].url}" type="video/mp4" />
              </video>`;
    }
  });
  videoContent += `</div>`;
  return videoExits ? videoContent : "";
};
