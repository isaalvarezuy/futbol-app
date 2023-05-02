const CustomImageTick = ({ x, y, payload, rounded }: any) => {
  return <image x={x - 10} y={y} href={payload.value} width="20" height="20" />;
};

export default CustomImageTick;
