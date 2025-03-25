"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var SeatMapComponent = function () {
    var iframeRef = React.useRef(null);
    var seatMapData = {
        config: {
            width: 400,
            lang: 'EN',
            horizontal: false,
            rightToLeft: false,
            visibleFuselage: true,
            visibleWings: true,
            builtInDeckSelector: true,
            singleDeckMode: true,
            builtInTooltip: true,
            externalPassengerManagement: false,
            tooltipOnHover: false,
            colorTheme: {
                seatLabelColor: 'white',
                seatStrokeColor: 'gray'
            }
        },
        flight: {
            id: '111',
            airlineCode: 'EK',
            flightNo: '50',
            departureDate: '2025-04-21',
            departure: 'MUC',
            arrival: 'DXB',
            cabinClass: 'A'
        },
        layout: {
            decks: [
                {
                    id: 'main-deck',
                    name: 'Deck 1',
                    width: 600,
                    height: 400,
                    rows: [
                        {
                            label: '1',
                            seats: [
                                { label: 'A', x: 50, y: 50 },
                                { label: 'B', x: 100, y: 50 }
                            ]
                        },
                        {
                            label: '2',
                            seats: [{ label: 'A', x: 50, y: 100 }]
                        }
                    ]
                }
            ]
        },
        availability: [
            {
                label: '1A',
                price: 50,
                currency: 'USD',
                color: 'green',
                onlyForPassengerType: ['ADT']
            },
            {
                label: '1B',
                price: 45,
                currency: 'USD',
                color: 'yellow',
                onlyForPassengerType: ['ADT']
            },
            {
                label: '2A',
                price: 30,
                currency: 'USD',
                color: 'lightblue'
            }
        ],
        passengers: [
            {
                id: 'PAX1',
                name: 'Иванов И.И.',
                type: 'ADT'
            }
        ]
    };
    var sendToIframe = function () {
        var iframe = iframeRef.current;
        if (!iframe || !iframe.contentWindow)
            return;
        iframe.contentWindow.postMessage({
            type: 'seatMaps',
            config: JSON.stringify(seatMapData.config),
            flight: JSON.stringify(seatMapData.flight),
            layout: JSON.stringify(seatMapData.layout),
            availability: JSON.stringify(seatMapData.availability),
            passengers: JSON.stringify(seatMapData.passengers)
        }, '*');
        console.log('📤 SeatMap data sent via postMessage');
    };
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("p", null, "\u2705 SeatMap \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"),
        React.createElement("button", { onClick: sendToIframe }, "\uD83D\uDCE4 \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u043E\u0442\u0440\u0438\u0441\u043E\u0432\u043A\u0438 \u043A\u0430\u0440\u0442\u044B"),
        React.createElement("iframe", { ref: iframeRef, src: "https://quicket.io/react-proxy-app/" // приходит механизм "отрисовки" и обмена данными 
            , 
            // src="localhost:3000" - npm start
            width: "100%", height: "800", style: { border: '1px solid #ccc', marginTop: '1rem' }, title: "SeatMapIframe" })));
};
exports.default = SeatMapComponent;
