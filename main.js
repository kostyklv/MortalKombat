import { plyayer } from './player.js';

import getRandom from './utils.js';

console.log(plyayer);


const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.control .button');
const $chat = document.querySelector('.chat');

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp < 0) {
        this.hp = 0;
    }
    //$playerLife.style.width=player.hp+'%';
    console.log(this.name +' ' + this.hp);
};

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
};

function renderHP() {
    this.elHP().style.width = this.hp + '%';
};

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function attack() {
    console.log(this.name + 'Fight...');
}

const player1 = {
    name: 'Scorpion',
    hp: 100,
    image: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sable', 'axe', 'sword'],
    player: 1,
    attack,
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    name: 'Sonya',
    hp: 90,
    image: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['sable', 'axe', 'sword'],
    player: 2,
    attack,
    changeHP,
    elHP,
    renderHP
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}




function createPlayer(playerObj) {
    const $hero = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.image;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $hero.appendChild($progressbar);
    $hero.appendChild($character);

    return $hero;
}

// function getRandom(num) {
//     return Math.ceil(Math.random() * num);
// }

function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'Draw';
    }

    return $winTitle;
}

function createReloadButtion() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    })

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}


//const $reloadButton =createReloadButtion();
//$arenas.appendChild($reloadButton);
//$restartButton = document.querySelector('.reloadWrap .button');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogsStart ('start',player1,player2);


function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    console.log('Hit ' + hit);
    console.log('Defence ' + defence);

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;

    }

    return attack;
}

const $submitButton = document.querySelector('.buttonWrap .button');

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    console.log('####: a', player);
    console.log('####: e', enemy);

    checkDamage(player1, player2, enemy, player);
    checkDamage(player2, player1, player, enemy);
    showResult();
    
})

function showResult(){
    if (player1.hp === 0 || player2.hp === 0) {
        $submitButton.disabled = true;
        //createReloadButtion();
    }


    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogsWin ('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogsWin ('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogsDraw ();
    }
}
/**
 * Start message in chat window
 * @param {string} type 
 * @param {player1} player1 
 * @param {player2} player2 
 */
function generateLogsStart (type, player1, player2){
    const timestamp=new Date().toLocaleTimeString();
    const text =logs[type].replace('[player1]',`<u>${player1.name}</u>`).replace('[player2]',player2.name).replace('[time]',timestamp);
    console.log(text);
    const el=`<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',el);
}

/**
 * Final message about DRAW in chat window
 */
function generateLogsDraw (){
    const timestamp=new Date().toLocaleTimeString();
    const text =logs['draw'];
    console.log(text);
    const el=`<p>${timestamp}: ${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',el);
}

function generateLogsWin (type, winner, looser){
    const timestamp=new Date().toLocaleTimeString();
    const text =logs[type][getRandom(logs[type].length-1)].replace('[playerWins]',winner.name).replace('[playerLose]',looser.name);
    console.log(text);
    const el=`<p>${timestamp}: ${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',el);
}

function generateLogs (type, player1, player2){
    const timestamp=new Date().toLocaleTimeString();
    const text =logs[type][getRandom(logs[type].length-1)].replace('[playerKick]',player1.name).replace('[playerDefence]',player2.name);
    console.log(text);
    const el=`<p>${timestamp}: ${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',el);
}



function checkDamage(player, enemyPlayer, enemy, attack) {
    if (attack.defence !== enemy.hit) {
        player.changeHP(enemy.value);
        player.renderHP();
        generateLogs('hit', player, enemyPlayer);
        console.log(enemyPlayer.name + ' probil ' + enemy.value + ' v ' + enemy.hit);
        console.log(player.name + ' HP: ' + player.hp);
        console.log(enemyPlayer.name + ' HP: ' + enemyPlayer.hp);
    } else {
        generateLogs('defence', player, enemyPlayer);
        console.log(enemyPlayer.name + ' ne probil');
    }
}

