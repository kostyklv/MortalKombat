import { getRandom, generateLogs, createElement } from './utils/index.js';
import { HIT, ATTACK } from './constants/index.js';

export class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.type = props.type;
        this.player = props.player;
        this.image = props.image;
    }


    attack = () => {
        console.log(this.name + 'Fight...');
    };
    changeHP = (damage) => {
        this.hp -= damage;

        if (this.hp < 0) {
            this.hp = 0;
        }
        //$playerLife.style.width=player.hp+'%';
        console.log(this.name + ' ' + this.hp);
    };
    elHP = () => {
        return document.querySelector('.player' + this.player + ' .life');
    };
    renderHP = () => { this.elHP().style.width = this.hp + '%'; };
    createPlayer = () => {
        const $hero = createElement('div','player'+this.player);
        const $progressbar = createElement('div','progressbar');
        const $life = createElement('div','life');
        const $name = createElement('div','name');
        const $character = createElement('div','character');
        const $img = createElement('img');
     
        $life.style.width=this.hp+'%';
        $name.innerText=this.name;
        $img.src = this.image;
     
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
      
        $character.appendChild($img);
    
        $hero.appendChild($progressbar);
        $hero.appendChild($character);
    
        return $hero;
    }
}


export function createPlayer1(playerObj) {
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


export const player1 = new Player({
    name: 'Scorpion',
    hp: 10,
    player: 1,
    image: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
});

export const player2 = new Player({
    name: 'Sonya',
    hp: 100,
    player: 2,
    image: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
});


export function enemyAttack() {
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

export function playerAttack($formFight) {
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

function showResult(){
    if (player1.hp === 0 || player2.hp === 0) {
        $submitButton.disabled = true;
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

 



export function checkDamage(player, enemyPlayer, enemy, attack) {
    if (attack.defence !== enemy.hit ) {
        player.changeHP(enemy.value);
        player.renderHP();
        return generateLogs('hit', player, enemyPlayer);
        console.log(enemyPlayer.name +' probil '+ enemy.value);
        console.log(player.name +' HP: '+ player.hp);
        console.log(enemyPlayer.name +' HP: '+ enemyPlayer.hp);
    } else {
        console.log(enemyPlayer.name + ' ne probil');
    }    
}