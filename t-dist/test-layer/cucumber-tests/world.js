"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_creator_1 = require("./../../support/utils/user-creator");
var cucumber_1 = require("cucumber");
var login_page_1 = require("../../support/objects/pages/login-page");
var base_page_1 = require("../../support/objects/pages/base-page");
var backend_helper_1 = require("../../support/utils/backend-helper");
var lightstreamer = require("../../support/utils/lightstreamer-helper");
var chai_1 = require("chai");
var helper_1 = require("../../support/utils/helper");
var moment = require("moment");
var market_id_enum_1 = require("../../support/emuns/market-id.enum");
var order_applicability_enum_1 = require("../../support/emuns/order-applicability.enum");
var order_status_enum_1 = require("../../support/emuns/order-status.enum");
var formulas = require("./../../support/utils/deal-ticket-formulas");
function CustomWorld(_a) {
    var attach = _a.attach, parameters = _a.parameters;
    this.attach = attach;
    this.parameters = parameters;
    this.basePage = new base_page_1.BasePage();
    this.loginPage = new login_page_1.LoginPage();
    this.userCreator = user_creator_1.userCreator;
    this.backendHelper = backend_helper_1.backendHelper;
    this.expect = chai_1.expect;
    this.helper = helper_1.helper;
    this.moment = moment;
    this.memory = {};
    this.orderApplicabilityEnum = order_applicability_enum_1.OrderApplicabilityEnum;
    this.orderStatusEnum = order_status_enum_1.OrderStatusEnum;
    this.lightstreamer = lightstreamer;
    this.idMatcher = market_id_enum_1.idMatcher;
    this.formulas = formulas;
}
cucumber_1.defineSupportCode(function (_a) {
    var setWorldConstructor = _a.setWorldConstructor;
    setWorldConstructor(CustomWorld);
});
//# sourceMappingURL=world.js.map