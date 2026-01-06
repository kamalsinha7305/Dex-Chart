export async function fetchCandles() {
  const res = await fetch("http://localhost:5000/api/ohlc");

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  return res.json();
}
