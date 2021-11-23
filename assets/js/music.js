$("#play").click(function () {
  let id = $(this).attr("song-id");
  let el = $(".box").get(id);
  if ($(this).attr("state-stop") == "true") {
    $(this)
      .attr("src", "assets/songs/image/stop.png")
      .attr("state-stop", false);
    $(el).children("audio").get(0).play();
    $(".disc-song").css("animation-play-state", "running");
  } else {
    $(this).attr("src", "assets/songs/image/play.png").attr("state-stop", true);
    $(el).children("audio").get(0).pause();
    $(".disc-song").css("animation-play-state", "paused");
  }
});

function pauseAll() {
  $(".box").each((i, el) => {
    $(el).children("audio")[0].pause();
  });
  $("#play")
    .attr("src", "assets/songs/image/play.png")
    .attr("state-stop", true);
}

function stopAll() {
  $(".box").each((i, el) => {
    $(el).children("audio")[0].pause();
    $(el).children("audio")[0].currentTime = 0;
  });
  $("#play")
    .attr("src", "assets/songs/image/play.png")
    .attr("state-stop", true);
}

$(document).ready(function () {
  $(".header .link-category a").click(function (e) {
    e.preventDefault();
  });

  function updateState(title, duration, imgSrc) {
    let menit = Math.floor(duration / 60);
    let detik = duration - menit * 60;
    if (detik.toString().length < 2) {
      detik = "0" + detik;
    }
    console.log(imgSrc);
    $("#play")
      .attr("src", "assets/songs/image/stop.png")
      .attr("state-stop", false);

    $("#end-time").html(menit + ":" + detik);
    $(".song-title #title").html(title);
    $("#disc").css("background-image", `url(${imgSrc})`);
    $(".disc-song").css("animation-play-state", "running");
  }

  $(".containing .toggle").click(function () {
    $(".player-status").slideToggle(1000);
    $(".player-status").css("display", "flex");
  });

  $(".box").click(function () {
    stopAll();

    let audio = $(this).children("audio").get(0);
    $("#play").attr("song-id", $(this).index());
    $(".indicator").attr("song-id", $(this).index());

    if ($(".player-status").css("display") == "none") {
      $(".player-status").slideToggle();
      $(".player-status").css("display", "flex");
    }

    audio.play();

    let title = $(this).children("h1").html();
    let durations = Math.round(audio.duration);
    let imgSrc = $(this).children("img").attr("src");
    updateState(title, durations, imgSrc);

    $(audio).on("ended", function () {
      $(".disc-song").css("animation-play-state", "paused");
      $("#play")
        .attr("src", "assets/songs/image/play.png")
        .attr("state-stop", true);
      $(audio).currentTime = 0;
    });

    $(audio).on("timeupdate", function () {
      let persenan = (audio.currentTime / durations) * 100;
      let current = Math.floor(audio.currentTime);
      let menit = Math.floor(current / 60);
      let detik = current - menit * 60;

      if (detik.toString().length < 2) {
        detik = "0" + detik;
      }
      $("#progress").css("width", `${persenan}%`);
      $("#curent-time").html(`${menit}:${detik}`);
    });
  });

  $("#next").click(function () {
    let allEl = $(".box").length;
    let currId = $("#play").attr("song-id");

    if (parseInt(currId) + 1 != allEl) {
      stopAll();

      let box = $(".box").get(parseInt(currId) + 1);
      let audio = $(box).children("audio").get(0);
      $("#play").attr("song-id", parseInt(currId) + 1);

      $(".player-status").css("display", "flex");
      audio.play();

      let title = $(box).children("h1").html();
      let durations = Math.round(audio.duration);
      let imgSrc = $(box).children("img").attr("src");
      updateState(title, durations, imgSrc);

      $(audio).on("ended", function () {
        $(".disc-song").css("animation-play-state", "paused");
        $("#play")
          .attr("src", "assets/songs/image/play.png")
          .attr("state-stop", true);
        $(audio).currentTime = 0;
      });

      $(audio).on("timeupdate", function () {
        let persenan = (audio.currentTime / durations) * 100;
        let current = Math.floor(audio.currentTime);
        let menit = Math.floor(current / 60);
        let detik = current - menit * 60;

        if (detik.toString().length < 2) {
          detik = "0" + detik;
        }
        $("#progress").css("width", `${persenan}%`);
        $("#curent-time").html(`${menit}:${detik}`);
      });
    }
  });

  $("#prev").click(function () {
    let allEl = $(".box").length;
    let currId = $("#play").attr("song-id");

    if (parseInt(currId) - 1 != -1) {
      stopAll();

      let box = $(".box").get(parseInt(currId) - 1);
      let audio = $(box).children("audio").get(0);
      $("#play").attr("song-id", parseInt(currId) - 1);

      $(".player-status").css("display", "flex");
      audio.play();

      let title = $(box).children("h1").html();
      let durations = Math.round(audio.duration);
      let imgSrc = $(box).children("img").attr("src");
      updateState(title, durations, imgSrc);

      $(audio).on("ended", function () {
        $(".disc-song").css("animation-play-state", "paused");
        $("#play")
          .attr("src", "assets/songs/image/play.png")
          .attr("state-stop", true);
        $(audio).currentTime = 0;
      });

      $(audio).on("timeupdate", function () {
        let persenan = (audio.currentTime / durations) * 100;
        let current = Math.floor(audio.currentTime);
        let menit = Math.floor(current / 60);
        let detik = current - menit * 60;

        if (detik.toString().length < 2) {
          detik = "0" + detik;
        }
        $("#progress").css("width", `${persenan}%`);
        $("#curent-time").html(`${menit}:${detik}`);
      });
    }
  });
});
