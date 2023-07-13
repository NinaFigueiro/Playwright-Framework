const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'parallel'});
test("Popups validations", async({page}) => 
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

})


test("Screenshot", async({page}) => 
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

})

test("Visual Test", async({page}) => 
{
    // The test fails the first time it runs since there is no "landing.png" file
    // but the it creates the landing file and it works the second time you run it
    await page.goto('https://google.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png')

})