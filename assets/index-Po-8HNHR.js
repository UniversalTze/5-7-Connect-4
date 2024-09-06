var $=Object.defineProperty;var j=(a,e,o)=>e in a?$(a,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[e]=o;var n=(a,e,o)=>j(a,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();const b=7,g=7,m=-1,h=0,W="#504f4f",T="#cf4242",w="#ddaf24",P=["white"],E=1,R=6,y=4,k=0,C=1,_=2,L=3,N=4,G=1e4,x=100,V=3e4,q=2,Y=1;class U{constructor(){n(this,"row");n(this,"col");n(this,"board");n(this,"prevBoard");this.row=g,this.col=b,this.board=new Array(g).fill(h).map(()=>new Array(b).fill(h)),this.prevBoard=new Array(g).fill(h).map(()=>new Array(b).fill(h))}getBoard(){return this.board}getPrevBoard(){return this.prevBoard}getRow(){return this.row}getCol(){return this.col}getTopTokenRow(e){for(let o=this.row-1;o>=0;o--)if(this.board[o][e]===h)return o;return-1}placeToken(e,o){return this.board[0][e]!==h?!1:(this.board[0][e]=o,!0)}checkTokenFall(e,o){return this.board[e][o]!==h&&this.board[e+1][o]===h}tokenFall(){let e=this.board.map(r=>[...r]),o=!1;for(let r=0;r<this.row-1;r++)for(let t=0;t<this.col;t++)this.checkTokenFall(r,t)&&(e[r][t]=h,e[r+1][t]=this.board[r][t],o=!0);return this.prevBoard=this.board,this.board=e,o}rotateBoard(e){let o=new Array(this.row).fill(h).map(()=>new Array(this.col).fill(h));switch(e){case 90:for(let r=0;r<this.row;r++)for(let t=0;t<this.col;t++)o[t][this.row-1-r]=this.board[r][t];break;case 180:for(let r=0;r<this.row;r++)for(let t=0;t<this.col;t++)o[this.row-1-r][this.col-1-t]=this.board[r][t];break;case 270:for(let r=0;r<this.row;r++)for(let t=0;t<this.col;t++)o[this.col-1-t][r]=this.board[r][t];break}this.prevBoard=this.board,this.board=o}copyCombo(e,o,r,t,i){if(e===r)for(let s=o;s<=t;s++)i[e][s]=this.board[e][s];else if(o===t)for(let s=e;s<=r;s++)i[s][o]=this.board[s][o];else{let s=-1,l=-1;e<r&&(s=1),o<t&&(l=1);let c=e,p=o;for(;c!=r&&p!=t;)i[c][p]=this.board[c][p],c+=s,p+=l;i[r][t]=this.board[r][t]}}checkHorizontal(e,o){let r=!1;for(let t=0;t<this.row;t++){let i=1;for(let s=0;s<this.col;s++)s!==this.col-1&&this.board[t][s]!==h&&this.board[t][s]===this.board[t][s+1]?i++:(i>=y&&(this.copyCombo(t,s-i+1,t,s,o),e[this.board[t][s]-1]+=i,r=!0),i=1)}return r}checkVertical(e,o){let r=!1;for(let t=0;t<this.col;t++){let i=1;for(let s=0;s<this.row;s++)s!==this.row-1&&this.board[s][t]!==h&&this.board[s][t]===this.board[s+1][t]?i++:(i>=y&&(this.copyCombo(s-i+1,t,s,t,o),e[this.board[s][t]-1]+=i,r=!0),i=1)}return r}checkDiagonal(e,o){let r=!1;for(let t=0;t<this.row;t++)for(let i=0;i<this.col;i++){let s=1,l=1;for(;t+l<this.row&&i+l<this.col&&(this.board[t][i]!==h&&this.board[t][i]===this.board[t+l][i+l]);){s++;l++}s>=y&&(this.copyCombo(t,i,t+s-1,i+s-1,o),e[this.board[t][i]-1]+=s,r=!0)}for(let t=0;t<this.row;t++)for(let i=0;i<this.col;i++){let s=1,l=1;for(;t+l<this.row&&i-l>=0&&(this.board[t][i]!==h&&this.board[t][i]===this.board[t+l][i-l]);){s++;l++}s>=y&&(this.copyCombo(t,i,t+s-1,i-s+1,o),e[this.board[t][i]-1]+=s,r=!0)}return r}checkComboFromToken(e,o,r,t,i,s){let l=1,c=t,p=r,A=t,v=r,O=!1;for(let u=1;u<R;u++){let d=t-u*i,f=r-u*s;if(d>=0&&d<this.row&&f>=0&&f<this.col&&this.board[d][f]===this.board[t][r])l++,p=f,c=d;else break}for(let u=1;u<R;u++){let d=t+u*i,f=r+u*s;if(d>=0&&d<this.row&&f>=0&&f<this.col&&this.board[d][f]===this.board[t][r])l++,v=f,A=d;else break}return l>=y&&(this.copyCombo(c,p,A,v,o),e[this.board[t][r]-1]+=l,O=!0),O}checkForCombos(e,o,r=-1,t=-1){let i=!1;if(r===E)i=i||this.checkHorizontal(e,o),i=i||this.checkVertical(e,o),i=i||this.checkDiagonal(e,o);else{let s=this.getTopTokenRow(t);if(s===-1)return console.log("Token pos is not valid"),!1;i=i||this.checkComboFromToken(e,o,t,s,1,0),i=i||this.checkComboFromToken(e,o,t,s,0,1),i=i||this.checkComboFromToken(e,o,t,s,1,1),i=i||this.checkComboFromToken(e,o,t,s,1,-1)}return i}clearCombos(e,o=-1,r=-1){let t=new Array(this.row).fill(h).map(()=>new Array(this.col).fill(h)),i=[0,0],s=this.board.map(l=>[...l]);if(r===E){if(!this.checkForCombos(i,t,E))return!1}else{if(o<0||o>=this.col)return console.log("Invalid column"),!1;if(!this.checkForCombos(i,t,o=o))return!1}for(let l=0;l<this.row;l++)for(let c=0;c<this.col;c++)t[l][c]!==h&&(s[l][c]=h);return this.prevBoard=this.board,this.board=s,e[0]=i[0],e[1]=i[1],!0}isBoardFull(){for(let e=0;e<this.col;e++)if(this.board[0][e]===h)return!1;return!0}isBoardEmpty(){for(let e=0;e<this.col;e++)if(this.board[this.row-1][e]!==h)return!1;return!0}clearBottomRow(){if(this.isBoardEmpty())return!1;this.prevBoard=this.board;for(let e=0;e<this.col;e++)this.board[this.row-1][e]=h;for(let e=this.row-2;e>=0;e--)for(let o=0;o<this.col;o++)this.board[e+1][o]=this.board[e][o],this.board[e][o]=h;return!0}}class K{animateBoard(e){for(let o=0;o<e.length;o++)for(let r=0;r<e[o].length;r++)e[o][r]==0&&this.setPixelColor(o,r,W),e[o][r]==1?this.setPixelColor(o,r,T):e[o][r]==2&&this.setPixelColor(o,r,w)}animateComboClear(e,o){for(let r=0;r<e.length;r++)for(let t=0;t<e[r].length;t++)e[r][t]==o[r][t]?e[r][t]==1?this.setPixelColor(r,t,T):e[r][t]==2&&this.setPixelColor(r,t,w):e[r][t]==1?this.flashPixel(r,t,T):e[r][t]==2&&this.flashPixel(r,t,w)}updateScoreDisplay(e,o){const r=document.getElementById("display-0");r&&(r.innerText=e.toString());const t=document.getElementById("display-3");t&&(t.innerText=o.toString())}setPixelColor(e,o,r){const t=document.querySelector(`[data-row="${e}"][data-col="${o}"]`);t&&(t.style.backgroundColor=r)}flashPixel(e,o,r){const t=document.querySelector(`[data-row="${e}"][data-col="${o}"]`);if(t){const i=t.style.backgroundColor,s=500;this.setPixelColor(e,o,P[0]),setTimeout(()=>{this.setPixelColor(e,o,r)},s),setTimeout(()=>{this.setPixelColor(e,o,P[0])},s*2),setTimeout(()=>{this.setPixelColor(e,o,i)},s*3)}}flashPixel2(e,o,r){const t=document.querySelector(`[data-row="${e}"][data-col="${o}"]`);if(t){const i=t.style.backgroundColor,s=500;this.setPixelColor(e,o,P[0]),setTimeout(()=>{this.setPixelColor(e,o,r)},s),setTimeout(()=>{this.setPixelColor(e,o,P[0])},s*2),setTimeout(()=>{this.setPixelColor(e,o,i)},s*3)}}something(e){return e==1500}placeholder(e,o){for(let r=0;r<b;r++)for(let t=0;t<g;t++)e[r][t]!=o[r][t]&&this.setPixelColor(r,t,"white")}}class F{constructor(e,o){n(this,"playerScore");n(this,"playerName");this.playerScore=e,this.playerName=o}getPlayerScore(){return this.playerScore}getPlayerName(){return this.playerName}addPlayerScore(e){this.playerScore=this.playerScore+e}}const D=21,z=3e4,X=12e4;class J{constructor(){n(this,"moveTimeoutId",null);n(this,"rotateIntervalId",null);n(this,"player1turn");n(this,"p1haswon");n(this,"p2haswon");n(this,"player1");n(this,"player2");this.player1=new F(0,"Player1"),this.player2=new F(0,"Player2"),this.player1turn=!0,this.p1haswon=!1,this.p2haswon=!1}startGame(){this.startRotationCountdown(),this.startTurn(this.player1turn)}switchTurn(){this.player1turn=!this.player1turn}rotateBoard(){console.log("Board is rotating!!!!!!")}startRotationCountdown(){this.rotateIntervalId=setInterval(()=>{this.rotateBoard()},X)}getPlayer1turn(){return this.player1turn}skipTurn(e){console.log("Player's turn has been skipped"),this.switchTurn()}startTurn(e){console.log("Countdown for player's turn begins now"),this.moveTimeoutId=setTimeout(()=>{this.skipTurn(e)},z)}processPlayerMove(e){this.moveTimeoutId!=null&&clearTimeout(this.moveTimeoutId),this.switchTurn(),this.switchTurn()}checkWin(){return this.player1.getPlayerScore()>=D?this.p1haswon=!0:this.player2.getPlayerScore()>=D&&(this.p2haswon=!0),!!(this.p1haswon||this.p2haswon)}checkPlayerWin(){if(this.p1haswon&&this.p2haswon)console.log("Draw has occured");else if(this.p1haswon)return console.log("Player 1 has won"),this.player1;return console.log("Player 2 has won"),this.player2}getCurrentPlayer(){return this.player1turn?1:2}getPlayerOne(){return this.player1}getPlayerTwo(){return this.player2}}class Q{constructor(e,o,r){n(this,"columnInput",m);n(this,"setPixelColor");n(this,"setDisplayNumber");n(this,"setBorderColor");n(this,"previousTime",0);n(this,"previousRotationTime",0);n(this,"game",new J);n(this,"board",new U);n(this,"display",new K);n(this,"playerHasWon",!1);n(this,"state",-1);n(this,"previousValidColumnInput",-1);this.setPixelColor=e,this.setDisplayNumber=o,this.setBorderColor=r}setup(){this.changeState(k,Date.now()),this.previousRotationTime=Date.now()}loop(){let e=Date.now(),o=Math.max(0,V-(e-this.previousRotationTime));switch(this.setDisplayNumber(Y,o/1e3),this.state){case k:let r=G-(e-this.previousTime);if(this.setDisplayNumber(q,r/1e3),o<=0&&(console.log("uh oh! board is rotatin!"),this.board.rotateBoard(90),this.display.animateBoard(this.board.getBoard()),this.changeState(C,e),this.previousRotationTime=e),r<=0){console.log(`player ${this.game.getCurrentPlayer()} ran out of time`),this.previousTime=e,this.game.switchTurn(),this.game.getCurrentPlayer()==1?this.setBorderColor(T):this.setBorderColor(w);break}if(this.columnInput==m)break;console.log(`token detected at ${this.columnInput}`),this.board.placeToken(this.columnInput,this.game.getCurrentPlayer())?(console.log("valid column"),this.previousValidColumnInput=this.columnInput,this.display.animateBoard(this.board.getBoard()),this.changeState(C,e),this.game.switchTurn()):console.log("invalid column"),this.columnInput=m;break;case C:if(e-this.previousTime>=x){let i=this.board.tokenFall();if(this.previousTime=e,i)this.display.animateBoard(this.board.getBoard());else{let s=[0,0],l=this.board.clearCombos(s,this.previousValidColumnInput,E);this.previousValidColumnInput=m,this.game.getPlayerOne().addPlayerScore(s[0]),this.game.getPlayerTwo().addPlayerScore(s[1]),this.display.updateScoreDisplay(this.game.getPlayerOne().getPlayerScore(),this.game.getPlayerTwo().getPlayerScore()),l?(console.log("linefound"),this.changeState(_,e),this.display.placeholder(this.board.getPrevBoard(),this.board.getBoard())):this.board.isBoardFull()?(console.log("full board"),this.changeState(N,e)):(this.changeState(k,e),this.game.getCurrentPlayer()==1?this.setBorderColor(T):this.setBorderColor(w))}}break;case _:e-this.previousTime>=1e3&&(this.display.animateBoard(this.board.getBoard()),console.log("pretend animation done, go back to tokens falling"),this.changeState(C,e),this.game.checkWin()&&this.changeState(L,e));break;case L:let t=this.game.checkPlayerWin();this.playerHasWon||(t===this.game.getPlayerOne()?alert("player 1 wins, refresh to restart"):alert("player 2 wins, refresh to restart"),this.playerHasWon=!0);break;case N:if(this.board.isBoardEmpty()){this.changeState(k,e);break}e-this.previousTime>=x&&(this.board.clearBottomRow(),this.previousTime=e,this.display.animateBoard(this.board.getBoard()));break}this.columnInput!=m&&console.log("ERROR: token detected outside wait for token state"),this.columnInput=m}changeState(e,o){this.state=e,this.previousTime=o}}const B=document.getElementById("board"),M=b,I=g;B.style.gridTemplateColumns=`repeat(${I}, 80px)`;B.style.gridTemplateRows=`repeat(${M}, 80px)`;for(let a=0;a<M*I;a++){const e=document.createElement("div");e.classList.add("cell"),e.dataset.col=(a%I).toString(),e.dataset.row=Math.floor(a/I).toString(),e.addEventListener("click",Z),B.appendChild(e)}function Z(a){const e=a.target,o=parseInt(e.dataset.col);S.columnInput=o}function ee(a,e){const o=document.querySelector(`#display-${a}`);a!=null&&(a==1||a==2?o.innerHTML=e.toFixed(1):o.innerHTML=e.toString())}function te(a,e,o){const r=document.querySelector(`[data-col="${e}"][data-row="${a}"]`);r!=null&&(r.style.backgroundColor=o)}function oe(a){B.style.borderColor=a}const S=new Q(te,ee,oe);window.arduino=S;S.setup();function H(){S.loop(),requestAnimationFrame(H)}requestAnimationFrame(H);
