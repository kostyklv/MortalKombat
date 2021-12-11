const player1 = {
    name:'Scorpion',
    hp: 100,
    image:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['sable','axe','sword'],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
};

const player2 = {
    name:'Sonya',
    hp: 90,
    image:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['sable','axe','sword'],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
};


function createPlayer(type, player) {


    const $hero = document.createElement('div');
    $hero.classList.add(type);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $hero.appendChild($progressbar);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width=player.hp+'%';
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText=player.name;
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character');
    
    const $img = document.createElement('img');
    $img.src = player.image;
    $character.appendChild($img);


    $hero.appendChild($character);
    $root.appendChild($hero);
} 

const $root=document.querySelector('.arenas');

createPlayer('player1',player1);
createPlayer('player2',player2);

