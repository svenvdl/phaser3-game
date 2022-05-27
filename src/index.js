import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import MainScene from './scenes/mainScene';
import OfficeScene from './scenes/officeScene';
import UIScene from './scenes/uiScene';
import JoystickScene from './scenes/joystickScene';
import phaserJuice from "./plugins/phaserJuicePlugin.min.js"
import rexUI from "./plugins/rexuiplugin.min.js"
import VirtualJoystickPlugin from "./plugins/rexvirtualjoystickplugin.min.js"


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
    scene: [MainScene, UIScene, OfficeScene, JoystickScene],
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity:{y:0}
        }
    },
    plugins: {
        scene:[
            {plugin: PhaserMatterCollisionPlugin},
            { key: 'phaserJuice', plugin: phaserJuice, mapping: 'juice' },
            { key: 'rexUI', plugin: rexUI, mapping: 'rexUI' },
            { key: 'rexVirtualJoystick', plugin: VirtualJoystickPlugin, start: true }
        ]
    }
};

const game = new Phaser.Game(config);

