/**
 * SetManager - Save / load / delete equipment sets
 */

import {
  Card,
  CardTitle,
  SetNameInput,
  ButtonRow,
  ActionBtn,
  SavedSetsList,
  SavedSetRow,
  SavedSetName,
  SetActions,
  IconBtn,
  SuccessMessage,
  ErrorMessage,
  UnsavedBadge,
} from './CharacterSetBuilder.styles';

export default function SetManager({
  currentSet,
  savedSets,
  storageStats,
  hasUnsavedChanges,
  saveMessage,
  error,
  onNameChange,
  onSave,
  onNew,
  onLoad,
  onDelete,
  onDuplicate,
}) {
  if (!currentSet) return null;

  return (
    <Card>
      <CardTitle>
        Sets ({storageStats.total}/{storageStats.limit})
      </CardTitle>

      <SetNameInput
        type="text"
        value={currentSet.name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Set name..."
        maxLength={100}
      />

      <ButtonRow>
        <ActionBtn onClick={onSave} disabled={!hasUnsavedChanges && currentSet.id}>
          {currentSet.id ? 'Update' : 'Save'}
          {hasUnsavedChanges && <UnsavedBadge>●</UnsavedBadge>}
        </ActionBtn>
        <ActionBtn $variant="secondary" onClick={onNew}>
          New
        </ActionBtn>
      </ButtonRow>

      {saveMessage && <SuccessMessage>{saveMessage.text}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {savedSets.length > 0 && (
        <>
          <div style={{ marginTop: '1rem', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#6b7280' }}>
            Saved Sets
          </div>
          <SavedSetsList>
            {savedSets.map((set) => (
              <SavedSetRow
                key={set.id}
                $active={currentSet.id === set.id}
                onClick={() => onLoad(set)}
              >
                <SavedSetName title={set.name}>{set.name}</SavedSetName>
                <SetActions onClick={(e) => e.stopPropagation()}>
                  <IconBtn
                    onClick={() => onDuplicate(set.id)}
                    title="Duplicate"
                  >
                    📋
                  </IconBtn>
                  <IconBtn
                    onClick={() => onDelete(set.id)}
                    title="Delete"
                  >
                    🗑️
                  </IconBtn>
                </SetActions>
              </SavedSetRow>
            ))}
          </SavedSetsList>
        </>
      )}
    </Card>
  );
}
