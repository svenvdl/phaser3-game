import Player from '../player/Player';
import environmentColorsSpritemap from '/assets/spritemaps/environment/office/colors.png';
import environmentRoombuilderSpritemap from '/assets/spritemaps/environment/office/Room_Builder_Office_32x32.png';
import environmentOfficeSpritemap from '/assets/spritemaps/environment/office/Modern_Office_Shadowless_32x32.png';
import environmentKitchenSpritemap from '/assets/spritemaps/environment/office/12_Kitchen_Shadowless_32x32.png';
import environmentBasementSpritemap from '/assets/spritemaps/environment/office/14_Basement_Shadowless_32x32.png';
import environmentGymSpritemap from '/assets/spritemaps/environment/office/8_Gym_Shadowless_32x32.png';
import environmentGenericSpritemap from '/assets/spritemaps/environment/office/1_Generic_Shadowless32x32.png';
import environmentLivingroomSpritemap from '/assets/spritemaps/environment/office/2_LivingRoom_Shadowless_32x32.png';
import environmentBathroomSpritemap from '/assets/spritemaps/environment/office/3_Bathroom_Shadowless_32x32.png';
import environmentJson from '/assets/spritemaps/environment/office/officeScene.json';

const layerManager = require('/src/modules/layerManger');
const cameraManager = require('/src/modules/cameraManager');
const collisionManager = require('/src/modules/collisionManager');

var playerX
var playerY
export default class OfficeScene extends Phaser.Scene {
    constructor(){
        super("officeScene");
    }
    
    preload(){
        Player.preload(this);
        this.load.image('colorTiles', environmentColorsSpritemap);
        this.load.image('roombuilderTiles', environmentRoombuilderSpritemap);
        this.load.image('officeTiles', environmentOfficeSpritemap);
        this.load.image('kitchenTiles', environmentKitchenSpritemap);
        this.load.image('basementTiles', environmentBasementSpritemap);
        this.load.image('gymTiles', environmentGymSpritemap);
        this.load.image('genericTiles', environmentGenericSpritemap);
        this.load.image('livingroomTiles', environmentLivingroomSpritemap);
        this.load.image('bathroomTiles', environmentBathroomSpritemap);
        this.load.tilemapTiledJSON('officeScene', environmentJson);
    }


    create(){
        this.scene.run('UIScene')
        const Ui = this.scene.get('UIScene');

        Ui.showTitle('Fundament All Media', 4000);
        Ui.showDialog('Frontend developer September 2017 - Now', 4000);

        //define map
        const map = this.make.tilemap({key: 'officeScene'});

        //define tilesets
        const tilesetColors = map.addTilesetImage('colors', 'colorTiles', 32, 32, 0, 0);
        const tilesetRoombuilder = map.addTilesetImage('Room_Builder_Office_32x32', 'roombuilderTiles', 32, 32, 0, 0);
        const tilesetOffice = map.addTilesetImage('Modern_Office_Shadowless_32x32', 'officeTiles', 32, 32, 0, 0);
        const tilesetKitchen = map.addTilesetImage('12_Kitchen_Shadowless_32x32', 'kitchenTiles', 32, 32, 0, 0);
        const tilesetBasement = map.addTilesetImage('14_Basement_Shadowless_32x32', 'basementTiles', 32, 32, 0, 0);
        const tilesetGym = map.addTilesetImage('8_Gym_Shadowless_32x32', 'gymTiles', 32, 32, 0, 0);
        const tilesetGeneric = map.addTilesetImage('1_Generic_Shadowless32x32', 'genericTiles', 32, 32, 0, 0);
        const tilesetLivingRoom = map.addTilesetImage('2_LivingRoom_Shadowless_32x32', 'livingroomTiles', 32, 32, 0, 0);
        const tilesetBathroom = map.addTilesetImage('3_Bathroom_Shadowless_32x32', 'bathroomTiles', 32, 32, 0, 0);

        const allTilesets = [tilesetColors, tilesetBasement, tilesetBathroom, tilesetGeneric, tilesetGym, tilesetKitchen, tilesetLivingRoom, tilesetOffice, tilesetRoombuilder]

        //set layer properties
        const collisionLayer = map.createLayer('Collision', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const backgroundLayer = map.createLayer('Background', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const obstructedLayer = map.createLayer('obstructed', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const floorLayer = map.createLayer('Floor', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const wallsLayer = map.createLayer('Walls', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const mainLayer = map.createLayer('main', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const itemsLayer = map.createLayer('items', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);
        const frontLayer = map.createLayer('Front', allTilesets,  this.cameras.main.width / 3, this.cameras.main.height / 4);

        const Layers = [collisionLayer, backgroundLayer, obstructedLayer, floorLayer, wallsLayer, mainLayer, itemsLayer, frontLayer]

        //use layer manager function to add layers to our scene, enable collision and set depth
        layerManager.initiateLayers(this, Layers);

        //add collision events
        collisionManager.setTileCollisionLabels(collisionLayer, 'exitOffice');
        this.matter.world.on('collisionstart', function (event) {
            if(collisionManager.handleTileBodyCollision(event, 'Body', 'exitOffice')){
                this.scene.start('MainScene', {startingTile: 649});
            }
        }, this);


        //add player properties
        collisionLayer.forEachTile(function (tile) {
            if (tile.index === 6051) {
                playerX = collisionLayer.tileToWorldX(tile.x) + 15;
                playerY = collisionLayer.tileToWorldY(tile.y) + 15;
            }
        });

        //add player properties
        this.player = new Player({scene:this.matter.world,x:playerX, y:playerY, frame:'idle-down'});
        this.player.setDepth(7);
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
        this.scene.run('JoystickScene', {player: this.player});
        
        //camera functions
        cameraManager.setPlayerCam(this);
    }

    update(){
        this.player.update();
    }
}