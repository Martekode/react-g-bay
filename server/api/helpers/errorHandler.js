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
      default:
        return this.createServerError(error, "Undefined Error");
    }
  }
  handleUserError(error) {
    switch (error.message) {
      case "NaN": {
        return this.createConsumerError("NaN - Expected A Number!", error);
      }
      case "undefined": {
        return this.createConsumerError(
          "One or more required parameters were undefined or missing",
          error
        );
      }
      case "BadId": {
        return this.createConsumerError("No User was found by this Id", error);
      }
      case "BadUser": {
        return this.createConsumerError(
          "No User that matches that user ID has been found in our database",
          error
        );
      }
      case "BadEmail": {
        return this.createConsumerError(
          "No User found that matches that email adress in the database!",
          error
        );
      }
      case "TooManyUsers": {
        return this.createConsumerError(
          "Too many Users were found in the database with these credentials!",
          error
        );
      }
      case "nameAlreadyInDB": {
        return this.createConsumerError(
          "This username already exists in the database",
          error
        );
      }
      case "mailAlreadyInDB": {
        return this.createConsumerError(
          "This Email already exists in the database",
          error
        );
      }
      //INTENRAL SERVER ERRORS - QUERY WENT WRONG
      case "UpdateError": {
        return this.createServerError(
          error,
          "There was an error updating the Data in the database"
        );
      }

      default:
        return this.createServerError(error, "Undefined Error");
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
  createServerError(error, message) {
    return {
      status: 500,
      message: {
        Error: true,
        "Message from DevTeam: ":
          "Please provide following information when creating a support ticket.",
        "Error Message: ": error.message,
        "Error: ": error.toString(),
        "Custom Message From DevTeam:": message,
      },
    };
  }
}

const errorHandler = new ErrorHandler();
module.exports = errorHandler;
