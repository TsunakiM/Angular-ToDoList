angular.module('myApp', ['ngStorage'])
  .controller('mainCtrl', ['$scope', '$timeout', '$localStorage', '$log', function($scope, $timeout, $localStorage, $log){

    /* タスク一覧を格納する配列 */
    $scope.tasks = [];
    $scope.tasks = $localStorage.$default({
      tasks : [{"body": "Sample Task"}]
    });
    $scope.tasks = $localStorage.tasks;

    /* 新規タスクを作成する関数 */
    $scope.newTask = function() {
      $scope.samename = false;
      /* 同じ名前のタスクがないか確認 */
      for (var i = 0; i < $scope.tasks.length; i++) {
        if($scope.tasks[i].body === $scope.newTaskBody) {
          $scope.samename = true;
          return;
        }
      }
      /* 入力されたタスクを配列に追加 */
      $scope.tasks.push({
        "body": $scope.newTaskBody
      });
      $localStorage.tasks = $scope.tasks;
      /* 新規タスク入力フォームを空に */
      $scope.newTaskBody = '';
    };

/*--- 削除確認用モーダル関連ここから ---*/
    /* モーダル表示フラグの管理。デフォルトは非表示 */
    $scope.modalFlag = false;
    /* クリック連打防止用フラグ */
    $scope.modalShowing = false;
    /* タスクをクリックした時の挙動(削除確認)。
       HTML側で$indexを使い、配列内の順番を取得する */
    $scope.modalShow = function(i) {
      $scope.thisTaskName = $scope.tasks[i].body;
      /* モーダルを表示 */
      $scope.modalFlag = true;
      /* タスクを削除する関数 */
      $scope.deleteTask = function() {
        $scope.modalShowing = true;
        /* クリックしたタスクを、tasks配列から削除する */
        $scope.tasks.splice(i, 1);
        $localStorage.tasks = $scope.tasks;
        /* モーダルを閉じる */
        $timeout(function() {
          $scope.modalFlag = false;
          $scope.modalShowing = false;
        }, 100);
      };
    };
    /* モーダルウィンドウを閉じる(キャンセル用) */
    $scope.modalHide = function() {
        $scope.modalFlag = false;
        $scope.modalShowing = false;
    };
/*--- 削除確認用モーダル関連ここまで ---*/
  }]);
