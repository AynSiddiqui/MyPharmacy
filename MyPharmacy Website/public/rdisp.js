const ratings = document.querySelectorAll(".rating");
ratings.forEach((rating) => {
  const ratingContent = rating.innerHTML;
  const ratingScore = parseInt(ratingContent*20, 10);
  const scoreClass =
    ratingScore < 40 ? "bad" : ratingScore < 60 ? "meh" : "good";

  rating.classList.add(scoreClass);
  const ratingColor = window.getComputedStyle(rating).backgroundColor;

  const gradient = `background: conic-gradient(${ratingColor} ${ratingScore}%, transparent 0 100%)`;

  rating.setAttribute("style", gradient);
  rating.innerHTML = `<span>${ratingScore}% ${
    ratingContent.indexOf("%") >= 0 ? "<small>%</small>" : ""
  }</span>`;
});
