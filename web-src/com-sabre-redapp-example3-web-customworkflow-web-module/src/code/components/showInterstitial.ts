import {InterstitialService} from 'sabre-ngv-app/app/services/impl/InterstitialService';
import {getService} from '../Context';

export const showInterstitial = (): void => {
    getService(InterstitialService).showInterstitial(5000);
}