const viewportManager = require('/src/modules/getViewport');
const dialogManager = require('/src/modules/dialogManager');

export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
    }

    create(){
        setTimeout(() => {
            dialogManager.showDialog(this, 'Welcome to my interactive resume', 7000, viewportManager);
        }, 2000);
    }

    update(){

    }

}