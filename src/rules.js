const disallowedWords = [
  "police",
  "crime",
  "corruption",
  "cbi",
  "cid",
  "army"
];

function checkDisallowedWords(title) {
  const words = title.toLowerCase().split(" ");
  const found = [];

  for (const word of words) {
    if (disallowedWords.includes(word)) {
      found.push(word);
    }
  }

  return found;
}

module.exports = {
  checkDisallowedWords
};
