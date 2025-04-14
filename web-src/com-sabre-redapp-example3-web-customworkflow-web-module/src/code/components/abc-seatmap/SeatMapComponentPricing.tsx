import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { getFlightFromSabreData } from './getFlightFromSabreData';

interface SeatMapProps {
  config: any;
  data: any;
}

const SeatMapComponentPricing: React.FC<SeatMapProps> = ({ config, data }) => {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 🔍 Логируем входящие данные
  // console.log('🔹 [SeatMapComponent] received props:', { config, data });
  
  console.log('📥 [SeatMapComponent] Incoming data:', data);

// Получаем текущий сегмент
const flightSegments = data.flightSegments || [];
const currentSegment = flightSegments[segmentIndex] || {};

  // 🔍 Логируем сформированный flight
  console.log('✈️ [SeatMapComponent] parsed flight:', flightSegments);
  
  // flight для проверки
  // flight:{
  //   id: '001', 
  //     airlineCode: 'LH',
  //     flightNo: '123',
  //     departureDate: '2025-04-22', 
  //     departure: 'MUC',
  //     arrival: 'FRA',
  //     cabinClass: 'A'
  // },

  const seatMapData = {
    config,
    flight: {
        id: '001',  // Убедись, что передается id
        airlineCode: currentSegment.marketingAirline || 'LH',
        flightNo: currentSegment.flightNumber || '123',
        departureDate: currentSegment.departureDateTime || '2025-04-22',
        departure: currentSegment.origin || 'MUC',
        arrival: currentSegment.destination || 'FRA',
        cabinClass: currentSegment.cabinClass || 'A'
    },
    layout: {
      decks: [
        {
          id: 'main-deck',
          name: 'Deck 1',
          width: 600,
          height: 400,
          rows: [
            { label: '1', seats: [{ label: 'A', x: 50, y: 50 }, { label: 'B', x: 100, y: 50 }] },
            { label: '2', seats: [{ label: 'A', x: 50, y: 100 }] }
          ]
        }
      ]
    },
    availability: [
      { label: '1A', price: 50, currency: 'USD', color: 'green', onlyForPassengerType: ['ADT'] },
      { label: '1B', price: 45, currency: 'USD', color: 'yellow', onlyForPassengerType: ['ADT'] },
      { label: '2A', price: 30, currency: 'USD', color: 'lightblue' }
    ],
    passengers: [{ id: 'PAX1', name: 'Иванов И.И.', type: 'ADT' }]
  };

  const sendToIframe = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) {
      console.warn('⚠️ iframe or contentWindow not available');
      return;
    }

    const message = {
      type: 'seatMaps',
      config: JSON.stringify(seatMapData.config),
      flight: JSON.stringify(seatMapData.flight),
      layout: JSON.stringify(seatMapData.layout),

      // можно раскомментировать при необходимости
      // availability: JSON.stringify(seatMapData.availability),
      // passengers: JSON.stringify(seatMapData.passengers)

    };

    console.log('📤 [SeatMapComponent] sending to iframe with data:', {
      config: JSON.stringify(seatMapData.config),
      flight: JSON.stringify(seatMapData.flight),
  });

    console.log('📤 [SeatMapComponent] sending to iframe:', message);
    iframe.contentWindow.postMessage(message, '*');
  };

  console.log('🧠 SeatMapComponent is rendering!');

  useEffect(() => {
    console.log('🛠️ SeatMapComponent mounted');
    console.log(`🔄 Segment index changed: ${segmentIndex}`);
    sendToIframe(); // отправка при изменении сегмента
  }, [segmentIndex]);

  return (

    <div style={{ padding: '1rem' }}>
      {/* окно с данными о рейсе */}
      <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#333' }}>
        <strong>🛫 Flight info:</strong>
        <pre>{JSON.stringify(currentSegment, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="segmentSelect">Выберите сегмент: </label>
        <select
          id="segmentSelect"
          value={segmentIndex}
          onChange={(e) => setSegmentIndex(Number(e.target.value))}>
          {flightSegments.map((segment: any, index: number) => (
            <option key={index} value={index}>
              {segment.MarketingAirline?.EncodeDecodeElement?.Code || 'XX'} {segment.FlightNumber || '000'}
              &nbsp;→&nbsp;
              {segment.OriginLocation?.EncodeDecodeElement?.Code || '???'} –
              {segment.DestinationLocation?.EncodeDecodeElement?.Code || '???'}
            </option>
          ))}
        </select>
      </div>

      <iframe
        ref={iframeRef}
        src="https://quicket.io/react-proxy-app/"
        width="100%"
        height="800"
        style={{ border: '1px solid #ccc' }}
        title="SeatMapIframe"
        onLoad={() => {
          console.log('✅ [SeatMapComponent] iframe loaded, sending data...');
          sendToIframe();
        }}
      />
    </div>

  );

};

export default SeatMapComponentPricing;