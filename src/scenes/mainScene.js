import Player from '../player/Player';
import environmentNatureSpritemap from '/assets/spritemaps/environment/RPG Nature Tileset.png';
import environmentAutumnSpritemap from '/assets/spritemaps/environment/nature-autumn.png';
import buildingFamSpritemap from '/assets/spritemaps/environment/building-fam.png';
import fountainSpritemap from '/assets/spritemaps/environment/Fountain_32x32.png';
import schoolSpritemap from '/assets/spritemaps/environment/noorderpoort.png';
import environmentJson from '/assets/spritemaps/environment/mainScene2.json';
//import assets for animated environment object Fountain
import fountainAnimatedSpritemap from '/assets/spritemaps/environment/animated/fountain.png';
import fountainAnimatedSpritemapAtlas from '/assets/spritemaps/environment/animated/fountain_atlas.json';
import fountainAnimatedAnimations from '/assets/spritemaps/environment/animated/fountain_anim.json';

import billboardAnimatedSpritemap from '/assets/spritemaps/environment/animated/billboard.png';
import billboardAnimatedSpritemapAtlas from '/assets/spritemaps/environment/animated/billboard_atlas.json';
import billboardAnimatedAnimations from '/assets/spritemaps/environment/animated/billboard_anim.json';

const layerManager = require('/src/modules/layerManger');
const cameraManager = require('/src/modules/cameraManager');
const collisionManager = require('/src/modules/collisionManager');

var startingTileIndex = 646
var playerX = 0;
var playerY = 0;
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
        this.load.atlas('fountain', fountainAnimatedSpritemap, fountainAnimatedSpritemapAtlas)
        this.load.atlas('billboard', billboardAnimatedSpritemap, billboardAnimatedSpritemapAtlas)
        this.load.animation('spraywater', fountainAnimatedAnimations)
        this.load.animation('billboard', billboardAnimatedAnimations)
    }

    init(data){
        if(data.startingTile > 0){
            startingTileIndex = data.startingTile
        }
    }

    create(){
        this.scene.run('UIScene')
        this.scene.run('titleScene')
        const Ui = this.scene.get('titleScene');

        Ui.showTitle('Career island', 3000);

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
        const interactionLayer = map.createLayer('interaction',[ tilesetNature, tilesetAutumn, tilesetFam, tilesetFountain, tilesetSchool],  this.cameras.main.width / 3, this.cameras.main.height / 4);

        const Layers = [collisionLayer, environmentLayer, interactionLayer, pathLayer, objectsLayer, zLayer];

        //use layer manager function to add layers to our scene, enable collision and set depth
        layerManager.initiateLayers(this, Layers);

        let fountainX
        let fountainY
        collisionLayer.forEachTile(function (tile) {
            if (tile.index === 649) {
                fountainX = collisionLayer.tileToWorldX(tile.x)+28;
                fountainY = collisionLayer.tileToWorldY(tile.y)+80;
            }
        });

        let billboardX
        let billboardY
        collisionLayer.forEachTile(function (tile) {
            if (tile.index === 653) {
                billboardX = collisionLayer.tileToWorldX(tile.x);
                billboardY = collisionLayer.tileToWorldY(tile.y-1);
            }
        });

        //add animated elements to the map
        const fountainSprite = this.add.sprite(fountainX, fountainY, 'fountain');
        const billboardSprite = this.add.sprite(billboardX, billboardY, 'billboard');

        fountainSprite.setDepth(6);
        fountainSprite.play('spraywater', {repeat: -1});

        billboardSprite.setDepth(6);
        billboardSprite.play('billboard', {repeat: -1});

        //add collision events
        collisionManager.setTileCollisionLabels(objectsLayer, 'enterOffice');
        this.matter.world.on('collisionstart', function (event) {
            if(collisionManager.handleTileBodyCollision(event, 'Body', 'enterOffice')){
                this.scene.start('officeScene');
            }
        }, this);

        //add player properties
        collisionLayer.forEachTile(function (tile) {
            if (tile.index === startingTileIndex) {
                playerX = collisionLayer.tileToWorldX(tile.x)+16;
                playerY = collisionLayer.tileToWorldY(tile.y)+14;
            }
        });

        this.player = new Player({scene:this.matter.world,x:playerX, y:playerY, texture:'player2', label: 'player'});
        this.player.setDepth(5);
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
        this.scene.run('JoystickScene', {player: this.player});

        //camera functions
        cameraManager.setPlayerCam(this);


        //debugging functions
        function getTileAtPointer(pointer, layer) {
            return layer.getTileAtWorldXY(pointer.worldX, pointer.worldY, true);
        }

        this.input.on('pointerdown', function onPointerDown(pointer) {
            var tile = getTileAtPointer(pointer, collisionLayer);
            
            if (!tile) return;
            
            console.log(`(${tile.x}, ${tile.y}) on ${tile.layer.name}`, tile);
        });
        
    }

    update(){
        this.player.update();
    }



}