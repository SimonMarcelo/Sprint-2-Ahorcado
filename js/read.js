import { readFile } from "fs";

readFile("palabrasRandom.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }

    console.log(data);
});
