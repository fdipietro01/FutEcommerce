import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const SwalFn = (
  title,
  message,
  icon,
  btn1 = undefined,
  btn2 = undefined,
  cb1 = undefined,
  cb2 = undefined
) => {
  const MySwal = withReactContent(Swal);
  const promise = MySwal.fire({
    title: <strong>{title}</strong>,
    html: <i>{message}</i>,
    icon,
    showConfirmButton: btn1,
    showCancelButton: btn2,
    confirmButtonText: btn1,
    cancelButtonText: btn2,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#3085d6",
    allowOutsideClick: false,
  });
  cb1 &&
    promise.then((result) => {
      if (!result.isConfirmed) {
        cb2();
        return;
      }
      cb1();
    });
};
