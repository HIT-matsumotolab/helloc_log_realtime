import { UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { CardLog } from "../../types/log";
import { useFetchInfomationCardLogs } from "../../api/logs/Logs";
import Loading from "../../pages/loading/Loading";
import { Box } from "@mui/material";
import { Circle } from "@mui/icons-material";

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
              <div className="circle">
                {user.info[user.info.length - 1].card_detail_logs[
                  user.info[user.info.length - 1].card_detail_logs.length - 1
                ] ? (
                  100 *
                    user.info[user.info.length - 1].card_detail_logs[
                      user.info[user.info.length - 1].card_detail_logs.length -
                        1
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
                        color: `rgb(255, ${Math.round(
                          255 *
                            (1 -
                              user.info[user.info.length - 1].card_detail_logs[
                                user.info[user.info.length - 1].card_detail_logs
                                  .length - 1
                              ].levenshtein_distance)
                        )}, ${Math.round(
                          255 *
                            (1 -
                              user.info[user.info.length - 1].card_detail_logs[
                                user.info[user.info.length - 1].card_detail_logs
                                  .length - 1
                              ].levenshtein_distance)
                        )}`,
                      }}
                    />
                  ) : null
                ) : (
                  <Circle
                    style={{
                      width: "100px",
                      height: "100px",
                      color: "red",
                    }}
                  />
                )}
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
