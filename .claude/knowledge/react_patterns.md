# React Patterns and Best Practices

## Table of Contents
1. [Callback Storage: useState vs useRef](#callback-storage-usestate-vs-useref)
2. [Component Communication Patterns](#component-communication-patterns)

---

## Callback Storage: useState vs useRef

### Problem Context
When a component needs to store a callback function (especially one received as a prop), choosing between `useState` and `useRef` affects both performance and correctness.

### The Pattern: Use useRef for Callbacks

**When to use `useRef` for callback storage:**
- Callback is received as a prop from parent component
- Callback needs to be called from event listeners or effects
- Callback updates frequently (e.g., every render)
- You don't want re-renders when the callback changes

**When to use `useState` for callback storage:**
- The callback change should trigger a re-render
- The callback is displayed in the UI or affects render logic
- You need the previous callback value for comparison

### Code Example

#### ❌ WRONG: Using useState for callbacks (causes unnecessary re-renders)

```javascript
function ChatInput({ onSendMessage }) {
  const [sendCallback, setSendCallback] = useState(() => onSendMessage);

  useEffect(() => {
    setSendCallback(() => onSendMessage); // Triggers re-render!
  }, [onSendMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendCallback(e.target.value); // May use stale callback
    }
  };

  return <input onKeyPress={handleKeyPress} />;
}
```

**Problems:**
- Setting state triggers unnecessary re-renders
- May still capture stale callback if parent re-renders

#### ✅ CORRECT: Using useRef for callbacks (no re-renders)

```javascript
function ChatInput({ onSendMessage }) {
  const sendCallbackRef = useRef(onSendMessage);

  // Update ref without causing re-render
  useEffect(() => {
    sendCallbackRef.current = onSendMessage;
  }, [onSendMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendCallbackRef.current(e.target.value); // Always uses latest callback
    }
  };

  return <input onKeyPress={handleKeyPress} />;
}
```

**Benefits:**
- No re-renders when callback changes
- Always uses the latest callback via `.current`
- Clean separation between state and refs

### Real-World Example from Site-da-Luci Project

In the Chat component, we need to store the callback for sending messages:

```javascript
function Chat({ sendMessage, isConnected }) {
  const sendMessageRef = useRef(sendMessage);

  // Keep ref updated without re-rendering
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  const handleSubmit = (message) => {
    if (isConnected) {
      sendMessageRef.current(message);
    }
  };

  return (
    <ChatInput onSubmit={handleSubmit} />
  );
}
```

### Decision Tree

```
Do you need to store a callback function?
│
├─ YES → Does the UI need to re-render when the callback changes?
│        │
│        ├─ YES → Use useState
│        │        Example: Callback affects conditional rendering
│        │
│        └─ NO → Use useRef ✅
│                 Example: Callback only used in event handlers/effects
│
└─ NO → Consider if you need storage at all
```

### Performance Impact

| Scenario | useState | useRef |
|----------|----------|---------|
| Parent re-renders with new callback | Child re-renders | No child re-render |
| Accessing callback in effect | May need useCallback in parent | Direct access, always fresh |
| Memory overhead | Creates new state setter | Single ref object |

### Common Mistakes to Avoid

1. **Don't destructure useRef return value**
   ```javascript
   // ❌ WRONG
   const { current: callback } = useRef(onSend);

   // ✅ CORRECT
   const callbackRef = useRef(onSend);
   // Later: callbackRef.current()
   ```

2. **Don't forget to update the ref**
   ```javascript
   // ❌ WRONG - ref never updates
   const callbackRef = useRef(onSend);

   // ✅ CORRECT - ref updates with prop changes
   const callbackRef = useRef(onSend);
   useEffect(() => {
     callbackRef.current = onSend;
   }, [onSend]);
   ```

3. **Don't use refs for values that affect rendering**
   ```javascript
   // ❌ WRONG - UI won't update when value changes
   const countRef = useRef(0);
   return <div>{countRef.current}</div>;

   // ✅ CORRECT - UI updates with state changes
   const [count, setCount] = useState(0);
   return <div>{count}</div>;
   ```

### Summary

- **useRef**: For callbacks used in event handlers/effects that shouldn't trigger re-renders
- **useState**: For callbacks that affect rendering or need to trigger updates
- Always update callback refs in useEffect to keep them fresh
- This pattern prevents stale closures and unnecessary re-renders

---

## Component Communication Patterns

*(To be documented)*

---

**Last Updated**: 2025-12-31
**Related Issues**: Translation key errors, component re-rendering optimization
