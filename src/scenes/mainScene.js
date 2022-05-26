import Player from '../player/Player';
import fontPng from '/assets/font/press-start.png';
import fontXml from '/assets/font/press-start.xml';
import environmentNatureSpritemap from '/assets/spritemaps/environment/RPG Nature Tileset.png';
import environmentAutumnSpritemap from '/assets/spritemaps/environment/nature-autumn.png';
import buildingFamSpritemap from '/assets/spritemaps/environment/building-fam.png';
import fountainSpritemap from '/assets/spritemaps/environment/Fountain_32x32.png';
import schoolSpritemap from '/assets/spritemaps/environment/noorderpoort.png';
import environmentJson from '/assets/spritemaps/environment/mainScene2.json';

const layerManager = require('/src/modules/layerManger');
const cameraManager = require('/src/modules/cameraManager');

let playerX = 1100
let playerY = 1650

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
        this.load.bitmapFont('font', fontPng, fontXml);
        this.load.tilemapTiledJSON('mainScene', environmentJson);
    }

    init(data){
        if(data.playerX > 0){
            playerX = data.playerX
        }

        if(data.playerY > 0){
            playerY = data.playerY
        }
    }

    create(){

        this.scene.run('UIScene')
        const Ui = this.scene.get('UIScene');

        Ui.showDialog('Welcome to my interactive Resume', 4000);


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

        //label all interaction tiles within the matter physics engine
        objectsLayer.forEachTile(function (tile) {
            if (tile.properties.type === 'enterOffice') {
                console.log(tile);
                tile.physics.matterBody.body.label = 'enterOffice';
            }
        });

        function getRootBody(body){
            if (body.parent === body) { 
                return body; 
            }
            while (body.parent !== body){
                body = body.parent;
            }
            return body;
        }

        this.matter.world.on('collisionstart', function (event) {
            for (var i = 0; i < event.pairs.length; i++){
                var bodyA = getRootBody(event.pairs[i].bodyA);
                var bodyB = getRootBody(event.pairs[i].bodyB);
            }
            if ((bodyA.label === 'Body' && bodyB.label === 'enterOffice') || (bodyB.label === 'Body' && bodyA.label === 'enterOffice')){
                this.scene.start('officeScene');
            }
        }, this);

        //add player properties
        this.player = new Player({scene:this.matter.world,x:playerX, y:playerY, texture:'player2', frame:'idle-down', label: 'player'});
        this.player.setDepth(5);
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })

        //camera functions
        cameraManager.setPlayerCam(this);
    }

    update(){
        this.player.update();
    }



}