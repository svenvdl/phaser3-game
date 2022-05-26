const viewportManager = require('/src/modules/getViewport');
const dialogManager = require('/src/modules/dialogManager');

export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
    }

    showDialog(text, duration){
        var isVisible = this.scene.isActive();
        console.log(isVisible + ' Running showDialog');
        dialogManager.showDialog(this, text, duration, viewportManager);
    }

    create(){}

    update(){}

}