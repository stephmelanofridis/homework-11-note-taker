const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = ("uniqid");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.post("/api/notes", (request, response) => {
    const { title, text } = request.body;
    const newNote = { title, text, id: uniqueid() };
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

app.delete("api/notes/:id", (request, response) => {
    const deteleId = require.params.id
    const isNotId = (i) => i.id != deleteId

    fs.readFile("./db/db.json", "UTF-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            response.json(isDeleted);

            fs.writeFile("./db/db.json", JSON.stringify(isDeleted), (writeErr) => writeErr ? console.error(writeErr) : console.info("Note deleted. "));
        }
    });
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}.`));

