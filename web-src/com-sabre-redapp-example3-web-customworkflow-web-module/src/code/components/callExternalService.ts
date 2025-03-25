import * as React from 'react';
import {PublicModalsService} from 'sabre-ngv-modals/services/PublicModalService';
import {ReactModalOptions} from 'sabre-ngv-modals/components/PublicReactModal/ReactModalOptions';
import {ExternalServiceConnector} from 'sabre-ngv-app/app/services/impl/ExternalServiceConnector';
import {getService} from '../Context';
import {actions} from './externalServiceSubComponents/actions';
import {ModalComponent} from './externalServiceSubComponents/ModalComponent';
import {LocalStore} from '../reducers/LocalStore';

const modalService: PublicModalsService = getService(PublicModalsService);

export const callExternalService = (): void => {
    const localStore = new LocalStore();

    const onSubmit = () => {
        const storeData = localStore.getData();
        const headers: Record<string, unknown> = JSON.parse(storeData.headers);

        getService(ExternalServiceConnector).callService(storeData.url, storeData.method, storeData.body, headers).done(response => {
            const responseObject = JSON.parse(response as string);
            const responseString = JSON.stringify(responseObject, null, 2);
            localStore.store.dispatch(
                {type: 'SET_PARAMETER', field: 'response', newVal: responseString}
            );
        });
    }
    const onClose = () => {
        modalService.closeReactModal();
    }

    const ngvModalOptions: ReactModalOptions = {
        header: 'ExternalServiceConnector',
        component: React.createElement(ModalComponent),
        onSubmit: onSubmit,
        actions: actions(onClose, onSubmit),
        store: localStore.store
    }

    modalService.showReactModal(ngvModalOptions);
};