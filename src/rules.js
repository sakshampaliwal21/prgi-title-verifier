const disallowedWords = [
  "police",
  "crime",
  "corruption",
  "cbi",
  "cid",
  "army"
];

const periodicityWords = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "annual"
];

const commonPrefixes = [
  "the",
  "new",
  "national",
  "daily"
];

const commonSuffixes = [
  "news",
  "times",
  "today",
  "daily"
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

function checkPeriodicity(title) {
  const words = title.toLowerCase().split(" ");
  const found = [];

  for (const word of words) {
    if (periodicityWords.includes(word)) {
      found.push(word);
    }
  }

  return found;
}

function checkPrefixSuffix(title) {
  const words = title.toLowerCase().split(" ");
  const result = {
    prefix: "",
    suffix: ""
  };

  if (commonPrefixes.includes(words[0])) {
    result.prefix = words[0];
  }

  if (commonSuffixes.includes(words[words.length - 1])) {
    result.suffix = words[words.length - 1];
  }

  return result;
}

module.exports = {
  checkDisallowedWords,
  checkPeriodicity,
  checkPrefixSuffix
};
