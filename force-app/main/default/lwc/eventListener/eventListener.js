import {
    LightningElement,
    track
} from 'lwc';
import {
    subscribe,
    unsubscribe,
    onError
} from 'lightning/empApi';

export default class EventListener extends LightningElement {
    @track events = [];

    channels = [
        '/data/AccountChangeEvent',
        '/data/ContactChangeEvent',
        '/data/CaseChangeEvent'
    ];
    subscriptions = {};

    connectedCallback() {
        this.registerErrorListener();

        this.channels.forEach((channel) => {
            subscribe(channel, -1, (message) => {
                this.handleMessage(message, channel);
            }).then((response) => {
                console.log(`Subscribed to ${channel}`, response);
                this.subscriptions[channel] = response;
            });
        });
    }

    disconnectedCallback() {
        Object.values(this.subscriptions).forEach(sub => {
            unsubscribe(sub, (response) => {
                console.log('Unsubscribed:', response.subscription);
            });
        });
    }

    getBadgeClass(changeType) {
        switch (changeType) {
            case 'CREATE':
                return 'slds-badge slds-theme_success';
            case 'UPDATE':
                return 'slds-badge slds-theme_warning';
            case 'DELETE':
                return 'slds-badge slds-theme_error';
            default:
                return 'slds-badge';
        }
    }

    handleMessage(message) {
        const payload = message.data.payload;
        const header = payload.ChangeEventHeader;

        console.log(JSON.stringify(payload, null, 2));
        const changedFields = header.changedFields;

        const changes = changedFields.map(fieldPath => {
            const fieldParts = fieldPath.split('.');
            let value = payload;

            // Traverse the path to get the nested value
            for (const part of fieldParts) {
                value = value?.[part];
                if (value === undefined) break;
            }

            // Format value for display
            let displayValue;
            if (typeof value === 'object' && value !== null) {
                displayValue = JSON.stringify(value, null, 2);
            } else {
                displayValue = value !== undefined && value !== null ? value : '(none)';
            }

            return {
                field: fieldPath,
                newValue: value,
                newDisplay: displayValue
            };
        });

        const event = {
            replayId: message.data.event.replayId,
            object: header.entityName,
            changeType: header.changeType,
            recordId: header.recordIds.join(', '),
            changedFields: changedFields.join(', '),
            changes,
            badgeClass: this.getBadgeClass(header.changeType)
        };

        this.events = [event, ...this.events];
    }


    registerErrorListener() {
        onError(error => {
            console.error('EMP API error:', error);
        });
    }

    handleClear() {
        this.events = [];
    }
}