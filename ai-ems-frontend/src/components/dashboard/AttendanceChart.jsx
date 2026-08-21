import React from "react";

// ===========================================================================
// File: src/components/dashboard/AttendanceChart.jsx
// ===========================================================================

const AttendanceChart = ({ data = [] }) => {
    if (!data.length) {
        return (
            <div className="rounded-xl border border-[#ced0c8]/50 bg-white p-6 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        Attendance Trend
                    </h2>

                    <p className="mt-1 text-xs text-[#9ca191]">
                        No attendance data available.
                    </p>
                </div>
            </div>
        );
    }

    const maxValue = Math.max(
        ...data.map((item) => item.presentCount || 0),
        1
    );

    const chartWidth = 700;
    const chartHeight = 240;
    const paddingLeft = 45;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 40;

    const usableWidth =
        chartWidth -
        paddingLeft -
        paddingRight;

    const usableHeight =
        chartHeight -
        paddingTop -
        paddingBottom;

    const points = data.map((item, index) => {
        const x =
            data.length === 1
                ? paddingLeft +
                  usableWidth / 2
                : paddingLeft +
                  (index /
                      (data.length - 1)) *
                      usableWidth;

        const y =
            paddingTop +
            usableHeight -
            ((item.presentCount || 0) /
                maxValue) *
                usableHeight;

        return {
            ...item,
            x,
            y,
        };
    });

    const linePath = points
        .map(
            (point, index) =>
                `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
        )
        .join(" ");

    const areaPath = `
        M ${points[0].x} ${chartHeight - paddingBottom}
        L ${points
            .map(
                (point) =>
                    `${point.x} ${point.y}`
            )
            .join(" L ")}
        L ${
            points[points.length - 1].x
        } ${chartHeight - paddingBottom}
        Z
    `;

    return (
        <div className="mb-6 rounded-xl border border-[#ced0c8]/50 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        Attendance Trend
                    </h2>

                    <p className="mt-1 text-xs font-medium text-[#9ca191]">
                        Present employees over the last 7 days
                    </p>
                </div>

                <span className="rounded-md border border-[#d7e9af] bg-[#f5faeb] px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#7ba02c]">
                    Live
                </span>
            </div>

            <div className="w-full overflow-x-auto">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="h-auto min-w-[600px] w-full"
                    role="img"
                    aria-label="Attendance trend chart"
                >
                    {[0, 25, 50, 75, 100].map(
                        (percentage) => {
                            const y =
                                paddingTop +
                                usableHeight -
                                (percentage /
                                    100) *
                                    usableHeight;

                            const value = Math.round(
                                (maxValue *
                                    percentage) /
                                    100
                            );

                            return (
                                <React.Fragment
                                    key={percentage}
                                >
                                    <line
                                        x1={paddingLeft}
                                        y1={y}
                                        x2={
                                            chartWidth -
                                            paddingRight
                                        }
                                        y2={y}
                                        stroke="#ced0c8"
                                        strokeOpacity="0.45"
                                        strokeDasharray="4 4"
                                    />

                                    <text
                                        x={
                                            paddingLeft -
                                            10
                                        }
                                        y={
                                            y + 4
                                        }
                                        textAnchor="end"
                                        fontSize="10"
                                        fill="#9ca191"
                                    >
                                        {value}
                                    </text>
                                </React.Fragment>
                            );
                        }
                    )}

                    <path
                        d={areaPath}
                        fill="#31749b"
                        fillOpacity="0.08"
                    />

                    <path
                        d={linePath}
                        fill="none"
                        stroke="#31749b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {points.map((point) => (
                        <g
                            key={point.attendanceDate}
                        >
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="5"
                                fill="#ffffff"
                                stroke="#31749b"
                                strokeWidth="3"
                            />

                            <text
                                x={point.x}
                                y={
                                    chartHeight -
                                    16
                                }
                                textAnchor="middle"
                                fontSize="10"
                                fill="#696e5e"
                            >
                                {new Date(
                                    point.attendanceDate
                                ).toLocaleDateString(
                                    undefined,
                                    {
                                        day: "2-digit",
                                        month: "short",
                                    }
                                )}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default AttendanceChart;