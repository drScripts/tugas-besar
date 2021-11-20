const cardMemberName = [
  "nayeon.jpg",
  "jeongyeon.jpg",
  "momo.jpg",
  "sana.jpg",
  "jihyo.jpg",
  "mina.jpg",
  "dahyun.jpg",
  "chaeyoung.jpg",
  "tzuyu.jpg",
];

$(".card-nav img").first().attr("src", "assets/image/icon/icon-arrow-none.png");

$(".nav li").click(function () {
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

const setCardMember = () => {
  const link = "assets/image/home/";

  let body = $("body");
  let img = $(".card-nav img.member");

  let bodyDataLast = body.attr("data-last");
  let bodyDataNow = body.attr("data-now");
  let bodyDataNext = body.attr("data-next");

  $("img.pointer").attr("disabled", bodyDataLast == -1);
  $("img.pointer.down").attr("disabled", bodyDataNext == cardMemberName.length);

  let pointer = $("img.pointer");
  let pointerDown = $("img.pointer.down");

  pointer.attr("disabled") == "disabled"
    ? pointer.attr("src", "assets/image/icon/icon-arrow-none.png")
    : pointer.attr("src", "assets/image/icon/icon-arrow.png");

  pointerDown.attr("disabled") == "disabled"
    ? pointerDown.attr("src", "assets/image/icon/icon-arrow-none.png")
    : pointerDown.attr("src", "assets/image/icon/icon-arrow.png");

  $(img[0]).attr(
    "src",
    bodyDataLast == -1
      ? "assets/image/icon/none-member.png"
      : link + cardMemberName[bodyDataLast]
  );

  $(img[1]).attr("src", link + cardMemberName[bodyDataNow]);

  $(img[2]).attr(
    "src",
    bodyDataNext == cardMemberName.length
      ? "assets/image/icon/none-member.png"
      : link + cardMemberName[bodyDataNext]
  );
};

const setData = () => {
  $("body")
    .attr("data-now", index)
    .attr("data-last", index - 1)
    .attr("data-next", index + 1);

  setCardMember();

  let fact = $(".container .fact");
  fact.children("h1").html(data[index].nama);

  fact.children("");
  let facts = $(".container .fact .facts");
  facts
    .children("p")
    .html(data[index].about)
    .addClass("animation fade-slide-right");

  $(".container .fact h1").addClass("animation fade-slide-down");
  $("#image").addClass("start");
  $("#image")
    .css("background-image", `url(assets/image/${data[index].image})`)
    .addClass("fade-slide-left");

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
    facts.children("p").removeClass("fade-slide-right");
    $("#funfact").removeClass("fade-slide-right");
  }, 4000);
};

const init = () => {
  getData();
  setData();

  $("#up").click(function () {
    if ($(this).attr("disabled") != "disabled") {
      index--;
      atas = 0;
      bawah = 0;
      setData();
    }
  });

  $("#down").click(function () {
    if ($(this).attr("disabled") != "disabled") {
      index++;
      atas = 0;
      bawah = 0;
      setData();
    }
  });
};

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
