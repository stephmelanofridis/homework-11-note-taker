const { captureRejectionSymbol } = require("events");
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.get("/", (request, response) => response.send("Click here to start"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/notes", (request, response) => {
    fs.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (request, response) => {
    fs.readFile("./db/db.json", "UTF-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            response.json(parsedNotes);
        }
    });
});

app.post("/api/notes", (request, response) => {
    console.log("A posted note. ");
    console.log(request.body);
    response.json(request.body);
    const newNote = request.body;

    fs.readFile("./db/db.json", "UTF-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (writeErr) => writeErr ? console.error(writeErr) : console.info("Note added. "));
        }
    });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}.`));

