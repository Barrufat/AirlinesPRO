let flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, layover: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, layover: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, layover: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, layover: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, layover: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
];

const deleteById = () => {

    const deleteFlight = confirm("Quieres eliminar un vuelo?");

    if (deleteFlight === true) {


        let deletedId = parseInt(prompt("Escribe el id del vuelo a eliminar: "));

        if (deletedId < 25) {

            flights = flights.filter(vuelo => vuelo.id !== deletedId);

            for (i = 0; i < flights.length; i++) {
                flights[i].id = parseInt([i]) + 1
            }

            getFlightsInfo();
            createNew();

        } else {
            alert("Escribe un id válido (menor de 25)");
            deleteById();
        }
    } else {

        const endingProgram = confirm("Deseas realizar alguna otra operación?")

        if (endingProgram){
            getRol();
        } else {
            alert("Gracias por usar ISDI Airlines, hasta la próxima!")
            getUser();
        }
    }
}

const createNew = () => {

    const newFligth = confirm("Hola administrador! Quieres crear un nuevo vuelo?");

    if (newFligth === true) {

        let newId = flights.length + 1;
        let newFrom = prompt("Origen del vuelo:");
        let newTo = prompt("Destino del vuelo:");
        let newCost = parseInt(prompt("Precio del vuelo: "));
        let newLayOver = confirm("El vuelo tiene escalas?");

        if (newFrom && newTo && newCost && newLayOver && isNaN(newCost) === false) {
            const newFligth = confirm("Crear vuelo con escalas desde " + newFrom + " con destino a " + newTo + " y con precio de " + newCost + "€?")

            if (newFligth && newId < 25) {

                flights.push({ id: newId, to: newTo, from: newFrom, cost: newCost, layover: newLayOver })

                for (i = 0; i < flights.length; i++) {
                    flights[i].id = parseInt([i]) + 1
                }

                getFlightsInfo();
                createNew();

            } else if (newId >= 25) {
                alert("Has superado el limite de vuelos!")
                createNew();
            }
        } else if (newFrom && newTo && newCost && !newLayOver && isNaN(newCost) === false) {
            const newFligth = confirm("Crear vuelo directo desde " + newFrom + " con destino a " + newTo + " y con precio de " + newCost + "€?")

            if (newFligth && newId < 25) {

                flights.push({ id: newId, to: newTo, from: newFrom, cost: newCost, layover: newLayOver })
                console.log(flights);

                getFlightsInfo();
                createNew();

            } else if (newId >= 25) {
                alert("Has superado el limite de vuelos!")
                deleteById();
            }
        } else {
            alert("Debes rellenar correctamente todos los campos!")
            createNew();
        }
    } else {

        deleteById();

    }
}

const getFlightsInfo = () => {

    let flightsInfo = []

    for (let i = 0; i < flights.length; i++) {

        if (flights[i].layover === true) {
            console.log(flights[i].id + " El vuelo con origen: " + flights[i].from + ", y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y realiza escalas.")
        } else if (flights[i].layover === false) {
            console.log(flights[i].id + " El vuelo con origen: " + flights[i].from + ", y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y no realiza ninguna escala.")
        }
    }

    let acumulatedCost = 0;
    let layoverFlights = 0;

    for (let i = 0; i < flights.length; i++) {
        acumulatedCost = acumulatedCost + flights[i].cost;

        if (flights[i].layover === true) {
            layoverFlights = layoverFlights + 1;
        }
    }

    let averageCost = acumulatedCost / flights.length;

    flightsInfo.push("\nEl coste medio de los vuelos es: " + averageCost + "€. \nHay " + layoverFlights + " vuelos con escalas.");

    let lastDestinys = []

    for (let j = flights.length - 1; j >= flights.length - 5; j--) {

        lastDestinys.push(flights[j].to)

    }

    flightsInfo.push("\nLos destinos de los últimos 5 vuelos del día son: " + lastDestinys[0] + ", " + lastDestinys[1] + ", " + lastDestinys[2] + ", " + lastDestinys[3] + " y " + lastDestinys[4] + ".")

    alert(flightsInfo);
}



function getUser() {

    const searchFlights = () => {

        let searchFlight = prompt("Busca vuelos por precio: ");

        if (isNaN(searchFlight) === false) {

            let filteredFlights = flights.filter(flight => flight.cost <= searchFlight);

            if (filteredFlights.length === 0) {
                alert("Ningún vuelo coincide con tu búsqueda según precio. ")
                searchFlights();
            } else {
                console.log("Estos son los vuelos filtrados segun tu precio (" + searchFlight + "€): ")

                for (i = 0; i < filteredFlights.length; i++) {

                    if (filteredFlights[i].layover === true) {

                        console.log(filteredFlights[i].id + " Vuelo con escalas con origen: " + filteredFlights[i].from + ", destino: " + filteredFlights[i].to + " y coste de " + filteredFlights[i].cost + "€.")

                    } else if (filteredFlights[i].layover === false) {

                        console.log(filteredFlights[i].id + " Vuelo directo con origen: " + filteredFlights[i].from + ", destino: " + filteredFlights[i].to + " y coste de " + filteredFlights[i].cost + "€.")
                    }
                }

                const endingProgram = confirm("Deseas realizar alguna otra operación?")

                if (endingProgram){
                    getRol();
                } else {
                    alert("Gracias por usar ISDI Airlines, hasta la próxima!")
                    getUser();
                }
            }

        } else {

            alert("Escribe un precio válido!");
            searchFlights();
        }
    }

    const getRol = () => {
        const rol = prompt("Hola " + name + ", cual es tu rol? (ADMIN o USER)");

        if (rol === 'ADMIN') {

            createNew();

        } else if (rol === 'USER') {

            searchFlights();

        } else {

            alert("Escribe un rol válido!");
            getRol();
        }
    }

    const name = prompt("Hola, como te llamas?");

    getFlightsInfo();

    getRol();
}

getUser();