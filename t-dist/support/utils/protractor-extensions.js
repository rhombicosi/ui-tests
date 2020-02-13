"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var helper_1 = require("./helper");
(function () {
    'use strict';
    var specTimeoutMs = 40000, sleepIncrement = 200, protractor = require('protractor'), q = require('q');
    /**
     * This is used when an element is expected to 'move' into a position.
     * It will check the left most edge of the element is on screen (i.e. greater than or equal 0)
     * and then check it becomes 'stable' (i.e. not changed)
     *
     * @returns a promise that resolves to the element
     */
    protractor.ElementFinder.prototype.waitToBeCompletelyVisibleAndStable = function () {
        var self = this;
        var lastXLocation;
        var lastYLocation;
        var sleepTime = 1;
        function isCompletelyVisible(location, size) {
            if (location.x >= 0) {
                if (location.x + size.width >= 0) {
                    return true;
                }
            }
            return false;
        }
        return self.getSize()
            .then(function (size) {
            protractor_1.browser.wait(function () {
                return helper_1.helper.sleep(sleepTime)
                    .then(function () {
                    sleepTime = sleepTime + sleepIncrement;
                    return self.getLocation();
                })
                    .then(function (location) {
                    if (lastXLocation === undefined) {
                        lastXLocation = location.x;
                        lastYLocation = location.y;
                    }
                    else {
                        if (isCompletelyVisible(location, size) && (lastXLocation === location.x && lastYLocation === location.y)) {
                            return true;
                        }
                        else {
                            lastXLocation = location.x;
                            lastYLocation = location.y;
                        }
                    }
                    return false;
                })
                    .then(function (state) { return state; }, function () { return false; });
            }, specTimeoutMs, 'timed out waiting for element to be completely visible and stable');
        })
            .then(function () {
            return self;
        });
    };
    /**
     * This is used when an element is faded out and therefore takes some time to be 'hidden'.
     * This should be used when the element can be controlled outside of Angulars digests cycles (e.g. css animations)
     *
     * @returns a promise that resolves to true when the element is hidden
     */
    protractor.ElementFinder.prototype.waitToBeHidden = function () {
        var self = this;
        return protractor_1.browser.wait(function () {
            return self.isDisplayed()
                .then(function (displayed) {
                return !displayed;
            });
        }, specTimeoutMs, 'timed out waiting for element to be hidden');
    };
    /**
     * This is used to explicity wait for an element to become present and displayed
     * This should be used when the element can be controlled outside of Angulars digests cycles (e.g. css animations)
     *
     * @returns a promise that resolves to the element
     */
    protractor.ElementFinder.prototype.waitReady = function (timeout) {
        if (timeout === void 0) { timeout = specTimeoutMs; }
        var self = this;
        var sleepTime = 100;
        return protractor_1.browser.wait(function () {
            return self.isPresentAndDisplayed()
                .then(function (is) {
                if (!is) {
                    return helper_1.helper.sleep(sleepTime)
                        .then(function () {
                        sleepTime = sleepTime + sleepIncrement;
                        return is;
                    });
                }
                else {
                    return is;
                }
            });
        }, timeout, 'element has not become present and visible after timeout')
            .then(function () {
            return self;
        });
    };
    protractor.ElementFinder.prototype.waitPresent = function (timeout) {
        if (timeout === void 0) { timeout = specTimeoutMs; }
        var self = this;
        var sleepTime = 100;
        return protractor_1.browser.wait(function () {
            return self.isPresent()
                .then(function (is) {
                if (!is) {
                    return helper_1.helper.sleep(sleepTime)
                        .then(function () {
                        sleepTime = sleepTime + sleepIncrement;
                        return is;
                    });
                }
                else {
                    return is;
                }
            });
        }, timeout, 'element has not become present after timeout')
            .then(function () {
            return self;
        });
    };
    protractor.ElementFinder.prototype.waitVisible = function () {
        var self = this;
        return protractor_1.browser.wait(function () {
            return self.isDisplayed();
        }, specTimeoutMs, 'timed out waiting for element')
            .then(function () {
            return self;
        });
    };
    protractor.ElementFinder.prototype.waitMissing = function (timeout) {
        if (timeout === void 0) { timeout = specTimeoutMs; }
        var self = this;
        var sleepTime = 500;
        return protractor_1.browser.wait(function () {
            return self.isPresentAndDisplayed()
                .then(function (is) {
                if (is) {
                    return helper_1.helper.sleep(sleepTime)
                        .then(function () {
                        sleepTime = sleepTime + sleepIncrement;
                        return !is;
                    });
                }
                else {
                    return !is;
                }
            });
        }, timeout, 'timed out waiting for element disappear');
    };
    protractor.ElementFinder.prototype.waitText = function (expectedText, timeout) {
        if (timeout === void 0) { timeout = specTimeoutMs; }
        var self = this;
        var sleepTime = 100;
        return protractor_1.browser.wait(function () {
            return self.getText()
                .then(function (text) {
                return text.trim().toLowerCase() === expectedText.toLowerCase();
            })
                .then(function (is) {
                if (!is) {
                    return helper_1.helper.sleep(sleepTime)
                        .then(function () {
                        sleepTime = sleepTime + sleepIncrement;
                        return is;
                    });
                }
                else {
                    return is;
                }
            });
        }, timeout, "timed out waiting for element has text " + expectedText);
    };
    protractor.ElementFinder.prototype.waitTextIncludes = function (expectedText, timeout) {
        if (timeout === void 0) { timeout = specTimeoutMs; }
        var self = this;
        var sleepTime = 100;
        return protractor_1.browser.wait(function () {
            return self.getText()
                .then(function (text) {
                return text.trim().toLowerCase().includes(expectedText.toLowerCase());
            })
                .then(function (is) {
                if (!is) {
                    return helper_1.helper.sleep(sleepTime)
                        .then(function () {
                        sleepTime = sleepTime + sleepIncrement;
                        return is;
                    });
                }
                else {
                    return is;
                }
            });
        }, timeout, "timed out waiting for element includes text " + expectedText);
    };
    /**
     * This is used to determine an element is present (in the DOM) and is displayed.
     *
     * @returns a promise that resolves to true or false
     */
    protractor.ElementFinder.prototype.isPresentAndDisplayed = function () {
        var self = this;
        return self.isPresent().then(function (present) {
            if (present) {
                return self.isDisplayed()
                    .then(function (is) { return is; }, function () { return false; });
            }
            return false;
        });
    };
    protractor.ElementFinder.prototype.scrollIntoView = function (alignToTop) {
        var self = this;
        alignToTop = alignToTop !== undefined ? alignToTop : true;
        return protractor_1.browser.executeScript('arguments[0].scrollIntoView(arguments[1]);', self.getWebElement(), alignToTop)
            .then(function () {
            return self.waitToBeCompletelyVisibleAndStable();
        });
    };
    protractor.ElementFinder.prototype.scrollToAndClick = function () {
        var self = this, alignToTop = false;
        return this.scrollIntoView(alignToTop)
            .then(function () {
            return self.click();
        });
    };
    protractor.ElementFinder.prototype.ctrlClick = function () {
        var self = this;
        return protractor_1.browser.actions().keyDown(protractor.Key.CONTROL).click(self).keyUp(protractor.Key.CONTROL).perform()
            .then(function () { return null; }, function () { return console.log('actions error'); });
    };
    protractor.ElementFinder.prototype.hover = function () {
        var self = this;
        return protractor_1.browser.actions().mouseMove(self).perform()
            .then(function () { return null; }, function () { return console.log('actions error'); });
    };
    protractor.ElementFinder.prototype.shiftClick = function () {
        var self = this;
        return protractor_1.browser.actions().keyDown(protractor.Key.SHIFT).click(self).keyUp(protractor.Key.SHIFT).perform()
            .then(function () { return null; }, function () { return console.log('actions error'); });
    };
    protractor.ElementFinder.prototype.doubleClick = function () {
        var self = this;
        return protractor_1.browser.actions().doubleClick(self).perform()
            .then(function () { return null; }, function () { return console.log('actions error'); });
    };
    protractor.ElementFinder.prototype.contextClick = function () {
        var self = this;
        return protractor_1.browser.actions().mouseMove(self).perform()
            .then(function () { return null; }, function () { return console.log('actions error'); })
            .then(function () {
            protractor_1.browser.actions().click(protractor.Button.RIGHT).perform()
                .then(function () { return null; }, function () { return console.log('actions error'); });
        });
    };
    protractor.ElementArrayFinder.prototype.isHiddenOrNotPresent = function () {
        var self = this, deferred = q.defer();
        self.count()
            .then(function (n) {
            if (n > 0) {
                self.get(0).isDisplayed()
                    .then(function (is) {
                    deferred.resolve(!is);
                });
            }
            else {
                deferred.resolve(true);
            }
        });
        return deferred.promise;
    };
    protractor.ElementArrayFinder.prototype.isPresent = function () {
        var self = this, deferred = q.defer();
        self.count()
            .then(function (n) {
            deferred.resolve(n > 0);
        });
        return deferred.promise;
    };
    protractor.ElementArrayFinder.prototype.waitForDisappeared = function () {
        var self = this;
        return protractor_1.browser.wait(function () {
            return self.isHiddenOrNotPresent()
                .then(function (is) {
                return is;
            });
        }, specTimeoutMs, 'timed out waiting for element')
            .then(function () {
            return self.get(0);
        });
    };
    protractor.ElementArrayFinder.prototype.waitForAppeared = function () {
        var self = this;
        return protractor_1.browser.wait(function () {
            return self.isHiddenOrNotPresent()
                .then(function (is) {
                return !is;
            });
        }, specTimeoutMs, 'timed out waiting for element')
            .then(function () {
            return self.get(0);
        });
    };
})();
//# sourceMappingURL=protractor-extensions.js.map