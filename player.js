class Player {
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
    renderHP = () => { this.elHP().style.width = this.hp + '%'; }

}


export const player1 = new Player({
    name: 'Scorpion',
    hp: 100,
    player: 1,
    image: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
});

export const player2 = new Player({
    name: 'Sonya',
    hp: 100,
    player: 2,
    image: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
});


