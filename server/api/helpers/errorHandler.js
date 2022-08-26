const product = require("../models/Product");

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
          "Nothing in the database matched the given ID(s)",
          error
        );
      }
      case "NoDelete": {
        return this.createConsumerError(
          "No Product was deleted from the database.",
          error
        );
      }
      case "BadCategory": {
        const allowedCategories = product.getAllowedCategories();
        return this.createConsumerError(
          `Currently only predefined categories are allowed: ${allowedCategories}`,
          error
        );
      }
      case "BadEmail": {
        return this.createConsumerError(
          "There is no user in the database with that email!",
          error
        );
      }
      case "Mailer": {
        return this.createServerError(
          `Something went wrong with the server's mailing system`,
          error
        );
      }
      case "server": {
        return this.createServerError(
          "Something went wrong on the server, We are sorry!",
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
      case "BadImage": {
        return this.createConsumerError(
          "That image is not Valid! It is either not online, or not an image",
          error
        );
      }
      case "BadEmail": {
        return this.createConsumerError("That Email is not valid!", error);
      }
      case "EmailNotFound": {
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
      //INTERNAL SERVER ERRORS - QUERY WENT WRONG
      case "UpdateError": {
        return this.createServerError(
          "There was an error updating the Data in the database",
          error
        );
      }
      case "server": {
        return this.createServerError(
          "Something went wrong on the server, We are sorry!",
          error
        );
      }

      default:
        return this.createServerError("Undefined Error", error);
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
  createServerError(message, error) {
    if (error.cause) {
      return {
        status: 500,
        message: {
          Error: true,
          "Message from DevTeam: ":
            "Please provide following information when creating a support ticket.",
          "Error Message: ": error.message,
          "Error: ": error.toString(),
          "Custom Message From DevTeam:": message,
          error_information_for_backend: {
            Errorname: error.cause.name,
            Errortext: error.cause.text,
            Errorcode: error.cause.code,
          },
        },
      };
    }
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