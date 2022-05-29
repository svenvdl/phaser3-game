const viewportManager = require('/src/modules/getViewport');

export default class UIScene extends Phaser.Scene {
    constructor(){
        super('UIScene');
    }

    preload(){
    }

    create(){
        var div = document.createElement('div');
        div.style = 'background-color: #f7ebba; width: 250px; height: 100px; font: 11px Arial; font-weight: bold; z-index:99';
        div.innerText = 'Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        console.log(div);

        var container = this.add.container(400, 300);
        var element = this.add.dom(0, 0, div);
        container.add(element);
        this.scene.bringToTop;
    }
    

    update(){
        // console.log('uiScene active');
    }

}