import { useState } from "react";
import data from "./Data";

const Accordian = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [enableMultiSelection, setEnableMultiSelection] =
    useState<boolean>(false);
  const [multiple, setMultiple] = useState<number[]>([]);

  function handleSingleSelection(getcurrentID: number) {
    if (selected === getcurrentID) {
      setSelected(null);
    } else {
      setSelected(getcurrentID);
    }
  }

  function handleMultiSelection(getcurrentID: number) {
    const cpyMultiple = [...multiple];
    const findIndexOfCurrentID = cpyMultiple.indexOf(getcurrentID);
    if (findIndexOfCurrentID === -1) {
      cpyMultiple.push(getcurrentID);
    } else {
      cpyMultiple.splice(findIndexOfCurrentID, 1);
    }
    setMultiple(cpyMultiple);
  }

  // console.log(selected, multiple);

  return (
    <>
      <div className="p-4">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="border-b border-gray-300 mb-2">
              <div
                className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer text-black"
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(Number(item.id))
                    : () => handleSingleSelection(Number(item.id))
                }
              >
                <h1 className="text-lg font-semibold">{item.question}</h1>
                <span className="text-xl font-bold">+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(Number(item.id)) !== -1 && (
                    <div className="p-4 bg-gray-200">
                      <p className="text-md text-black">{item.answer}</p>
                    </div>
                  )
                : selected === Number(item.id) && (
                    <div className="p-4 bg-gray-200">
                      <p className="text-md text-black">{item.answer}</p>
                    </div>
                  )}
              {/* {selected === Number(item.id) || multiple.indexOf(Number(item.id)) !== -1 ? (
                <div className="p-4 bg-gray-200">
                  <p className="text-md text-black">{item.answer}</p>
                </div>
              ) : null } */}
            </div>
          ))
        ) : (
          <div className="text-center text-red-500 mt-4">No Data Found!</div>
        )}
        <button
          onClick={() => setEnableMultiSelection(!enableMultiSelection)}
          className="bg-gray-950 text-white p-4 mt-4"
        >
          Enable Multi-Selection
        </button>
      </div>
    </>
  );
};

export default Accordian;
