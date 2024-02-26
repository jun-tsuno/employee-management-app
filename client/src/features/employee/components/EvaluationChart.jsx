'use client';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	scales: {
		r: {
			angleLines: {
				display: false,
			},
			suggestedMin: 0,
			suggestedMax: 5,
			ticks: {
				stepSize: 1,
			},
		},
	},
	plugins: {
		legend: {
			display: false,
		},
	},
};

export const EvaluationRadarChart = ({ evaluationData }) => {
	if (!evaluationData)
		return <p className='py-6 text-text-gray font-[500]'>No data</p>;

	const objKeys = Object.keys(evaluationData).filter(
		(key) => key !== 'id' && key !== 'date' && key !== 'comment'
	);
	const dataArr = objKeys.map((key) => evaluationData[key]);
	const labelArr = objKeys.map((key) => {
		return key.replace('_', ' ');
	});

	const data = {
		labels: labelArr,
		datasets: [
			{
				data: dataArr,
				backgroundColor: 'rgb(155, 207, 83, 0.3)',
				borderColor: 'rgb(165, 221, 155)',
				borderWidth: 1,
			},
		],
	};

	return (
		<div className='w-full max-w-[400px] mx-auto'>
			<Radar data={data} options={options} />
		</div>
	);
};
