const readline=require("readline");
const fs=require("fs");
const {searchTitles,saveApplication,getApplications}=require("./database");
const {verifyTitle}=require("./verifier");

const rl=readline.createInterface({
input:process.stdin,
output:process.stdout
});

function showMenu(){
console.log(`
====================================
       PRGI TITLE VERIFICATION
====================================

1. Verify New Title
2. View Recent Applications
3. Search Existing Titles
4. View Verification Rules
5. View Statistics
6. Export Verification Report
7. Exit
`);
rl.question("Enter choice: ",choice=>{
choice=choice.trim();
handleChoice(choice);
});
}

function verifyNewTitle(){
rl.question("\nEnter proposed title: ",title=>{
const result=verifyTitle(title);
saveApplication(result);

console.log("\n====================================");
console.log("       VERIFICATION RESULT");
console.log("====================================");
console.log("Title:",result.title);
console.log("Similar Title:",result.similarTitle);
console.log("Similarity:",result.similarity+"%");
console.log("Verification Probability:",result.probability+"%");
console.log("Status:",result.status);

if(result.reasons.length>0){
console.log("\nReasons:");
for(const reason of result.reasons){
console.log("- "+reason);
}
}else{
console.log("\nNo rule violations found.");
}

console.log("====================================\n");
showMenu();
});
}

function showApplications(){
const applications=getApplications();

console.log("\nRECENT APPLICATIONS");
console.log("------------------------------------");

if(applications.length===0){
console.log("No applications found.");
}else{
for(let i=0;i<applications.length;i++){
console.log((i+1)+". "+applications[i].title+" - "+applications[i].status);
}
}

console.log("------------------------------------\n");
showMenu();
}

function searchExistingTitle(){
rl.question("Enter title to search: ",query=>{
const results=searchTitles(query);

console.log("\nMATCHING TITLES");
console.log("------------------------------------");

if(results.length===0){
console.log("No matching titles found.");
}else{
for(let i=0;i<results.length;i++){
console.log((i+1)+". "+results[i]);
}
}

console.log("------------------------------------\n");
showMenu();
});
}

function showRules(){
console.log("\nVERIFICATION RULES");
console.log("------------------------------------");
console.log("1. Check similarity with existing titles.");
console.log("2. Check for disallowed words.");
console.log("3. Check periodicity words.");
console.log("4. Check common prefixes and suffixes.");
console.log("5. Highly similar titles may be rejected.");
console.log("6. Verification probability is based on similarity.");
console.log("------------------------------------\n");
showMenu();
}

function showStatistics(){
const applications=getApplications();
let approved=0;
let rejected=0;
let totalSimilarity=0;

for(const application of applications){
if(application.status==="APPROVED"){
approved++;
}else if(application.status==="REJECTED"){
rejected++;
}
totalSimilarity+=application.similarity;
}

let average=0;

if(applications.length>0){
average=Math.round(totalSimilarity/applications.length);
}

console.log("\nVERIFICATION STATISTICS");
console.log("------------------------------------");
console.log("Total Applications:",applications.length);
console.log("Approved:",approved);
console.log("Rejected:",rejected);
console.log("Average Similarity:",average+"%");
console.log("------------------------------------\n");
showMenu();
}

function exportReport(){
const applications=getApplications();

if(applications.length===0){
console.log("\nNo applications available to export.\n");
showMenu();
return;
}

let report="PRGI TITLE VERIFICATION REPORT\n";
report+="====================================\n\n";

for(let i=0;i<applications.length;i++){
const application=applications[i];

report+="Application "+(i+1)+"\n";
report+="Title: "+application.title+"\n";
report+="Similar Title: "+application.similarTitle+"\n";
report+="Similarity: "+application.similarity+"%\n";
report+="Verification Probability: "+application.probability+"%\n";
report+="Status: "+application.status+"\n";
report+="Reasons: "+(application.reasons.length>0?application.reasons.join(", "):"None")+"\n";
report+="------------------------------------\n";
}

if(!fs.existsSync("reports")){
fs.mkdirSync("reports");
}

fs.writeFileSync("reports/verification-report.txt",report);

console.log("\nReport exported successfully.");
console.log("File: reports/verification-report.txt\n");
showMenu();
}

function handleChoice(choice){
if(choice==="1"){
verifyNewTitle();
}else if(choice==="2"){
showApplications();
}else if(choice==="3"){
searchExistingTitle();
}else if(choice==="4"){
showRules();
}else if(choice==="5"){
showStatistics();
}else if(choice==="6"){
exportReport();
}else if(choice==="7"){
console.log("\nThank you for using PRGI Title Verification System.");
rl.close();
}else{
console.log("\nThis feature will be added soon.\n");
showMenu();
}
}

showMenu();