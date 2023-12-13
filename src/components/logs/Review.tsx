import { UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { CardLog } from "../../types/log";
import { useFetchInfomationCardLogs } from "../../api/logs/Logs";
import Loading from "../../pages/loading/Loading";
import { Box } from "@mui/material";
import { Circle } from "@mui/icons-material";
// getColor関数を定義
function getColor(trial: number) {
  // trialを0から1に標準化し、30で割る（30を超えている場合でも30で割る）
  const normalizedValue = Math.min(trial / 30, 1);
  // 色を計算
  const red = 255;
  const green = Math.round(255 * (1 - normalizedValue));
  const blue = Math.round(255 * (1 - normalizedValue));
  return `rgb(${red}, ${green}, ${blue})`;
}
export const Review = () => {
  const [data, setData] = useState([]);
  const postQuery: UseQueryResult<CardLog[], unknown> =
    useFetchInfomationCardLogs();
  // console.log(postQuery);

  // 指定された日時をDateオブジェクトとして取得する
  const specifiedTime = new Date("2023-09-28T22:10:21.560Z").getTime();
  const time = 60;
  const afterTime = specifiedTime + time * 1000;

  const [currentTime, setCurrentTime] = useState(specifiedTime); // 指定された時間を状態として保持する
  // const [time, setTime] = useState(0);

  // // 現在の時間を更新する関数
  const updateCurrentTime = () => {
    setCurrentTime((prevTime) => prevTime + 1000); // 1秒ごとに時間を更新する
    // if (time < 60) {
    //   setTime((prevtime) => prevtime + 1);
    // }
  };

  useEffect(() => {
    // 1秒ごとに時間を更新するための setInterval を設定する
    const interval = setInterval(() => {
      updateCurrentTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // console.log(currentTime);

  // beforeTimeを1分前のエポック時間（ミリ秒単位）に設定する
  const beforeTime = currentTime - 60 * 1000;

  const filteredData =
    postQuery.data?.map((user) => {
      const filteredLogs = user.info[
        user.info.length - 1
      ].card_detail_logs.filter((log) => {
        const logTime = new Date(log.answer_at).getTime(); // エポック時間（ミリ秒単位の時間）として取得
        return logTime <= currentTime && logTime > beforeTime; // 1分前のデータから現在のデータまでのフィルタリング
      });

      const beforeTimeLogs = user.info[
        user.info.length - 1
      ].card_detail_logs.filter((log) => {
        const logTime = new Date(log.answer_at).getTime(); // エポック時間（ミリ秒単位の時間）として取得
        return logTime <= beforeTime; // 1分前のデータをフィルタリング
      });

      // beforeTimeLogsとfilteredLogsのlog.trialの差分を求める
      const diffLogs = filteredLogs.map((log) => {
        const trialBefore =
          beforeTimeLogs.find(
            (beforeLog) =>
              beforeLog.card_detail_log_id === log.card_detail_log_id
          )?.trial ?? 0;
        return {
          ...log,
          trialDiff: log.trial - trialBefore, // log.trialの差分を計算
        };
      });

      return {
        ...user,
        info: [
          {
            ...user.info[user.info.length - 1],
            card_detail_logs: diffLogs, // 差分データを代入
          },
        ],
      };
    }) || [];

  console.log(filteredData);

  return (
    <div className="logs">
      <p>Current Time: {currentTime}</p>
      <h1>Realtime Log Data</h1>
      <div className="realtime">
        {filteredData?.map((user, index) => (
          <div className="box">
            <Box
              key={user.user_id}
              style={{
                display: "flex",
                flexDirection: "column", // 子要素を縦方向に配置
                alignItems: "center", // 子要素を中央に配置
                justifyContent: "center", // 子要素を中央に配置
              }}
            >
              <div className="circle-outer">
                <div className="circle">
                  {user.info[user.info.length - 1].card_detail_logs[
                    user.info[user.info.length - 1].card_detail_logs.length - 1
                  ] ? (
                    <Circle
                      style={{
                        width: `${Math.min(
                          100,
                          10 *
                            user.info[user.info.length - 1].card_detail_logs[
                              user.info[user.info.length - 1].card_detail_logs
                                .length - 1
                            ].trial
                        )}px`,
                        height: `${Math.min(
                          100,
                          10 *
                            user.info[user.info.length - 1].card_detail_logs[
                              user.info[user.info.length - 1].card_detail_logs
                                .length - 1
                            ].trial
                        )}px`,
                        color: `rgb(255,0,0)`,
                      }}
                    />
                  ) : (
                    <Circle
                      style={{
                        width: "0px",
                        height: "0px",
                        color: `rgb(255,0,0)`,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="user" style={{ color: "white" }}>
                <p>{`user${index + 1}`}</p>
              </div>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default RealTime;
