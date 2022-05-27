const viewportManager = require('/src/modules/getViewport');

var player

export default class JoystickScene extends Phaser.Scene {
    constructor(){
        super('JoystickScene');
    }

    init(data){
        if(data.player){
            player = data.player;
        }
    }

    preload(){
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create(){
        let viewportSize = new Phaser.Geom.Rectangle();
        let viewport = viewportManager.getViewport(this.scale, viewportSize);
        let circle1 = this.add.circle(0, 0, 100, 0x888888);
        let circle2 = this.add.circle(0, 0, 50, 0xcccccc);

        circle1.alpha = 0.6
        circle2.alpha = 0.7
    
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 150,
            y: viewport.bottom * 0.85,
            radius: 100,
            base: circle1,
            thumb: circle2,
        })
        // .on('update', this.dumpJoyStickState, this);

        this.text = this.add.text(0, 0);
        this.scene.bringToTop();
        if(viewport.width < 960){
            this.joyStick.setVisible(true);
            circle1.setVisible(true);
            circle2.setVisible(true);
        } else{
            this.joyStick.setVisible(false);
            circle1.setVisible(false);
            circle2.setVisible(false);
        }
    }
    
    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += `${name} `;
            }
        }

        s += `
            Force: ${Math.floor(this.joyStick.force * 100) / 100}
            Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
            `;

        s += '\nTimestamp:\n';
        for (var name in cursorKeys) {
            var key = cursorKeys[name];
            s += `${name}: duration=${key.duration / 1000}\n`;
        }
        this.text.setText(s);
    }

    update(){

        let viewportSize = new Phaser.Geom.Rectangle();
        let viewport = viewportManager.getViewport(this.scale, viewportSize);
        if(viewport.width < 960){
            var leftKeyDown = this.joyStick.left;
            var rightKeyDown = this.joyStick.right;
            var upKeyDown = this.joyStick.up;
            var downKeyDown = this.joyStick.down;
            var noKeyDown = this.joyStick.noKey;

            if(leftKeyDown){
                player.inputKeys.left.isDown = true;
            } else if(rightKeyDown){
                player.inputKeys.right.isDown = true;
            } else if(noKeyDown){
                player.inputKeys.left.isDown = false;
                player.inputKeys.right.isDown = false;
            }
            
            if(upKeyDown){
                player.inputKeys.up.isDown = true;
            } else if(downKeyDown){
                player.inputKeys.down.isDown = true;
            } else if(noKeyDown){
                player.inputKeys.up.isDown = false;
                player.inputKeys.down.isDown = false;
            }
        }

    }

}