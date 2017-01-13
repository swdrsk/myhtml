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

  var button = document.getElementsByTagName('button')[0];

  button.addEventListener('click', function () {
    // 通知されることにユーザが同意している場合
    // 10 個の通知を送信してみましょう
    if (window.Notification && Notification.permission === "granted") {
      var i = 0;
      // 一部のブラウザ (Firefox を含む) は一定の期間内に大量の通知を行うとブロックするため、interval を使用します。
      var interval = window.setInterval(function () {
        // タグのおかげで、私たちは "Hi!9" の通知だけを見るでしょう
        var n = new Notification("Hi! " + i, {tag: 'soManyNotification'});
        if (i++ == 9) {
          window.clearInterval(interval);
        }
      }, 200);
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
          var i = 0;
          // 一部のブラウザ (Firefox を含む) は一定の期間内に大量の通知を行うとブロックするため、interval を使用します。
          var interval = window.setInterval(function () {
            // タグのおかげで、私たちは "Hi!9" の通知だけを見るでしょう
            var n = new Notification("Hi! " + i, {tag: 'soManyNotification'});
            if (i++ == 9) {
              window.clearInterval(interval);
            }
          }, 200);
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
  });
});

fn_timer();
var now = new Date();
var second = now.getSeconds();
function fn_timer() {
  now = new Date();
  second = now.getSeconds();
  $('#timer').text(second + '秒');
  // document.getElementById("timer").innerHTML = second;
  setTimeout("fn_timer()",1);
}
