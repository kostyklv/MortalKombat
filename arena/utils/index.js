import { LOGS } from '../constants/index.js';

export const getRandom = (num) => Math.ceil(Math.random() * num);

export function generateLogs (type, player1, player2, winner, looser){
    let text;
    const timestamp=new Date().toLocaleTimeString();
    switch (type) {
        case 'draw':
            text =LOGS['draw'];
            break;
        case 'start':
            text =LOGS[type].replace('[player1]',`<u>${player1.name}</u>`).replace('[player2]',player2.name).replace('[time]',timestamp);
            break;
        case 'end':
            text =LOGS[type][getRandom(LOGS[type].length-1)].replace('[playerWins]',winner.name).replace('[playerLose]',looser.name);
            break;
        default:
            text =LOGS[type][getRandom(LOGS[type].length-1)].replace('[playerKick]',player1.name).replace('[playerDefence]',player2.name);
    }
    console.log(text);
    const el=`<p>${timestamp}: ${text}</p>`;
    return el;
}

export function showResult($arenas, player1, player2){
    if (player1.hp === 0 || player2.hp === 0) {
        //$submitButton.disabled = true;
        //createReloadButtion();
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        return generateLogs('end', player2, player1, player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        return generateLogs('end', player1, player2, player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        return generateLogs('draw');
    }
}

export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}


export function createReloadButtion ($arenas) {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText='Restart';

    $reloadButton.addEventListener('click',function(){
        window.location.reload();
    })

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
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
