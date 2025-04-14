import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

interface SeatMapProps {
  config: any;
  data: any; // Данные, которые приходят из Shopping сценария
}

const SeatMapComponentShopping: React.FC<SeatMapProps> = ({ config, data }) => {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

// Получаем текущий сегмент
  const flightSegments = data.flightSegments || [];
  const currentSegment = flightSegments[segmentIndex] || {};

  console.log('✈️ [SeatMapComponentShopping] Полученные данные:', data);

        // // 🔨 Хардкодим данные для проверки
        // const flightData = {
        //     airlineCode: 'LH',
        //     flightNo: '123',
        //     departureDate: '2025-04-22',
        //     departure: 'MUC',
        //     arrival: 'FRA'
        // };

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
    }
  };

  console.log('✈️ [SeatMapComponentShopping] Сформированные данные для отправки:', seatMapData);

  const sendToIframe = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) {
      console.warn('⚠️ iframe или contentWindow не доступен.');
      return;
    }

    const message = {
      type: 'seatMaps',
      config: JSON.stringify(seatMapData.config),
      flight: JSON.stringify(seatMapData.flight),
      layout: JSON.stringify(seatMapData.layout),
    };

    console.log('📤 [SeatMapComponentShopping] Отправка данных в iframe:', message);
    iframe.contentWindow.postMessage(message, '*');
  };

  useEffect(() => {
    sendToIframe();
  }, [segmentIndex]);

  return (
    <div style={{ padding: '1rem' }}>
      {/* Flight Info Section */}
      <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#333' }}>
        <strong>🛫 Flight info:</strong>
        <pre>{JSON.stringify(currentSegment, null, 2)}</pre>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="segmentSelect">Выберите сегмент: </label>
        <select
          id="segmentSelect"
          value={segmentIndex}
          onChange={(e) => setSegmentIndex(Number(e.target.value))}
        >
          {flightSegments.map((segment: any, index: number) => (
            <option key={index} value={index}>
              {segment.marketingAirline || 'XX'} {segment.flightNumber || '000'}: {segment.origin} → {segment.destination}
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
        onLoad={sendToIframe}
      />
    </div>
  );
};

export default SeatMapComponentShopping;