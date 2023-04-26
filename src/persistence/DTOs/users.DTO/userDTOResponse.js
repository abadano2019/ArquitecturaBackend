export default class UserDTOResponse {
    constructor(user) {
      //this.full_name = `${user.name} ${user.lastName}`
      this._id = user.id
      this.fullName = user.first_name + " " + user.last_name
      this.email = user.email
      this.role = user.role
      this.cart = user.cart
    }
  }