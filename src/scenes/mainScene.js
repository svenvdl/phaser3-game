import Player from '../player/Player';
import environmentNatureSpritemap from '/assets/spritemaps/environment/RPG Nature Tileset.png';
import environmentAutumnSpritemap from '/assets/spritemaps/environment/nature-autumn.png';
import buildingFamSpritemap from '/assets/spritemaps/environment/building-fam.png';
import fountainSpritemap from '/assets/spritemaps/environment/Fountain_32x32.png';
import schoolSpritemap from '/assets/spritemaps/environment/noorderpoort.png';
import environmentJson from '/assets/spritemaps/environment/mainScene2.json';

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }
    
    preload(){
        Player.preload(this);
        this.load.image('natureTiles', environmentNatureSpritemap);
        this.load.image('autumnTiles', environmentAutumnSpritemap);
        this.load.image('famTiles', buildingFamSpritemap);
        this.load.image('fountainTiles', fountainSpritemap);
        this.load.image('schoolTiles', schoolSpritemap);
        this.load.tilemapTiledJSON('mainScene', environmentJson);
    }

    create(){

        //define map
        const map = this.make.tilemap({key: 'mainScene'});

        //define layers
        const tilesetAutumn = map.addTilesetImage('nature-autumn', 'autumnTiles', 32, 32, 0, 0);
        const tilesetNature = map.addTilesetImage('Nature', 'natureTiles', 32, 32, 0, 0);
        const tilesetFam = map.addTilesetImage('building-fam', 'famTiles', 32, 32, 0, 0);
        const tilesetSchool = map.addTilesetImage('noorderpoort', 'schoolTiles', 32, 32, 0, 0);
        const tilesetFountain = map.addTilesetImage('Fountain_32x32', 'fountainTiles', 32, 32, 0, 0);

        //set layer properties
        const collisionLayer = map.createLayer('Collision',[ tilesetNature, tilesetAutumn, tilesetFam, tilesetFountain, tilesetSchool],  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const environmentLayer = map.createLayer('Environment',[ tilesetNature, tilesetAutumn, tilesetFam, tilesetFountain, tilesetSchool],  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const pathLayer = map.createLayer('Path',[ tilesetNature, tilesetAutumn, tilesetFam, tilesetFountain, tilesetSchool],  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const objectsLayer = map.createLayer('Objects',[ tilesetNature, tilesetAutumn, tilesetFam, tilesetFountain, tilesetSchool],  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const zLayer = map.createLayer('Front',[ tilesetNature, tilesetAutumn, tilesetFam, tilesetFountain, tilesetSchool],  this.cameras.main.width / 3, this.cameras.main.height / 4);

        //set collision and depth
        collisionLayer.setCollisionByProperty({collides:true}).setDepth(1);
        environmentLayer.setCollisionByProperty({collides:true}).setDepth(2);
        pathLayer.setCollisionByProperty({collides:true}).setDepth(3);
        objectsLayer.setCollisionByProperty({collides:true}).setDepth(4);
        zLayer.setCollisionByProperty({collides:false}).setDepth(6);
        
        //convert to tilemaps
        this.matter.world.convertTilemapLayer(collisionLayer);
        this.matter.world.convertTilemapLayer(environmentLayer);
        this.matter.world.convertTilemapLayer(pathLayer);
        this.matter.world.convertTilemapLayer(objectsLayer);
        this.matter.world.convertTilemapLayer(zLayer);

        //add player properties
        this.player = new Player({scene:this.matter.world,x:1100, y:1650, texture:'player2', frame:'idle-down'});
        this.player.setDepth(5);
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })

        //camera functions
        this.cameras.main.fadeIn(1000);
        this.cameras.main.startFollow(this.player);
    }

    update(){
        this.player.update();
    }s
}