import { v6 as uuidV6 } from 'uuid';
import { create } from "zustand"

type DeviceState = {
  deviceId: string,
  deviceName: string,
}

type DeviceAction = {
  setDevice: () => void,
}

const useDeviceStore = create<DeviceState & DeviceAction>((set) => {
  const setDevice = () => {
    set((state) => ({
      deviceId: state.deviceId || uuidV6(),
      deviceName: state.deviceName || window.navigator.userAgent,
    }))
  }

  return {
    setDevice,
    deviceId: '',
    deviceName: '',
  }
});

export default useDeviceStore;