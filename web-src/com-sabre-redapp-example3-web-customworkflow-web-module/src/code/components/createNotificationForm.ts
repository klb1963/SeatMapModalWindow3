import {getService} from '../Context';
import {CustomForm} from 'sabre-ngv-custom-forms/interfaces/form/CustomForm';
import {ICustomFormsService} from 'sabre-ngv-custom-forms/services/ICustomFormsService';
import {CustomFormRs} from 'sabre-ngv-custom-forms/interfaces/form/CustomFormRs';
import {TextField} from 'sabre-ngv-custom-forms/interfaces/form/fields/TextField';
import {DropdownField} from 'sabre-ngv-custom-forms/interfaces/form/fields/DropdownField';
import {INotificationService} from 'sabre-ngv-notification/service/INotificationService';
import {NotificationType} from 'sabre-ngv-notification/interfaces/NotificationType';

const notifications: string[] = [];

export const createNotificationForm = async () => {
    const form: CustomForm = {
        title: 'Notification',
        fields: [
            {
                id: 'title',
            },
            {
                id: 'content',
            },
            {
                id: 'type',
                type: 'DROPDOWN',
                items: [
                    {
                        id: 'None',
                    },
                    {
                        id: 'Info',
                    },
                    {
                        id: 'Warning',
                    },
                    {
                        id: 'Error',
                    },
                    {
                        id: 'Success',
                    }
                ]
            },
            {
                id: 'priority',
                validation: {
                    regex: '^(-?[1-9][0-9]*|0)$',
                }
            },
            {
                id: 'timeout',
                label: 'Timeout in ms',
                validation: {
                    regex: '^([1-9][0-9]*|0)$',
                }
            }
        ],
        actions: [
            {
                id: 'cancel',
                label: 'Cancel'
            },
            {
                id: 'ok',
                label: 'Submit'
            }
        ]
    };

    const result: CustomFormRs = await getService(ICustomFormsService).openForm(form);

    if (result.action === 'ok') {
        showNotification(result);
    }
}

const showNotification = (form: CustomForm): void => {
    const type = (form.fields.find(field => field.id === 'type') as DropdownField).value;

    const id = getService(INotificationService).showNotification({
        title: (form.fields.find(field => field.id === 'title') as TextField).value,
        content: (form.fields.find(field => field.id === 'content') as TextField).value,
        type: type === 'None' ? undefined : type as NotificationType,
        priority: parseInt((form.fields.find(field => field.id === 'priority') as TextField).value),
        timeout: parseInt((form.fields.find(field => field.id === 'timeout') as TextField).value)
    });

    notifications.push(id);
}

export const hideNotifications = () => {
    notifications.forEach(id => getService(INotificationService).hideNotification(id));
    notifications.length = 0;
}