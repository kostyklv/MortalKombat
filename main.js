// import Game from './game.js';

// const game = new Game();

// game.start();


import { player1, player2 } from './player.js';
import { getRandom, logs, HIT, ATTACK, createElement, createPlayer, generateLogs} from './utils.js';

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control');



function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText=name + ' wins';
    } else {
        $winTitle.innerText='Draw';
    }
    return $winTitle;
}

function createReloadButtion () {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText='Restart';

    $reloadButton.addEventListener('click',function(){
        window.location.reload();
    })

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$chat.insertAdjacentHTML('afterbegin',generateLogs ('start',player1,player2));

function enemyAttack() {
    const hit=ATTACK[getRandom(3)-1];
    const defence=ATTACK[getRandom(3)-1];
    console.log('Hit '+hit);
    console.log('Defence '+defence);

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
    let hit;
    let value;
    let defence;
    for (let item of $formFight) {
        if (item.checked && item.name==='hit') {
            value = getRandom(HIT[item.value]);
            hit=item.value;
        }

        if (item.checked && item.name==='defence') {
            defence=item.value;
        }
        item.checked=false;

    }
    console.log('Hit '+hit);
    console.log('Defence '+defence);

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}
const $submitButton = document.querySelector('.buttonWrap .button');


$formFight.addEventListener('submit',function(e){
    e.preventDefault();
    const enemy=enemyAttack();
    const player=playerAttack();

    console.log('####: a', player);
    console.log('####: e', enemy);

    checkDamage(player1, player2, enemy, player);
    checkDamage(player2, player1, player, enemy);
    showResult();
    
})

function showResult(){
    if (player1.hp === 0 || player2.hp === 0) {
        $submitButton.disabled = true;
        createReloadButtion();
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        $chat.insertAdjacentHTML('afterbegin',generateLogs('end', player2, player1));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        $chat.insertAdjacentHTML('afterbegin',generateLogs('end', player1, player2));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        $chat.insertAdjacentHTML('afterbegin',generateLogs('draw'));
    }
}





function checkDamage(player, enemyPlayer, enemy, attack) {
    if (attack.defence !== enemy.hit ) {
        player.changeHP(enemy.value);
        player.renderHP();
        $chat.insertAdjacentHTML('afterbegin',generateLogs('hit', player, enemyPlayer));
        console.log(enemyPlayer.name +' probil '+ enemy.value);
        console.log(player.name +' HP: '+ player.hp);
        console.log(enemyPlayer.name +' HP: '+ enemyPlayer.hp);
    } else {
        console.log(enemyPlayer.name + ' ne probil');
    }    
}

