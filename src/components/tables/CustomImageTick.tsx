const CustomImageTick = ({ x, y, payload }: any) => {
  return <image x={x - 14} y={y} href={payload.value} width="28" height="28" />;
};

export default CustomImageTick;
