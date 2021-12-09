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

const $box = document.getElementById('box');
console.log($box.innerText);
function createPlayer() {


};

player1.attack(player1.name);

const $player1 = document.createElement('div');
$player1.innerText='Scorpion';
$player1.classList.add('player1');

const $root=document.querySelector('div');
$root.appendChild($player1)