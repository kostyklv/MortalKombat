


import { player1, player2 } from './player.js';
import { getRandom, logs, HIT, ATTACK } from './utils.js';

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control');

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerObj) {
    const $hero = createElement('div','player'+playerObj.player);
    const $progressbar = createElement('div','progressbar');
    const $life = createElement('div','life');
    const $name = createElement('div','name');
    const $character = createElement('div','character');
    const $img = createElement('img');
 
    $life.style.width=playerObj.hp+'%';
    $name.innerText=playerObj.name;
    $img.src = playerObj.image;
 
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
  
    $character.appendChild($img);

    $hero.appendChild($progressbar);
    $hero.appendChild($character);

    return $hero;
} 

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
        generateLogs ('start',player1,player2);





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

const $submitButton = document.querySelector('.buttonWrap .button');


$formFight.addEventListener('submit',function(e){
    e.preventDefault();
    const enemy=enemyAttack();

    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name==='hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit=item.value;
        }

        if (item.checked && item.name==='defence') {
            attack.defence=item.value;
        }

        item.checked=false;

    }
    console.log('####: a', attack);
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
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}


function generateLogs (type, player1, player2){
    let text;
    const timestamp=new Date().toLocaleTimeString();
    switch (type) {
        case 'draw':
            text =logs['draw'];
            break;
        case 'start':
            text =logs[type].replace('[player1]',`<u>${player1.name}</u>`).replace('[player2]',player2.name).replace('[time]',timestamp);
            break;
        case 'end':
            text =logs[type][getRandom(logs[type].length-1)].replace('[playerWins]',winner.name).replace('[playerLose]',looser.name);
            break;
        default:
            text =logs[type][getRandom(logs[type].length-1)].replace('[playerKick]',player1.name).replace('[playerDefence]',player2.name);
    }
    console.log(text);
    const el=`<p>${timestamp}: ${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',el);
}



function checkDamage(player, enemyPlayer, enemy, attack) {
    if (attack.defence !== enemy.hit ) {
        player.changeHP(enemy.value);
        player.renderHP();
        console.log(enemyPlayer.name +' probil '+ enemy.value);
        console.log(player.name +' HP: '+ player.hp);
        console.log(enemyPlayer.name +' HP: '+ enemyPlayer.hp);
    } else {
        console.log(enemyPlayer.name + ' ne probil');
    }    
}

export {Game} ;
