/**
 * EquipmentGrid - Paper doll layout with drag & drop support
 */

import { useState } from 'react';
import { getItemById, EQUIPMENT_SLOTS } from '../../data/equipment';
import {
  EquipmentGridWrapper,
  GridRow,
  SlotWrapper,
  SlotLabel,
  EquipmentSlotBox,
  SlotIcon,
  SlotItemName,
  SlotClearBtn,
} from './CharacterSetBuilder.styles';

const GRID_LAYOUT = [
  [null, 'head', null],
  ['weapon', 'body', 'offhand'],
  ['ring', 'legs', 'amulet'],
  [null, 'feet', null],
];

function Slot({ slotId, itemId, onDrop, onClear, onSlotClick }) {
  const [dragOver, setDragOver] = useState(false);
  const slot = EQUIPMENT_SLOTS[slotId];
  const item = itemId ? getItemById(itemId) : null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedItemId = e.dataTransfer.getData('itemId');
    const droppedSlot = e.dataTransfer.getData('slot');
    if (droppedSlot === slotId && droppedItemId) {
      onDrop(slotId, droppedItemId);
    }
  };

  return (
    <SlotWrapper>
      <EquipmentSlotBox
        $filled={!!item}
        $dragover={dragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => onSlotClick(slotId)}
        title={item ? item.name : `Empty ${slot.label} slot`}
      >
        {item ? (
          <>
            <SlotItemName>{item.name}</SlotItemName>
            <SlotClearBtn
              onClick={(e) => {
                e.stopPropagation();
                onClear(slotId);
              }}
              title="Remove item"
            >
              ×
            </SlotClearBtn>
          </>
        ) : (
          <SlotIcon>{slot.icon}</SlotIcon>
        )}
      </EquipmentSlotBox>
      <SlotLabel>{slot.label}</SlotLabel>
    </SlotWrapper>
  );
}

export default function EquipmentGrid({ equipment, onEquip, onClear, onSlotClick }) {
  return (
    <EquipmentGridWrapper>
      {GRID_LAYOUT.map((row, rowIndex) => (
        <GridRow key={rowIndex}>
          {row.map((slotId, colIndex) =>
            slotId ? (
              <Slot
                key={slotId}
                slotId={slotId}
                itemId={equipment[slotId]}
                onDrop={onEquip}
                onClear={onClear}
                onSlotClick={onSlotClick}
              />
            ) : (
              <SlotWrapper key={`empty-${rowIndex}-${colIndex}`}>
                <div style={{ width: 72, height: 72 }} />
              </SlotWrapper>
            )
          )}
        </GridRow>
      ))}
    </EquipmentGridWrapper>
  );
}
