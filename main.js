window.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('#gameboard div');
    const resetBtn = document.querySelector('#reset');
    
    const PLAYER1 = 1;
    const PLAYER2 = 2;
    const BLANK = 0;

    const gridInitData = 
       [BLANK,BLANK,BLANK,
        BLANK,BLANK,BLANK,
        BLANK,BLANK,BLANK];

    let gridData = Array.from(gridInitData);
    let currentPlayer = PLAYER1;
    let winner = 0;

    // 初期化処理
    function Init(){
        // マスをクリックしたときの処理を登録
        grids.forEach(function(grid){
            grid.addEventListener('click', () =>{
                Update(grid.id-1);
                Render();
            });
        });

        // リセットボタン押下時処理を登録
        resetBtn.addEventListener('click', () =>{
            Reset();
        });

        // 画面初回描画
        Render();
    }

    // 更新処理
    function Update(id){
        // クリア済みなら何もしない
        if(winner !== 0) return;

        if(gridData[id] === 0) {
            gridData[id] = currentPlayer;
        }

        // クリア判定
        if(IsClear(PLAYER1)){
            // 〇の勝ち
            winner = PLAYER1;
        }
        else if(IsClear(PLAYER2)){
            // ×の勝ち
            winner = PLAYER2;
        }

        // 順番交代
        currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
    }

    // 描画処理
    function Render(){
        for(let i = 0; i < gridData.length; ++i){
            let grid = document.getElementById(i+1);
            
            if(gridData[i] === PLAYER1){
                grid.innerHTML = "〇";
            }
            else if(gridData[i] === PLAYER2){
                grid.innerHTML = "×";
            }
            else {
                grid.innerHTML = "";
            }
        }

        // メッセージエリアの描画
        let msg = document.getElementById("message");

        if(winner !== PLAYER1 && winner != PLAYER2){
            msg.innerHTML = currentPlayer === 1 ? "〇の番" : "×の番";
        }

        if(winner === PLAYER1){
            msg.innerHTML = "〇の勝ち";
        }
        else if(winner === PLAYER2){
            msg.innerHTML = "×の勝ち";
        }
    }

    // クリア判定
    function IsClear(playerId){
        const clearMap = [
                    [1,2,3],[4,5,6],[7,8,9],// 横並びに揃った場合
                    [1,4,7],[2,5,8],[3,6,9], // 立てに揃った場合
                    [1,5,9],[3,5,7] // 斜めに揃った場合
        ];

        for(let i = 0; i < clearMap.length; ++i){
            let map = clearMap[i];
            
            if( gridData[map[0]-1] === playerId &&
                gridData[map[1]-1] === playerId &&
                gridData[map[2]-1] === playerId ) {
                    return true;
            }
        }

        return false;
    }

    // 再スタート
    function Reset(){
        gridData = Array.from(gridInitData);
        currentPlayer = 1;
        winner = 0;

        // 画面描画
        Render();
    }
    
    // 初期化処理
    Init();
});
