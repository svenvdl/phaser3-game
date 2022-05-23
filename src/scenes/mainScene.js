import Player from '../player/Player';
import environmentSpritemap from '/assets/spritemaps/environment/nature-tileset.png';
import environmentJson from '/assets/spritemaps/environment/mainScene.json';

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
        const layer1 = map.createLayer('Tile Layer 1', tileset, this.cameras.main.width / 3, this.cameras.main.height / 4);
        const layer2 = map.createLayer('Tile Layer 2', tileset, this.cameras.main.width / 3, this.cameras.main.height / 4);
        layer1.setCollisionByProperty({collides:true});
        layer2.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);
        this.player = new Player({scene:this.matter.world,x:this.cameras.main.width / 2,y:this.cameras.main.height / 2,texture:'player', frame:'mage_idle_1'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
    }

    update(){
        this.player.update();
    }
}