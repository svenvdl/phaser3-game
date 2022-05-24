import Phaser from 'phaser';
import playerSpritemap from '/assets/spritemaps/player/player2.png';
import playerSpritemapAtlas from '/assets/spritemaps/player/player2_atlas.json';
import playerAnimations from '/assets/spritemaps/player/player2_anim.json';

var lastPressed = '';
export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 16, {isSensor:false, label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor:true, label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            FrictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene){
        scene.load.atlas('player2', playerSpritemap, playerSpritemapAtlas)
        scene.load.animation('player2_anim', playerAnimations)
    }

    get velocity(){
        return this.body.velocity;
    }

    update(){
        const speed = 1.5;
        let playerVelocity = new Phaser.Math.Vector2();

        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1;
            lastPressed = 'left';
        } else if(this.inputKeys.right.isDown){
            playerVelocity.x = 1;
            lastPressed = 'right';
        } 
        
        if(this.inputKeys.up.isDown){
            playerVelocity.y = -1;
            lastPressed = 'up';
        } else if( this.inputKeys.down.isDown){
            playerVelocity.y = 1;
            lastPressed = 'down';
        }

        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);


        if(Math.abs(this.velocity.x ) > 0.1 || Math.abs(this.velocity.y) > 0.1){
            if(this.inputKeys.left.isDown){
                this.anims.play('left', true);
            } else if(this.inputKeys.right.isDown){
                this.anims.play('right', true);
            } else if( this.inputKeys.down.isDown){
                this.anims.play('down', true);
            } else if( this.inputKeys.up.isDown){
                this.anims.play('up', true);
            }
        } else{
            switch(lastPressed){
                case 'down':
                    this.anims.play('idle-down', true);
                    break;
                case 'up':
                    this.anims.play('idle-up', true);
                    break;
                case 'right':
                    this.anims.play('idle-right', true);
                    break;
                case 'left':
                    this.anims.play('idle-left', true);
                    break;
                default:
                    this.anims.play('idle-down', true);
            }
        }
    }
}