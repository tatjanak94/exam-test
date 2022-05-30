"use strict";

const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");

const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;

describe("exam", function () {
  let driver;

  before(function () {
    driver = new webdriver.Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("Registration", async function () {
    await driver.get("http://test.qa.rs/");

    const register = await driver.findElement(By.linkText("Register"));
    await register.click();

    const url = await driver.getCurrentUrl();
    expect(url).to.contain("http://test.qa.rs/register");

    const firstName = await driver.findElement(By.name("firstname"));
    firstName.sendKeys("Bob");

    const lastName = await driver.findElement(By.name("lastname"));
    lastName.sendKeys("Buttons");

    const email = await driver.findElement(By.name("email"));
    email.sendKeys("bob.buttons@example.local");

    const username = await driver.findElement(By.name("username"));
    username.sendKeys("bob.buttons");

    const password = await driver.findElement(By.name("password"));
    password.sendKeys("nekaLozinka123");

    const passwordAgain = await driver.findElement(By.name("passwordAgain"));
    passwordAgain.sendKeys("nekaLozinka123");

    const buttonRegistracija = await driver.findElement(By.name("register"));
    await buttonRegistracija.click();

    expect(
      await driver.findElement(By.className("alert alert-success")).getText()
    ).to.contain("Success!");
  });

  it("Login", async function () {
    /*const login = await driver.findElement(By.linkText("Login"));
    await login.click();
*/
    await driver.get("http://test.qa.rs/login");

    const url = await driver.getCurrentUrl();
    expect(url).to.contain("http://test.qa.rs/login");
    /* expect(await driver.findElement(By.css("h2")).getText()).to.contain(
      "Login"
    );*/

    const username = await driver.findElement(By.name("username"));
    username.sendKeys("bob.buttons");

    const password = await driver.findElement(By.name("password"));
    password.sendKeys("nekaLozinka123");

    const btnlogin = await driver.findElement(By.name("login"));
    await btnlogin.click();

    expect(await driver.findElement(By.css("h2")).getText()).to.contain(
      "Welcome back"
    );
  });

  it("Adds item to cart", async function () {
    /* const xpathPackage =
      '//h3[contains(text(), "burger")]/ancestor::div[contains(@class, "panel")]';
    const packageName = await driver.findElement(By.xpath(xpathPackage));*/
    const side = await driver.findElement(By.name("side"));
    const quantity = await driver.findElement(By.name("quantity"));

    await side.sendKeys("o");
    await quantity.sendKeys("1");

    const btnSubmit = await driver.findElement(By.className("btn btn-success"));
    await btnSubmit.click();

    const url = await driver.getCurrentUrl();
    expect(url).to.contain("http://test.qa.rs/order");
  });

  it("Opens shopping cart", async function () {
    const showCart = await driver.findElement(
      By.partialLinkText("shopping cart")
    );
    await showCart.click();

    const url = await driver.getCurrentUrl();
    expect(url).to.contain("http://test.qa.rs/cart");
    expect(await driver.findElement(By.css("h1")).getText()).to.contain(
      "Order"
    );
  });

  it("Logout", async function () {
    const logout = await driver.findElement(By.partialLinkText("Logout"));
    await logout.click();

    expect(
      await driver.findElement(By.partialLinkText("Login")).getText()
    ).to.contain("Login");
  });
});
