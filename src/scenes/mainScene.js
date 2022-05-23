import Player from '../player/Player';
import environmentSpritemap from '/assets/spritemaps/environment/RPG Nature Tileset.png';
import environmentJson from '/assets/spritemaps/environment/mainScene2.json';

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }
    
    preload(){
        Player.preload(this);
        this.load.image('tiles', environmentSpritemap);
        this.load.tilemapTiledJSON('mainScene', environmentJson);
    }

    create(){
        const map = this.make.tilemap({key: 'mainScene'});
        const tileset = map.addTilesetImage('Nature', 'tiles', 32, 32, 0, 0);
        const layer1 = map.createLayer('Collision', tileset, this.cameras.main.width / 3, this.cameras.main.height / 4);
        const layer2 = map.createLayer('Environment', tileset, this.cameras.main.width / 3, this.cameras.main.height / 4);
        const layer3 = map.createLayer('Path', tileset, this.cameras.main.width / 3, this.cameras.main.height / 4);
        layer1.setCollisionByProperty({collides:true});
        layer2.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);
        this.matter.world.convertTilemapLayer(layer3);
        this.player = new Player({scene:this.matter.world,x:1000, y:600, texture:'player2', frame:'player2-idle-down'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
        this.cameras.main.setBounds(0,0,layer3.displayWidth,layer3.displayHeight);
        this.cameras.main.startFollow(this.player);
    }

    update(){
        this.player.update();
    }s
}