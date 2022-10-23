const deleteToppingBtn = document.querySelectorAll(".topping-delete")
const deletePizzaBtn = document.querySelectorAll(".pizzas-delete")
const editBtns = document.querySelectorAll(".topping-edit")
const updatePizzaBtn = document.querySelectorAll(".pizzas-update")

Array.from(deleteToppingBtn).forEach((btn) => {
    btn.addEventListener('click', deleteTopping)
})

Array.from(editBtns).forEach((btn) => {
    btn.addEventListener('click', editTopping)
})

Array.from(deletePizzaBtn).forEach((btn) => {
    btn.addEventListener('click', deletePizza)
})

Array.from(updatePizzaBtn).forEach((btn) => {
    btn.addEventListener('click', updatePizza)
})

async function deleteTopping() {
    const toppingId = this.parentNode.dataset.id 
    try {
        const response = await fetch(`/toppings/${toppingId}`, {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function editTopping() {
    const toppingId = this.parentNode.dataset.id 
    console.log(toppingId)
    try {
        const response = await fetch(`/toppings/${toppingId}`, {
            method: 'get',
            headers: {'Content-type': 'application/json'},
        })
        let url = response.url
        location.href = url
    } catch (err) {
        console.log(err)
    }
}

async function deletePizza() {
    const pizzaId = this.parentNode.dataset.id 
    try {
        const response = await fetch(`/pizzas/${pizzaId}`, {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function updatePizza() {
    const pizzaId = this.parentNode.dataset.id
    console.log(pizzaId)
    try {
        const response = await fetch(`/pizzas/${pizzaId}`, {
            method: 'get',
            headers: {'Content-type': 'application/json'}
        })
        let url = response.url;
        location.href = url
    } catch(err) {
        console.log(err)
    }
}