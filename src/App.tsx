import { useMemo, useState } from "react";
import "./App.css";
import { SearchInput } from "./components/SearchInput";
import { ShortButton } from "./components/ShortButton";
import { extra, levelBottom, levelMiddle, levelTop } from "./data/contents";

function App() {
  const [top, setTop] = useState("");
  const [middle, setMiddle] = useState("");
  const [bottom, setBottom] = useState("");

  const code = useMemo(() => {
    const firstCode = levelBottom[middle];
    if (firstCode) {
      return firstCode;
    }
    const finalCode = levelBottom[bottom];
    if (finalCode) {
      return finalCode;
    }
    return "지역을 선택해주세요";
  }, [bottom, middle]);

  const extraFee = useMemo(() => {
    if (code) {
      return extra[bottom];
    }
    return "";
  }, [code]);

  const handleClearAll = () => {
    setTop("");
    setMiddle("");
    setBottom("");
  };

  const handleClickTopValue = () => {
    setMiddle("");
    setBottom("");
  };

  const handleClickMiddleValue = (value: string) => {
    setTop(value.split(" ")[0]);
    if (levelBottom[value]) {
      setBottom(value);
    } else {
      setBottom("");
    }
  };

  const handleClickBottomValue = (value: string) => {
    const valueArray = value.split(" ");
    setTop(valueArray[0]);
    const exist = levelMiddle.find((middle) => middle === value);
    if (exist?.length) {
      setMiddle(value);
    } else {
      setMiddle(valueArray.slice(0, -1).join(" "));
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-full w-full max-w-[45rem] flex-col justify-between p-4">
        <div>
          <div>
            <div className="mt-8 w-full text-center text-3xl font-extrabold">
              {code}
            </div>
            <div className="mt-4 h-8 w-full text-center text-xl font-extrabold text-red-500/75">
              {extraFee}
            </div>
          </div>

          <SearchInput
            label="시/도"
            placeholder="경기"
            value={top}
            setValue={setTop}
            autoList={levelTop}
            afterHook={handleClickTopValue}
            clearHook={handleClickTopValue}
          />
          <SearchInput
            label="시/군/구"
            placeholder="부천시"
            value={middle}
            setValue={setMiddle}
            autoList={levelMiddle}
            filterValue={top}
            afterHook={handleClickMiddleValue}
            clearHook={handleClickTopValue}
          />
          <SearchInput
            label="동/읍/면"
            placeholder="심곡동"
            value={bottom}
            setValue={setBottom}
            autoList={Object.keys(levelBottom)}
            filterValue={middle}
            afterHook={handleClickBottomValue}
            clearHook={() => {}}
          />

          <div className="mt-6 h-[calc(100vh-29.5rem)] overflow-y-scroll">
            <ShortButton
              top={top}
              setTop={setTop}
              middle={middle}
              bottom={bottom}
              setMiddle={setMiddle}
              setBottom={setBottom}
              levelBottom={levelBottom}
              levelMiddle={levelMiddle}
              levelTop={levelTop}
              topHook={handleClickTopValue}
              middleHook={handleClickMiddleValue}
              bottomHook={handleClickBottomValue}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleClearAll}
          className="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100"
        >
          입력 내용 비우기
        </button>
      </div>
    </div>
  );
}

export default App;
