
const joinRoom = () => {
    // will sign us up for the room
    io.socket.get('/chat/joinDash');
    console.log("connected to dash");
    // after we done we run func 2
    watchRoom();
}

const watchRoom = () => {
    // we will watch for changes and log them
    console.log("started watching chat");
    io.socket.on('chat', function(obj) {
        console.log(obj);
        if (obj.verb === 'created') {
            // add to page
            const table = document.querySelector("table");
            const row =table.insertRow(-1);

            const user_id_cell = row.insertCell(0);
            const user_type_cell = row.insertCell(1);
            const request_cell = row.insertCell(2);

            user_id_cell.innerHTML = obj.data.user_id;
            user_type_cell.innerHTML = obj.data.user_type;
            request_cell.innerHTML = JSON.stringify(obj.data.message);

        }
    });
}

// joining room at page load
joinRoom();