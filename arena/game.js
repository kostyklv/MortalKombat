import { Player, checkDamage, enemyAttack, playerAttack } from './player.js';
import { getRandom, generateLogs, showResult, createReloadButtion } from './utils/index.js';

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control');



$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack($formFight);

    //console.log('####: a', player);
    //console.log('####: e', enemy);

    const logText = checkDamage(player1, player2, enemy, player);
    if (logText) {
        $chat.insertAdjacentHTML('afterbegin', logText)
    };

    const logText2 = checkDamage(player2, player1, player, enemy);
    if (logText2) {
        $chat.insertAdjacentHTML('afterbegin', logText2)
    }

    const logResult = showResult($arenas, player1, player2);
    if (logResult) {
        $chat.insertAdjacentHTML('afterbegin', logResult);
        createReloadButtion($arenas);

    }

    //$chat.insertAdjacentHTML('afterbegin', showResult($arenas, player1, player2));

})

// export function start() {
//     $arenas.appendChild(createPlayer(player1));
//     $arenas.appendChild(createPlayer(player2));

//     $chat.insertAdjacentHTML('afterbegin', generateLogs('start', player1, player2));
// };

let player1;
let player2;



export class Game {
    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then (res=> res.json());
        return body;
    }

    start = async() => {
        const players = await this.getPlayers();
        console.log(players);
        const p1 = JSON.parse(localStorage.getItem('player1'));
        ///const p1 = players[getRandom(players.length-1)];
        const p2 = players[getRandom(players.length-1)];
        console.log(p1, p2);
        player1 = new Player ({
            ...p1,
            image: p1.img,
            player:1,
            rootSelector: 'arenas',
        });
        player2 = new Player ({
            ...p2,
            image: p2.img,
            player:2,
            rootSelector: 'arenas',
        });
        const $arenas = document.querySelector('.arenas');
        const $chat = document.querySelector('.chat');
        const $formFight = document.querySelector('.control');
        
        $arenas.appendChild(player1.createPlayer());
        $arenas.appendChild(player2.createPlayer());
        $chat.insertAdjacentHTML('afterbegin', generateLogs('start', player1, player2));
    }
}