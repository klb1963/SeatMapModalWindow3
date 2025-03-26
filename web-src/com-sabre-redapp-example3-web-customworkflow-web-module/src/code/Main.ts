import * as React from 'react';
import {getService, registerService} from './Context';
import {ExtensionPointService} from 'sabre-ngv-xp/services/ExtensionPointService';
import {Module} from 'sabre-ngv-core/modules/Module';
import {RedAppSidePanelButton} from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import {RedAppSidePanelConfig} from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import {CustomWorkflowService} from './services/CustomWorkflowService';
import {createPnrForm} from './components/createPnrForm';
import {callLasLax} from './components/callLasLax';
import {showRuntime} from './components/showRuntime';
import {showInterstitial} from './components/showInterstitial';
import {showAgentProfile} from './components/showAgentProfile';
import {showBanners} from './components/showBanners';
import {refreshTripSummary} from './components/refreshTripSummary';
import {callExternalService} from './components/callExternalService';
import {createNotificationForm, hideNotifications} from "./components/createNotificationForm";

import {PublicAirAvailabilityService} from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityService';
import {SeatMapAvailTile} from './components/abc-seatmap/widgets/SeatMapAvailTile'; // ✅ Availability TileWidget
import {SeatMapAvailView} from './components/abc-seatmap/widgets/SeatMapAvailView';   // ✅ модальное окно, открываемое по клику на TileWidget
import {ReactModalOptions} from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import {PublicModalsService} from 'sabre-ngv-modals/services/PublicModalService';

export class Main extends Module {

    init(): void {
        super.init();
        this.registerServices();
        this.setup();
        this.registerSeatMapAvailTile(); // 👈 add Availability TileWidget
    }

    private registerServices(): void {
        registerService(CustomWorkflowService);
    }

    private setup(): void {

        const baseCssClassNames = 'btn btn-secondary side-panel-button redapp-web-customworkflow';

        const selfRemoveBtn = new RedAppSidePanelButton('Removable Button', baseCssClassNames + '-remove', () => {
            selfRemoveBtn.setVisible(false);
        });

        const config = new RedAppSidePanelConfig([
            new RedAppSidePanelButton('Show banners', baseCssClassNames + '-banners', showBanners),
            new RedAppSidePanelButton('External service call', baseCssClassNames + '-externalservicecall', callExternalService),
            new RedAppSidePanelButton('RedApp platform', baseCssClassNames + '-platform', showRuntime),
            new RedAppSidePanelButton('LAS - LAX', baseCssClassNames + '-action', callLasLax),
            new RedAppSidePanelButton('Create PNR', baseCssClassNames + '-pnr', createPnrForm),
            new RedAppSidePanelButton('Show interstitial', baseCssClassNames + '-interstitial', showInterstitial),
            new RedAppSidePanelButton('Show Agent Profile', baseCssClassNames + '-agentprofile', showAgentProfile),
            new RedAppSidePanelButton('Refresh Trip Summary', baseCssClassNames + '-refreshtrip', refreshTripSummary),
            new RedAppSidePanelButton('Create notification', baseCssClassNames + '-createNotification', createNotificationForm),
            new RedAppSidePanelButton('Hide notifications', baseCssClassNames + '-hideNotification', hideNotifications),
            selfRemoveBtn,
            // new RedAppSidePanelButton('Open ABC SeatMap', baseCssClassNames + '-showSeatMap', showSeatMapModal),
        ]);

        getService(ExtensionPointService).addConfig('redAppSidePanel', config);
    }

    private registerSeatMapAvailTile(): void {

        const airAvailabilityService: PublicAirAvailabilityService = getService(PublicAirAvailabilityService);
    
        const showSeatMapAvailabilityModal = (data: any) => {
            const modalOptions: ReactModalOptions = {
                header: 'ABC Seat Map',
                component: React.createElement(SeatMapAvailView, data),
                modalClassName: 'react-tile-modal-class'
            };
    
            getService(PublicModalsService).showReactModal(modalOptions);
        };
    
        airAvailabilityService.createAirAvailabilitySearchTile(
            SeatMapAvailTile,
            showSeatMapAvailabilityModal,
            'ABC Seat Map' // ✅ заголовок виджета
        );
    }

}
