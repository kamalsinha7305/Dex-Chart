import { createChart, CandlestickSeries } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { fetchCandles } from "../api";



function DexChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: 400,
      layout: {
        background: { color: "#111827" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    fetchCandles()
      .then((res) => {
        console.log("API RESPONSE:", res);

        if (!res || !res.data || !res.data.Solana) {
          console.error("No Solana data available");
          return;
        }

        const trades = res.data.Solana.DEXTrades || [];

        if (trades.length === 0) {
          console.warn("No trades returned");
          return;
        }


        const candles = trades
          .map((t) => {
            if (!t?.Block?.Time || !t?.Trade?.Price) return null;

            const price = Number(t.Trade.Price);

            return {
              time: Math.floor(
                new Date(t.Block.Time).getTime() / 1000
              ),
              open: price,
              high: price,
              low: price,
              close: price,
            };
          })
          .filter(Boolean);
        if (candles.length === 0) {
          console.warn("No valid candles created");
          return;
        }

        candleSeries.setData(candles);
        chart.timeScale().fitContent();
      })
      .catch((err) => {
        console.error("Chart fetch error:", err);
      });

    return () => chart.remove();
  }, []);

  return (
    <div className="w-full h-[400px]">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
}

export default DexChart;
