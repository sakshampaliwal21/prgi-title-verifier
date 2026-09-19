const titles = require("../data/titles.json");
const fs = require("fs");

const applicationsFile = "./data/applications.json";

function getTitles() {
  return titles;
}

function searchTitles(query) {
  return titles.filter(title =>
    title.toLowerCase().includes(query.toLowerCase())
  );
}

function saveApplication(application) {
  const applications = JSON.parse(fs.readFileSync(applicationsFile, "utf8"));
  applications.push(application);
  fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));
}

function getApplications() {
  return JSON.parse(fs.readFileSync(applicationsFile, "utf8"));
}

module.exports = {
  getTitles,
  searchTitles,
  saveApplication,
  getApplications
};
