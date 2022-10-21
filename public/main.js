const deleteToppingBtn = document.querySelectorAll(".topping-delete")

Array.from(deleteToppingBtn).forEach((btn) => {
    btn.addEventListener('click', deleteTopping)
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