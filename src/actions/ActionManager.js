import { DefaultAction, TestAction } from '#src/actions/DefaultAction';

import { logger } from '#config';

class ActionManager {

    actions = [DefaultAction, TestAction];

    constructor(browser){
        this.browser = browser;
    }

    async init() {
        for (const Action of this.actions) {
            
            let ActionClass = Action;
            const page = await this.browser.newPage();
            
            let action = new ActionClass(page);
            await action.init();
        };
    }
}

export { ActionManager }