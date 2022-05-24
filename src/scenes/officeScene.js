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

        //set collision and depth
        collisionLayer.setCollisionByProperty({collides:true}).setDepth(1);
        backgroundLayer.setCollisionByProperty({collides:true}).setDepth(2);
        obstructedLayer.setCollisionByProperty({collides:true}).setDepth(3);
        floorLayer.setCollisionByProperty({collides:true}).setDepth(4);
        wallsLayer.setCollisionByProperty({collides:true}).setDepth(5);
        mainLayer.setCollisionByProperty({collides:true}).setDepth(6);
        itemsLayer.setCollisionByProperty({collides:true}).setDepth(7);
        frontLayer.setCollisionByProperty({collides:true}).setDepth(8);
        
        //convert to tilemaps
        this.matter.world.convertTilemapLayer(collisionLayer);
        this.matter.world.convertTilemapLayer(backgroundLayer);
        this.matter.world.convertTilemapLayer(obstructedLayer);
        this.matter.world.convertTilemapLayer(floorLayer);
        this.matter.world.convertTilemapLayer(wallsLayer);
        this.matter.world.convertTilemapLayer(mainLayer);
        this.matter.world.convertTilemapLayer(frontLayer);

        //label all interaction tiles within the matter physics engine
        collisionLayer.forEachTile(function (tile) {
            if (tile.properties.type === 'exitOffice') {
                console.log(tile);
                tile.physics.matterBody.body.label = 'exitOffice';
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
                console.log(bodyA);
                console.log(bodyB);
            }
            if ((bodyA.label === 'Body' && bodyB.label === 'exitOffice') || (bodyB.label === 'Body' && bodyA.label === 'exitOffice')){
                console.log('getting hit!')
                this.scene.resume('mainScene');
                this.scene.remove('officeScene');
            }
        }, this);

        //add player properties
        this.player = new Player({scene:this.matter.world,x:2000, y:1380, texture:'player2', frame:'idle-down'});
        this.player.setDepth(7);
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