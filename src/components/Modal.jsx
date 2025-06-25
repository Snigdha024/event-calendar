const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded p-4 w-full max-w-md">
      <button onClick={onClose} className="float-right text-gray-500">&times;</button>
      {children}
    </div>
  </div>
);


export default Modal;
