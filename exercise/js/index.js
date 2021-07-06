const URL = "http://localhost:3000/tweets";

let nextPageUrl = null;

const onEnter = (e) => {
  if (e.key == "Enter") {
    getTwitterData();
  }
};

const onNextPage = () => {
  if (nextPageUrl) {
    getTwitterData(true);
  }
};

/**
 * Retrive Twitter Data from API
 */
const getTwitterData = (nextPage = false) => {
  const count = 10;
  const query = document.getElementById("user-search-input").value;
  if (!query) return;
  const encodedQuery = encodeURIComponent(query);
  let url = `${URL}?q=${encodedQuery}&count=${count}`;
  if (nextPage && nextPageUrl) {
    url = nextPageUrl;
  }
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((twittes) => {
      buildTweets(twittes.statuses, nextPage);
      saveNextPage(twittes.search_metadata);
      nextPageButtonVisibility(twittes.search_metadata);
    });
};

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
  if (metadata.next_results) {
    nextPageUrl = `${URL}${metadata.next_results}`;
  } else {
    nextPageUrl = null;
  }
};

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
const nextPageButtonVisibility = (metadata) => {
  if (metadata.next_results) {
    document.querySelector(".next-page-container").style.visibility = "visible";
  } else {
    document.querySelector(".next-page-container").style.visibility = "hidden";
  }
};

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
  if (nextPage) {
    document
      .querySelector(".tweets-list")
      .insertAdjacentHTML("beforeend", tweetContainer);
  } else {
    document.querySelector(".tweets-list").innerHTML = tweetContainer;
  }
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
      const videoVariant = media.video_info.variants.find(variant => { variant.content_type === "video/mp4"})
      videoContent += `
      <video controls>
                <source src="${videoVariant.url}" type="video/mp4" />
              </video>`;
    } else if (media.type == "animated_gif") {
      videoExits = true;
      const videoVariant = media.video_info.variants.find(variant => { variant.content_type === "video/mp4"})
      videoContent += `
      <video loop autoplay>
                <source src="${videoVariant.url}" type="video/mp4" />
              </video>`;
    }
  });
  videoContent += `</div>`;
  return videoExits ? videoContent : "";
};
