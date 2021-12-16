const $arenas=document.querySelector('.arenas');
//const $randomButton = document.querySelector('.control .button');

function changeHP (damage) {
    this.hp-=damage;
    
    if (this.hp < 0) {
        this.hp=0;
    }
    //console.log(this.name +' ' + this.hp);
};

function elHP () {
    //console.log(this.name + ' life is ' + this.hp)
    return document.querySelector('.player'+ this.player +' .life');
};

function renderHP () {
    //console.log(this.name + ' render life is ' + this.hp)
    this.elHP().style.width=this.hp+'%';
};

const $formFight=document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function attack () {
    console.log(this.name + 'Fight...');
}

const player1 = {
    name:'Scorpion',
    hp: 100,
    image:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['sable','axe','sword'],
    player:1,
    attack,
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    name:'Sonya',
    hp: 90,
    image:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['sable','axe','sword'],
    player:2,
    attack,
    changeHP,
    elHP,
    renderHP
};

function createElement(tag, className){
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

function getRandom (maxDamage)
{
    return Math.ceil(Math.random()*maxDamage);
}

function playerWins(name){
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




// $randomButton.addEventListener('click', function(){
//     player1.changeHP(getRandom(20));
//     player1.renderHP();
//     player2.changeHP(getRandom(20));
//     player2.renderHP();
   
//     if (player1.hp ===0 || player2.hp===0) {
//         $randomButton.disabled=true;
//         createReloadButtion();
//     }

//     if (player1.hp ===0 && player1.hp<player2.hp) {
//         $arenas.appendChild(playerWins(player2.name));
//     } else if (player2.hp ===0 && player2.hp<player1.hp) {
//         $arenas.appendChild(playerWins(player1.name));
//     } else if (player1.hp ===0 && player2.hp ===0) {
//         $arenas.appendChild(playerWins());
//     } 

// })





$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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

    // if (attack.defence !== enemy.hit ) {
    //     player1.changeHP(enemy.value);
    //     player1.renderHP();
    //     console.log(player2.name +' probil '+ enemy.value);
    //     console.log(player1.name +' HP: '+ player1.hp);
    //     console.log(player2.name +' HP: '+ player2.hp);
    // } else {
    //     console.log(player2.name + ' ne probil');
    // }
    // if (attack.hit !== enemy.defence ) {
    //     player2.changeHP(attack.value);
    //     player2.renderHP();
    //     console.log(player1.name +' probil '+ attack.value);
    //     console.log(player1.name +' HP: '+ player1.hp);
    //     console.log(player2.name +' HP: '+ player2.hp);
    // } else {
    //     console.log(player1.name + ' ne probil');
    // }
    checkDamage(player1,player2, enemy, attack);
    checkDamage(player2,player1, attack, enemy);

    
    if (player1.hp ===0 || player2.hp===0) {
        $submitButton.disabled=true;
        createReloadButtion();
    }
        
    
        if (player1.hp ===0 && player1.hp<player2.hp) {
            $arenas.appendChild(playerWins(player2.name));
        } else if (player2.hp ===0 && player2.hp<player1.hp) {
            $arenas.appendChild(playerWins(player1.name));
        } else if (player1.hp ===0 && player2.hp ===0) {
            $arenas.appendChild(playerWins());
        } 
    
})

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

