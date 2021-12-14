const $arenas=document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');


const player1 = {
    name:'Scorpion',
    hp: 100,
    image:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['sable','axe','sword'],
    player:1,
    attack: function () {
        console.log(this.name + 'Fight...');
    }
};

const player2 = {
    name:'Sonya',
    hp: 90,
    image:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['sable','axe','sword'],
    player:2,
    attack: function () {
        console.log(this.name + 'Fight...');
    }
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

function changeHP (player) {
    const $playerLife=document.querySelector('.player'+ player.player +' .life');
    player.hp-=Math.ceil(Math.random()*20);
    
    
    if (player.hp < 0) {
        player.hp=0;
         $randomButton.disabled=true;
    }
    $playerLife.style.width=player.hp+'%';
    console.log(player.name +' ' + player.hp);
}

function playerLoose(name){
    const $looseTitle = createElement('div', 'loseTitle');
    $looseTitle.innerText=name + ' loose';

    return $looseTitle;
}

function playerWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText=name + ' win';

    return $winTitle;
}
$randomButton.addEventListener('click', function(){
    console.log('###:Click random buttion');
    changeHP(player1);
    changeHP(player2);
    if (player1.hp>player2.hp && player2.hp == 0)
    {
        console.log(player1.name + ' win');
        $arenas.appendChild(playerWin(player1.name));
    }
    if (player2.hp>player1.hp && player1.hp == 0)
    {
        console.log(player2.name + ' win');
        $arenas.appendChild(playerWin(player2.name));
    }
    if (player1.hp==0 && player2.hp == 0)
    {
        console.log('Nobody win');
        $arenas.appendChild(playerWin('Nobody'));
    }

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

