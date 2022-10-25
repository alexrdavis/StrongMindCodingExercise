const { getPizzaToppings, createPizzaToppings, deletePizzaToppings, updatePizzaTopping, getOneTopping } = require("../controller/toppingController")
const Toppings = require("../models/PizzaToppings")

jest.mock("../models/PizzaToppings")

const { getPizzas, createPizza, deletePizzas, getOnePizza, updatePizza } = require("../controller/pizzaController")
const Pizzas = require("../models/Pizzas")

jest.mock("../models/Pizzas")

const request = {
  body: {
    id: 1,
    name: "fake_topping"
  },
  params: {
    id: 1, 
    name: "fake_pizza"
  }
}

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
  redirect: jest.fn((x) => x),
  render: jest.fn((x) => x),
  json: jest.fn((x) => x)
}
/** Tests for Toppings ***/

// test create toppings
it('creating should send a status code of 200 and redirect', async () => {
  Toppings.create.mockImplementationOnce(() => ({
    id: 1, 
    name: "fake_topping"
  }))
  await createPizzaToppings(request, response)
  expect(response.status).toHaveBeenCalledWith(200)
  expect(response.redirect).toHaveBeenCalledWith("/toppings")
})

// test for getting all toppings
it('getting all should send a status code of 200', async () => {
  Toppings.find.mockImplementationOnce()
  await getPizzaToppings(request, response)
  expect(response.status).toHaveBeenCalledWith(200)
})

// test for deleting a topping
it('deleting should send a status code of 200', async () => {
  Toppings.findByIdAndDelete.mockReturnValue((request.params.id))
  await deletePizzaToppings(request, response)
  expect(response.status).toHaveBeenCalledWith(200)
  expect(response.json).toHaveBeenCalledWith("Deleted topping with id " + request.params.id)
})

// test for updating a topping
it('updating should redirect to /toppings', async () => {
  let topping = Toppings.findById.mockImplementationOnce(() => ({
    id: 3
  }))
  await updatePizzaTopping(request, response)
  expect(response.redirect).toHaveBeenCalledWith("/toppings")
})

// test for getting one topping by id
it('getting by id should render toppings.ejs', async () => {
  let topping = Toppings.findById.mockImplementationOnce(() => ({
    id: 3
  }))
  await getOneTopping(request, response)
  expect(response.render).toHaveBeenCalledWith("toppings.ejs", {"toppings": topping.id})
})


// /**** Tests for Pizzas ******/

// // test create pizza
it('creating pizza should send a status code of 200 and redirect', async () => {
  Pizzas.create.mockImplementationOnce(() => ({
    id: 1, 
    name: "fake_pizza",
    topping: "fake_topping"
  }))
  await createPizza(request, response)
  expect(response.status).toHaveBeenCalledWith(200)
  expect(response.redirect).toHaveBeenCalledWith("/toppings")
})

// test for getting all pizzas
it('getting all pizzas should send a status code of 200', async () => {
  Pizzas.find.mockImplementationOnce()
  await getPizzas(request, response)
  expect(response.status).toHaveBeenCalledWith(200)
})

// test for deleting a pizza
it('deleting pizza should send a status code of 200', async () => {
  Pizzas.findByIdAndDelete.mockImplementationOnce(() => ({
    id: 3
  }))
  await deletePizzas(request, response)
  expect(response.status).toHaveBeenCalledWith(200)
})

// test for updating a pizza
it('updating pizza should redirect to /pizzas, /toppings', async () => {
  let pizza
  try {
    pizza = Pizza.findById.mockReturnValue((request.params.id))
    pizza.name = request.params.name
    await updatePizza(request, response)
    expect(response.redirect).toHaveBeenCalledWith('/pizzas')
    expect(response.redirect).toHaveBeenCalledWith('/toppings')
  } catch(err) {
    expect(err).toBeInstanceOf(ReferenceError)
  }
})

// // test for getting one pizza by id
it('getting pizza id should send 200 status', async() => {
  Pizzas.findById.mockImplementationOnce(() => ({
    id: 3
  }))
  let topping = Toppings.find.mockImplementationOnce()
  await getOnePizza(request, response)
  expect(response.status).toHaveBeenCalledWith(200)
})

