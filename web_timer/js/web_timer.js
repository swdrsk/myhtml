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
});

function notify_timer() {
  // 通知されることにユーザが同意している場合
  // 10 個の通知を送信してみましょう
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
        alert("Hi!");
      }
    });
  }
  // ユーザが通知を拒否している場合
  else {
    // 通常型の alert にフォールバックできます
    alert("Hi!");
  }
}

function notify_message(){
  var i = document.forms.timerinit_form.timerinit_val.value;
  // 一部のブラウザ (Firefox を含む) は一定の期間内に大量の通知を行うとブロックするため、interval を使用します。
  var interval = window.setInterval(function () {
    document.getElementById("timecounter").innerHTML = i;
    if (i-- == 0) {
      var n = new Notification("Timer Finish!!");
      window.clearInterval(interval);
      setTimeout(n.close.bind(n), 4000);
    }
  }, 1000);

}
