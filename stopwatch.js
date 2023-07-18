const timeDisplay = document.getElementById("timeDisplay");/*timeの要素を特定*/
const startbutton = document.getElementById("startbutton");/*startの要素を特定*/
const stopbutton = document.getElementById("stopbutton");/*stopの要素を特定*/
const resetbutton = document.getElementById("resetbutton");/*resetの要素を特定*/
  var timer;/*計測*/
  var startTime; /*開始時間*/
  var holdtime =0;/*stop時経過時間をリセットさせない　スタートボタンのため初期化する*/
  var elapsedTime=0;/*経過時間　スタート時に初期化しないとリセットした際にプラスされるため初期化*/

   /*スタートボタンの実装*/
   /*スタートボタンを押したと同時にid=timerに経過時間を表示させる必要がある。*/
function clickStart(){
    startTime = Date.now();/*現在の時刻に設定*/
    
    measure();/*measure関数を呼び出している*/
    
    startbutton.disabled=true;/*スタートボタンを非活性にし、２回推さないようにする。*/
    stopbutton.disabled=false;/*ストップボタン活性化*/
    resetbutton.disabled=true;/*スタートボタンを押してリセットを押すとバグが起こるためリセットボタン非活性*/
    
}
/*経過時間をリアルタイムで表示させる*/
function measure() {
    // タイマーを設定
    timer = setTimeout(function () {/*setTimeout関数*/
        // 経過時間を設定し、画面へ表示
        elapsedTime = Date.now() - startTime + holdtime;/*経過時間＝現在の時間-開始時間+時間経過保持*/
        timeDisplay.innerHTML = new Date(elapsedTime).toISOString().slice(14, 23); /*表示内容を切り替えている*/
        /*YYYY-MM-DDTHH:mm:ss.sssZの形式から14-23文字内（mm:ss.sss）を抽出している*/
        
        // 関数を呼び出し、時間計測を継続する
        measure();
    },10);/*setTimeout関数 原理はsetintervalと同じ*/
}

/*stopボタンの実装*/
function clickStop(){
    clearInterval(timer);/*繰り返しタイマーをカウントを停止させる*/
    
    holdtime=holdtime+Date.now()-startTime;/*現在の時間経過保持＝時間経過保持+現在の時間-過去の現在の時間*/
    
    
        startbutton.disabled=false;/*スタートボタン活性化*/
    stopbutton.disabled=true;/*ストップボタンを２回押さないように非活性にする*/
    resetbutton.disabled=false;/*リセットボタン活性化*/
}
    
    /*リセットボタンの実装*/
function clickReset(){
    timeDisplay.innerHTML="00:00:000";/*timeDisplayを00:00:000に表示する。*/
    
    startbutton.disabled=false;/*スタートボタン活性化*/
    stopbutton.disabled=true;/*ストップボタンを２回押さないように非活性にする*/
    resetbutton.disabled=true;/*リセットボタン非活性*/
}