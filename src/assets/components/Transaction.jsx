import React, { useState, useEffect} from 'react'

function Transaction() {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	// GOOGLE SHEET - https://docs.google.com/spreadsheets/d/1Qpz5spJvBiIIojnorELqNtOpxNZOwuys9teoRAc4WBY/edit?gid=1958104623#gid=1958104623
	const fetchData = async () => {
		try{
			const response = await fetch('https://docs.google.com/spreadsheets/d/1Qpz5spJvBiIIojnorELqNtOpxNZOwuys9teoRAc4WBY/gviz/tq?tqx=out:json');
			const text = await response.text();
			const json = JSON.parse(text.substring(47).slice(0, -2)); 
			const rows = json.table.rows.map(row => row.c.map(cell => (cell? cell.v : "")));
			setData(rows); 			// 'data' state update
			console.log(rows)
			setLoading(!loading); 	// 'loading' state update
		}
		catch(error){
			console.log("error occured", error);
		}
 	}

 	useEffect(()=>{
 		fetchData();
 	}, [])

 	// date function
 	function extractDate(dateString) {
 	if (dateString)	{
	 		const numbers = dateString.match(/\d+/g).map(Number);
	 		const date = new Date(numbers[0], numbers[1], numbers[2], numbers[3], numbers[4], numbers[5]);
	 		const formattedDate = date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
	 		return formattedDate;
	 	} else {
	 		return "";
	 	}
  	}

 	if (loading) {
 		return (
 			<div>Data fetching...Please Wait!</div>
 		)
 	}

	return (
		<div className="overflow-scroll">
			<div className="flex justify-center mt-8">সবুজের একাউন্ট ডিটেইলস</div>
			<div className="flex justify-center italic text-sm">see with horizontal view for better look</div>
			<table className="table w-[95vw] text-xs mx-auto my-5 mx-1 border-1">
			<tbody>
				<tr className="table-head text-center">
					<th className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7">Date</th>
					<th className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (+)</th>
					<th className="cash-withdrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (-)</th>
					<th className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7">Remarks</th>
				</tr>

				{/*<tr className="table-head text-right">
					<td className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7">Date</td>
					<td className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (+)</td>
					<td className="cash-witddrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (-)</td>
					<td className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7 text-left">Remarks</td>
				</tr>*/}

				{data.map((eachItem, index) => {
					return <tr className="table-head text-right" key={index}>
					<td className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7">{extractDate(eachItem[0])}</td>
					<td className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7">{eachItem[2]==""? 0:eachItem[2]}</td>
					<td className="cash-witddrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7">{eachItem[3]==""? 0:eachItem[3]}</td>
					<td className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7 text-left">{eachItem[4]}<br/>{eachItem[5]}</td>
					</tr>
				})}				

				<tr className="table-end text-right">
					<td className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7"></td>
					<td className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7">Total = {data[0][6]}</td>
					<td className="cash-withdrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7">Total = {data[0][7]}</td>
					<td className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7"></td>
				</tr>
			</tbody>
			</table>
		</div>
	)
}

export default Transaction