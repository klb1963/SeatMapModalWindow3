import {PnrPublicService} from 'sabre-ngv-app/app/services/impl/PnrPublicService';
import {IAreaService} from 'sabre-ngv-app/app/services/impl/IAreaService';
import {getService} from '../Context';

export const refreshTripSummary = (): void => {
    const pnrPublicService: PnrPublicService = getService(PnrPublicService);
    const areaService: IAreaService = getService(IAreaService);
    const recordLocator = pnrPublicService.getRecordLocator();
    if (recordLocator) {
        pnrPublicService.refreshData();
        areaService.showBanner('Info', 'Active PNR has been refreshed.');
    } else {
        areaService.showBanner('Error', 'There is no active PNR to refresh.');
    }
}