export const ShortButton = ({
  top,
  middle,
  bottom,
  levelBottom,
  levelMiddle,
  levelTop,
  setTop,
  setMiddle,
  setBottom,
  topHook,
  middleHook,
  bottomHook
}: IProps) => {
  if (!middle && !top) {
    const handleClickItem = (event: React.MouseEvent<HTMLButtonElement>) => {
      setTop(event.currentTarget.value);
      topHook();
    };
    return (
      <div className="flex flex-wrap gap-1.5">
        {levelTop.map((item, index) => {
          return (
            <button
              key={`${item}${index}`}
              onClick={handleClickItem}
              value={item}
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  }
  if (top && !middle) {
    const filter = levelMiddle.filter((item) => item.includes(top));
    const handleClickItem = (event: React.MouseEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.value;
      setMiddle(value);
      middleHook(value);
    };
    return (
      <div className="flex flex-wrap gap-1.5">
        {filter.map((item, index) => {
          return (
            <button
              key={`${item}${index}`}
              onClick={handleClickItem}
              value={item}
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              {item.replace(top, "")}
            </button>
          );
        })}
      </div>
    );
  }
  if (top && middle) {
    const filter = Object.keys(levelBottom).filter(
      (item) => item.includes(middle) && item !== middle
    );
    const handleClickItem = (event: React.MouseEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.value;
      setBottom(value);
      bottomHook(value);
    };
    return (
      <div className="flex flex-wrap gap-1.5">
        {filter.map((item, index) => {
          return (
            <button
              key={`${item}${index}`}
              onClick={handleClickItem}
              value={item}
              type="button"
              className={
                "mb-2 me-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 " +
                (bottom === item ? "bg-blue-200" : "")
              }
            >
              {item.replace(middle, "")}
            </button>
          );
        })}
      </div>
    );
  }
  return <></>;
};

interface IProps {
  top: string;
  middle: string;
  bottom: string;
  levelBottom: object;
  levelMiddle: string[];
  levelTop: string[];
  setTop: React.Dispatch<React.SetStateAction<string>>;
  setMiddle: React.Dispatch<React.SetStateAction<string>>;
  setBottom: React.Dispatch<React.SetStateAction<string>>;
  topHook: () => void;
  middleHook: (value: string) => void;
  bottomHook: (value: string) => void;
}
