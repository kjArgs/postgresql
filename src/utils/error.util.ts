// create class that extends on the built in Error
export class AppError extends Error {
  // initialize custom property for status codes(200, 400, etc)
  statusCode: Number;
  errorMessage: String;

  // Constructor runs when you create a new AppError
  constructor(message: string, statusCode: Number, errorMessage: string) {
    // This sets the "message" property
    super(message);

    // Store the HTTP status code (custom property)
    this.statusCode = statusCode;
    //Store the error message
    this.errorMessage = errorMessage;

    // Set the name of the error (e.g., "AppError" instead of just "Error")
    this.name = this.constructor.name;

    // Capture the stack trace (helps debugging)
    // Removes constructor call from stack for cleaner output
    Error.captureStackTrace(this, this.constructor);
  }
}
