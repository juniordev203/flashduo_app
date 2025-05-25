import iziToast, { type IziToastSettings } from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

type ToastType = "success" | "error" | "info" | "warning";

export const showToast = (type: ToastType, message: string) => {
  const config: IziToastSettings = {
    message,
    position: "topRight",
    timeout: 2000,
    closeOnClick: true,
    transitionIn: "fadeIn",
    transitionOut: "fadeOut",
    backgroundColor: "#ffffff",
    titleColor: "#000000",
    messageColor: "#000000",
    icon: "",
    close: false,
    progressBar: false,
    overlay: false,
    overlayClose: false,
    pauseOnHover: true,
    resetOnHover: false,
    animateInside: true,
    drag: true,
    zindex: 9999,
  };

  const typeConfig = {
    success: {
      title: "Success",
      titleColor: "#4CAF50",
      messageColor: "#4CAF50",
      icon: "icon-check",
    },
    error: {
      title: "Error",
      titleColor: "#F44336",
      messageColor: "#F44336",
      icon: "icon-alert-circle",
    },
    info: {
      title: "Info",
      titleColor: "#2196F3",
      messageColor: "#2196F3",
      icon: "icon-info",
    },
    warning: {
      title: "Warning",
      titleColor: "#FF9800",
      messageColor: "#FF9800",
      icon: "icon-alert-triangle",
    },
  }[type];

  iziToast.show({
    ...config,
    ...typeConfig,
  });
};
