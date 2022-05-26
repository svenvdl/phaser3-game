const viewportManager = require('/src/modules/getViewport');
const dialogManager = require('/src/modules/dialogManager');

export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
    }

    showTitle(text, duration){
        dialogManager.showTitle(this, text, duration, viewportManager);
    }

    showDialog(text, duration){
        dialogManager.showDialog(this, text, duration, viewportManager);
    }

    create(){}

    update(){}

}