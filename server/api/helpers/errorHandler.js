class ErrorHandler {
  handleProductError(error) {
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
      case "undefined": {
        return this.createConsumerError(
          "One or more parameters were undefined or missing",
          error
        );
      }
      case "BadId": {
        return this.createConsumerError(
          "No Product was found by this Id",
          error
        );
      }
      case "NoDelete": {
        return this.createConsumerError(
          "No Product was deleted from the database.",
          error
        );
      }
      case "BadUser": {
        return this.createConsumerError(
          "No User that matches that user ID has been found in our database",
          error
        );
      }
      default:
        return this.createServerError(error);
    }
  }
  handleUserError(error) {
    switch (error.message) {
      case "NaN": {
        return this.createConsumerError("NaN - Expected A Number!", error);
      }
      case "BadId": {
        return this.createConsumerError("No User was found by this Id", error);
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
        "Error Message:": error.message,
        "Error:": error.toString(),
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
