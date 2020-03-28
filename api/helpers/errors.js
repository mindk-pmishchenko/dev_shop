class CredentialError extends Error {}

class PermissionError extends Error {}

class ResetTokenError extends Error {}

class EmailError extends Error {}

module.exports = {CredentialError, PermissionError, ResetTokenError, EmailError};
