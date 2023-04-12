import { addMessage, getMessages } from "../persistence/persistence.js";

export async function getMessagesService() {
  return getMessages();
}

export async function addMessageService(message) {
  return addMessage(message);
}
