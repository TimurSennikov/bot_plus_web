import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import path from "path";

import {config} from "./config.js";

import {client, serverInfo} from "./hleb_bot.js";

import "./bot_events.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/log", (req, res) => {
    console.log(req.body["author"] + ": " + req.body["message"]);

    client.guilds.fetch(config.guildID).then((g) => {g.channels.fetch(config.chatChannelID).then(((c) => {c.send(req.body["author"] + ": " + req.body["message"]);}));});
});

app.get("/data", (req, res) => {
    res.send(serverInfo.getOnline());
});

app.get("/prettyPlayers", (req, res) => {
    res.send(serverInfo.prettyInfo());
});

app.get("/map", (req, res) => {
    res.send("Карта: " + serverInfo.serverMap);
});

// собственно сам сайт
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: path.join("client")});
});

app.get("/styles.css", (req, res) => {
    res.sendFile("styles.css", {root: path.join("client")});
});

app.get("/script.js", (req, res) => {
    res.sendFile("script.js", {root: path.join("client")});
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile("favicon.ico", {root: path.join("client")});
});
// ----------

app.listen(80, () => {
    console.log("слушаю на порту 80.");
});