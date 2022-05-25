import { GameObjects } from "phaser";

const {Sprite} = GameObjects;

class NPC extends Sprite {
    constructor(config){
        super(config.scene, config.x, config.y, config.key);

        config.scene.add.existing(this);

        this.setTexture(config.texture);

        this.dialog = config.dialog;
        this.scene = config.scene;
    }

    readDialog(key, index = 0) {
        // Read through dialogs in order, until stop property is detected
        const line = this.dialog[key].say[index];
        this.scene.showSubtitle(line).then(() => {
                this.readDialog(key, index + 1);
        });
    }
}