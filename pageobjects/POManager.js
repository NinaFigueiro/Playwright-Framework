const {LoginPage} = require('../pageobjects/LoginPage.js');
const {DashboardPage} = require('../pageobjects/DashboardPage.js');
const {CartPage} = require('../pageobjects/CartPage.js');
const {OrdersHistoryPage} = require('../pageobjects/OrdersHistoryPage.js');
const {OrdersReviewPage} = require('../pageobjects/OrdersReviewPage.js');


class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    // course content
    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }
}
module.exports = {POManager};