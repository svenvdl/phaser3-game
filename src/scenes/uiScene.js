const viewportManager = require('/src/modules/getViewport');

export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
        Phaser.Scene.call(this, { key: 'UIScene', active: true });

        this.score = 0;
    }

    typewriteText(text){
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 200
        })
    }

    create(){
        //  Our Text object to display the Score
        let info = this.add.text(0, 0, 'Welcome to my interactive resume', { font: '16px Arial', fill: '#ffffff', stroke:'black', strokeThickness: 3});

        let viewportSize = new Phaser.Geom.Rectangle();

        let viewport = viewportManager.getViewport(this.scale, viewportSize);
        
        info.setDepth(11);
        info.setPosition(viewport.left * 1.75 , viewport.bottom - 100);
        this.scale.on('resize', function () {
            viewport = viewportManager.getViewport(this.scale, viewportSize);
            info.setPosition(viewport.left, viewport.top);
        }, this);
    }

}