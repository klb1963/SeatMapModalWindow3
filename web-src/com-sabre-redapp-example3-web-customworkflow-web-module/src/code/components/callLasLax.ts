import {InterstitialService} from 'sabre-ngv-app/app/services/impl/InterstitialService';
import {cf, getService} from '../Context';
import {openCustomFormParagraph} from '../utils/openCustomFormParagraph';

export const callLasLax = (): void => {
    const interstitialService = getService(InterstitialService);

    interstitialService.showInterstitial(5000);

    cf('1LASLAX').send().done((response) => {
        interstitialService.hideInterstitial();

        const hasSignInResponse = response.getDataStructs()
            .filter(data => data['d.Screen'] && data['d.Screen']['d.Text'])
            .map(data => data['d.Screen']['d.Text'])
            .some(data => data.includes('SIGN IN'));

        if (hasSignInResponse) {
            openCustomFormParagraph('Error', 'Command failed, not signed in.');
        }
    });
}