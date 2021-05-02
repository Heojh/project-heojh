import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { URL } from "./config/config";

function App() {
  useEffect(() => {
    // 환자 정보 요청 및 응답 데이터 확인
    axios.get(`${URL}/patient/list`).then((response) => {
      if (response.data) {
        console.log(response.data);
      } else {
        alert("데이터를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return <div className="App">Hello World</div>;
}

export default App;
