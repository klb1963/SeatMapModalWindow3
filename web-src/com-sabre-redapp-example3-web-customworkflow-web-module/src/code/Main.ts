import * as React from 'react';
import { getService, registerService } from './Context';
import { ExtensionPointService } from 'sabre-ngv-xp/services/ExtensionPointService';
import { Module } from 'sabre-ngv-core/modules/Module';
import { RedAppSidePanelButton } from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import { RedAppSidePanelConfig } from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';

import { CustomWorkflowService } from './services/CustomWorkflowService';
import { createPnrForm } from './components/createPnrForm';
import { callLasLax } from './components/callLasLax';
import { showRuntime } from './components/showRuntime';
import { showInterstitial } from './components/showInterstitial';
import { showAgentProfile } from './components/showAgentProfile';
import { showBanners } from './components/showBanners';
import { refreshTripSummary } from './components/refreshTripSummary';
import { callExternalService } from './components/callExternalService';
import { createNotificationForm, hideNotifications } from './components/createNotificationForm';

import { PublicAirAvailabilityService } from 'sabre-ngv-airAvailability/services/PublicAirAvailabilityService';
import { SeatMapAvailTile } from './components/abc-seatmap/widgets/SeatMapAvailTile';
import { SeatMapAvailView } from './components/abc-seatmap/widgets/SeatMapAvailView';

import { ReactModalOptions } from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';

import { DrawerService } from 'sabre-ngv-app/app/services/impl/DrawerService';
import { LargeWidgetDrawerConfig } from 'sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig';

import { SeatMapShoppingTile } from './components/abc-seatmap/widgets/SeatMapShoppingTile';
import { SeatMapShoppingView } from './components/abc-seatmap/widgets/SeatMapShoppingView';

import { IAirPricingService } from 'sabre-ngv-pricing/services/IAirPricingService';
import { PricingTile } from './components/abc-seatmap/widgets/PricingTile';
import { PricingView } from './components/abc-seatmap/widgets/PricingView';


export class Main extends Module {
  init(): void {
    super.init();
    this.registerServices();
    this.setupSidePanelButtons();
    this.registerSeatMapAvailTile();
    this.registerSeatMapShoppingTile();
  }

  private registerServices(): void {
    registerService(CustomWorkflowService);
  }

  private setupSidePanelButtons(): void {
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
      selfRemoveBtn
    ]);

    getService(ExtensionPointService).addConfig('redAppSidePanel', config);
  }

  // AvailabilityTile
  private registerSeatMapAvailTile(): void {
    const airAvailabilityService = getService(PublicAirAvailabilityService); // внутренний сервис для предоставления данных в рамках Availability

    const showSeatMapAvailabilityModal = (data: any) => {
      const modalOptions: ReactModalOptions = {
        header: 'SeatMaps ABC 360',
        component: React.createElement(SeatMapAvailView, data),
        modalClassName: 'react-tile-modal-class'
      };

      getService(PublicModalsService).showReactModal(modalOptions);
    };

    airAvailabilityService.createAirAvailabilitySearchTile(
      SeatMapAvailTile,
      showSeatMapAvailabilityModal,
      'SeatMaps ABC 360'
    );
  }

  // ShoppingTile 
  private registerSeatMapShoppingTile(): void {
    // определяем config shoppingDrawerConfig
    const shoppingDrawerConfig = new LargeWidgetDrawerConfig(SeatMapShoppingTile, SeatMapShoppingView, {
      title: 'Shopping Tile Widget' // заголовок окна
    });
    // вызвываем сервис с этим config shoppingDrawerConfig
    getService(DrawerService).addConfig(['shopping-flight-segment'], shoppingDrawerConfig);

    // Pricing Tile
    const showPricingModal = this.createShowModalAction(PricingView, 'Pricing Data');
    getService(IAirPricingService).createPricingTile(PricingTile, showPricingModal, 'ABC Seat Map');

  }

  private createShowModalAction(view: React.FunctionComponent<any>, header: string): (data: any) => void {
    return ((data) => {
      const ngvModalOptions: ReactModalOptions = {
        header,
        component: React.createElement(
          view,
          data
        ),
        modalClassName: 'react-tile-modal-class'
      }
      getService(PublicModalsService).showReactModal(ngvModalOptions);
    })
  }


}
