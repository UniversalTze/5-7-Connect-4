var F=Object.defineProperty;var D=(n,t,o)=>t in n?F(n,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[t]=o;var l=(n,t,o)=>D(n,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y=7,T=7,m=-1,h=0,M="#504f4f",I="#cf4242",v="#ddaf24",g=["white"],k=1,L=6,b=4,E=0,w=1,R=2,$=5e3,j=100,H=1e4,G=2,V=1;class q{constructor(){l(this,"row");l(this,"col");l(this,"board");l(this,"prevBoard");this.row=T,this.col=y,this.board=new Array(T).fill(h).map(()=>new Array(y).fill(h)),this.prevBoard=new Array(T).fill(h).map(()=>new Array(y).fill(h))}getBoard(){return this.board}getPrevBoard(){return this.prevBoard}getRow(){return this.row}getCol(){return this.col}getTopTokenRow(t){for(let o=this.row-1;o>=0;o--)if(this.board[o][t]===h)return o;return-1}placeToken(t,o){return this.board[0][t]!==h?!1:(this.board[0][t]=o,!0)}checkTokenFall(t,o){return this.board[t][o]!==h&&this.board[t+1][o]===h}tokenFall(){let t=this.board.map(i=>[...i]),o=!1;for(let i=0;i<this.row-1;i++)for(let e=0;e<this.col;e++)this.checkTokenFall(i,e)&&(t[i][e]=h,t[i+1][e]=this.board[i][e],o=!0);return this.prevBoard=this.board,this.board=t,o}rotateBoard(t){let o=new Array(this.row).fill(h).map(()=>new Array(this.col).fill(h));switch(t){case 90:for(let i=0;i<this.row;i++)for(let e=0;e<this.col;e++)o[e][this.row-1-i]=this.board[i][e];break;case 180:for(let i=0;i<this.row;i++)for(let e=0;e<this.col;e++)o[this.row-1-i][this.col-1-e]=this.board[i][e];break;case 270:for(let i=0;i<this.row;i++)for(let e=0;e<this.col;e++)o[this.col-1-e][i]=this.board[i][e];break}this.prevBoard=this.board,this.board=o}copyCombo(t,o,i,e,r){if(t===i)for(let s=o;s<=e;s++)r[t][s]=this.board[t][s];else if(o===e)for(let s=t;s<=i;s++)r[s][o]=this.board[s][o];else{let s=-1,a=-1;t<i&&(s=1),o<e&&(a=1);let c=t,p=o;for(;c!=i&&p!=e;)r[c][p]=this.board[c][p],c+=s,p+=a;r[i][e]=this.board[i][e]}}checkHorizontal(t,o){let i=!1;for(let e=0;e<this.row;e++){let r=1;for(let s=0;s<this.col;s++)s!==this.col-1&&this.board[e][s]!==h&&this.board[e][s]===this.board[e][s+1]?r++:(r>=b&&(this.copyCombo(e,s-r+1,e,s,o),t[this.board[e][s]-1]+=r,i=!0),r=1)}return i}checkVertical(t,o){let i=!1;for(let e=0;e<this.col;e++){let r=1;for(let s=0;s<this.row;s++)s!==this.row-1&&this.board[s][e]!==h&&this.board[s][e]===this.board[s+1][e]?r++:(r>=b&&(this.copyCombo(s-r+1,e,s,e,o),t[this.board[s][e]-1]+=r,i=!0),r=1)}return i}checkDiagonal(t,o){let i=!1;for(let e=0;e<this.row;e++)for(let r=0;r<this.col;r++){let s=1,a=1;for(;e+a<this.row&&r+a<this.col&&(this.board[e][r]!==h&&this.board[e][r]===this.board[e+a][r+a]);){s++;a++}s>=b&&(this.copyCombo(e,r,e+s-1,r+s-1,o),t[this.board[e][r]-1]+=s,i=!0)}for(let e=0;e<this.row;e++)for(let r=0;r<this.col;r++){let s=1,a=1;for(;e+a<this.row&&r-a>=0&&(this.board[e][r]!==h&&this.board[e][r]===this.board[e+a][r-a]);){s++;a++}s>=b&&(this.copyCombo(e,r,e+s-1,r-s+1,o),t[this.board[e][r]-1]+=s,i=!0)}return i}checkComboFromToken(t,o,i,e,r,s){let a=1,c=e,p=i,S=e,O=i,x=!1;for(let u=1;u<L;u++){let d=e-u*r,f=i-u*s;if(d>=0&&d<this.row&&f>=0&&f<this.col&&this.board[d][f]===this.board[e][i])a++,p=f,c=d;else break}for(let u=1;u<L;u++){let d=e+u*r,f=i+u*s;if(d>=0&&d<this.row&&f>=0&&f<this.col&&this.board[d][f]===this.board[e][i])a++,O=f,S=d;else break}return a>=b&&(this.copyCombo(c,p,S,O,o),t[this.board[e][i]-1]+=a,x=!0),x}checkForCombos(t,o,i=-1,e=-1){let r=!1;if(i===k)r=r||this.checkHorizontal(t,o),r=r||this.checkVertical(t,o),r=r||this.checkDiagonal(t,o);else{let s=this.getTopTokenRow(e);if(s===-1)return console.log("Token pos is not valid"),!1;r=r||this.checkComboFromToken(t,o,e,s,1,0),r=r||this.checkComboFromToken(t,o,e,s,0,1),r=r||this.checkComboFromToken(t,o,e,s,1,1),r=r||this.checkComboFromToken(t,o,e,s,1,-1)}return r}clearCombos(t,o=-1,i=-1){let e=new Array(this.row).fill(h).map(()=>new Array(this.col).fill(h)),r=[0,0],s=this.board.map(a=>[...a]);if(i===k){if(!this.checkForCombos(r,e,k))return!1}else{if(o<0||o>=this.col)return console.log("Invalid column"),!1;if(!this.checkForCombos(r,e,o=o))return!1}for(let a=0;a<this.row;a++)for(let c=0;c<this.col;c++)e[a][c]!==h&&(s[a][c]=h);return this.prevBoard=this.board,this.board=s,t[0]=r[0],t[1]=r[1],!0}}class Y{animateBoard(t){for(let o=0;o<t.length;o++)for(let i=0;i<t[o].length;i++)t[o][i]==0&&this.setPixelColor(o,i,M),t[o][i]==1?this.setPixelColor(o,i,I):t[o][i]==2&&this.setPixelColor(o,i,v)}animateComboClear(t,o){for(let i=0;i<t.length;i++)for(let e=0;e<t[i].length;e++)t[i][e]==o[i][e]?t[i][e]==1?this.setPixelColor(i,e,I):t[i][e]==2&&this.setPixelColor(i,e,v):t[i][e]==1?this.flashPixel(i,e,I):t[i][e]==2&&this.flashPixel(i,e,v)}updateScoreDisplay(t,o){const i=document.getElementById("display-0");i&&(i.innerText=t.toString());const e=document.getElementById("display-3");e&&(e.innerText=o.toString())}setPixelColor(t,o,i){const e=document.querySelector(`[data-row="${t}"][data-col="${o}"]`);e&&(e.style.backgroundColor=i)}flashPixel(t,o,i){const e=document.querySelector(`[data-row="${t}"][data-col="${o}"]`);if(e){const r=e.style.backgroundColor,s=500;this.setPixelColor(t,o,g[0]),setTimeout(()=>{this.setPixelColor(t,o,i)},s),setTimeout(()=>{this.setPixelColor(t,o,g[0])},s*2),setTimeout(()=>{this.setPixelColor(t,o,r)},s*3)}}flashPixel2(t,o,i){const e=document.querySelector(`[data-row="${t}"][data-col="${o}"]`);if(e){const r=e.style.backgroundColor,s=500;this.setPixelColor(t,o,g[0]),setTimeout(()=>{this.setPixelColor(t,o,i)},s),setTimeout(()=>{this.setPixelColor(t,o,g[0])},s*2),setTimeout(()=>{this.setPixelColor(t,o,r)},s*3)}}something(t){return t==1500}placeholder(t,o){for(let i=0;i<y;i++)for(let e=0;e<T;e++)t[i][e]!=o[i][e]&&this.setPixelColor(i,e,"white")}}class _{constructor(t,o){l(this,"playerScore");l(this,"playerName");this.playerScore=t,this.playerName=o}getPlayerScore(){return this.playerScore}getPlayerName(){return this.playerName}addPlayerScore(t){this.playerScore=this.playerScore+t}}const U=3e4,K=12e4;class W{constructor(){l(this,"moveTimeoutId",null);l(this,"rotateIntervalId",null);l(this,"player1turn");l(this,"p1haswon");l(this,"p2haswon");l(this,"player1");l(this,"player2");this.player1=new _(0,"Player1"),this.player2=new _(0,"Player2"),this.player1turn=!0,this.p1haswon=!1,this.p2haswon=!1}startGame(){this.startRotationCountdown(),this.startTurn(this.player1turn)}switchTurn(){this.player1turn=!this.player1turn}rotateBoard(){console.log("Board is rotating!!!!!!")}startRotationCountdown(){this.rotateIntervalId=setInterval(()=>{this.rotateBoard()},K)}getPlayer1turn(){return this.player1turn}skipTurn(t){console.log("Player's turn has been skipped"),this.switchTurn()}startTurn(t){console.log("Countdown for player's turn begins now"),this.moveTimeoutId=setTimeout(()=>{this.skipTurn(t)},U)}processPlayerMove(t){this.moveTimeoutId!=null&&clearTimeout(this.moveTimeoutId),this.switchTurn(),this.switchTurn()}checkWin(){return this.player1.getPlayerScore()>=21?this.p1haswon=!0:this.player2.getPlayerScore()>=21&&(this.p2haswon=!0),!!(this.p1haswon||this.p2haswon)}checkPlayerWin(){if(this.p1haswon&&this.p2haswon)console.log("Draw has occured");else if(this.p1haswon)return console.log("Player 1 has won"),this.player1;return console.log("Player 2 has won"),this.player2}getCurrentPlayer(){return this.player1turn?1:2}}class z{constructor(t,o){l(this,"columnInput",m);l(this,"setPixelColor");l(this,"setDisplayNumber");l(this,"previousTime",0);l(this,"previousRotationTime",0);l(this,"interval",1e3);l(this,"ledState",0);l(this,"numberState",0);l(this,"interval1",500);l(this,"interval2",1e3);l(this,"interval3",1500);l(this,"game",new W);l(this,"board",new q);l(this,"display",new Y);l(this,"state",-1);l(this,"previousValidColumnInput",-1);this.setPixelColor=t,this.setDisplayNumber=o}setup(){this.changeState(E,Date.now()),this.previousRotationTime=Date.now()}loop(){let t=Date.now(),o=Math.max(0,H-(t-this.previousRotationTime));switch(this.setDisplayNumber(V,o/1e3),this.state){case E:let i=$-(t-this.previousTime);if(this.setDisplayNumber(G,i/1e3),o<=0&&(console.log("uh oh! board is rotatin!"),this.board.rotateBoard(90),this.display.animateBoard(this.board.getBoard()),this.changeState(w,t),this.previousRotationTime=t),i<=0){console.log(`player ${this.game.getCurrentPlayer()} ran out of time`),this.previousTime=t,this.game.switchTurn();break}if(this.columnInput==m)break;console.log(`token detected at ${this.columnInput}`),this.board.placeToken(this.columnInput,this.game.getCurrentPlayer())?(console.log("valid column"),this.previousValidColumnInput=this.columnInput,this.display.animateBoard(this.board.getBoard()),this.changeState(w,t),this.game.switchTurn()):console.log("invalid column"),this.columnInput=m;break;case w:if(t-this.previousTime>=j){let e=this.board.tokenFall();if(this.previousTime=t,e)this.display.animateBoard(this.board.getBoard());else{let r=[0,0],s=this.board.clearCombos(r,this.previousValidColumnInput,k);this.previousValidColumnInput=m,s?(console.log("linefound"),this.changeState(R,t),this.display.placeholder(this.board.getPrevBoard(),this.board.getBoard())):this.changeState(E,t)}}break;case R:t-this.previousTime>=1e3&&(this.display.animateBoard(this.board.getBoard()),console.log("pretend animation done, go back to tokens falling"),this.changeState(w,t));break}this.columnInput!=m&&console.log("ERROR: token detected outside wait for token state"),this.columnInput=m}changeState(t,o){this.state=t,this.previousTime=o}}const A=document.getElementById("board"),N=y,P=T;A.style.gridTemplateColumns=`repeat(${P}, 80px)`;A.style.gridTemplateRows=`repeat(${N}, 80px)`;for(let n=0;n<N*P;n++){const t=document.createElement("div");t.classList.add("cell"),t.dataset.col=(n%P).toString(),t.dataset.row=Math.floor(n/P).toString(),t.addEventListener("click",X),A.appendChild(t)}function X(n){const t=n.target,o=parseInt(t.dataset.col);C.columnInput=o}function J(n,t){const o=document.querySelector(`#display-${n}`);n!=null&&(n==1||n==2?o.innerHTML=t.toFixed(1):o.innerHTML=t.toString())}function Q(n,t,o){const i=document.querySelector(`[data-col="${t}"][data-row="${n}"]`);i!=null&&(i.style.backgroundColor=o)}const C=new z(Q,J);window.arduino=C;C.setup();function B(){C.loop(),requestAnimationFrame(B)}requestAnimationFrame(B);
