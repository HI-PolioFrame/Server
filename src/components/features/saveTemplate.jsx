import {oriTemplates} from '../domain/startProgram.js';
import Template from '../domain/Template.js';
import {removeFromFileEnd, appendStringToFile} from './fileIO.jsx'; 

const saveTemplate = (templateName, templateOwner, description=null, picture=null, file) => {
    if (!templateName || !file) {
        console.log("필수 정보가 누락됨");
        return;
    }

    let templateIds = Array.from(oriTemplates.keys());
    const templateId = templateIds[templateIds.length - 1] + 1;

    if (templateIds.includes(templateId)) {
        while (!templateIds.includes(templateId)) {
            templateId += 1;
        }
    }

    const template = new Template(templateId, templateName, templateOwner, description, picture, file);
    oriTemplates.set(templateId, template);

    const string = `
    {
        templateId: ${templateId},
        templateName: ${templateName},
        templateOwner: ${templateOwner},
        description: ${description || "''"},
        picture: ${picture || "''"},
        file: ${file}
    }
    `;


    let filePath = "../common/dummydata/templateInfo.jsx";

    removeFromFileEnd(filePath, 3);
    appendStringToFile(filePath, `,${string}\n];`);
    
}

export default saveTemplate;