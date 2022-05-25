function initiateLayers(scene, layers){
    let i = 1;
    layers.forEach(layer => {
        layer.setCollisionByProperty({collides:true}).setDepth(i);
        scene.matter.world.convertTilemapLayer(layer);
        i++;
    });
}

module.exports = {initiateLayers};