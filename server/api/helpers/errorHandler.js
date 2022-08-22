class ErrorHandler {
  handleProductGetError(error) {
    switch (error.message) {
      case "NaN": {
        return this.createConsumerError("NaN - Expected A Number!", error);
      }
      case "No result": {
        return this.createConsumerError(
          "No Results from database, Please try searching by ID to ensure results!",
          error
        );
      }
      default:
        return this.createServerError(error);
    }
  }
  handleProductPostError(error) {
    switch (error.message) {
      case "undefined": {
        return this.createConsumerError(
          "One or more parameters were undefined/missing",
          error
        );
      }
      default:
        return this.createServerError(error);
    }
  }
  createConsumerError(message, error) {
    return {
      status: 400,
      message: {
        Error: true,
        "Message from DevTeam: ": message,
        "Error Message:": error.toString(),
      },
    };
  }
  createServerError(error) {
    return {
      status: 500,
      message: {
        Error: true,
        "Message from DevTeam: ":
          "Please provide following information when creating a support ticket.",
        "Error Message: ": error.message,
        "Error: ": error.toString(),
      },
    };
  }
}

const errorHandler = new ErrorHandler();
module.exports = errorHandler;
