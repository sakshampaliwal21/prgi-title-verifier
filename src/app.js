const readline=require('readline');
const {searchTitles}=require('./database');

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
rl.question('Enter choice: ',handleChoice);
}

function handleChoice(choice){
if(choice==='3'){
rl.question('Enter title to search: ',query=>{
const results=searchTitles(query);
console.log('\nMATCHING TITLES');
console.log('------------------------------------');
if(results.length===0) console.log('No matching titles found.');
else results.forEach((title,i)=>console.log(`${i+1}. ${title}`));
console.log('------------------------------------\n');
showMenu();
});
}else if(choice==='7'){
console.log('\nThank you for using PRGI Title Verification System.');
rl.close();
}else{
console.log('\nThis feature will be added soon.\n');
showMenu();
}
}

showMenu();
