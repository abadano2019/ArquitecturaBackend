import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import cartsServices from "../services/carts.services.js";
import productsServices from "../services/products.services.js"
import ticketsServices from "../services/tickets.services.js";
import {transporter} from "../nodemailer.js"
import usersServices from "../services/users.services.js";

export const getTicketsByUserController = async (req, res,next) => {
  try {
    const ticket = await ticketsServices.getTicketByUserService();
    res.json(ticket);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const addTicketController = async (req, res,next) => {

  try {
    const { cid } = req.params;

    if (cid === ""){
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }
    const user = await usersServices.getUserByIdService(req.session.email)
    const date = new Date();
    const datetime = date.toLocaleString();
    const code = date.getTime();
    const cart = await cartsServices.getCartByIdService(user.cart._id);
    const carts = await cartsServices.checkProductsCart(cart.products)
    const amount = await cartsServices.sumItemsCarts(carts[0]);
    
    const ticket = {
      code: code.toString(),
      purchase_datetime: datetime,
      amount: amount,
      purchaser: req.session.email,
      items: carts[0],
    };

    console.log(ticket)

    const newTicket = await ticketsServices.addTicketService(ticket);
    const newCart = await cartsServices.updateCartProductService(user.cart._id,carts[1])

    const mail = await transporter.sendMail({
      from:'BAZAR 5A',
      //to: req.session.email,
      to: 'abadano05@gmail.com',
      subject: 'Detalle de pedido de compra',
      text: `Se ha realizado la compra exitosamente para los siguientes productos: ${JSON.stringify(carts[0])}. \n \n Lamentablemente por falta de stock los siguientes productos aún permanecen es su carrito: ${JSON.stringify(carts[1])}`
    })
    

    res.json({ mesage: "Compra realizada" });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};
