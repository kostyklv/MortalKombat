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

function attack() {
    console.log(this.name + 'Fight...');
}


export const player1 = {
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

export const player2 = {
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
