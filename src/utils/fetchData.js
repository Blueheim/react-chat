import httpObservable from 'simplehttpobservable';

export default requestPayload => {
  return httpObservable(requestPayload);
};
