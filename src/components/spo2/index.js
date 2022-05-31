import {useEffect, useState} from "react";
import moment from "moment";
import spo2Api from '../../api/spo2Api'
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
 
function Spo2() {
 
  const [listSpo2, setListSpo2] = useState([]);

  useEffect(()=>{
   let newListSpo2 = [];
  
   try {
    const getSpo2Api =  async () =>{

      const dataSpo2Api = await spo2Api.getAll();

      if(!dataSpo2Api)return;

      for(let i=0; i<= 23; i++) {
        const newItem = dataSpo2Api.data?.filter(dataSpo2 =>moment(dataSpo2.t).hour() === i);
        const sumSameTime = newItem.reduce((accumulator, currentValue)=> accumulator + Number.parseInt(currentValue.value) ,0);
        newListSpo2.push({
          time: i,
          value: sumSameTime/newItem.length,
        })

      }

      setListSpo2(newListSpo2);

    }

    getSpo2Api();

   } catch (error) {

     console.log("Lỗi khi lấy api hr:", error);

   }

  },[])

  return (
    <>
      <h2>Spo2</h2>
       <LineChart
       width={800}
       height={300}
      data={listSpo2}
    >
     <XAxis dataKey="time" padding={{ left: 40, right: 40 }} />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
    </LineChart>
    </>
  );
}

export default Spo2;
