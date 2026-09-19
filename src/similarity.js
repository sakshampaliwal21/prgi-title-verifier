function normalize(title){
return title.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
}

function similarity(a,b){
a=normalize(a);
b=normalize(b);
if(a===b)return 100;
let longer=a.length>b.length?a:b;
let shorter=a.length>b.length?b:a;
let matrix=[];
for(let i=0;i<=shorter.length;i++){
matrix[i]=[i];
}
for(let j=0;j<=longer.length;j++){
matrix[0][j]=j;
}
for(let i=1;i<=shorter.length;i++){
for(let j=1;j<=longer.length;j++){
matrix[i][j]=shorter[i-1]===longer[j-1]
?matrix[i-1][j-1]
:Math.min(matrix[i-1][j]+1,matrix[i][j-1]+1,matrix[i-1][j-1]+1);
}
}
return Math.round((1-matrix[shorter.length][longer.length]/longer.length)*100);
}

function findBestMatch(title,titles){
let best={title:null,score:0};
for(const existing of titles){
const score=similarity(title,existing);
if(score>best.score)best={title:existing,score};
}
return best;
}

module.exports={normalize,similarity,findBestMatch};
