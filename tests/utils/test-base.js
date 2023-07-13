const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: 
        {
            useremail : "marianapereirinha2@gmail.com",
            password : "Test-1234",
            productName : "zara coat 3"
        }
    }
)