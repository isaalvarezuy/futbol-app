import Paragraph from "../Paragraph/Paragraph";

interface LegendData {
  type: "line-chart" | "pie-chart";
  data: ChartData[];
}

interface ChartData {
  label: string;
  color: string;
}
const CustomLegend = ({
  legendData,
  title,
}: {
  legendData?: LegendData;
  title?: string;
}) => {
  const chartIconMapper = {
    "line-chart": (color: string) => (
      <div
        className="h-2.5 w-2.5 rounded-full "
        style={{
          border: `2px solid ${color}`,
        }}
      ></div>
    ),
    "pie-chart": (color: string) => (
      <div
        className="h-2.5 w-2.5 rounded-full "
        style={{
          border: `2px solid ${color}`,
          background: color,
        }}
      ></div>
    ),
    "bar-chart": (color: string) => (
      <div
        className="h-2.5 w-2.5 rounded-full "
        style={{
          border: `2px solid ${color}`,
          background: color,
        }}
      ></div>
    ),
  };

  return (
    <section className="flex gap-4 justify-center ">
      {legendData?.data.map((d) => (
        <div key={d.label} className="flex gap-1 items-center">
          {chartIconMapper[legendData.type](d.color)}
          <Paragraph size={12}>{d.label}</Paragraph>
        </div>
      ))}
      {title && !legendData && (
        <Paragraph size={14} weight="semibold">
          {title}
        </Paragraph>
      )}
    </section>
  );
};

export default CustomLegend;
