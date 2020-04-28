
var scores,roundScore,activePlayer,gamePlayer,lastDice;

init();

//document.querySelector('#current-'+activePlayer).textContent=dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice +'</em>'
//var x = document.querySelector('#score-0').textContent;
//console.log(x);



document.querySelector('.dice').style.display= 'none';
document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamePlayer){
      //1. Random number
      var dice = Math.floor(Math.random()*6+1);

      //2. display result
      var diceDOM =document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-'+dice+'.png';

      //3. update the round score if the roll number was not 1
      if(dice===6 && lastDice===6){
        //player looses score
        scores[activePlayer]=0;
        document.querySelector('#score-'+activePlayer).textContent='0';
        nextPlayer();
      }
      else if(dice!==1){
        //Add score
        roundScore += dice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
      } else{
            nextPlayer();
            }
      lastDice=dice;
    }
});
document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gamePlayer){
    //add current score to global
    scores[activePlayer]+=roundScore

    //update score in ui
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    console.log(input);

    //undefined,0,null or "" are coereced to false
    //anything else is coereed to true
    if(input){
        var winnningScore=input;
    }else{
      winnningScore=100;
    }
    //check if player won the Game
    if(scores[activePlayer]>=winnningScore){
      document.querySelector('#name-'+activePlayer).textContent='Winner !';
      document.querySelector('.dice').style.display='none';
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      gamePlayer=false;
    }else{
      //nextPlayer
      nextPlayer();
    }
  }

});
function nextPlayer(){
  //Next Player
  activePlayer === 0 ? activePlayer=1 : activePlayer=0;
  roundScore=0;

  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

//      document.querySelector('.player-0-panel').classList.remove('active')
//    document.querySelector('.player-1-panel').classist.add('active')

  document.querySelector('.dice').style.display='none';
}

document.querySelector('.btn-new').addEventListener('click',init);
function init(){
  console.log("new Game");
  scores=[0,0]
  activePlayer=0;
  roundScore=0;
  gamePlayer=true;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent='Player 2';
  document.getElementById('name-1').textContent='Player 1';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
