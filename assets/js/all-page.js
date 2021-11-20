function getRandomPost() {
  // getting height and width
  let height = $(window).height() + 150;
  let width = $(window).width() + 150;

  let rh = Math.floor(Math.random() * height);
  let rw = Math.floor(Math.random() * width);
  return [rh, rw];
}

const initAnimationIconBack = () => {
  $(".background-icon img").each((i, el) => {
    let randPostarr = getRandomPost();
    let randMs = Math.floor(Math.random() * 4 + 4) * 1000;
    $(el).animate(
      {
        top: `${randPostarr[0]}px`,
        left: `${randPostarr[1]}px`,
      },
      randMs,
      function () {
        initAnimationIconBack();
      }
    );
  });
};

function initBackgroundIcon() {
  for (let i = 0; i < 2; i++) {
    $(".background-icon").append(`
            <img src="assets/image/random-image/icon1.png" alt="" />
            <img src="assets/image/random-image/icon2.png" alt="" />
            <img src="assets/image/random-image/icon3.png" alt="" />
            <img src="assets/image/random-image/icon4.png" alt="" />
            <img src="assets/image/random-image/icon5.png" alt="" />
            <img src="assets/image/random-image/icon6.png" alt="" />
            <img src="assets/image/random-image/icon7.png" alt="" />
            `);
  }
}

function setWidthContainer() {
  let intViewPort = window.innerWidth;
  let intheight = window.innerHeight;
  let container = document.getElementsByClassName("container")[0];
  container.setAttribute(
    "style",
    "max-width:" +
      (intViewPort - 57) +
      "px" +
      ";height:" +
      (intheight - 56) +
      "px"
  );
}

$(window).resize(function () {
  setWidthContainer();
});
