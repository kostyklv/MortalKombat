const $arenas=document.querySelector('.arenas');
const $randomButton = document.querySelector('.control .button');


function changeHP (damage) {
    this.hp-=damage;
    
    
    if (this.hp < 0) {
        this.hp=0;
    }
    //$playerLife.style.width=player.hp+'%';
    console.log(this.name +' ' + this.hp);
};

function elHP () {
    console.log(this.name + ' life is ' + this.hp)
    return document.querySelector('.player'+ this.player +' .life');
};

function renderHP () {
    console.log(this.name + ' render life is ' + this.hp)
    this.elHP().style.width=this.hp+'%';
};

const player1 = {
    name:'Scorpion',
    hp: 100,
    image:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['sable','axe','sword'],
    player:1,
    attack: function () {
        console.log(this.name + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

const player2 = {
    name:'Sonya',
    hp: 90,
    image:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['sable','axe','sword'],
    player:2,
    attack: function () {
        console.log(this.name + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
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

function randomDamage (maxDamage)
{
    return Math.ceil(Math.random()*maxDamage);
    
}


function changeHP1 (player, damage) {
    const $playerLife=document.querySelector('.player'+ player.player +' .life');
    player.hp-=damage;
    
    
    if (player.hp < 0) {
        player.hp=0;
    }
    $playerLife.style.width=player.hp+'%';
    console.log(player.name +' ' + player.hp);
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
    const $reloadButton = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText='Restart';
    $reloadButton.appendChild($button);
    $button.disabled=true;
    
    return $reloadButton;
}


const $reloadButton =createReloadButtion();
$arenas.appendChild($reloadButton);
$restartButton = document.querySelector('.reloadWrap .button');

$reloadButton.addEventListener('click', function(){
    window.location.reload();
 
})

$randomButton.addEventListener('click', function(){
    console.log('###:Click random buttion');
    player1.changeHP(randomDamage(20));
    player1.renderHP();
    player2.changeHP(randomDamage(20));
    player2.renderHP();
   
    if (player1.hp ===0 || player2.hp===0) {
        $randomButton.disabled=true;
        $restartButton.disabled=false;
    }

    if (player1.hp ===0 && player1.hp<player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp ===0 && player2.hp<player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp ===0 && player2.hp ===0) {
        $arenas.appendChild(playerWins());
    } 

})





$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


