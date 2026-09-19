const { getTitles } = require("./database");
const { findBestMatch } = require("./similarity");
const {
  checkDisallowedWords,
  checkPeriodicity,
  checkPrefixSuffix
} = require("./rules");

function verifyTitle(title) {
  const titles = getTitles();
  const bestMatch = findBestMatch(title, titles);
  const disallowed = checkDisallowedWords(title);
  const periodicity = checkPeriodicity(title);
  const prefixSuffix = checkPrefixSuffix(title);

  let reasons = [];

  if (bestMatch.score >= 80) {
    reasons.push("Title is highly similar to an existing title");
  }

  if (disallowed.length > 0) {
    reasons.push("Contains disallowed word: " + disallowed.join(", "));
  }

  if (periodicity.length > 0) {
    reasons.push("Contains periodicity word: " + periodicity.join(", "));
  }

  if (prefixSuffix.prefix) {
    reasons.push("Uses a common prefix: " + prefixSuffix.prefix);
  }

  if (prefixSuffix.suffix) {
    reasons.push("Uses a common suffix: " + prefixSuffix.suffix);
  }

  let status = "APPROVED";

  if (bestMatch.score >= 80 || disallowed.length > 0) {
    status = "REJECTED";
  }

  const probability = 100 - bestMatch.score;

  return {
    title: title,
    similarTitle: bestMatch.title,
    similarity: bestMatch.score,
    probability: probability,
    status: status,
    reasons: reasons
  };
}

module.exports = { verifyTitle };
