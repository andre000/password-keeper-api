class BadRequestError extends Error {
  constructor(message) {
    super();
    this.code = 400;
    this.message = message || 'Invalid Request. Try again.';
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.code = 401;
    this.message = message || 'This resource requires authentication.';
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.code = 403;
    this.message = message || 'You don\'t have permission to use this resource.';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.code = 404;
    this.message = message || 'Resource not Found.';
  }
}

class ConflictError extends Error {
  constructor(message) {
    super();
    this.code = 409;
    this.message = message || 'Resource conflits with another one. Try again.';
  }
}

class InternalError extends Error {
  constructor(message) {
    super();
    this.code = 500;
    this.message = message || 'Server couldn\'t handle your request. Try again later.';
  }
}

class UnavaiableError extends Error {
  constructor(message) {
    super();
    this.code = 503;
    this.message = message || 'Server isn\'t avaiable right now. Try Again Later.';
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalError,
  UnavaiableError,
};
