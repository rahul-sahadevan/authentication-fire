import { ToastContainer, toast } from 'react-toastify';

function Toast() {
  const notify = () => toast('Wow so easy !');

  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <button onClick={notify}>notify</button>
      <ToastContainer />
    </div>
  );
}

export default Toast