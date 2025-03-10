import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useMyBaseStore } from "~/stores/base.store";

export default defineNuxtRouteMiddleware(() => {
  const store = useMyBaseStore();
  if (!store.authUser) {
    return navigateTo("/login");
  }
});
