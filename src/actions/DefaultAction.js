import { logger } from '#config';

class DefaultAction {

    constructor(page){
        this.page = page;
    }

    async init() {
        
        await this.page.goto('http://192.168.1.7:8080/');
        await this.page.setViewport({ width: 1080, height: 1024 });

        const searchResultSelector = '::-p-xpath(/html/body/div[2]/h2)';
        const textSelector = await this.page.waitForSelector(searchResultSelector);

        const fullTitle = await textSelector?.evaluate(el => el.textContent);
        console.log(fullTitle);
        
    }
}

class TestAction {

    constructor(page){
        this.page = page;
    }

    async init() {
        
        await this.page.goto('http://192.168.1.7:8080/');
        await this.page.setViewport({ width: 1080, height: 1024 });

        let searchResultSelector = '::-p-xpath(//*[@id="username"])';
        await this.page.type(searchResultSelector, 'root');

        searchResultSelector = '::-p-xpath(/html/body/div[2]/form/table/tbody/tr[4]/td/input)';
        await this.page.type(searchResultSelector, 'root');

        searchResultSelector = '::-p-xpath(/html/body/div[2]/form/p/input)';
        await this.page.click(searchResultSelector);

        searchResultSelector = '::-p-xpath(/html/body/div[2]/h2)';
        await this.page.waitForSelector(searchResultSelector);

    }
}

export { DefaultAction, TestAction }