function Price({ currency, num, numSize }) {
  const formattedNum = num.toFixed(2);
  return (
    <>
      {currency}
      <span className={numSize}>{formattedNum}</span>
    </>
  );
}

export default Price;
