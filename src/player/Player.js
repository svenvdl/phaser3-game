import Phaser from 'phaser';
import playerSpritemap from '/assets/spritemaps/player/player.png';
import playerSpritemapAtlas from '/assets/spritemaps/player/player_atlas.json';
import playerAnimations from '/assets/spritemaps/player/player_anim.json';

export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 12, {isSensor:false, label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor:true, label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            FrictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene){
        scene.load.atlas('player', playerSpritemap, playerSpritemapAtlas)
        scene.load.animation('player_anim', playerAnimations)
    }

    get velocity(){
        return this.body.velocity;
    }

    update(){
        const speed = 1.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1;
        } else if(this.inputKeys.right.isDown){
            playerVelocity.x = 1;
        } 
        
        if(this.inputKeys.up.isDown){
            playerVelocity.y = -1;
        } else if( this.inputKeys.down.isDown){
            playerVelocity.y = 1;
        }

        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);

        if(Math.abs(this.velocity.x ) > 0.1 || Math.abs(this.velocity.y) > 0.1){
            this.anims.play('player_walk', true);
        } else{
            this.anims.play('player_idle', true);
        }
    }
}