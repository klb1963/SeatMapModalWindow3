import {ICustomWorkflow} from 'sabre-ngv-redAppSidePanel/interfaces/ICustomWorkflow';
import {IAreaService} from 'sabre-ngv-app/app/services/impl/IAreaService';
import {getService} from '../Context';

/**
 * Service used with declarative custom workflow in manifest.json.
 */
export class CustomWorkflowService extends ICustomWorkflow {
    static SERVICE_NAME = 'com-sabre-redapp-example3-web-customworkflow-web-module-CustomWorkflowService';

    async execute(): Promise<void> {
        const areaService: IAreaService = getService(IAreaService);
        areaService.showBanner('Info', 'Custom Workflow Service Success');
    }
}