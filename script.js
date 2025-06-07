// Simulating DBMS Tables with JavaScript Arrays
class Table {
  constructor(name) {
    this.name = name;
    this.records = [];  // Simulated DB table
    this.autoIncrementId = 1;
  }

  // Simulated SQL INSERT
  insert(data) {
    data.id = this.autoIncrementId++;
    this.records.push(data);
  }

  // Simulated SQL SELECT *
  getAll() {
    return this.records;
  }

  // Simulated DELETE by ID
  deleteById(id) {
    this.records = this.records.filter(record => record.id !== id);
  }
}

// Representing DB Tables using OOP
class Database {
  constructor() {
    this.tables = {
      Student: new Table("Student"),
      Course: new Table("Course"),
      Instructor: new Table("Instructor")
    };
  }

  insert(type, data) {
    this.tables[type].insert(data);
  }

  getRecords(type) {
    return this.tables[type].getAll();
  }
}

class App {
  constructor() {
    this.db = new Database();
    this.list = document.getElementById("dataList");
  }

  addEntry() {
    const type = document.getElementById("dataType").value;
    const name = document.getElementById("nameInput").value.trim();
    const details = document.getElementById("detailsInput").value.trim();

    if (!name || !details) {
      alert("Both fields are required.");
      return;
    }

    // Simulating SQL INSERT
    this.db.insert(type, { name, details });

    // Clear inputs
    document.getElementById("nameInput").value = "";
    document.getElementById("detailsInput").value = "";

    this.render();
  }

  render() {
    this.list.innerHTML = "";

    for (const type in this.db.tables) {
      const entries = this.db.getRecords(type);
      entries.forEach(record => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${type}: ${record.name}</h3>
          <p>${record.details}</p>
          <small>ID: ${record.id}</small>
        `;
        this.list.appendChild(card);
      });
    }
  }
}

const app = new App();
