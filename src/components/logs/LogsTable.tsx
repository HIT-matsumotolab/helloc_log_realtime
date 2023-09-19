import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import { useFetchInfomationCardLogs } from "../../api/logs/Logs";
import { UseQueryResult } from "@tanstack/react-query";
import { CardLog, SelectHistory } from "../../types/log";
import Loading from "../../pages/loading/Loading";

interface LogDetail {
  user_id: number;
  information_log_id: number;
  question_id: number;
  format: string;
  select_history: SelectHistory | null;
  trial: number;
  result_type: string | null;
  levenshtein_distance: number;
  answer: { code: string } | null;
  elapsed_time: number;
  answer_at: string;
}

export const LogsTable = () => {
  const postQuery: UseQueryResult<CardLog[], unknown> =
    useFetchInfomationCardLogs();
  console.log(postQuery);

  const columns = useMemo<MRT_ColumnDef<LogDetail>[]>(
    () => [
      {
        header: "user_id",
        accessorKey: "user_id", // user_id にアクセス
        enableGrouping: false,
      },
      {
        header: "Information Log ID",
        accessorKey: "information_log_id",
      },
      // {
      //   header: "Created At",
      //   accessorKey: "created_at",
      // },
      {
        header: "Trial",
        accessorKey: "trial",
      },
      {
        header: "LevenshteinDistance",
        accessorKey: "levenshtein_distance",
      },
      {
        header: "ElapsedTime",
        accessorKey: "elapsed_time",
      },
      {
        header: "IsMove",
        accessorFn: (originalRow) =>
          originalRow.select_history?.isMove ? "True" : "False",
      },
      {
        header: "Option",
        accessorKey: "select_history.option",
      },
      {
        header: "IsDammy",
        accessorFn: (originalRow) =>
          originalRow.select_history?.isDammy ? "Dammy" : "Correct",
      },
      {
        header: "CardNumber",
        accessorKey: "select_history.cardNumber",
      },
      {
        header: "Destination",
        accessorKey: "select_history.destination",
      },
      {
        header: "OptionNumber",
        accessorKey: "select_history.optionNumber",
      },
      {
        header: "Result Type",
        accessorKey: "result_type",
      },
      {
        header: "AnswerCode",
        accessorKey: "answer.code",
      },
      {
        header: "Answer At",
        accessorKey: "answer_at",
      },
    ],
    // ],
    []
  );

  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;

  const infoLog: LogDetail[] = [];
  postQuery.data.forEach((log) => {
    log.info.forEach((info) => {
      info.card_detail_logs.forEach((cardLog) => {
        infoLog.push({
          user_id: log.user_id,
          information_log_id: info.information_log_id,
          question_id: info.question_id,
          format: info.format,
          select_history: cardLog.select_history
            ? {
                isMove: cardLog.select_history.isMove,
                option: cardLog.select_history.option,
                isDammy: cardLog.select_history.isDammy,
                cardNumber: cardLog.select_history.cardNumber,
                destination: cardLog.select_history.destination,
                optionNumber: cardLog.select_history.optionNumber,
              }
            : null,
          trial: cardLog.trial,
          result_type: cardLog.result_type,
          levenshtein_distance: cardLog.levenshtein_distance,
          answer: cardLog.answer,
          elapsed_time: cardLog.elapsed_time,
          answer_at: cardLog.answer_at,
        });
      });
    });
  });

  console.log(infoLog);
  return (
    <div className="logs">
      {/* <div className="info">
            <h1>Logs</h1>
            <p>取得したい問題を選択</p>
          </div> */}
      <MaterialReactTable
        columns={columns}
        data={infoLog}
        enableColumnResizing
        enableGrouping
        enableStickyHeader
        enableStickyFooter
        initialState={{
          density: "compact",
          expanded: true,
          grouping: ["user_id", "information_log_id"],
          pagination: { pageIndex: 0, pageSize: 20 },
          sorting: [{ id: "user_id", desc: false }],
        }}
        muiToolbarAlertBannerChipProps={{ color: "primary" }}
        muiTableContainerProps={{ sx: { maxHeight: 700 } }}
      />
    </div>
  );
};
