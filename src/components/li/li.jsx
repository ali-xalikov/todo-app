import no from "../../../public/assets/icons/no-check.png";
import x from "../../../public/assets/icons/x.svg";
import checko from "../../../public/assets/icons/Check.png";
import check_dark from "../../../public/assets/icons/Check dark.png";

export default function Li({
  text,
  check,
  onToggle,
  id,
  todos,
  setTodos,
  mode,
}) {
  function onHide() {
    if (!todos || !setTodos) return; // xavfsizlik
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="todo-item w-full">
      <div className="group flex items-center justify-between py-3 transition mb-3">
        <div className="flex items-center gap-4">
          <img
            src={check ? checko : mode ? no : check_dark}
            alt="check-toggle"
            onClick={onToggle}
            className="cursor-pointer w-5 h-5"
          />
          <li
            className={`list-none text-[18px] font-[400] leading-none font-[Josefin_Sans] ${
              check
                ? "line-through text-[#D1D2DA]"
                : "text-[#494C6B] hover:text-[#494C6B]"
            }`}
          >
            {text}
          </li>
        </div>

        <button
          onClick={onHide}
          className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <img src={x} alt="delete" className="w-4 h-4" />
        </button>
      </div>

      <hr className="border-t border-[#E3E4F1] mb-3" />
    </div>
  );
}
