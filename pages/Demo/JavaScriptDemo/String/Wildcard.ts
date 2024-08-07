export default (source: string, pattern: string) => {
  let starCount = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === "*") {
      starCount++;
    }
  }
  if (starCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== "?") {
        return false;
      }
    }
    return;
  }
  let i = 0,
    lastIndex = 0;
  for (i = 0; pattern[i] !== "*"; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== "?") {
      return false;
    }
  }
  lastIndex = i;
  for (let p = 0; p < starCount - 1; p++) {
    i++;
    let subPattern = "";
    while (pattern[i] !== "*") {
      subPattern += pattern[i];
    }

    let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
    console.log(reg.exec(source));
    if (!reg.exec(source)) {
      return false;
    }
    lastIndex = reg.lastIndex;
  }
  for (
    let j = 0;
    j <= source.length - lastIndex && pattern[pattern.length - 1] !== "*";
    j++
  ) {
    if (pattern[pattern.length - j] !== "?") {
      return false;
    }
  }
  return true;
};
