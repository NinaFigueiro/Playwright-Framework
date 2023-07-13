const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils.js');
const loginPayLoad = {userEmail:"ninafigueiro@tutanota.com",userPassword:"Nina-2015"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"62023a7616fcf72fe9dfc619"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};

let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('Place the order', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client/");


await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/",
async route=>
{
  const response =  await page.request.fetch(route.request());
  let body =fakePayLoadOrders;
   route.fulfill(
      {
        response,
        body,

      });
    //intercepting response - APi response->{ playwright fakeresponse}->browser->render data on front end
});

await page.locator("button[routerlink*='myorders']").click();
//await page.pause();
console.log(await page.locator(".mt-4").textContent());

});

