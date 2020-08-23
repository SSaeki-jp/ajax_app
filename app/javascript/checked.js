function check() {

  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {

    // addEventListener重複実行の回避
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    // 投稿をクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {

      // どの投稿をクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");

      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();

      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);

      // レスポンスのタイプを指定する
      XHR.responseType = "json";

      // sendでリクエストを送信する
      XHR.send();

      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {

          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);

          // 処理を強制終了
          return null;
        }

        // レスポンスされたデータを変数itemに代入している
        const item = XHR.response.post;

        // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
        if (item.checked === true) {
          post.setAttribute("data-check", "true");

        // 未読状態であれば、カスタムデータを削除している
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }

      };

    });
  });
}

// 1秒に一回checkを実行
setInterval(check, 1000);
