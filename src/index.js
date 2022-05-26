import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import MainScene from './scenes/mainScene';
import OfficeScene from './scenes/officeScene';
import UIScene from './scenes/uiScene';


const config = {
    type: Phaser.AUTO,
    scale: {
        zoom:1
    },
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'phaser-game',
	width: window.innerWidth,
	height: window.innerHeight,
    pixelArt: true,
    backgroundColor: '#639BFF',
    scene: [MainScene, OfficeScene, UIScene],
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity:{y:0}
        }
    },
    plugins: {
        scene:[
            {
                plugin: PhaserMatterCollisionPlugin
            }
        ]
    }
};

const game = new Phaser.Game(config);
