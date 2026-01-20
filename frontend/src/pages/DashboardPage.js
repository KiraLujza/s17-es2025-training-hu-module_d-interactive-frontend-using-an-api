import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../pages/css/dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

/* kördiagramhoz */
ChartJS.register(ArcElement, Tooltip, Legend);
/* vonaldiagramhoz  */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const { user, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) {
    return <div>Loading dashboard...</div>;
  }

  // Példa adatok a diagramokhoz
  /* kördiagramhoz  */
  const data2 = {
    labels: ["Completed chapters", "Enrolled Courses"],
    datasets: [
      {
        label: "# of Votes",
        data: [user.stats?.completedChapters || 0, user.stats?.enrolledCourses || 0],
        /* data: [12, 5] */
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  };

  /* vonaldiagramhoz */
  //A label az utolós 30 nap legyen
  const labels = [];
  for (let index = 0; index < 30; index++) {
    const d = new Date();
    d.setDate(d.getDate() - (29 - index));
    labels.push(d.toISOString().split("T")[0]);
  }

  /* Előállítjuk a recentActivity listából naponta a crediteket */
  const creditsByDate = {};

  // végigmegyünk az aktivitásokon 
  
   if (user.recentActivity !== undefined) {
    user.recentActivity.forEach((item) => {
      const date = item.timestamp.split("T")[0]; // YYYY-MM-DD
      if (!creditsByDate[date]) {
        creditsByDate[date] = 0;
      }
      creditsByDate[date] += item.creditsEarned;
    });
  }
  // Az utolsó 30 nap dátumát kikeressük az asszociatív tömbből és megnézzük a hozzá tartozó értékeket
  const dataValues = labels.map((date) => creditsByDate[date] || 0);

  const data = {
    labels, // X tengely – utolsó 30 nap
    datasets: [
      {
        label: "Credits",
        data: dataValues, // Y tengely
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  /* vonaldiagramhoz  */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Credit progress (Last 30 days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Credits",
        },
      },
      x: {
        title: {
          display: false,
          text: "Date",
        },
      },
    },
  };
  /* kördiagramhoz  */
  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Statisztikák",
      },
    },
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.user?.name}!</p>
      <p>You have {user.user?.creditBalance || 0} credits</p>
      <div style={{ width: '600px', margin: 'auto', height: 'clamp(250px, 40vh, 400px)' }}>
        <h2>Credits Usage</h2>
        <Line options={options} data={data} />
      </div>
      <div style={{ width: '400px', margin: 'auto', height: 'clamp(250px, 40vh, 400px)' }}>
        <h2>Course Progress</h2>
        <Doughnut options={options2} data={data2} />
      </div>
    </div>
  );
}