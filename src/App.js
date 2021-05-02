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
  let [rowAmount, setRowAmount] = useState(5);

  useEffect(() => {
    // 환자 정보 요청 및 응답 데이터 확인
    axios.get(`${URL}/patient/list`).then((response) => {
      if (response.data) {
        // console.log(response.data);
        // setPatientList(response.data.patient.list);

        // boolean 값이 출력되지 않는 문제 -> 문자열로 변경
        let getData = response.data.patient.list;
        for (let i = 0; i < getData.length; i++) {
          // 생년월일 카테고리의 태어난 시간이 모두 00:00:00 -> 데이터 가독성을 위해 제거
          getData[i].birthDatetime = getData[i].birthDatetime.substr(0, 10);
          if (getData[i].isDeath === false) {
            getData[i].isDeath = "False";
          } else {
            getData[i].isDeath = "True";
          }
        }
        // console.log(getData);
        setPatientList(getData);
      } else {
        alert("데이터를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  // row 갯수 선택
  function onRowHanlder(e) {
    setRowAmount(e.currentTarget.value);
    console.log(e.currentTarget.value);
  }

  return (
    <div className="App">
      <div className="rowAmount">
        <label>row 갯수</label>
        <input type="text" onChange={onRowHanlder} />
      </div>
      <Table
        dataSource={patientList}
        columns={columns}
        pagination={{ pageSize: `${rowAmount}` }}
        scroll={{ y: 240 }}
      />
    </div>
  );
}

export default App;
