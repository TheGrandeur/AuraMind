export default function PrimaryButton({ children, onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-white font-medium shadow-md transition duration-200 transform-gpu
                  ${disabled ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 active:scale-95"}
                  ${className}`}
    >
      {children}
    </button>
  );
}