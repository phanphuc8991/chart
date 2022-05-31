import {useEffect, useState} from "react";
import moment from "moment";
import hrApi from '../../api/hrApi'
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
 
function Hr() {
 
  const [listHr, setListHr] = useState([]);

  useEffect(()=>{
   let newListHr = [];
  
   try {
    const getHrApi =  async () =>{

      const dataHrApi = await hrApi.getAll();

      if(!dataHrApi)return;

      for(let i= 0; i<= 23; i++) {

        const newItem = dataHrApi.data?.filter(dataHr =>moment(dataHr.t).hour() === i);
        const sumSameTime = newItem.reduce((accumulator, currentValue)=> accumulator + Number.parseInt(currentValue.value) ,0);
        newListHr.push({
          time: i,
          value: sumSameTime/newItem.length,
        })

      }

      setListHr(newListHr);

    }

    getHrApi();

   } catch (error) {

     console.log("Lỗi khi lấy api hr:", error);

   }

  },[])

  return (
    <>
      <h2>Hr</h2>
       <LineChart
      width={800}
      height={300}
      data={listHr}
   
    >
      <XAxis dataKey="time" padding={{ left: 40, right: 40 }} />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
    </LineChart >
    </>
  );
}

export default Hr;
