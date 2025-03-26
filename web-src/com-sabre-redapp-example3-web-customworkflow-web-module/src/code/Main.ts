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

import {DrawerService} from 'sabre-ngv-app/app/services/impl/DrawerService';
import {LargeWidgetDrawerConfig} from 'sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig';

import { FlightSegment } from 'sabre-ngv-app/app/common/data/flight/FlightSegment';
import { Tile } from 'sabre-ngv-app/app/widgets/drawer/views/elements/Tile';
import { AbstractView } from 'sabre-ngv-app/app/AbstractView';
import { AbstractModel } from 'sabre-ngv-app/app/AbstractModel';

import SeatMapComponent from './components/abc-seatmap/SeatMapComponent';
import { quicketConfig } from './components/abc-seatmap/quicketConfig';


export class Main extends Module {

    init(): void {
        super.init();
        this.registerServices();
        this.setup();
        this.registerSeatMapAvailTile(); // 👈 add Availability TileWidget
        this.registerSeatMapShoppingTile(); // 👈 add Shopping TileWidget
        this.registerSeatMapShoppingWidget(); // 👈 add Shopping Widget (открывает карту)
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

    private registerSeatMapShoppingTile(): void {
        const drawerService = getService(DrawerService);

        // Создаём функцию для отображения модального окна
        const showSeatMapShoppingModal = (segment: FlightSegment) => {

            console.log('🟢 [Modal] Segment passed to modal:', segment);

            const data = {
                flightSegments: [segment],
                dateOfFlight: segment.getDepartureDate()?.toISOString().split('T')[0]
            };

            console.log('📦 [Modal] Data for SeatMapComponent:', data);

            const modalOptions: ReactModalOptions = {
                header: '🛋️ ABC SeatMap (Shopping)',
                component: React.createElement(SeatMapComponent, {
                    config: quicketConfig,
                    data
                }),
                modalClassName: 'react-tile-modal-class',
                onHide: () => console.log('[🛬 SeatMap Shopping Modal Closed]')
            };

            getService(PublicModalsService).showReactModal(modalOptions);
        };

        // Регистрируем плитку и указываем обработчик клика
        const shoppingTileConfig = new LargeWidgetDrawerConfig(
            class extends Tile<FlightSegment> {
                selfDrawerContextModelPropagated(segment: FlightSegment) {
                    this.setDataContent(
                        `<button class="btn btn-primary">👀 Show SeatMap</button>`
                    );
                }

                onClick() {
                    console.log('🟢 [Tile Click] SeatMap clicked');
                    const segment = this.getModel() as FlightSegment;
                    console.log('📦 [Tile Click] Segment:', segment);
                    showSeatMapShoppingModal(this.getModel());
                
                }
            },
            // View необязателен, можно передать пустую заглушку
            class extends AbstractView<AbstractModel> { },
            { title: 'SeatMap Viewer' }
        );

        drawerService.addConfig(['shopping-flight-segment'], shoppingTileConfig);
    }

    private registerSeatMapShoppingWidget(): void {
        const drawerService = getService(DrawerService);
      
        const showSeatMapShoppingModal = (segment: FlightSegment) => {
          const data = {
            flightSegments: [segment],
            dateOfFlight: segment.getDepartureDate()?.toISOString().split('T')[0]
          };
      
          const modalOptions: ReactModalOptions = {
            header: '🛋️ ABC SeatMap (Shopping Widget)',
            component: React.createElement(SeatMapComponent, {
              config: quicketConfig,
              data
            }),
            modalClassName: 'react-tile-modal-class',
            onHide: () => console.log('[🛬 SeatMap Shopping Widget Modal Closed]')
          };
      
          getService(PublicModalsService).showReactModal(modalOptions);
        };
      
        const shoppingWidgetTileConfig = new LargeWidgetDrawerConfig(
          class extends Tile<FlightSegment> {
            selfDrawerContextModelPropagated(segment: FlightSegment) {
              this.setDataContent(
                `<button class="btn btn-outline-primary"> 🛋️ Open SeatMap Viewer</button>`
              );
            }
      
            onClick() {
                console.log('🟢 [Tile Click] SeatMap clicked');
                const segment = this.getModel() as FlightSegment;
                console.log('📦 [Tile Click] Segment:', segment);
                showSeatMapShoppingModal(segment);
            }
          },
          class extends AbstractView<AbstractModel> {},
          { title: 'SeatMap Shopping Viewer' }
        );
      
        drawerService.addConfig(['shopping-flight-segment'], shoppingWidgetTileConfig);
      }

}

