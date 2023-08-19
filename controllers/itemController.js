const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

function loadItems() {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
}

function saveItems(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

app.use((req, res, next) => {
  req.items = loadItems();
  next();
});

exports.newItem = (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now().toString();
  req.items.push(newItem);
  saveItems(req.items);
  res
    .status(201)
    .json({ status: "succes", msg: "New Item created", data: newItem });
};

exports.filterItems = (req, res) => {
  const program = req.query.program;
  let filteredItems = req.items;
  if (program) {
    filteredItems = req.items.filter((item) => item.program === program);
  }
  res
    .status(200)
    .json({ status: "success", msg: "filtered items", data: filteredItems });
};

exports.addItem = (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = req.items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    req.items[index] = { ...req.items[index], ...updatedItem, id: itemId };
    saveItems(req.items);
    res
      .status(200)
      .json({ status: "success", msg: "added item", data: req.items[index] });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

exports.deleteItem = (req, res) => {
  const itemId = req.params.id
  const index = req.items.findIndex((item) => item.id === itemId)
  if (index !== -1) {
    req.items.splice(index, 1)
    saveItems(req.items)
    res.status(200).json({ status: 'success', msg: 'item deleted', data: loadItems() })
  } else {
    res.status(404).json({ message: "Item not found" })
  }
}
