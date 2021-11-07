const batasScroll = 15;
let bawah = 0;
let atas = 0;
let index = 0;
let data = null;
$(".next").hide();
const h1 = $("h1");
const fact = $("#fact");

function setData() {
  clearList();
  console.log(data[8]);
  $("#member-image").attr("src", "assets/image/" + data[index].image);
  h1.html(data[index].nama);
  $.each(data[index].fakta, function (i, v) {
    fact.append("<li>" + v + "</li>");
  });
}

function clearList() {
  fact.html("");
}

function initData() {
  $(".container").fadeOut();
  setTimeout(function () {
    setData();
    $(".container").fadeIn();
  }, 2000);
}

$(document).ready(function () {
  data = JSON.parse(returndata()).data;
  initData();
});

$(document).bind("mousewheel", function (e) {
  if (e.originalEvent.wheelDelta == 120) {
    atas++;
    if (atas >= batasScroll) {
      if (index != 0) {
        index--;
      }

      // function next slide
      if (index != 0) {
        initData();
      }
      atas = 0;
    }
  } else {
    bawah++;
    if (bawah >= batasScroll) {
      if (index != 8) {
        index++;
      }

      initData();
      bawah = 0;
    }
  }
  console.log(index);
});
