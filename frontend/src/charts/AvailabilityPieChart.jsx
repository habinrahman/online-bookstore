import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AvailabilityPieChart({ books }) {
  const inStock = books.filter((b) => b.availability === "In Stock").length;
  const outStock = books.filter((b) => b.availability === "Out of Stock").length;

  const data = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [inStock, outStock],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 1
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow h-[600px]">
      <h2 className="text-xl font-bold mb-4">📈 Availability Status</h2>

      <div className="h-[500px] w-full flex justify-center items-center">
        <Pie
          data={data}
          height={480}   // Medium-large height
          width={480}    // Medium-large width
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
