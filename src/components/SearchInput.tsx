import { useEffect, useMemo, useRef, useState } from "react";

export const SearchInput = ({
  label,
  placeholder,
  value,
  setValue,
  autoList,
  filterValue = "",
  afterHook,
  clearHook
}: IProps) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!filterValue) {
      return autoList.filter((item) => item.includes(value));
    }
    const result = [];
    for (const item of autoList) {
      if (item.includes(filterValue) && item !== filterValue) {
        if (item.includes(value)) {
          result.push(item);
        }
      }
    }
    return result;
  }, [filterValue, value]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleClear = () => {
    setValue("");
    clearHook();
  };
  const handleClickItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setValue(value);
    setOpen(false);
    afterHook(value);
  };
  const handleOpenDropdown = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      const path = event.composedPath();
      if (!boxRef.current) return;
      if (!path.includes(boxRef.current)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, []);

  return (
    <>
      <label
        htmlFor="shi-do"
        className="mb-2 mt-2 block text-start text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div ref={boxRef} className="relative">
        <input
          type="text"
          id="shi-do"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onInput={handleInput}
          onClick={handleOpenDropdown}
          ref={inputRef}
          autoComplete="off"
        />

        <button
          onClick={handleClear}
          className={
            "absolute right-0 top-0 h-full cursor-pointer rounded-lg pl-5 pr-4 text-lg text-gray-500 " +
            (value ? "" : "hidden")
          }
        >
          x
        </button>

        <ul
          className={
            "absolute left-0 top-12 z-10 max-h-52 w-full overflow-y-scroll rounded-lg bg-white text-sm text-gray-700 shadow " +
            (open ? "" : "hidden")
          }
        >
          {filtered.map((item, index) => {
            return (
              <li key={`${item}-${index}`} className="w-full">
                <button
                  className="w-full border-b border-t border-gray-200 px-3 py-2 text-start"
                  onClick={handleClickItem}
                  value={item}
                >
                  {filterValue ? item.replace(filterValue, "") : item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

interface IProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  autoList: string[];
  filterValue?: string;
  afterHook: (value: string) => void;
  clearHook: () => void;
}
