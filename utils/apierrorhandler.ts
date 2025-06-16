const errorMessages: { [key: number]: { [key: string]: string } } = {
  400: {
    "1003": "No matching location found",
    "1005": "API request URL is invalid.",
    "1006": "No matching location found.",
    "9000": "JSON body passed in bulk request is invalid.",
    "9001": "JSON body contains too many locations for bulk request.",
    "9999": "Internal application error.",
  },
  401: {
    "1002": "API key not provided.",
    "2006": "API key provided is invalid.",
  },
  403: {
    "2007": "API key has exceeded calls per month quota.",
    "2008": "API key has been disabled.",
    "2009": "API key does not have access to the resource.",
  },
};

export function getErrorMessage(status: number, body: string): string {
  const errorCode = Object.keys(errorMessages[status] || {}).find((code) =>
    body.includes(code)
  );
  return errorCode
    ? errorMessages[status][errorCode]
    : body || "Failed to fetch current weather data.";
}
