export const defaultSafeAreaInsets = () => {
    return { top: 0, left: 0, right: 0, bottom: 0 }
}
// ham bat dong bo
// su dung plugin SafeArea cua Capacitor thong qua $CapSafeArea
// dam bao giao dien khong bi che khuat boi cac phan cung cua device
export const getSafeAreaInsets = async (): Promise<{top: number, left: number, right: number, bottom: number}> => {
    const { $CapSafeArea } = useNuxtApp();
    return await ($CapSafeArea as any).SafeArea.getSafeAreaInsets();
}