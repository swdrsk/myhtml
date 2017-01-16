// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// countdown timer apps
var interval; // setIntervalを制御するためのクロージャー
var i_all = 1500;
var state = "ready"; // state には"ready", "pomodoro"がある。ボタン押下可能かを変化。

window.addEventListener('load', function () {
  // 始めに、通知の許可を得ているかを確認しましょう
  // 得ていなければ、尋ねましょう
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }
  countDisplay("countdisplay")
});

function notify_timer() {
  if(state==="ready") {
    state="pomodoro"
    // 通知されることにユーザが同意している場合
    if (window.Notification && Notification.permission === "granted") {
      countdownFunction()
    }
    // 通知を受けたいか否かをユーザが告げていない場合
    // 注記: Chrome のために permission プロパティが設定されているかの確信が
    // 持てないため、値 "default" を確認するのは安全ではありません。
    else if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
        // ユーザが認めている場合
        if (status === "granted") {
          countdownFunction()
        }
        // 認めていなければ、通常型の alert にフォールバックします
        else {
          alert("Notification is not admited!");
        }
      });
    }
    // ユーザが通知を拒否している場合
    else {
      // 通常型の alert にフォールバックできます
      alert("Notification is not admited!");
    }
  }
}

function countdownFunction(){
  var i_min = document.forms.count_form.count_min.value;
  var i_sec = document.forms.count_form.count_sec.value;
  i_all = Number(i_min)*60 + Number(i_sec);
  var minInForm = document.forms.count_form.count_min;
  var secInForm = document.forms.count_form.count_sec;
  var bellsound = new Audio("sound/bell-long.mp3")
  interval = window.setInterval(function () {
    // document.getElementById("tiimerinit_val").innerHTML = i_all;
    minInForm.value = Math.floor(i_all/60);
    secInForm.value = i_all%60;
    str_sec = countDisplay("countdisplay");
    document.title = str_sec + " -- Pomodoro Timer";
    if (i_all % 60 === 0){
        minutes =   ("0" + Math.floor(i_all)/60).slice(-2);
        try{
            faviconname = "img/icon_number02_pink24_" + minutes + ".gif"
            $("link[rel*='icon']").attr("href", faviconname);
        }catch(e){
            faviconname = "img/bell-icon.gif"
            $("link[rel*='icon']").attr("href", faviconname);
        }
    }
    if (i_all-- === 0) {
      var n = new Notification("Timer Finish!!",{icon:"../img/spbob.ico"});
      bellsound.play()
      window.clearInterval(interval);
      state="ready"
      setTimeout(n.close.bind(n), 6000);
      document.title = "Pomodoro Timer"
    }
  }, 1000);
};

function setCountval(minutes) {
  var minInForm = document.forms.count_form.count_min;
  minInForm.value = minutes;
  var secInForm = document.forms.count_form.count_sec;
  secInForm.value = 0;
  countDisplay("countdisplay")
};

function countDisplay(id) {
  var str_min = Math.floor(i_all/60);
  var str_sec = i_all%60;
  // str_min = ("0" + str_min).slice(-2);
  str_sec = ("0" + str_sec).slice(-2);
  document.getElementById(id).innerHTML = str_min + ":" + str_sec
  return str_min+":"+str_sec
};

function countCansel(){
  window.clearInterval(interval);
  state="ready"
  i_all = 0;
  setCountval(25);
  countDisplay("countdisplay");
  document.title = "Pomodoro Timer"
};

function setFavicon() {
}
