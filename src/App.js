import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "./config/config";
import { Table } from "antd";

const columns = [
  {
    title: "personID",
    dataIndex: "personID",
    key: "personID",
  },
  {
    title: "gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "birthDatetime",
    dataIndex: "birthDatetime",
    key: "birthDatetime",
  },
  {
    title: "age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "race",
    dataIndex: "race",
    key: "race",
  },
  {
    title: "ethnicity",
    dataIndex: "ethnicity",
    key: "ethnicity",
  },
  {
    title: "isDeath",
    dataIndex: "isDeath",
    key: "isDeath",
  },
];

function App() {
  let [patientList, setPatientList] = useState([]);

  useEffect(() => {
    // 환자 정보 요청 및 응답 데이터 확인
    axios.get(`${URL}/patient/list`).then((response) => {
      if (response.data) {
        // console.log(response.data);
        setPatientList(response.data.patient.list);
      } else {
        alert("데이터를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div className="App">
      <Table dataSource={patientList} columns={columns} scroll={{ y: 240 }} />
    </div>
  );
}

export default App;
