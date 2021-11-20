$(document).ready(function () {
  setTimeout(function () {
    $(".splash-screen").fadeOut();
    init();
    setFloatingAnimation();
  }, 3000);
});

function init() {
  let images = $("img");
  $.each(images, function (index, el) {
    let random = Math.floor(Math.random() * 1) + 1;
    $(el).addClass("animation");
    if (index == 0 || index == 5) {
      $(el).addClass("fade-slide-left");
      $(el).css("animation-duration", random + "s");
    } else if (index == 3 || index == 8) {
      $(el).addClass("fade-slide-right");
      $(el).css("animation-duration", random + "s");
    } else if (index == images.length - 1) {
      $(el).addClass("zoom").addClass("middle-fast");
    } else if (index == 4) {
      $(el).addClass("zoom").addClass("fast");
    }
  });
}

function setFloatingAnimation() {
  let images = $("img");
  $.each(images, function (_, el) {
    let random = Math.floor(Math.random() * 4) + 2;
    $(el).removeClass("fade-slide-left fade-slide-right zoom middle-fast fast");
    $(el)
      .addClass("float")
      .addClass("infinite")
      .css("animation-duration", random + "s");
  });

  let random = Math.floor(Math.random() * 4) + 2;
  $(".footer")
    .addClass("animation")
    .addClass("float")
    .addClass("infinite")
    .css("animation-duration", random + "s");
}
