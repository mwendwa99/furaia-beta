const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      errorMessage: error.response.data,
      status: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      errorMessage: "No response received from the server",
      status: null,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      errorMessage: error.message,
      status: null,
    };
  }
};

export default handleError;
