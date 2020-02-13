"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var direction_type_enum_1 = require("../emuns/direction-type.enum");
var getDecimalUnits = function (price) {
    return parseFloat("0." + (price + " ").split('.')[1]);
};
function calculatePLFromPrice(orderPrice, tradePrice, pfd, betPer, quantity, qcf, trailingStopConversionFactor, direction, orderType) {
    var intOrderPrice = Math.trunc(orderPrice);
    var intTradePrice = Math.trunc(tradePrice);
    var pointsMultiplier = 1;
    var plMultiplier = 1;
    if (direction === direction_type_enum_1.DirectionTypeEnum.Buy) {
        if (orderType.indexOf('limit') !== -1) {
            plMultiplier = -1;
        }
        else {
            pointsMultiplier = -1;
        }
    }
    else {
        if (orderType.indexOf('limit') !== -1) {
            pointsMultiplier = -1;
            plMultiplier = -1;
        }
    }
    // tslint:disable-next-line:max-line-length
    var result = ((((orderPrice - intOrderPrice) / pfd * 100)
        + intOrderPrice - (((tradePrice - intTradePrice) / pfd * 100) + intTradePrice))
        / 100 * pfd / betPer / trailingStopConversionFactor)
        * (-quantity) / qcf * trailingStopConversionFactor;
    return result * pointsMultiplier * plMultiplier;
}
exports.calculatePLFromPrice = calculatePLFromPrice;
function calculatePointsFromPrice(orderPrice, tradePrice, pfd, betPer, trailingStopConversionFactor, direction, orderType) {
    var intOrderPrice = Math.trunc(orderPrice);
    var intTradePrice = Math.trunc(tradePrice);
    var multiplier = 1;
    if (orderType.indexOf('limit') !== -1) {
        if (direction === direction_type_enum_1.DirectionTypeEnum.Sell) {
            multiplier = -1;
        }
        else if (direction === direction_type_enum_1.DirectionTypeEnum.Buy) {
            multiplier = 1;
        }
    }
    else if (orderType.indexOf('stop') !== -1) {
        if (direction === direction_type_enum_1.DirectionTypeEnum.Sell) {
            multiplier = 1;
        }
        else if (direction === direction_type_enum_1.DirectionTypeEnum.Buy) {
            multiplier = -1;
        }
    }
    // tslint:disable-next-line:max-line-length
    return multiplier
        * (((orderPrice - intOrderPrice) / pfd * 100)
            + intOrderPrice - (((tradePrice - intTradePrice) / pfd * 100) + intTradePrice))
        / 100 * pfd / betPer / trailingStopConversionFactor;
}
exports.calculatePointsFromPrice = calculatePointsFromPrice;
function calculatePriceFromPoints(currentPrice, pfd, points, betPer, trailingStopConversionFactor, orderType, direction) {
    var orderTypeMultiplier = 1;
    if (orderType.indexOf('limit') !== -1) {
        if (direction === direction_type_enum_1.DirectionTypeEnum.Sell) {
            orderTypeMultiplier = 1;
        }
        else if (direction === direction_type_enum_1.DirectionTypeEnum.Buy) {
            orderTypeMultiplier = -1;
        }
    }
    else if (orderType.indexOf('stop') !== -1) {
        if (direction === direction_type_enum_1.DirectionTypeEnum.Sell) {
            orderTypeMultiplier = -1;
        }
        else if (direction === direction_type_enum_1.DirectionTypeEnum.Buy) {
            orderTypeMultiplier = 1;
        }
    }
    var rightHandSide = (getDecimalUnits(currentPrice) * 100) / pfd;
    var pointsAsDecimal = orderTypeMultiplier * Math.round(points) * betPer * trailingStopConversionFactor * 100 / pfd;
    var differenceAsPercentageOfMajorUnit = rightHandSide - pointsAsDecimal;
    var newPriceWithMinorDecimalUnits = Math.trunc(currentPrice) + differenceAsPercentageOfMajorUnit;
    return (Math.trunc(newPriceWithMinorDecimalUnits)
        + (newPriceWithMinorDecimalUnits - Math.trunc(newPriceWithMinorDecimalUnits)) * pfd * 0.01);
}
exports.calculatePriceFromPoints = calculatePriceFromPoints;
function calculatePointsFromPL(profitLoss, quantity, qcf, trailingStopConversionFactor, orderType, direction) {
    if (quantity === 0) {
        return null;
    }
    var multiplier = 1;
    var directionMultiplier = 1;
    if (direction === direction_type_enum_1.DirectionTypeEnum.Buy) {
        directionMultiplier = -1;
        if (orderType.indexOf('limit') !== -1) {
            multiplier = -1;
        }
    }
    else {
        if (orderType.indexOf('stop') !== -1) {
            multiplier = -1;
        }
    }
    return directionMultiplier * multiplier * (profitLoss / quantity * qcf / trailingStopConversionFactor);
}
exports.calculatePointsFromPL = calculatePointsFromPL;
function roundValue(priceValue, roundingPrecision) {
    return Number(priceValue.toFixed(roundingPrecision));
}
exports.roundValue = roundValue;
function getFloatingPart(floatingNumber) {
    return floatingNumber - Math.trunc(floatingNumber);
}
exports.getFloatingPart = getFloatingPart;
//# sourceMappingURL=deal-ticket-formulas.js.map