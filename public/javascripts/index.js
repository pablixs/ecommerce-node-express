async function pay() {
    const preference = await (await fetch('http://localhost:3000/pagar/mercadopago/try', {
        method: "post",
        body: JSON.stringify({
            title: 'Hola',
            unit_price: 24,
            quantity: 2
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();

    var script = document.createElement("script")
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference.preferenceId;
    document.getElementById("page-content").innerHTML = "";
    document.querySelector("#page-content").appendChild(script);
}

pay();