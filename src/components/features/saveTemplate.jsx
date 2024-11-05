import {oriTemplates} from '../domain/startProgram.js';

const saveTemplate = (templateName, description=null, picture=null, file) => {
    if (!templateName || !file) {
        console.log("필수 정보가 누락됨");
        return;
    }

    let templateIds = Array.from(oriTemplates.keys());
    const templateId = templateIds[templateIds.length - 1] + 1

    if (templateIds.includes(templateId)) {
        while (!templateIds.includes(templateId)) {
            templateId += 1;
        }
    }

    const template = new Template(templateId, templateName, description, picture, file);
    
}
