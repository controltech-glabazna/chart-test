import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';
import { getData } from './data.js'; // Import funkce pro generování dat

let dynamicChart;

function initializeChart() {
  const ctx = document.getElementById('dynamicChart').getContext('2d');

  dynamicChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Hodnoty na časové ose',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      animations: {
        tension: {
          duration: 300, // Krátká animace
          easing: 'linear',
        },
        x: {
          duration: 300, // Krátká animace
          easing: 'linear',
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'second',
          },
          title: {
            display: true,
            text: 'Čas (sekundy)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Hodnoty',
          },
          beginAtZero: true,
        },
      },
    },
  });
}

async function addData() {
  const now = moment().toISOString();
  const newValue = await getData(); // Asynchronní generování dat

  // Přidání nového bodu do datové sady
  dynamicChart.data.datasets[0].data.push({ x: now, y: newValue });

  // Udržování maximálně 10 bodů v grafu
  if (dynamicChart.data.datasets[0].data.length > 10) {
    dynamicChart.data.datasets[0].data.shift(); // Odstraní nejstarší bod
  }

  // Nastavení rozsahu osy X
  const dataPoints = dynamicChart.data.datasets[0].data;
  if (dataPoints.length > 0) {
    dynamicChart.options.scales.x.min = dataPoints[0].x; // První bod
    dynamicChart.options.scales.x.max = dataPoints[dataPoints.length - 1].x; // Poslední bod
  }

  // Aktualizace grafu
  dynamicChart.update();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeChart();
  setInterval(() => addData(), 1000); // Volání aktualizace každou sekundu
});
