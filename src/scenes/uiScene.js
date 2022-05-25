const viewportManager = require('/src/modules/getViewport');

export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
        Phaser.Scene.call(this, { key: 'UIScene', active: true });

        this.score = 0;
    }

    create(){
        //  Our Text object to display the Score
        var info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' });
        var viewport = new Phaser.Geom.Rectangle();

        viewportManager.getViewport(this.scale, viewport);

        console.log("UISCENE is running");
        info.setText('Score').setDepth(11);
        info.setPosition(viewport.left, viewport.top);

    }

}