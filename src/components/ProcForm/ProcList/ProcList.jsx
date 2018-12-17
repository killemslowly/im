import React from "react";
import obn from "../../../icon24/Union-3.svg";
import sotr from "../../../icon24/сотрудники.svg";
import srav from "../../../icon24/ср. активное время.svg";
import srvv from "../../../icon24/ср. время выполнения.svg";
import scen from "../../../icon24/сценарии.svg";

class ProcList extends React.PureComponent {
  render() {
    var processes = this.props.items;
    return (
      <div>
        {processes.map((item, index) => (
          <table className="procList">
            <tr>
              <td colspan="5" className="bottomline">
                <p className="procListzag">
                  {item.procName}
                  <div className="rightDiv">На карту процесса ></div>
                </p>
              </td>
            </tr>
            <tr>
              <td rowspan="5">
                <p className="procListfield">
                  <img src={obn} alt="obn" />
                  {item.vipolnRaz}
                </p>{" "}
                <label>выполнено раз</label>
              </td>
              <td rowspan="2">
                <p className="procListfield">
                  <img src={srvv} alt="srvv" />
                  {item.srvrVipoln}
                </p>
                <label>среднее время выполнения</label>
              </td>
              <td rowspan="2">
                <p className="procListfield">
                  <img src={sotr} alt="sotr" />
                  {item.ychProc}
                </p>
                <label>участвует в процессе</label>
              </td>
              <td />
              <td />
            </tr>
            <tr>
              <td>
                <label>Начало</label>
              </td>
              <td>{item.start}</td>
            </tr>
            <tr>
              <td />
              <td />
              <td>
                <label>Окончание</label>
              </td>
              <td>{item.end}</td>
            </tr>
            <tr>
              <td rowspan="2">
                <p className="procListfield">
                  <img src={srav} alt="srav" />
                  {item.sractVrem}
                </p>{" "}
                <label>среднее активное время </label>
              </td>
              <td rowspan="2">
                <p className="procListfield">
                  <img src={scen} alt="scen" />
                  {item.vProc}
                </p>{" "}
                <label>в процессе</label>
              </td>
              <td>
                <label>Загрузка</label>
              </td>
              <td>{item.load}</td>
            </tr>
            <tr>
              <td />
              <td />
            </tr>
          </table>
        ))}
      </div>
    );
  }
}
export default ProcList;
