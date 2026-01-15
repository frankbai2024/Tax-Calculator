const formatBracket = (bracket) => {
  const start = bracket.start.toLocaleString("en-AU");
  const end = bracket.end === Infinity ? "and over" : bracket.end.toLocaleString("en-AU");


  const base = bracket.base.toLocaleString("en-AU");

  const rate = bracket.rate * 100;
  //console.log(bracket.rate, "->formatted rate:", rate);
  return { start, end, base, rate };
}
export default formatBracket;