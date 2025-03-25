import {EnvironmentPublicService} from 'sabre-ngv-app/app/services/impl/EnvironmentPublicService';
import {getService} from '../Context';
import {openCustomFormParagraph} from '../utils/openCustomFormParagraph';

export const showRuntime = (): void => {
    const service: EnvironmentPublicService = getService(EnvironmentPublicService);

    const runtime = service.getRuntime() || 'Not Available';

    openCustomFormParagraph('Running on', `Running on: ${runtime}`);
}