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
export const RealTime = () => {
  const [data, setData] = useState([]);
  const postQuery: UseQueryResult<CardLog[], unknown> =
    useFetchInfomationCardLogs();
  useEffect(() => {
    // 定期的にデータをポーリングするためのタイマーをセット
    const pollingInterval = setInterval(() => {
      // データを再取得
      postQuery.refetch();
      if (postQuery.isLoading) return <Loading />;
      console.log(postQuery);
    }, 5000); // 5秒ごとにポーリング

    // コンポーネントがアンマウントされたらクリア
    return () => clearInterval(pollingInterval);
  }, [postQuery]);

  return (
    <div className="logs">
      {/* <h1>Realtime Log Data</h1> */}
      <div className="realtime">
        {postQuery.data?.map((user, index) => (
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
                    100 *
                      user.info[user.info.length - 1].card_detail_logs[
                        user.info[user.info.length - 1].card_detail_logs
                          .length - 1
                      ].levenshtein_distance !==
                    0 ? (
                      <Circle
                        style={{
                          width: `${
                            100 *
                            user.info[user.info.length - 1].card_detail_logs[
                              user.info[user.info.length - 1].card_detail_logs
                                .length - 1
                            ].levenshtein_distance
                          }px`,
                          height: `${
                            100 *
                            user.info[user.info.length - 1].card_detail_logs[
                              user.info[user.info.length - 1].card_detail_logs
                                .length - 1
                            ].levenshtein_distance
                          }px`,
                          color: getColor(
                            user.info[user.info.length - 1].card_detail_logs[
                              user.info[user.info.length - 1].card_detail_logs
                                .length - 1
                            ].trial
                          ),
                        }}
                      />
                    ) : null
                  ) : (
                    <Circle
                      style={{
                        width: "100px",
                        height: "100px",
                        color: `rgb(255,230,230)`,
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
