export const getFlightFromSabreData = (data: any, segmentIndex: number = 0) => {
  const segment = data.flightSegments?.[segmentIndex];

  if (!segment) {
    console.warn(`⚠️ Segment index ${segmentIndex} not found`);
    return {
      id: 'UNKNOWN',
      airlineCode: '',
      flightNo: '',
      departureDate: '',
      departure: '',
      arrival: '',
      cabinClass: ''
    };
  }

  console.log('📌 [getFlightFromSabreData] Полные данные сегмента:', JSON.stringify(segment, null, 2));

  const departureDateTime = segment.DepartureDateTime;

  if (!departureDateTime) {
    console.warn('⚠️ [getFlightFromSabreData] DepartureDateTime отсутствует в данных сегмента!');
    return {
      id: 'UNKNOWN',
      airlineCode: segment.MarketingAirline?.EncodeDecodeElement?.Code || '',
      flightNo: segment.FlightNumber || '',
      departureDate: '',
      departure: segment.OriginLocation?.EncodeDecodeElement?.Code || '',
      arrival: segment.DestinationLocation?.EncodeDecodeElement?.Code || '',
      cabinClass: ''
    };
  }

  const departureDate = departureDateTime.split('T')[0]; // Оставляем только дату

  return {
    id: '001',
    airlineCode: segment.MarketingAirline?.EncodeDecodeElement?.Code,
    flightNo: segment.FlightNumber,
    departureDate,
    departure: segment.OriginLocation?.EncodeDecodeElement?.Code,
    arrival: segment.DestinationLocation?.EncodeDecodeElement?.Code,
    cabinClass: 'A'
  };
};