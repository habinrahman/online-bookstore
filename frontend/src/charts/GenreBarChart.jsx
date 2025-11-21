import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function GenreBarChart({ books }) {
  const genreCount = {};

  books.forEach((b) => {
    genreCount[b.genre] = (genreCount[b.genre] || 0) + 1;
  });

  const data = {
    labels: Object.keys(genreCount),
    datasets: [
      {
        label: "Books per Genre",
        data: Object.values(genreCount),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  return (
  <div className="bg-white p-6 rounded-xl shadow h-96">
    <h2 className="text-xl font-bold mb-4">📊 Genre Distribution</h2>
    <div className="h-70">
      <Bar data={data} options={{ maintainAspectRatio: false }} />
    </div>
  </div>
);
}

