function getXPositionByTileLabel(layer, label) {
    layer.forEachTile(function (tile) {
        if (tile.properties.label === label) {
            return layer.tileToWorldX(tile.x);
        }
    });
};

function getYPositionByTileLabel(layer, label) {
    layer.forEachTile(function (tile) {
        if (tile.properties.label === label) {
            return layer.tileToWorldY(tile.y);
        }
    });
};

function getXPositionByIndex(layer, index) {
    layer.forEachTile(function (tile) {
        if (tile.index === index) {
            console.log(tile);
            let positionX = layer.tileToWorldX(tile.x);
            console.log(positionX);
            return positionX
        }
    });
};

function getYPositionByIndex(layer, index) {
    layer.forEachTile(function (tile) {
        if (tile.index === index) {
            console.log(tile);
            let positionY = layer.tileToWorldY(tile.y);
            console.log(positionY);
            return positionY;
        }
    });
};

module.exports = {getXPositionByTileLabel, getYPositionByTileLabel, getXPositionByIndex, getYPositionByIndex};