import React, { useState, useEffect} from 'react'

function Registration() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	// GOOGLE SHEET - https://docs.google.com/spreadsheets/d/1-rZTeP3qAwAT1Znvz6qpNRhAiVIpfaDONzDMnWlTH2s/edit?gid=2100981573#gid=2100981573
	const fetchData = async () => {
		try{
			const response = await fetch('https://docs.google.com/spreadsheets/d/1-rZTeP3qAwAT1Znvz6qpNRhAiVIpfaDONzDMnWlTH2s/gviz/tq?tqx=out:json');
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
		<div>

			<div className="flex justify-center mt-8">Registration List</div>
			<div className="flex justify-center italic text-sm">see with horizontal view for better look</div>

			<table className="table w-[95vw] text-xs mx-auto my-5 mx-1 border-1 text-right">
				<tbody>
					<tr className="table-head text-center">
						<th className="border-1 border-collapse p-1">SL No.</th>
						<th className="border-1 border-collapse p-1">Date</th>
						<th className="border-1 border-collapse p-1">কে টাকা দিয়েছে</th>
						<th className="border-1 border-collapse p-1">Phone No.</th>
						<th className="border-1 border-collapse p-1">কত টাকা দিয়েছে</th>
						<th className="border-1 border-collapse p-1">কাকে টাকা দিয়েছে</th>
					</tr>

					{/*<tr className="table-head">
						<td className="border-1 border-collapse p-1">Date</td>
						<td className="border-1 border-collapse p-1">কে টাকা দিয়েছে</td>
						<td className="border-1 border-collapse p-1">Phone No.</td>
						<td className="border-1 border-collapse p-1">কত টাকা দিয়েছে</td>
						<td className="border-1 border-collapse p-1">কাকে টাকা দিয়েছে</td>
					</tr>*/}

					{data.map((eachItem, index)=>{
						return <tr>
							<td className="border-1 border-collapse p-1">{index+1}</td>
							<td className="border-1 border-collapse p-1">{extractDate(eachItem[0])}</td>
							<td className="border-1 border-collapse p-1">{eachItem[2]}</td>
							<td className="border-1 border-collapse p-1">{eachItem[3]}</td>
							<td className="border-1 border-collapse p-1">{eachItem[4]}</td>
							<td className="border-1 border-collapse p-1">{eachItem[5]}</td>
						</tr>
					})}

					<tr>
						<td  className="border-1 border-collapse p-1"></td>
						<td  className="border-1 border-collapse p-1"></td>
						<td  className="border-1 border-collapse p-1">Total</td>
						<td  className="border-1 border-collapse p-1"></td>
						<td  className="border-1 border-collapse p-1">Total</td>
						<td  className="border-1 border-collapse p-1"></td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Registration