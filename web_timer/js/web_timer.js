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
  countdisplay("countdisplay")
});

var interval;
var i_all;
var state = "ready"; // state には"ready", "pomodoro"がある。ボタン押下可能かを変化。


function notify_timer() {
  if(state==="ready") {
    state="pomodoro"
    // 通知されることにユーザが同意している場合
    if (window.Notification && Notification.permission === "granted") {
      notify_message()
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
          notify_message()
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

function notify_message(){
  var i_min = document.forms.count_form.count_min.value;
  var i_sec = document.forms.count_form.count_sec.value;
  i_all = Number(i_min)*60 + Number(i_sec);
  var minInForm = document.forms.count_form.count_min;
  var secInForm = document.forms.count_form.count_sec;
  var bellsound = new Audio("sound/bell-long.mp3")
  interval = window.setInterval(function () {
    // document.getElementById("tiimerinit_val").innerHTML = i_all;
    minInForm.value = Math.floor(i_all/60);
    secInForm.value = i_all%60
    countdisplay("countdisplay")
    if (i_all-- == 0) {
      var n = new Notification("Timer Finish!!",{icon:"../img/spbob.ico"});
      bellsound.play()
      window.clearInterval(interval);
      state="ready"
      setTimeout(n.close.bind(n), 6000);
    }
  }, 1000);
};

function setCountval(minutes) {
  var minInForm = document.forms.count_form.count_min;
  minInForm.value = minutes;
  var secInForm = document.forms.count_form.count_sec;
  secInForm.value = 0;
  countdisplay("countdisplay")
};

function countdisplay(id) {
  var str_min = document.forms.count_form.count_min.value;
  var str_sec = document.forms.count_form.count_sec.value;
  // str_min = ("0" + str_min).slice(-2);
  str_sec = ("0" + str_sec).slice(-2);
  document.getElementById(id).innerHTML = str_min + ":" + str_sec
};

function countCansel(){
  window.clearInterval(interval);
  state="ready"
  i_all = 0;
  setCountval(25);
  countdisplay("countdisplay");
};
