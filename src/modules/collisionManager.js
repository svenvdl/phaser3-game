function getRootBody(body){
    if (body.parent === body) { 
        return body; 
    }
    while (body.parent !== body){
        body = body.parent;
    }
    return body;
}

function setTileCollisionLabels(layer, tileLabel){
    layer.forEachTile(function (tile) {
        if (tile.properties.type === tileLabel) {
            tile.physics.matterBody.body.label = tileLabel;
        }
    });
}

function handleTileBodyCollision(event, playerLabel, tileLabel) {
        for (var i = 0; i < event.pairs.length; i++){
            var bodyA = getRootBody(event.pairs[i].bodyA);
            var bodyB = getRootBody(event.pairs[i].bodyB);
        }
        if ((bodyA.label === playerLabel && bodyB.label === tileLabel) || (bodyB.label === playerLabel && bodyA.label === tileLabel)){
            return true;
        } else{
            return false;
        }
};

function handleTileSensorCollision(event, playerLabel, tileLabel) {
    let pairs = event.pairs;
    for (var i = 0; i < event.pairs.length; i++){
        let bodyA = pairs[i].bodyA;
        let bodyB = pairs[i].bodyB;
        if (pairs[i].isSensor){
            if ((bodyA.label === playerLabel && bodyB.label === tileLabel) || (bodyB.label === playerLabel && bodyA.label === tileLabel)){
                return true;
            } else{
                return false;
            }
        }
    }
};

module.exports = {handleTileBodyCollision, handleTileSensorCollision, setTileCollisionLabels};