const player1 = {
    name:'Scorpion',
    hp: 100,
    image:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['sable','axe','sword'],
    attack: function (name) {
        console.log(name + 'Fight...');
    }
};

const player2 = {
    name:'Sonya',
    hp: 100,
    image:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['sable','axe','sword'],
    attack: function () {
        console.log(name + 'Fight...');
    }
};


function createPlayer(type, player) {
    const $player1 = document.createElement('div');
    $player1.classList.add('player1');

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player1.appendChild($progressbar);

    const $life = document.createElement('div');
    $life.classList.add('life');
   // $life.style.width=50;
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


    $player1.appendChild($character);



    const $root=document.querySelector('.arenas');
    $root.appendChild($player1);
} 


createPlayer('player1',player1);
createPlayer('player2',player2);
