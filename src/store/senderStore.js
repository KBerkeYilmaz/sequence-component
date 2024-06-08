import { create } from "zustand";

const useSenderStore = create((set) => ({
  senders: [
    // {
    //   name: { senderName },
    //   email: { senderEmail },
    // },
  ],
  addSender: (sender) =>
    set((state) => ({
      senders: [...state.senders, sender],
      selectedSenders: [...state.selectedSenders, sender.email],
    })),
  clearSenders: () => set(() => ({ senders: [] })),
  forcedSender: (sender) =>
    set((state) => ({
      forcedSender: sender,
    })),
}));

export default useSenderStore;
