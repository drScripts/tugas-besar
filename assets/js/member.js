$(".card-nav img").first().attr("src", "assets/image/icon/icon-arrow-none.png");

$(".nav li").click(function () {
  console.log("hai");
  $(".nav li").removeClass("active");
  $(this).addClass("active");
});

const batasScroll = 15;
let bawah = 0;
let atas = 0;
let index = 0;
let data = null;

const getData = () => {
  data = JSON.parse(returndata()).data;
};

const setData = () => {
  let fact = $(".container .fact");
  fact.children("h1").html(data[index].nama);
  $(".container .fact h1").addClass("animation fade-slide-down");
  $("#image").addClass("start");
  $("#image")
    .css("background-image", `url(assets/image/${data[index].image})`)
    .addClass("fade-slide-left");

  fact.children("");

  let facts = $(".container .fact .facts");

  facts
    .children("p")
    .html(data[index].about)
    .addClass("animation fade-slide-right");

  $("#funfact").html("");

  for (const key in data[index].fakta) {
    $("#funfact").append(`<li>${data[index].fakta[key]}</li>`);
  }
  $("#funfact li").hide();

  let indexs = 0;

  let setAnimateDelay = setInterval(function () {
    let caba = $("#funfact li")[indexs];
    $(caba).show().addClass("animation fade-slide-up");
    if (indexs >= data[index].fakta.length) {
      clearInterval(setAnimateDelay);
    }
    indexs++;
  }, 200);

  setTimeout(() => {
    $("#image").removeClass("fade-slide-left");
    $(".container .fact h1").removeClass("fade-slide-down");
    facts.children("p").removeClass("fade-slide-up");
    $("#funfact").removeClass("fade-slide-right");
  }, 4000);
};

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

const init = () => {
  getData();
  initBackgroundIcon();
  setData();
  initAnimationIconBack();
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

$("#fact").bind("mousewheel", function (e) {
  e.stopPropagation();
});

$(document).bind("mousewheel", function (e) {
  if (e.originalEvent.wheelDelta == 120) {
    atas++;
    if (atas >= batasScroll) {
      if (index != 0) {
        index--;
        setData();
      }
      atas = 0;
    }
  } else {
    bawah++;
    if (bawah >= batasScroll) {
      if (index != 8) {
        index++;
        setData();
      }
      bawah = 0;
    }
  }
});
