const readline=require("readline");
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

rl.question("Enter choice: ",handleChoice);
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

function handleChoice(choice){
if(choice==="1"){
verifyNewTitle();
}else if(choice==="2"){
showApplications();
}else if(choice==="3"){
searchExistingTitle();
}else if(choice==="5"){
showStatistics();
}else if(choice==="7"){
console.log("\nThank you for using PRGI Title Verification System.");
rl.close();
}else{
console.log("\nThis feature will be added soon.\n");
showMenu();
}
}

showMenu();
