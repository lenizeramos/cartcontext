import { useCart } from "../context/CartContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const cartContext = useCart();
  const { cartItems } = cartContext;
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform`}
    >
      <button className="text-gray-500 p-4" onClick={onClose}>
        Close
      </button>
      <h2 className="text-lg font-bold px-4">Cart Items</h2>
      <ul className="p-4">
        {cartItems.map((item) => (
          <li key={item.id} className="border-b py-2">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
