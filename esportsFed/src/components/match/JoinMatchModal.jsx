function JoinMatchModal({ close }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">

        <h2 className="text-xl font-semibold mb-4">Join Match</h2>

        <div className="space-y-3">

          <input
            type="text"
            placeholder="Match ID"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2"
          />

        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-400 rounded-md"
            onClick={close}
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-md">
            Join
          </button>
        </div>

      </div>
    </div>
  );
}

export default JoinMatchModal;
