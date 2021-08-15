// Declare variables and require node packages
const express = require("express");
const fs = require("fs");
const path = require("path");
var uniqid = require("uniqid");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET request 
app.get("/", (request, response) => response.send("Click here to start"));

app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "public/notes.html"));
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

// POST request
app.post("/api/notes", (request, response) => {
    const { title, text } = request.body;
    const newNote = { title, text, id: uniqid() };
    response.json(newNote);

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

// DELETE request
app.delete("/api/notes/:id", (request, response) => {
    const deletedId = request.params.id
    const isNotId = (i) => i.id != deletedId

    fs.readFile("./db/db.json", "UTF-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            const isDeleted = parsedNotes.filter(isNotId);
            response.json(isDeleted);

            fs.writeFile("./db/db.json", JSON.stringify(isDeleted), (writeErr) => writeErr ? console.error(writeErr) : console.info("Note deleted. "));
        }
    });
});


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}.`));

