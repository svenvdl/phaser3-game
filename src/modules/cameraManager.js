function setPlayerCam(scene){
    scene.cameras.main.fadeIn(1000);
    scene.cameras.main.setZoom(2);
    scene.cameras.main.startFollow(scene.player);
}

module.exports = {setPlayerCam};