import * as React from 'react';

const SeatMapComponent: React.FC = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const seatMapData = {
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

  const sendToIframe = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
      {
        type: 'seatMaps',
        config: JSON.stringify(seatMapData.config),
        flight: JSON.stringify(seatMapData.flight),
        layout: JSON.stringify(seatMapData.layout),
        availability: JSON.stringify(seatMapData.availability),
        passengers: JSON.stringify(seatMapData.passengers)
      },
      '*'
    );

    console.log('📤 SeatMap data sent via postMessage');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <p>✅ SeatMap контейнер загружен</p>
      <button onClick={sendToIframe}>📤 Отправить данные для отрисовки карты</button>
      <iframe
        ref={iframeRef}
        src="https://quicket.io/react-proxy-app/" // приходит механизм "отрисовки" и обмена данными 
        // src="localhost:3000" - npm start
        width="100%"
        height="800"
        style={{ border: '1px solid #ccc', marginTop: '1rem' }}
        title="SeatMapIframe"
      />
    </div>
  );
};

export default SeatMapComponent;