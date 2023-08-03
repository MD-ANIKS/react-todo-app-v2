import React, { useState } from "react";
import note from "../assets/note.gif";

export default function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [isSubmitBtn, setIsSubmitBtn] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (inputData !== "") {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, allInputData]);
      setInputData("");
    }

    if (inputData && isSubmitBtn) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");

      setIsSubmitBtn(false);
    }
  };

  const editItem = (id) => {
    let newEditItem = items.find((curElem) => {
      return curElem.id === id;
    });

    setIsSubmitBtn(true);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  };

  const delItem = (index) => {
    const updateItem = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateItem);
  };

  const allClear = () => {
    if (items) {
      setItems([]);
    }
  };

  return (
    <>
      <section id="todo_area">
        <div className="container">
          <div className="todo_area_wrapper">
            <div className="todo">
              <figure>
                <img src={note} alt="note" />
                <figcaption>Add Your List Here</figcaption>
              </figure>

              <div className="input_area">
                <input
                  type="text"
                  name="additem"
                  placeholder="Add Item"
                  autoComplete="off"
                  value={inputData}
                  onChange={(e) => {
                    setInputData(e.target.value);
                  }}
                />
                {isSubmitBtn ? (
                  <i
                    className="fa-regular fa-pen-to-square edit_icon"
                    title="Edit Item"
                    onClick={addItem}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-plus add_icon"
                    title="Add Item"
                    onClick={addItem}
                  ></i>
                )}
              </div>

              <div className="list_items">
                {items.map((curElem, index) => {
                  return (
                    <div className="each_item" key={curElem.id}>
                      <span>{curElem.name}</span>
                      <div className="item_icons">
                        <i
                          onClick={() => {
                            editItem(curElem.id);
                          }}
                          title="Edit Item"
                          className="fa-regular fa-pen-to-square edit_icon"
                        ></i>
                        <i
                          onClick={() => {
                            delItem(curElem.id);
                          }}
                          title="Delete Item"
                          className="fa-solid fa-trash-can delete_icon"
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={allClear}
                class="btn-flip"
                data-back="REMOVE ALL"
                data-front="CHECKLIST"
              ></button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
