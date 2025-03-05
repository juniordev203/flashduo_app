import * as SafeArea from "@aashu-dubey/capacitor-statusbar-safe-area";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      CapSafeArea: SafeArea,
    },
  };
});