export function Input({ placeholder, reference }: { placeholder: string; reference: any }) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type={"text"}
        className="px-2 w-full  py-1 mb-3 border border-black rounded focus:outline-none"
      />
    </div>
  );
}
