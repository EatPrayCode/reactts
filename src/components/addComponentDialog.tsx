import React, { useState, useEffect } from "react";

import Item from "../models/item";
import ItemStyles from "./item-styles";

interface AddEditItemDialogProps {
    item: Item;
    isEditMode: boolean;
    showItemModal: boolean;
    onSave: (item: Item) => void;
    toggleItemModal: () => void;
}

export const AddEditItemDialog: React.FunctionComponent<
    AddEditItemDialogProps
> = props => {
    const [currentItem, setCurrentItem] = React.useState(props.item);
    const [isItemDataValid, setIsItemDataValid] = React.useState(false);

    useEffect(() => setCurrentItem(props.item), [props.item]);
    useEffect(() => validateItemData(), [currentItem]);

    function onDataInput(event: any) {
        let field = event.target.name;
        let value = event.target.value;
        setCurrentItem({ ...currentItem, [field]: value });
    }

    function onAddEditItem() {
        props.onSave(currentItem);
        props.toggleItemModal();
    }

    function validateItemData() {
        if (!currentItem.name || isNaN(currentItem.price) || !currentItem.nature) {
            setIsItemDataValid(false);
        } else {
            setIsItemDataValid(true);
        }
    }

    return (
        <dialog open={props.showItemModal ? props.showItemModal : false}>
            <div>
                <h3 style={{ float: "left", marginTop: "1px" }}>
                    {props.isEditMode ? "Edit" : "Add"} Item
                </h3>
                <span
                    onClick={props.toggleItemModal}
                    style={{ cursor: "pointer", float: "right" }}
                >
                    x
                </span>
            </div>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={currentItem.name}
                onChange={onDataInput}
            />
            <br />
            <br />

            <input
                type="text"
                name="price"
                placeholder="Price"
                value={currentItem.price}
                onChange={onDataInput}
            />
            <br />
            <br />

            <input
                type="text"
                name="nature"
                placeholder="Nature"
                value={currentItem.nature}
                onChange={onDataInput}
            />
            <br />
            <br />
            <div style={{ float: "right" }}>
                <input
                    type="button"
                    value="save"
                    onClick={onAddEditItem}
                    disabled={!isItemDataValid}
                    style={!isItemDataValid ? {} : ItemStyles.HandCursor}
                />
                <input
                    type="button"
                    value="cancel"
                    onClick={props.toggleItemModal}
                    style={ItemStyles.HandCursor}
                />
            </div>
        </dialog>
    );
};

export default AddEditItemDialog;
