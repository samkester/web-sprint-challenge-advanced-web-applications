import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
  id: undefined,
};

const ColorList = ({ colors, updateColors }) => {
  //console.log(colors);
  //const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    //setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    if(colorToEdit.id) {
      axiosWithAuth().put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        //console.log(response);
        filterIntoColors(response.data);
        setColorToEdit(initialColor);
      })
      .catch(error => console.log(error));
    }
    else // if colorToEdit.id exists, it came from a color we're modifying; use code above. if it doesn't, we're creating a new color; use code below
    {
      axiosWithAuth().post("colors", colorToEdit)
      .then(response => {
        //console.log(response);
        updateColors(response.data);
        setColorToEdit(initialColor);
      })
      .catch(error => console.log(error));
    }
  };

  const filterIntoColors = color => {
    updateColors(colors.map(item => {
      if(color.id === item.id) return color;
      return item;
    }))
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`colors/${color.id}`)
    .then(response => {
      //console.log(response);
      removeColorById(response.data);
    })
    .catch(error => console.log(error));
  };

  const removeColorById = id => {
    updateColors(colors.filter(item => item.id !== id))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      
      <form onSubmit={saveEdit}>
        <legend>{colorToEdit.id ? "edit color" : "new color"}</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button onClick={() => setColorToEdit(initialColor)}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
