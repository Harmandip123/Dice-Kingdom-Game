'use strict';
let dice_img = document.querySelector('.dice');
let rollDise_Button = document.querySelector('.btn--roll');

let Hold_Button = document.querySelector('.btn--hold');
let NewGame_Button = document.querySelector('.btn--new');
let currentScoreP1 = document.querySelector('#current--0');
let currentScoreP2 = document.querySelector('#current--1');
let netScoreP1 = document.querySelector('#score--0');
let netScoreP2 = document.querySelector('#score--1');
let activeplayer1 = document.querySelector('.player--0');
let activeplayer2 = document.querySelector('.player--1');
const switchingBackground = function () {
  activeplayer1.classList.toggle('player--active');
  activeplayer2.classList.toggle('player--active');
};
let currentScore = 0;
let player = 1;
dice_img.classList.add('hidden');
let netSP1 = 0;
let netSP2 = 0;
let displaynetScoreP1 = function (netSP1) {
  netScoreP1.textContent = netSP1;
};
let displaynetScoreP2 = function (netSP2) {
  netScoreP2.textContent = netSP2;
};

let displayCurrentScoreP1 = function (currentScore) {
  currentScoreP1.textContent = currentScore;
};
let displayCurrentScoreP2 = function (currentScore) {
  currentScoreP2.textContent = currentScore;
};
displaynetScoreP1(0);
displaynetScoreP2(0);

rollDise_Button.addEventListener('click', function () {
  let randomNumber1to6 = Math.trunc(Math.random() * 6 + 1); //rolling dice generate random number
  dice_img.src = `dice-${randomNumber1to6}.png`;

  dice_img.classList.remove('hidden'); //   display dice

  if (player == 1) {
    if (randomNumber1to6 != 1) {
      // if dice not 1

      currentScore += randomNumber1to6;
      displayCurrentScoreP1(currentScore); //current update
    } else {
      currentScore = 0;
      currentScoreP1.textContent = currentScore;
      player = 2; //player switch
      switchingBackground();
    }
  } else if (player == 2) {
    if (randomNumber1to6 != 1) {
      currentScore += randomNumber1to6;
      displayCurrentScoreP2(currentScore); //current update
    } else {
      currentScore = 0;
      currentScoreP2.textContent = currentScore;
      player = 1; //player switch
      switchingBackground();
    }
  }
});

Hold_Button.addEventListener('click', function () {
  //agar less then 20 hai player ki value
  if (netSP1 < 20 && netSP2 < 20) {
    if (player == 1) {
      netSP1 += currentScore; //updating net score player1
      displaynetScoreP1(netSP1); //display net score player1
      currentScore = 0;
      displayCurrentScoreP1(currentScore);
      player = 2;
      switchingBackground();
    } else {
      netSP2 += currentScore; //updating net score player2
      displaynetScoreP2(netSP2); //display net score player2
      currentScore = 0;
      displayCurrentScoreP2(currentScore);
      player = 1;
      switchingBackground();
    }
  }
  // agar greater ho gaye value kesi ek ki bhi
  if (netSP1 >= 20 || netSP2 >= 20) {
    dice_img.classList.add('hidden');
    if (netSP1 >= 20) {
      activeplayer1.classList.add('player--winner');
      activeplayer1.classList.remove('player--active');
    } else {
      activeplayer2.classList.add('player--winner');
      activeplayer2.classList.remove('player--active');
    }
    
    // to end the game after winnig the game

    Hold_Button.classList.toggle('hidden');
    rollDise_Button.classList.toggle('hidden');
    netSP1=0;
    netSP2=0;
  }
});

// restart the game using NewGame_Button
NewGame_Button.addEventListener('click', function () {
  displaynetScoreP1(0);
  displaynetScoreP2(0);
  Hold_Button.classList.toggle('hidden');
  rollDise_Button.classList.toggle('hidden');
  activeplayer1.classList.add('player--active');
  if (netSP1 >= 20) {
    activeplayer1.classList.remove('player--winner');
  } else {
    activeplayer2.classList.remove('player--winner');
  }
});
