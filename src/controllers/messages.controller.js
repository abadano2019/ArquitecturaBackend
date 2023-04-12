import { addMessageService, getMessagesService } from "../services/messages.services.js";

export const getMessagesController = async (req, res) => {
  try {
    const messages = await getMessagesService();
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const addMessageController = async (info) => {
  const createMensaje = (info) => {
    // validación de los campos, se solicita que no sean vacios
    if (info.user === "" || info.message === "") {
      console.log("Atención: Verifique los campos a ingresar (user, mensage)");
      return "Atención: Verifique los campos a ingresar (user,mansage)";
    }
    const chatMessage = {
      user: user,
      message: message,
    };
    return chatMessage;
  };

  try {
    menssage = createMensaje(info)
    if (menssage)
        {
          const newMessage = await addMessageService(message)
          console.log(newMessage)
          console.log("mensaje agregado")
          return "Message Controller Add Message OK - COD2"
        }
        else
        {
          console.log("Mensaje invalido")
        }

  } catch (error) {
    console.log(error);
    return "Message Controller Add Message Erro - COD3"
  }
};
