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

  const departureDateTime = segment.DepartureDateTime;
  const departureDate = departureDateTime.split('T')[0]; // Оставляем только дату

  return {
    id: '001', // Можно позже сгенерировать ID иначе
    airlineCode: segment.MarketingAirline?.EncodeDecodeElement?.Code,
    flightNo: segment.FlightNumber,
    departureDate,
    departure: segment.OriginLocation?.EncodeDecodeElement?.Code,
    arrival: segment.DestinationLocation?.EncodeDecodeElement?.Code,
    cabinClass: 'A' // Пока фиксировано, можно расширить
  };

};