const viewportManager = require('/src/modules/getViewport');
const dialogManager = require('/src/modules/dialogManager');

export default class titleScene extends Phaser.Scene {
    constructor(){
        super('titleScene');
    }

    showTitle(text, duration){
        dialogManager.showTitle(this, text, duration, viewportManager);
    }

    showDialog(text, duration, alert){
        dialogManager.showDialog(this, text, duration, viewportManager, alert);
    }

    preload(){
    }

    create(){}
    

    update(){}

}