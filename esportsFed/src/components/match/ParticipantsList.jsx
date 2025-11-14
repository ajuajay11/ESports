export default function ParticipantsList({ participants }) {
  return (
    <ul className="mt-4 space-y-2">
      {participants.map((p) => (
        <li
          key={p.userId}
          className="p-2 bg-gray-100 border rounded flex justify-between"
        >
          <span>{p.username}</span>
          <span className="text-gray-500 text-sm">
            {new Date(p.joinedAt).toLocaleTimeString()}
          </span>
        </li>
      ))}
    </ul>
  );
}
