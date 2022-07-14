import React, { useState } from "react";

import { getItems } from "../services/item-service";
import Item from "../models/item";
import ItemStyles from "./item-styles";
import AddEditItemDialog from "./addComponentDialog";

export const ItemView: React.FunctionComponent = () => {
  const [originalItems, setOriginalItems] = useState(getItems());
  const [currentItem, setCurrentItem] = useState(new Item());
  const [showPopup, setPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  function onAddEditItem({
    isEditMode,
    item
  }: {
    isEditMode: boolean;
    item?: Item;
  }) {
    setPopup(true);
    setIsEditMode(isEditMode);
    if (!isEditMode) {
      setCurrentItem(new Item());
    } else if (item) {
      setCurrentItem(item);
    }
  }

  function toggleItemModal() {
    setPopup(!showPopup);
    setCurrentItem(new Item());
  }

  function onSaveItem(item: Item) {
        //server side : TODO

        //client side
        if (!isEditMode) {
            setOriginalItems([...originalItems, item]);
        }
        else {
            setOriginalItems(originalItems.map(
                originalItem => originalItem.itemId === item.itemId
                    ? {
                        ...originalItem,
                        name: item.name,
                        price: item.price,
                        nature: item.nature
                    }
                    : originalItem))
        }
    }

  function rowElement(item: Item) {
    return (
      <tr key={item.itemId}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.nature}</td>
        <td>
          <button
            onClick={() => {
              onAddEditItem({ isEditMode: true, item: item });
            }} style={ItemStyles.HandCursor}
          >
            edit
          </button>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <button
        onClick={() => {
          onAddEditItem({ isEditMode: false });
        }} style={ItemStyles.HandCursor}
      >
        Add item
      </button>
      <AddEditItemDialog
        item={currentItem}
        isEditMode={isEditMode}
        showItemModal={showPopup}
        onSave={onSaveItem}
        toggleItemModal={toggleItemModal}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Nature</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{originalItems.map(rowElement)}</tbody>
      </table>
    </div>
  );
};

export default ItemView;
