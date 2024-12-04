const sayHello = (firstName, lastName) => {
  return `Hello ${firstName} ${lastName}`;
}

const notifyNewMessage = (senderName, message, subject) => {
  return `${subject}, you got a new message from ${senderName}: ${message}`;
}

module.exports = {
  sayHello,
  notifyNewMessage
}
