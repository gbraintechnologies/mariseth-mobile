import { handleToastShow } from "./commonmethods";

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

export function handleAuthApiError(error: any, formik: any, toast: any) {
  const { problem, message } = error;

  console.log(JSON.stringify(error));

  if ((formik && problem === "CLIENT_ERROR") || problem === "SERVER_ERROR") {
    if (Array.isArray(message)) {
      formik.setErrors({
        phone_number: message[0],
        pin: message[0],
      });
    }
    if (message?.phone_number) {
      formik.setErrors({ phone_number: message?.phone_number[0] });
    }
    if (message?.non_field_errors) {
      formik.setErrors({
        phone_number: message?.non_field_errors[0],
        pin: message?.non_field_errors[0],
        code: message?.non_field_errors[0],
        old_pin: message?.non_field_errors[0],
      });
    }
    if (message?.pin) {
      formik.setErrors({
        pin: message?.pin[0],
      });
    }
  } else {
    const errorMessages: Record<string, string> = {
      CONNECTION_ERROR:
        "Oops! You're offline. Check your internet and try again.",
      NETWORK_ERROR: "Oops! You're offline. Check your internet and try again.",
      TIMEOUT_ERROR: "Request timed out. Check your connection and try again",
    };

    const toastMessage =
      errorMessages[problem] ||
      "Oops! Something went wrong. Please try again in a moment.";
    handleToastShow(toast, toastMessage);
  }
}
