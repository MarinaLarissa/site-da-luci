/**
 * ItemBrowser - Search and browse equipment items, supports drag & drop
 */

import { useState, useMemo } from 'react';
import { getItemsBySlot, EQUIPMENT_SLOTS, SLOT_ORDER, STAT_LABELS } from '../../data/equipment';
import {
  Card,
  CardTitle,
  BrowserSearch,
  SlotTabs,
  SlotTab,
  ItemList,
  ItemRow,
  ItemName,
  ItemStats,
  EquipBtn,
} from './CharacterSetBuilder.styles';

function formatStats(stats) {
  const parts = [];
  Object.entries(stats).forEach(([key, val]) => {
    if (val && val !== 0) {
      const label = STAT_LABELS[key] || key;
      parts.push(`${label}: +${val}`);
    }
  });
  return parts.slice(0, 3).join(' · ');
}

export default function ItemBrowser({ activeSlot, vocation, onEquip }) {
  const [search, setSearch] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(activeSlot || SLOT_ORDER[0]);

  // Sync selected slot when activeSlot changes from outside
  const effectiveSlot = activeSlot || selectedSlot;

  const items = useMemo(() => {
    const slotItems = getItemsBySlot(effectiveSlot, vocation);
    if (!search.trim()) return slotItems;
    const q = search.toLowerCase();
    return slotItems.filter((item) => item.name.toLowerCase().includes(q));
  }, [effectiveSlot, vocation, search]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('itemId', item.id);
    e.dataTransfer.setData('slot', item.slot);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Card>
      <CardTitle>Item Browser</CardTitle>

      <SlotTabs>
        {SLOT_ORDER.map((slot) => (
          <SlotTab
            key={slot}
            $active={effectiveSlot === slot}
            onClick={() => setSelectedSlot(slot)}
            title={EQUIPMENT_SLOTS[slot].label}
          >
            {EQUIPMENT_SLOTS[slot].icon} {EQUIPMENT_SLOTS[slot].label}
          </SlotTab>
        ))}
      </SlotTabs>

      <BrowserSearch
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ItemList>
        {items.length === 0 && (
          <div style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>
            No items found
          </div>
        )}
        {items.map((item) => (
          <ItemRow
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            title={`Drag to a slot or click Equip`}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <ItemName>{item.name}</ItemName>
              <br />
              <ItemStats>{formatStats(item.stats) || '—'}</ItemStats>
            </div>
            <EquipBtn
              onClick={() => onEquip(effectiveSlot, item.id)}
              title={`Equip ${item.name}`}
            >
              Equip
            </EquipBtn>
          </ItemRow>
        ))}
      </ItemList>
    </Card>
  );
}
