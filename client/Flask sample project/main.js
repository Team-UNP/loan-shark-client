$('#btnSave').click(function () {
    SaveDb();
});

function onSubmit(e) {
    alert("reached - 7")
    e.preventDefault()
    alert('Janith Malli')
    let id = $('#txtCusId').val();
    let amount = $('#txtAmount').val();
    let poolUser = $('#txtPoolUsers').val();


    const data = JSON.stringify({id, amount, "name": poolUser});
    let dataReceived = "";
    fetch("http://127.0.0.1:5000/loan/request", {
        credentials: "same-origin",
        mode: "same-origin",
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: data
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            dataReceived = JSON.parse(dataJson)
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })

    console.log(`Received: ${dataReceived}`)

}