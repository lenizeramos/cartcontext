import { useCart } from "../context/CartContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform`}
    >
      <button className="text-gray-500 p-4" onClick={onClose}>
        <i className="fa-solid fa-x"></i>
      </button>
      <h2 className="text-lg font-bold px-4">Cart Items</h2>
      <ul className="p-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>
              {item.name}
            </span>
            <div>{item.quantity}</div>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => removeFromCart(item.id)}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
