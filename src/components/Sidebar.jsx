<div className="w-48 bg-slate2 p-2">
  {chatIds.map((id) => (
    <button key={id} onClick={() => setCurrentChatId(id)} className="block p-2 hover:bg-slate4">
      {id}
    </button>
  ))}
  <button
    onClick={() => {
      const newId = `chat${Date.now()}`;
      setChats((prev) => ({ ...prev, [newId]: [] }));
      setCurrentChatId(newId);
    }}
    className="mt-4 text-green9"
  >
    + New Chat
  </button>
</div>
