function showTitle(scene, dialogText, duration, viewportManager) {
    
    console.log(dialogText);
    //  Our Text object to display the Score
    let dialog = scene.add.text(0, 0, dialogText, { font: '48px Arial', fill: '#ffffff', stroke:'black', strokeThickness: 3});

    let viewportSize = new Phaser.Geom.Rectangle();

    let viewport = viewportManager.getViewport(scene.scale, viewportSize);

    dialog.setAlpha(0);
    scene.scene.bringToTop();
    dialog.setPosition(viewport.width / 2 , viewport.top + 200).setOrigin(0.5);
    scene.scale.on('resize', function () {
        viewport = viewportManager.getViewport(scene.scale, viewportSize);
        dialog.setPosition(viewport.width / 2 , viewport.top + 200).setOrigin(0.5);
    }, scene);

    scene.tweens.add({
        targets: dialog,
        alpha: 1,
        duration: 500,
        ease: 'Power2'
        }, scene);    
    
    setTimeout(() => {
        scene.tweens.add({
            targets: dialog,
            alpha: 0,
            duration: 500,
            ease: 'Power2'
            }, scene);
    }, duration);    

    setTimeout(() => {
        dialog.destroy();
        scene.scene.stop();
    }, duration + 500);

};

function showDialog(scene, dialogText, duration, viewportManager, alert) {
    //  Our Text object to display the Score
    let dialog = scene.add.text(0, 0, dialogText, { font: '24px Arial', fill: '#ffffff', stroke:'black', strokeThickness: 3});

    let viewportSize = new Phaser.Geom.Rectangle();

    let viewport = viewportManager.getViewport(scene.scale, viewportSize);

    dialog.setAlpha(0);
    scene.scene.bringToTop();
    dialog.setPosition(viewport.width / 2 , viewport.bottom * 0.75).setOrigin(0.5);
    scene.scale.on('resize', function () {
        viewport = viewportManager.getViewport(scene.scale, viewportSize);
        dialog.setPosition(viewport.width / 2 , viewport.bottom * 0.75).setOrigin(0.5);
    }, scene);

    if(alert){
        scene.juice.shakeY(dialog);
    }

    scene.tweens.add({
        targets: dialog,
        alpha: 1,
        duration: 500,
        ease: 'Power2'
        }, scene);
    
    setTimeout(() => {
        scene.tweens.add({
            targets: dialog,
            alpha: 0,
            duration: 500,
            ease: 'Power2'
            }, scene);
    }, duration);    

    setTimeout(() => {
        dialog.destroy();
        scene.scene.stop();
    }, duration + 500);

};

module.exports = {showTitle, showDialog};